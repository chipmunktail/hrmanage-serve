var models = require('../db/models');
const Sequelize = require('sequelize');
const service = require('../utils/token.service')
const roleService = require('../service/role.service')
const logService = require('../service/log.service')
const Op = Sequelize.Op;


// exports.login = async (req, res, next) => {
//     const { name, password } = req.body;
//     if (!name && !password) {
//         res.json({ status: false })
//     }
//     let whereObj = {
//         name,
//         password
//     }
//     models.User.findAll({
//         where: whereObj,
//         attributes: ['name', 'displayName', 'roleId'],
//     }).then(async (data) => {
//         if (data.length !== 1) {
//             res.json({ status: false })
//         } else {
//             const role = await roleService.getRoles({id: data[0].roleId})
//             const token = service.genToken({
//                 name: data[0].name,
//                 auth: role[0].authCode
//             })
//             res.json({ status: true, data, token })
//         }
//     });
// }

exports.login = async (req) => {
    const { name, password } = req;
    if (!name && !password) {
        return { status: false }
    }
    let whereObj = { name, password }
    return models.User.findOne({
        where: whereObj,
        attributes: ['name', 'displayName', 'roleId', 'id'],
    }).then(async (data) => {
        console.log(data.roleId);
        if (!data) {
            return { status: false }
        } else {
            // get role
            const role = await (await roleService.getRoles({ id: data.roleId })).result.rows;
            // gen token
            const token = service.genToken({
                userName: data.name,
                userId: data.id,
                roleName: role[0].name,
                auth: role[0].authCode
            })
            // log
            logService.log({
                userName: data.name,
                userId: data.id,
                roleName: role[0].name,
                operateType: 'DELETE.USER',
                params: JSON.stringify({ name, password: '******' })
            })
            // return
            return { status: true, data, token }
        }
    });
}