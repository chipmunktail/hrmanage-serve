const models = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const Op = Sequelize.Op;


exports.getSalarys = async (req) => {
    const { id, name } = req;
    const { limit, offset } = limitOffset.getLimitOffset(req)
    let whereObj = {}
    let result
    if (id) whereObj.id = id
    if (name) whereObj.name = {
        [Op.like]: `%${name}%`,
    }

    result = await models.Salary.findAndCountAll({
        limit,
        offset,
        where: whereObj,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    return { status: true, result }
}

exports.createSalary = async (req) => {
    const { name } = req
    let result
    if (name) {
        result = await models.Salary.create({
            name,
        })
    }
    return { status: result instanceof models.Salary, result }
}

exports.deleteSalary = async (req) => {
    const { id } = req
    let result
    if (id) {
        result = await models.Salary.destroy({
            where: { id }
        });
    }
    return { status: result }
}

exports.updateSalary = async (req) => {
    const { id, name } = req
    let result
    if (id && (name)) {
        result = await models.Salary.update({
            name,
        }, {
            where: { id }
        });
    }
    return { status: result }
}
