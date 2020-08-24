var models = require('../db/models');
const Sequelize = require('sequelize');
const service = require('../utils/token.service')
const roleService = require('../service/role.service')
const logService = require('../service/log.service')
const config = require('../config/common')
const tokenService = require('../utils/token.service')
const Op = Sequelize.Op;



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
        if (!data) {
            return { status: false, message: config.message.WRONGUSERORPSD }
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
                operateType: config.operateType.LOGIN,
                params: JSON.stringify({ name, password: '******' })
            })
            // return
            return { status: true, data, token }
        }
    });
}

exports.logout = async (req) => {
    const token = req.headers.authorization
    const body = await tokenService.checkToken(token.split('Bearer ')[1])
    // log
    logService.log({
        userName: body.userName,
        userId: body.userId,
        roleName: body.roleName,
        operateType: config.operateType.LOGOUT,
        params: null,
    })
    // return
    return { status: true }
}