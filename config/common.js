exports.notAuthRoutes = ['/login']

exports.allRoutes = [
    '/test', '/testtoken', '/log',
    '/auth/getAuths', '/auth/createAuth', '/auth/deleteAuth', '/auth/updateAuth',
    '/role/getRoles', '/role/createRole', '/role/deleteRole', '/role/updateRole',
    '/user/getUsers', '/user/createUser', '/user/deleteUser', '/user/updateUser'
]

exports.operateType = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    DELETE: {
        USER: "delete user"
    },
}

exports.defaultLimit = 20

exports.message = {
    NOTOKEN: 'no token',
    EXPIRATIONTOKEN: 'expiration token'
}