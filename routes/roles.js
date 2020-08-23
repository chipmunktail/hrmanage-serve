var express = require('express');
var router = express.Router();
var models = require('../db/models');
var service = require('../service/role.service');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/getRoles', async (req, res, next) => {
    res.json(await service.getRoles(req.query))
})
router.post('/createRole', async (req, res, next) => {
    res.json(await service.createRole(req.body))
})
router.get('/deleteRole', async (req, res, next) => {
    res.json(await service.deleteRole(req.query))
})
router.post('/updateRole', async (req, res, next) => {
    res.json(await service.updateRole(req.body))
})

module.exports = router;