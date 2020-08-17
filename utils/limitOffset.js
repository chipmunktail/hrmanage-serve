// 分页和
exports.getLimitOffset = (req) => {
    let limit_ = 20
    let offset_ = 0
    const reqLimit = req.limit
    const reqOffset = req.offset
    // todo not infinity not NaN
    if (typeof parseInt(reqLimit) === 'number') {
        limit_ = parseInt(reqLimit)
    }
    if (typeof parseInt(reqOffset) === 'number') {
        offset_ = parseInt(reqOffset)
    }
    return {
        limit: limit_,
        offset: offset_
    }
}