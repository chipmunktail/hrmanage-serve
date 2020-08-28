var express = require('express');
var router = express.Router();
var service = require('../service/salary.service');


router.get('/getSalarys', async (req, res, next) => {
    res.json(await service.getSalarys(req.query))
})
router.post('/createSalary', async (req, res, next) => {
    res.json(await service.createSalary(req.body))
})
router.get('/deleteSalary', async (req, res, next) => {
    res.json(await service.deleteSalary(req.query))
})
router.post('/updateSalary', async (req, res, next) => {
    res.json(await service.updateSalary(req.body))
})

module.exports = router;
