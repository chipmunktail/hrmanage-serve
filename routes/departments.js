var express = require('express');
var router = express.Router();
var service = require('../service/department.service');


router.get('/getDepartments', async (req, res, next) => {
    res.json(await service.getDepartments(req.query))
})
router.get('/createDepartment', async (req, res, next) => {
    res.json(await service.createDepartment(req.query))
})
router.get('/deleteDepartment', async (req, res, next) => {
    res.json(await service.deleteDepartment(req.query))
})
router.get('/updateDepartment', async (req, res, next) => {
    res.json(await service.updateDepartment(req.query))
})

module.exports = router;
