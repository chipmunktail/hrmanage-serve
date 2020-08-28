exports.notAuthRoutes = ['/login', '/logout', '/testtoken']

exports.allRoutes = [
    '/test', '/log',
    '/auth/getAuths', '/auth/createAuth', '/auth/deleteAuth', '/auth/updateAuth',
    '/role/getRoles', '/role/createRole', '/role/deleteRole', '/role/updateRole',
    '/user/getUsers', '/user/createUser', '/user/deleteUser', '/user/updateUser'
]

exports.operateType = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    DELETE: {
        USER: "DELETE USER"
    },
}

exports.defaultLimit = 20 // default page size
exports.expiredTime = 60 * 60 * 1000
exports.secret = 'secret'


exports.message = {
    WRONGUSERORPSD: 'wrong user or password ',
    DBERROR: 'db error',
    NOTOKEN: 'no token',
    EXPIRATIONTOKEN: 'expiration token',
    NOFREEHOUR: 'no freehour',
    EXCEEDSFREEHOUR: 'exceeds freehour'
}

exports.isNumber = (num) => {
    return 
        isNaN(num)
        && num !== Infinity
        && num !== undefined
        && typeof parseInt(num) === 'number'
}