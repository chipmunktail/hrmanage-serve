var express = require('express');
var router = express.Router();
var service = require('../service/job.service');


router.get('/getJobs', async (req, res, next) => {
    res.json(await service.getJobs(req.query))
})
router.get('/createJob', async (req, res, next) => {
    res.json(await service.createJob(req.query))
})
router.get('/deleteJob', async (req, res, next) => {
    res.json(await service.deleteJob(req.query))
})
router.get('/updateJob', async (req, res, next) => {
    res.json(await service.updateJob(req.query))
})

module.exports = router;
