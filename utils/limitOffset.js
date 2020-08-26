const commonConfig = require('../config/common')

// 分页和
exports.getLimitOffset = (req) => {
    let limit_ = commonConfig.defaultLimit
    let offset_ = 0
    const reqLimit = req.pageSize
    const reqOffset = req.pageIndex
    console.log(reqLimit, reqOffset);
    if (commonConfig.isNumber(reqLimit)) {
        limit_ = parseInt(reqLimit)
    }
    if (commonConfig.isNumber(reqLimit)) {
        offset_ = parseInt(reqOffset) * limit_
    }
    console.log(limit_, offset_);
    return {
        limit: limit_,
        offset: offset_
    }
}
