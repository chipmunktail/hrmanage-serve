var express = require('express');
var router = express.Router();
var models = require('../db/models');
// var service = require('../service/user.service');
var service = require('../service/login.service');
var tokenService = require('../utils/token.service')

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
    console.log(data)
    res.json(data)
  });
  // res.send('success')
})

router.post('/login', async (req, res, next) => {
  res.json(await service.login(req.body))
})

router.get('/testtoken', async (req, res, next) => {
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjEiLCJhdXRoIjoiW1NZU10iLCJleHAiOjE1OTc0ODMyNzUsImlhdCI6MTU5NzQ3OTY3NX0.wxT8lGLjQcYTRv-svNqk0ivq-Xw85fZkeGWJHL3tV3g'
  const token = req.headers.authorization.split('Bearer ')[1]
  await tokenService.checkToken(token)
  .then(ress => {
    res.json({status: true, result: ress})
    return ress
  })
  .catch(err => {
    res.json({status: false, result: err})
    return err
  })
})

router.get('/log', async (req, res, next) => {
  models.Log.findAndCountAll({
    limit: 3,
    offset: 3,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  }).then(data => {
    res.json({status: false, result: data})
  });
})

module.exports = router;
