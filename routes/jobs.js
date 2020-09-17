var express = require('express');
var router = express.Router();
var service = require('../service/job.service');


router.get('/getJobs', async (req, res, next) => {
    res.json(await service.getJobs(req.query))
})
router.post('/createJob', async (req, res, next) => {
    res.json(await service.createJob(req.body))
})
router.get('/deleteJob', async (req, res, next) => {
    res.json(await service.deleteJob(req.query))
})
router.post('/updateJob', async (req, res, next) => {
    res.json(await service.updateJob(req.body))
})

module.exports = router;
