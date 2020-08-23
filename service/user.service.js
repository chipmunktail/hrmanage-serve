var models = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const Op = Sequelize.Op;


exports.getUsers = async (req) => {
    const { id, displayName } = req;
    const { limit, offset } = limitOffset.getLimitOffset(req)
    let whereObj = {}
    let result
    if (id) whereObj.id = id
    if (displayName) whereObj.displayName = {
        [Op.like]: `%${displayName}%`,
    }

    result = await models.User.findAndCountAll({
        limit,
        offset,
        where: whereObj,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    return { status: true, result }
}

exports.createUser = async (req) => {
    const { displayName, name, roleId, email, password } = req
    let result
    if (displayName && name) {
        result = await models.User.create({
            displayName,
            name,
            roleId, email, password
        })
    }
    return { status: result instanceof models.User, result }
}

exports.deleteUser = async (req) => {
    const { id } = req
    let result
    if (id) {
        result = await models.User.destroy({
            where: { id }
        });
    }
    return { status: result }
}

exports.updateUser = async (req) => {
    const { id, displayName, name, roleId, jobId, departmentId, freeHour, salaryId, email, enable, password } = req
    let result
    if (id && (displayName || name || roleId || jobId || departmentId || freeHour || salaryId || email ||
        typeof enable === 'boolean' || password)) {
        result = await models.User.update({
            displayName,
            name,
            roleId,
            jobId,
            departmentId,
            freeHour,
            salaryId,
            email,
            enable,
            password,
        }, {
            where: { id }
        });
    }
    return { status: result }
}