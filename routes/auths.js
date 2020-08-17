var express = require('express');
var router = express.Router();
var models = require('../db/models');
var service = require('../service/auth.service');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/getAuths', async (req, res, next) => {
    res.json(await service.getAuths(req.query))
})
router.get('/createAuth', async (req, res, next) => {
    res.json(await service.createAuth(req.query))
})
router.get('/deleteAuth', async (req, res, next) => {
    res.json(await service.deleteAuth(req.query))
})
router.get('/updateAuth', async (req, res, next) => {
    res.json(await service.updateAuth(req.query))
})

module.exports = router;