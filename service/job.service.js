const models = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const Op = Sequelize.Op;


exports.getJobs = async (req) => {
    const { id, name } = req;
    const { limit, offset } = limitOffset.getLimitOffset(req)
    let whereObj = {}
    let result
    if (id) whereObj.id = id
    if (name) whereObj.name = {
        [Op.like]: `%${name}%`,
    }

    result = await models.Job.findAndCountAll({
        limit,
        offset,
        where: whereObj,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    return { status: true, result }
}

exports.createJob = async (req) => {
    const { name } = req
    let result
    if (name) {
        result = await models.Job.create({
            name,
        })
    }
    return { status: result instanceof models.Job, result }
}

exports.deleteJob = async (req) => {
    const { id } = req
    let result
    if (id) {
        result = await models.Job.destroy({
            where: { id }
        });
    }
    return { status: result }
}

exports.updateJob = async (req) => {
    const { id, name } = req
    let result
    if (id && (name)) {
        result = await models.Job.update({
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

    result = await models.JobUser.findAndCountAll({
        where: whereObj,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })

    return { status: true, result }
}

exports.addUser = async (req) => { }

exports.updateUser = async (req) => { }

exports.deleteUser = async (req) => { }