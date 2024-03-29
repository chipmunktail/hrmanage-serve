var models = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const moment = require('moment');
const userService = require('../service/user.service')
var tokenService = require('../utils/token.service')
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
    const startEnd = (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60)
    // const caclSumHour = Math.floor(startEnd)
    if (startEnd < sumHour) {
        return { status: false, message: config.message.OVEROVERTIMELENGTH }
    }
    return { status: true }
}

exports.getOvertimes = async (req) => {
    const { id, overtimeDate, overtimeStart, overtimeEnd, sumHour, userId, auditStatus, isPrivate } = req.query;
    const { limit, offset } = limitOffset.getLimitOffset(req.query)

    const format = (time) => moment(time).format(config.timeFormat)

    // 判断是否是hr角色
    const token = req.headers.authorization.split('Bearer ')[1]
    const userInfo = await tokenService.checkToken(token)
    const isHrmanage = userInfo.auth.indexOf('HRMANAGE') > -1

    let whereObj = {}
    let result
    if (id) whereObj.id = id
    if (auditStatus) whereObj.auditStatus = auditStatus
    if (overtimeDate && overtimeDate.length === 2) whereObj.overtimeDate = {
        [Op.between]: [format(overtimeDate[0]), format(overtimeDate[1])]
    }
    if (isPrivate === "true" || !isHrmanage) whereObj.userId = userInfo.userId

    result = await models.Overtime.findAndCountAll({
        limit,
        offset,
        where: whereObj,
        order: [['overtimeDate', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
            { model: models.User, attributes: ['id', 'displayName', 'name'] }
        ]
    })
    return { status: true, result }
}

exports.createOvertime = async (req) => {
    const { overtimeDate, overtimeStart, overtimeEnd, sumHour, userId, remark } = req;

    // 判断overtime时长
    const checkOvertimeLength = compareOvertimeAndStartEnd(sumHour, overtimeStart, overtimeEnd)

    // 检查overtime时长是否正确
    if (!checkOvertimeLength.status) {
        return checkOvertimeLength
    }

    // 增加overtime记录
    let result
    if (overtimeDate && overtimeStart && overtimeEnd && sumHour && userId && remark) {
        result = await models.Overtime.create({
            overtimeDate, overtimeStart, overtimeEnd, sumHour, userId, remark,
            auditStatus: 1
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

exports.updateOvertime = async (req) => {
    const { id, auditStatus, userId, sumHour } = req

    // 更新调休时间
    if (+auditStatus === 4) {
        // 获取user freeHour
        const userResult = await userService.getUsers({ id: userId })
        const user = userResult.result.rows[0]

        // 更新user freeHour
        await userService.updateUser({ id: userId, freeHour: user.freeHour + sumHour }) // todo 整数sumHour
    }

    let result
    if (id && (auditStatus)) {
        result = await models.Overtime.update({
            auditStatus,
        }, {
            where: { id }
        });
    }
    return { status: result }
}