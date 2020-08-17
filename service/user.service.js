var models = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const Op = Sequelize.Op;

// exports.getUsers = async (req, res, next) => {
//     const { id, name } = req.query;
//     let whereObj = {}
//     if (id) whereObj.id = id
//     if (name) whereObj.name = {
//         [Op.like]: `%${name}%`,
//     }

//     models.User.findAll({
//         where: whereObj,
//         attributes: { exclude: ['createdAt', 'updatedAt'] },
//     }).then(function (data) {
//         res.json(data)
//     });
// }

// exports.createUser = async (req, res, next) => {
//     let result
//     if (req.query.displayName && req.query.name) {
//         result = await models.User.create({
//             displayName: req.query.displayName,
//             name: req.query.name,
//         })
//         console.log(result.toJSON())
//     }
//     res.json({ status: result instanceof models.User, result })
// }

// exports.deleteUser = async (req, res, next) => {
//     let result
//     if (req.query.id) {
//         result = await models.User.destroy({
//             where: {
//                 id: req.query.id
//             }
//         });
//         console.log(result)
//     }
//     res.json({ status: result })
// }

// exports.updateUser = async (req, res, next) => {
//     let result
//     if (req.query.id && (req.query.displayName || req.query.name || req.query.roleId || req.query.email)) {
//         result = await models.User.update({
//             displayName: req.query.displayName,
//             name: req.query.name,
//             roleId: req.query.roleId,
//             email: req.query.email
//         }, {
//             where: {
//                 id: req.query.id
//             }
//         });
//         console.log(result)
//     }
//     res.json({ status: result })
// }

exports.getUsers = async (req) => {
    const { id, name } = req;
    const { limit, offset } = limitOffset.getLimitOffset(req)
    let whereObj = {}
    let result
    if (id) whereObj.id = id
    if (name) whereObj.name = {
        [Op.like]: `%${name}%`,
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
    const { displayName, name } = req
    let result
    if (displayName && name) {
        result = await models.User.create({
            displayName,
            name,
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
    const { id, displayName, name, roleId, email } = req
    let result
    if (id && (displayName || name || roleId || email)) {
        result = await models.User.update({
            displayName,
            name,
            roleId,
            email,
        }, {
            where: { id }
        });
    }
    return { status: result }
}