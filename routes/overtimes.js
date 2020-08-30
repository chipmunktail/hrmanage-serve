var express = require('express');
var router = express.Router();
var service = require('../service/overtime.service');


router.get('/getOvertimes', async (req, res, next) => {
    res.json(await service.getOvertimes(req.query))
})
router.post('/createOvertime', async (req, res, next) => {
    res.json(await service.createOvertime(req.body))
})
router.get('/deleteOvertime', async (req, res, next) => {
    res.json(await service.deleteOvertime(req.query))
})
router.get('/updateOvertime', async (req, res, next) => {
    res.json(await service.updateOvertime(req.query))
})

module.exports = router;
