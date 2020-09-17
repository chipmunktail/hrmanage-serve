const models = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const Op = Sequelize.Op;


exports.getDepartments = async (req) => {
    const { id, name } = req;
    const { limit, offset } = limitOffset.getLimitOffset(req)
    let whereObj = {}
    let result
    if (id) whereObj.id = id
    if (name) whereObj.name = {
        [Op.like]: `%${name}%`,
    }

    result = await models.Department.findAndCountAll({
        limit,
        offset,
        where: whereObj,
        attributes: { exclude: [/*'createdAt', 'updatedAt'*/] },
        include: [
            { model: models.User, attributes: ['id', 'displayName', 'name', 'DepartmentId'] },
            { model: models.User, as: 'departmentUser', attributes: ['id', 'displayName', 'name', 'DepartmentId'] }
        ]
    })
    return { status: true, result }
}

exports.createDepartment = async (req) => {
    const { name, managerId } = req
    let result
    if (name && managerId) {
        result = await models.Department.create({
            name,
            managerId,
        })
    }
    return { status: result instanceof models.Department, result }
}

exports.deleteDepartment = async (req) => {
    const { id } = req
    let result
    if (id) {
        result = await models.Department.destroy({
            where: { id }
        });
    }
    return { status: result }
}

exports.updateDepartment = async (req) => {
    const { id, name, managerId } = req
    let result
    if (id && (name || managerId)) {
        result = await models.Department.update({
            name,
            managerId,
        }, {
            where: { id }
        });
    }
    return { status: result }
}
