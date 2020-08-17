var express = require('express');
var router = express.Router();
var models = require('../db/models');
var service = require('../service/role.service');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/getRoles', async (req, res, next) => {
    res.json(await service.getRoles(req.query))
})
router.get('/createRole', async (req, res, next) => {
    res.json(await service.createRole(req.query))
})
router.get('/deleteRole', async (req, res, next) => {
    res.json(await service.deleteRole(req.query))
})
router.get('/updateRole', async (req, res, next) => {
    res.json(await service.updateRole(req.query))
})

module.exports = router;