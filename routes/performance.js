var express = require('express');
var router = express.Router();
var service = require('../service/performance.service');


router.post('/getPerformances', async (req, res, next) => {
    res.json(await service.getPerformances(req.body))
})
router.post('/createPerformance', async (req, res, next) => {
    res.json(await service.createPerformance(req.body))
})
router.get('/deletePerformance', async (req, res, next) => {
    res.json(await service.deletePerformance(req.query))
})
router.post('/updatePerformance', async (req, res, next) => {
    res.json(await service.updatePerformance(req.body))
})

module.exports = router;
