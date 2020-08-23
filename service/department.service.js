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
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    return { status: true, result }
}

exports.createDepartment = async (req) => {
    const { name } = req
    let result
    if (name) {
        result = await models.Department.create({
            name,
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
    const { id, name } = req
    let result
    if (id && (name)) {
        result = await models.Department.update({
            name,
        }, {
            where: { id }
        });
    }
    return { status: result }
}

// todo 关联
exports.getUser = async (req) => {
    const { id, departmentId } = req;
    let whereObj = {}
    let result

    if (id) whereObj.id = id
    if (departmentId) whereObj.departmentId = departmentId

    result = await models.DepartmentUser.findAndCountAll({
        where: whereObj,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })

    // const { id, name } = req.query;
    // let whereObj = {}
    // if (id) whereObj.id = {
    //   [Op.in]: [7, 8]
    // }
    // models.Role.findAll({
    //   where: whereObj,
    //   attributes: { exclude: ['createdAt', 'updatedAt'] },
    // }).then(data => {
    //   console.log(data)
    //   res.json(data)
    // });

    return { status: true, result }
}

exports.addUser = async (req) => { }

exports.updateUser = async (req) => { }

exports.deleteUser = async (req) => { }