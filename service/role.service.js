var models = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const Op = Sequelize.Op;


exports.getRoles = async (req) => {
    const { id, name } = req;
    const { limit, offset } = limitOffset.getLimitOffset(req)
    let whereObj = {}
    let result
    if (id) whereObj.id = id
    if (name) whereObj.name = {
        [Op.like]: `%${name}%`,
    }

    result = await models.Role.findAndCountAll({
        limit,
        offset,
        where: whereObj,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    return { status: true, result }
}

exports.createRole = async (req) => {
    const { authCode, name } = req
    let result
    if (authCode && name) {
        result = await models.Role.create({
            authCode,
            name,
        })
    }
    return { status: result instanceof models.Role, result }
}

exports.deleteRole = async (req) => {
    const { id } = req
    let result
    if (id) {
        result = await models.Role.destroy({
            where: { id }
        });
    }
    return { status: result }
}

exports.updateRole = async (req) => {
    const { id, authCode, name } = req
    let result
    if (id && (authCode || name)) {
        result = await models.Role.update({
            authCode,
            name,
        }, {
            where: { id }
        });
    }
    return { status: result }
}