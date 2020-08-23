var models = require('../db/models');
const Sequelize = require('sequelize');
const service = require('../utils/token.service')
const roleService = require('../service/role.service')
const limitOffset = require('../utils/limitOffset')
const Op = Sequelize.Op;



exports.getLogs = async (req) => {
    const { limit, offset } = limitOffset.getLimitOffset(req)
    return await models.Log.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
}

exports.log = async (req) => {
    const { userName, roleName, userId, operateType, params } = req;
    await models.Log.create({
        logDate: new Date(),
        userName, roleName, userId, operateType, params
    })
}

// log中间件
exports.middlewareLog = (req, res, next) => {
    const method = req.method
    if (method === 'get') {

    }
    if (method === 'post') {

    }
    const { userName, roleName, userId, operateType, params } = req;
    models.Log.create({
        logDate: new Date(),
        userName, roleName, userId, operateType, params
    })
    next();
}