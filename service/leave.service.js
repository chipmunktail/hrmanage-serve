const models = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const userService = require('../service/user.service')
const config = require('../config/common')
const Op = Sequelize.Op;

// 检查是否超过overtime时长
const countOvertime = async (userId) => {

    const result = await userService.getUsers({ id: userId })

    if (result.status) {
        const user = result.result.rows[0]
        if (user.freeHour > 0) {
            return { status: true, freeHour: user.freeHour }
        }
        if (user.freeHour <= 0) {
            return { status: false, message: config.message.NOFREEHOUR }
        }
    }

    return { status: false, message: config.message.DBERROR }
}

exports.getLeaves = async (req) => {
    const { id, leaveDate, leaveStart, leaveEnd, sumHour, userId } = req;
    const { limit, offset } = limitOffset.getLimitOffset(req)
    let whereObj = {}
    let result
    if (id) whereObj.id = id
    if (userId) whereObj.userId = userId

    result = await models.Leave.findAndCountAll({
        limit,
        offset,
        where: whereObj,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    return { status: true, result }
}

exports.createLeave = async (req) => {
    const { leaveDate, leaveStart, leaveEnd, sumHour, userId } = req;
    // 查询overtime时长
    const countOvertimeResult = await countOvertime(userId)
    // 异常状态
    if (!countOvertimeResult.status) {
        return countOvertimeResult
    }
    // overtime时长小于leave时长
    if (sumHour > countOvertimeResult.freeHour) {
        return { status: false, message: config.message.EXCEEDSFREEHOUR }
    }
    // 更新user freeHour
    await userService.updateUser({ id: userId, freeHour: countOvertimeResult.freeHour - sumHour }) // todo 整数sumHour
    // 增加leave记录
    let result
    if (leaveDate && leaveStart && leaveEnd && sumHour && userId) {
        result = await models.Leave.create({
            leaveDate, leaveStart, leaveEnd, sumHour, userId
        })
    }
    // 返回结果
    return { status: result instanceof models.Leave, result }
}
// 不可删除
exports.deleteLeave = async (req) => {
    const { id } = req
    let result
    if (id) {
        result = await models.Leave.destroy({
            where: { id }
        });
    }
    return { status: result }
}

exports.updateLeave = async (req) => {
    const { id, name } = req
    let result
    if (id && (name)) {
        result = await models.Leave.update({
            name,
        }, {
            where: { id }
        });
    }
    return { status: result }
}
