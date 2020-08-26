var express = require('express');
var router = express.Router();
var service = require('../service/department.service');


router.get('/getDepartments', async (req, res, next) => {
    res.json(await service.getDepartments(req.query))
})
router.post('/createDepartment', async (req, res, next) => {
    res.json(await service.createDepartment(req.body))
})
router.get('/deleteDepartment', async (req, res, next) => {
    res.json(await service.deleteDepartment(req.query))
})
router.post('/updateDepartment', async (req, res, next) => {
    res.json(await service.updateDepartment(req.body))
})

module.exports = router;
