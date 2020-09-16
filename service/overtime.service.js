var models = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const userService = require('../service/user.service')
const config = require('../config/common')
const Op = Sequelize.Op;

// 检测开始结束时间是否大于 请假时长
const compareOvertimeAndStartEnd = (sumHour, start, end) => {
    if (!sumHour) {
        return { status: false, message: config.message.NOOVERTIMESUMHOUR }
    }
    if (!start) {
        return { status: false, message: config.message.NOOVERTIMESTART }
    }
    if (!end) {
        return { status: false, message: config.message.NOOVERTIMEEND }
    }
    const startEnd = (Date.now(end) - Date.now(start)) / (1000 * 60 * 60)
    if (startEnd < sumHour) {
        return { status: false, message: config.message.OVEROVERTIMELENGTH }
    }
    return { status: true }
}

exports.getOvertimes = async (req) => {
    const { id, overtimeDate, overtimeStart, overtimeEnd, sumHour, userId } = req;
    const { limit, offset } = limitOffset.getLimitOffset(req)
    let whereObj = {}
    let result
    if (id) whereObj.id = id
    if (userId) whereObj.userId = userId

    result = await models.Overtime.findAndCountAll({
        limit,
        offset,
        where: whereObj,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    return { status: true, result }
}

exports.createOvertime = async (req) => {
    const { overtimeDate, overtimeStart, overtimeEnd, sumHour, userId } = req;

    // 获取user freeHour
    const userResult = await userService.getUsers({ id: userId })
    const user = userResult.result.rows[0]

    // 判断overtime时长
    const checkOvertimeLength = compareOvertimeAndStartEnd(sumHour, overtimeStart, overtimeEnd)

    // 检查overtime时长是否正确
    if (!checkOvertimeLength.status) {
        return checkOvertimeLength
    }
    
    // 更新user freeHour
    await userService.updateUser({ id: userId, freeHour: user.freeHour + sumHour }) // todo 整数sumHour
    // 增加overtime记录
    let result
    if (overtimeDate && overtimeStart && overtimeEnd && sumHour && userId) {
        result = await models.Overtime.create({
            overtimeDate, overtimeStart, overtimeEnd, sumHour, userId
        })
    }
    // 返回结果
    return { status: result instanceof models.Overtime, result }
}
// 不可删除
exports.deleteOvertime = async () => {
    const { id } = req
    let result
    if (id) {
        result = await models.Overtime.destroy({
            where: { id }
        });
    }
    return { status: result }
}

exports.updateOvertime = async () => {
    const { id, name } = req
    let result
    if (id && (name)) {
        result = await models.Overtime.update({
            name,
        }, {
            where: { id }
        });
    }
    return { status: result }
}