const commonConfig = require('../config/common')

// 分页和
exports.getLimitOffset = (req) => {
    let limit_ = commonConfig.defaultLimit
    let offset_ = 0
    const reqLimit = req.pageSize
    const reqOffset = req.pageIndex
    console.log(reqLimit, reqOffset);
    if (typeof parseInt(reqLimit) === 'number' && reqLimit !== NaN && reqLimit !== Infinity && reqLimit !== undefined) {
        limit_ = parseInt(reqLimit)
    }
    if (typeof parseInt(reqOffset) === 'number' && reqOffset !== NaN && reqOffset !== Infinity && reqOffset !== undefined) {
        offset_ = parseInt(reqOffset) * limit_
    }
    console.log(limit_, offset_);
    return {
        limit: limit_,
        offset: offset_
    }
}