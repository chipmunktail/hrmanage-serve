var models = require('../db/models');
const Sequelize = require('sequelize');
const limitOffset = require('../utils/limitOffset')
const Op = Sequelize.Op;

// exports.getAuths = async (req, res, next) => {
//     const { id, code, parentCode } = req.query;
//     let whereObj = {}
//     if (id) whereObj.id = id
//     if (code) whereObj.code = {
//         [Op.like]: `%${code}%`,
//     }    
//     if (parentCode) whereObj.parentCode = {
//         [Op.like]: `%${parentCode}%`,
//     }

//     models.Auth.findAll({
//         where: whereObj,
//         attributes: { exclude: ['createdAt', 'updatedAt'] },
//     }).then(function (data) {
//         res.json(data)
//     });
// }

// exports.createAuth = async (req, res, next) => {
//     let result
//     if (req.query.code) {
//         result = await models.Auth.create({
//             code: req.query.code,
//         })
//         console.log(result.toJSON())
//     }
//     res.json({ status: result instanceof models.Auth, result })
// }

// exports.deleteAuth = async (req, res, next) => {
//     let result
//     if (req.query.id) {
//         result = await models.Auth.destroy({
//             where: {
//                 id: req.query.id
//             }
//         });
//         console.log(result)
//     }
//     res.json({ status: result })
// }

// exports.updateAuth = async (req, res, next) => {
//     let result
//     if (req.query.id && (req.query.code || req.query.parentCode)) {
//         result = await models.Auth.update({
//             code: req.query.code,
//             name: req.query.parentCode,
//         }, {
//             where: {
//                 id: req.query.id
//             }
//         });
//         console.log(result)
//     }
//     res.json({ status: result })
// }


exports.getAuths = async (req) => {
    const { id, code, parentCode } = req;
    const { limit, offset } = limitOffset.getLimitOffset(req)
    let whereObj = {}
    let result
    if (id) whereObj.id = id
    if (code) whereObj.code = {
        [Op.like]: `%${code}%`,
    }
    if (parentCode) whereObj.parentCode = {
        [Op.like]: `%${parentCode}%`,
    }

    result = await models.Auth.findAndCountAll({
        limit, 
        offset,
        where: whereObj,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    return { status: true, result }
}

exports.createAuth = async (req) => {
    const { code } = req
    let result
    if (code) {
        result = await models.Auth.create({
            code,
        })
    }
    return { status: result instanceof models.Auth, result }
}

exports.deleteAuth = async (req) => {
    const { id } = req
    let result
    if (id) {
        result = await models.Auth.destroy({
            where: { id }
        });
    }
    return { status: result }
}

exports.updateAuth = async (req) => {
    const { id, code, parentCode } = req
    let result
    if (id && (code || parentCode)) {
        result = await models.Auth.update({
            code,
            parentCode,
        }, {
            where: { id }
        });
    }
    return { status: result }
}