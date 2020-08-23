var express = require('express');
var router = express.Router();
var models = require('../db/models');
var service = require('../service/auth.service');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/getAuths', async (req, res, next) => {
    res.json(await service.getAuths(req.query))
})
router.post('/createAuth', async (req, res, next) => {
    res.json(await service.createAuth(req.body))
})
router.get('/deleteAuth', async (req, res, next) => {
    res.json(await service.deleteAuth(req.query))
})
router.post('/updateAuth', async (req, res, next) => {
    res.json(await service.updateAuth(req.body))
})

module.exports = router;