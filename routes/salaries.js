var express = require('express');
var router = express.Router();
var service = require('../service/salary.service');


router.get('/getSalarys', async (req, res, next) => {
    res.json(await service.getSalarys(req.query))
})
router.get('/createSalary', async (req, res, next) => {
    res.json(await service.createSalary(req.query))
})
router.get('/deleteSalary', async (req, res, next) => {
    res.json(await service.deleteSalary(req.query))
})
router.get('/updateSalary', async (req, res, next) => {
    res.json(await service.updateSalary(req.query))
})

module.exports = router;
