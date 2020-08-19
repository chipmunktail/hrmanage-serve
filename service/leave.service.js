const models = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const Op = Sequelize.Op;


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
// ===== next do
exports.createLeave = async (req) => {
    const { id, leaveDate, leaveStart, leaveEnd, sumHour, userId } = req;
    let result
    if (name) {
        result = await models.Leave.create({
            name,
        })
    }
    return { status: result instanceof models.Leave, result }
}

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
