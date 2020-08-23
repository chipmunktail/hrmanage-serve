const jwt = require('jsonwebtoken')
const commonConfig = require('../config/common')
const secret = 'secret'


exports.genToken = (signObj) => {
    return jwt.sign(
        {
            userName: signObj.userName,
            roleName: signObj.roleName,
            userId: signObj.userId,
            auth: signObj.auth,
            exp: Math.floor(Date.now()) + (60 * 60 * 1000),
            iat: Math.floor(Date.now())
        },
        secret
    )
}
exports.checkToken = (token) => {
    return new Promise((resolve, reject) => {
        return jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                reject(JSON.stringify(err));
            }
            resolve(decoded);
        })
    })
}

// 中间件
exports.isExpiration = async (req, res, next) => {
    // exp (expiration time)：过期时间
    // iat (Issued At)：签发时间
    // 保护路由
    isNotAuthRoute = commonConfig.notAuthRoutes.indexOf(req.path) > -1
    const token = req.headers.authorization
    console.log(isNotAuthRoute, req.path);

    // 验证token
    if (token && !isNotAuthRoute) {
        const body = await this.checkToken(token.split('Bearer ')[1])
        if (Date.now() < body.exp) {
            next();
        } else {
            res.json({ status: false, result: commonConfig.message.EXPIRATIONTOKEN })
        }
    } else if (!token && !isNotAuthRoute) {
        // 无token
        res.json({ status: false, result: commonConfig.message.NOTOKEN })
    } else if (isNotAuthRoute) {
        // 无需验证token
        next();
    }
}