const models = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const moment = require('moment');
const userService = require('../service/user.service')
var tokenService = require('../utils/token.service')
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
// 检测开始结束时间是否大于 请假时长
const compareLeaveAndStartEnd = (sumHour, start, end) => {
    if (!sumHour) {
        return { status: false, message: config.message.NOLEAVESUMHOUR }
    }
    if (!start) {
        return { status: false, message: config.message.NOLEAVESTART }
    }
    if (!end) {
        return { status: false, message: config.message.NOLEAVEEND }
    }
    const startEnd = Math.ceil((Date.now(end) - Date.now(start)) / (1000 * 60 * 60))
    if (startEnd > sumHour) {
        return { status: false, message: config.message.OVERLEAVELENGTH }
    }
    return { status: true }
}

exports.getLeaves = async (req) => {
    const { id, leaveDate, leaveStart, leaveEnd, sumHour, userId, auditStatus, isPrivate } = req.query;
    const { limit, offset } = limitOffset.getLimitOffset(req)

    const format = (time) => moment(time).format(config.timeFormat)

    // 判断是否是hr角色
    const token = req.headers.authorization.split('Bearer ')[1]
    const userInfo = await tokenService.checkToken(token)
    const isHrmanage = userInfo.auth.indexOf('HRMANAGE') > -1

    let whereObj = {}
    let result
    if (id) whereObj.id = id
    if (auditStatus) whereObj.auditStatus = auditStatus
    if (leaveDate && leaveDate.length === 2) whereObj.leaveDate = {
        [Op.between]: [format(leaveDate[0]), format(leaveDate[1])]
    }
    if (isPrivate === "true" || !isHrmanage) whereObj.userId = userInfo.userId

    result = await models.Leave.findAndCountAll({
        limit,
        offset,
        where: whereObj,
        order: [['leaveDate', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
            { model: models.User, attributes: ['id', 'displayName', 'name'] }
        ]
    })
    return { status: true, result }
}

exports.createLeave = async (req) => {
    const { leaveDate, leaveStart, leaveEnd, sumHour, userId } = req;
    // 查询overtime时长
    const countOvertimeResult = await countOvertime(userId)
    // 判断leave时长
    const checkLeaveLength = compareLeaveAndStartEnd(sumHour, leaveStart, leaveEnd)

    // 检查leave时长是否正确
    if (!checkLeaveLength.status) {
        return checkLeaveLength
    }
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
