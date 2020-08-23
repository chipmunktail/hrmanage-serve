var express = require('express');
var router = express.Router();
var service = require('../service/leave.service');


router.get('/getLeaves', async (req, res, next) => {
    res.json(await service.getLeaves(req.query))
})
router.post('/createLeave', async (req, res, next) => {
    res.json(await service.createLeave(req.body))
})
router.get('/deleteLeave', async (req, res, next) => {
    res.json(await service.deleteLeave(req.query))
})
router.get('/updateLeave', async (req, res, next) => {
    res.json(await service.updateLeave(req.query))
})

module.exports = router;
