var express = require('express');
var router = express.Router();
// var models = require('../db/models');
var service = require('../service/cardreissue.service');

// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

router.get('/getCardReissues', async (req, res, next) => {
    res.json(await service.getCardReissues(req.query))
})
router.post('/createCardReissue', async (req, res, next) => {
    res.json(await service.createCardReissue(req.body))
})
router.get('/deleteCardReissue', async (req, res, next) => {
    res.json(await service.deleteCardReissue(req.query))
})
router.post('/updateCardReissue', async (req, res, next) => {
    res.json(await service.updateCardReissue(req.body))
})

module.exports = router;