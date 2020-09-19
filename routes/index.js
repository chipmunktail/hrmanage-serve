var express = require('express');
var router = express.Router();
var moment = require('moment');
var models = require('../db/models');
const commonConfig = require('../config/common')
// var service = require('../service/user.service');
var service = require('../service/login.service');
var tokenService = require('../utils/token.service')
var logService = require('../service/log.service')

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

router.get('/test', (req, res, next) => {
  const { id, name } = req.query;
  let whereObj = {}
  if (id) whereObj.id = {
    [Op.in]: [7, 8]
  }
  models.Role.findAll({
    where: whereObj,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  }).then(data => {
    res.json(data)
  });
  // res.send('success')
})
router.get('/testDateLimit', (req, res, next) => {
  const format = (time) => moment(time).format('YYYY-MM-DD HH:mm:ss')
  let whereObj = {}
  whereObj.logDate = {
    [Op.between]: [format('2020-08-19 08:27:00'), format('2020-08-19 08:29:00')]
  }
  models.Log.findAll({
    where: whereObj,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  }).then(data => {
    res.json(data)
  });
})

router.post('/login', async (req, res, next) => {
  res.json(await service.login(req.body))
})

router.get('/logout', async (req, res, next) => {
  res.json(await service.logout(req.query))
})


router.get('/testtoken', async (req, res, next) => {
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjEiLCJhdXRoIjoiW1NZU10iLCJleHAiOjE1OTc0ODMyNzUsImlhdCI6MTU5NzQ3OTY3NX0.wxT8lGLjQcYTRv-svNqk0ivq-Xw85fZkeGWJHL3tV3g'
  const token = req.headers.authorization.split('Bearer ')[1]
  await tokenService.checkToken(token)
    .then(ress => {
      if (Date.now() >= ress.exp) {
        res.json({ status: false, result: commonConfig.message.EXPIRATIONTOKEN })
      } else {
        res.json({ status: true, result: ress })
      }
      return ress;
    })
    .catch(err => {
      res.json({ status: false, result: err })
      return err
    })
})

router.get('/getLogs', async (req, res, next) => {
  res.json(await logService.getLogs(req.query))
})

router.get('/deleteLog', async (req, res, next) => {
  res.json(await logService.deleteLog(req.query))
})

module.exports = router;
