var models = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// exports.getRoles = async (req, res, next) => {
//     const { id, name } = req.query;
//     let whereObj = {}
//     if (id) whereObj.id = id
//     if (name) whereObj.name = {
//         [Op.like]: `%${name}%`,
//     }

//     models.Role.findAll({
//         where: whereObj,
//         attributes: { exclude: ['createdAt', 'updatedAt'] },
//     }).then(function (data) {
//         res.json(data)
//     });
// }

// exports.createRole = async (req, res, next) => {
//     let result
//     if (req.query.authCode && req.query.name) {
//         result = await models.Role.create({
//             authCode: req.query.authCode,
//             name: req.query.name,
//         })
//         console.log(result.toJSON())
//     }
//     res.json({ status: result instanceof models.Role, result })
// }

// exports.deleteRole = async (req, res, next) => {
//     let result
//     if (req.query.id) {
//         result = await models.Role.destroy({
//             where: {
//                 id: req.query.id
//             }
//         });
//         console.log(result)
//     }
//     res.json({ status: result })
// }

// exports.updateRole = async (req, res, next) => {
//     let result
//     if (req.query.id && (req.query.authCode || req.query.name)) {
//         result = await models.Role.update({
//             authCode: req.query.authCode,
//             name: req.query.name,
//         }, {
//             where: {
//                 id: req.query.id
//             }
//         });
//         console.log(result)
//     }
//     res.json({ status: result })
// }


exports.getRoles = async (req) => {
    const { id, name } = req;
    let whereObj = {}
    let result
    if (id) whereObj.id = id
    if (name) whereObj.name = {
        [Op.like]: `%${name}%`,
    }

    result = await models.Role.findAndCountAll({
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