var models = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const Op = Sequelize.Op;
const tokenService = require('../utils/token.service')


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
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
        include: [
            { model: models.Salary, attributes: ['id', 'salary', 'userId'] }
        ]
    })
    return { status: true, result }
}

exports.createUser = async (req) => {
    const { displayName, name, roleId, email, password, gender, national, birthDay, phone, address } = req
    let result
    if (displayName && name) {
        result = await models.User.create({
            displayName,
            name,
            roleId, email, password,
            gender, national, birthDay, phone, address
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
    const { id, displayName, name, roleId, jobId, departmentId, freeHour, salaryId, email, enable, password,
        gender, national, birthDay, phone, address } = req
    let result
    if (id && (displayName || name || roleId || jobId || departmentId || freeHour || salaryId || email ||
        typeof enable === 'boolean' || password || gender || national || birthDay || phone || address)) {
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
            gender, national, birthDay, phone, address
        }, {
            where: { id }
        });
    }
    return { status: result }
}

exports.getUser = async (req) => {
    const token = req.headers.authorization.split('Bearer ')[1]
    const tokenInfo = await tokenService.checkToken(token)
        .then(ress => {
            return { status: true, result: ress };
        })
        .catch(err => {
            return { status: false, result: err }
        })
    if (!tokenInfo.status) {
        return tokenInfo
    }
    result = await models.User.findOne({
        where: { id: tokenInfo.result.userId },
        // attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
        include: [
            { model: models.Salary, attributes: ['id', 'salary', 'userId'] },
            { model: models.Department, attributes: ['id', 'name'] },
            { model: models.Job, attributes: ['id', 'name'] },
        ]
    })
    return { status: true, result }
}