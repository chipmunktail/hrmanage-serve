const models = require('../db/models');
const Sequelize = require('sequelize');
const moment = require('moment');
const limitOffset = require('../utils/limitOffset');
const config = require('../config/common');
const Op = Sequelize.Op;


exports.getPerformances = async (req) => {
    const { id, month, rankDate, rankLevel, userId } = req;
    const { limit, offset } = limitOffset.getLimitOffset(req)
    const format = (time) => moment(time).format(config.timeFormat)
    let whereObj = {}
    let result
    if (id) whereObj.id = id
    if (month) whereObj.month = month
    if (rankDate) whereObj.rankDate = {
        [Op.between]: [format(rankDate.start), format(rankDate.end)]
    }
    if (rankLevel) whereObj.rankLevel = rankLevel
    if (userId) whereObj.userId = userId

    result = await models.Performance.findAndCountAll({
        limit,
        offset,
        where: whereObj,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    return { status: true, result }
}

exports.createPerformance = async (req) => {
    const { month, rankLevel, userId } = req;
    let result
    if (month && rankLevel && userId) {
        result = await models.Performance.create({
            rankDate: new Date(),
            month, rankLevel, userId
        })
    }
    return { status: result instanceof models.Performance, result }
}

exports.deletePerformance = async (req) => {
    const { id } = req
    let result
    if (id) {
        result = await models.Performance.destroy({
            where: { id }
        });
    }
    return { status: result }
}

exports.updatePerformance = async (req) => {
    const { id, rankLevel, userId } = req
    let result
    if (id && rankLevel && userId) {
        result = await models.Performance.update({
            rankLevel,
            userId
        }, {
            where: { id }
        });
    }
    return { status: result }
}
