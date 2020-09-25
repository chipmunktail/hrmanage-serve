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

/**
 * 默认配置
 */
exports.defaultLimit = 20 // default page size
exports.expiredTime = 60 * 60 * 1000
exports.secret = 'secret'
exports.timeFormat = 'YYYY-MM-DD HH:mm:ss' // 格式换时间
exports.rankLevel = ['A', 'B', 'C', 'D'] // performance等级
exports.auditStatus = [1, 2, 3, 4, 5] // 审核状态 1审核中 2审核通过 3拒绝 4结束 5取消申请

/**
 * 返回信息
 */
exports.message = {
    WRONGUSERORPSD: 'wrong user or password ', // 错误账号或密码
    DBERROR: 'db error', // 数据库报错
    NOTOKEN: 'no token', // 无授权
    EXPIRATIONTOKEN: 'expiration token', // 授权过期
    NOFREEHOUR: 'no freehour', // 可调休时长不足
    EXCEEDSFREEHOUR: 'exceeds freehour', // 超过可调休时长
    NOLEAVESUMHOUR: 'no leave sumhour', // 没有请假时间?
    NOLEAVESTART: 'no leave start', // 缺少请假开始时间
    NOLEAVEEND: 'no leave end', // 缺少请假结束时间
    OVERLEAVELENGTH: 'over leave length', // 超过请假时长
    NOOVERTIMESUMHOUR: 'no overtime sumhour', // 没有加班时间?
    NOOVERTIMESTART: 'no overtime start', // 缺少加班开始时间
    NOOVERTIMEEND: 'no overtime end', // 缺少加班结束时间
    OVEROVERTIMELENGTH: 'over overtime length', // 超过加班时长
    EXISTUSER: 'exist user', // 已存在员工
    EXISTSALARY: 'exist salary', // 已存在薪资
    CURRENTEXISTPERFORMANCE: 'current exist performance', // 当月员工已有绩效评分
}

exports.isNumber = (num) => {
    return !isNaN(num)
        && num !== Infinity
        && num !== undefined
        && typeof parseInt(num) === 'number'
}