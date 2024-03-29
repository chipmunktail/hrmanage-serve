var express = require('express');
var router = express.Router();
var service = require('../service/user.service');


router.get('/getUsers', async (req, res, next) => {
  res.json(await service.getUsers(req.query))
})
router.post('/createUser', async (req, res, next) => {
  res.json(await service.createUser(req.body))
})
router.get('/deleteUser', async (req, res, next) => {
  res.json(await service.deleteUser(req.query))
})
router.post('/updateUser', async (req, res, next) => {
  res.json(await service.updateUser(req.body))
})
router.get('/getUser', async (req, res, next) => {
  res.json(await service.getUser(req))
})

module.exports = router;
