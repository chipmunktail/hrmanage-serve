var express = require('express');
var router = express.Router();
var service = require('../service/leave.service');


router.get('/getLeaves', async (req, res, next) => {
    res.json(await service.getLeaves(req))
})
router.post('/createLeave', async (req, res, next) => {
    res.json(await service.createLeave(req.body))
})
router.get('/deleteLeave', async (req, res, next) => {
    res.json(await service.deleteLeave(req.query))
})
router.post('/updateLeave', async (req, res, next) => {
    res.json(await service.updateLeave(req.body))
})

module.exports = router;
