const models = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const userService = require('../service/user.service')
const config = require('../config/common')
const Op = Sequelize.Op;


exports.getSalarys = async (req) => {
    const { id, salary } = req;
    const { limit, offset } = limitOffset.getLimitOffset(req)
    let whereObj = {}
    let result
    if (id) whereObj.id = id
    if (salary) whereObj.salary = parseInt(salary)
    // if (salary) whereObj.salary = {
    //     [Op.like]: `%${salary}%`,
    // }


    result = await models.Salary.findAndCountAll({
        limit,
        offset,
        where: whereObj,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        order: [['id', 'ASC']],
        include: [
            { model: models.User, attributes: ['id', 'displayName', 'name', 'salaryId'] }
        ]
    })
    return { status: true, result }
}

exports.createSalary = async (req) => {
    const { salary, userId } = req
    let result
    let userResult
    if (userId) {
        userResult = await userService.getUsers({ id: userId })
        if (userResult.result.rows[0].salaryId) {
            return { status: false, message: config.message.EXISTSALARY }
        }
    }
    if (salary && userId) {
        console.log(salary, userId);
        result = await models.Salary.create({
            salary,
            userId,
        })
        // 更新user salaryId
        userResult = await userService.updateUser({ id: userId, salaryId: result.id })
    }
    return { status: result instanceof models.Salary && userResult.status.length === 1, result }
}

exports.deleteSalary = async (req) => {
    const { id, userId } = req
    let result
    const userResult = await userService.getUsers({ id: userId })
    console.log(userResult, '=======');
    // 是否存在用户
    if (userResult.status && userResult.result.count === 1 && userResult.result.rows[0].salaryId) {
        return { status: false, message: config.message.EXISTUSER }
    }
    if (id && userId) {
        // 删除salary
        result = await models.Salary.destroy({
            where: { id }
        });
    }
    return { status: result }
}

exports.updateSalary = async (req) => {
    const { id, salary, userId } = req
    let result
    if (userId) {
        const userResult = await userService.getUsers({ id: userId })
        const salaryId = userResult.result.rows[0].salaryId
        if (salaryId && salaryId !== id) {
            return { status: false, message: config.message.EXISTSALARY }
        }
    }
    if (id && (salary || userId)) {
        result = await models.Salary.update({
            salary,
            userId,
        }, {
            where: { id }
        });
    }
    return { status: result }
}
