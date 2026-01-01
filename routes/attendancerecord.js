var express = require('express');
var router = express.Router();
var service = require('../service/attendancerecord.service');


router.get('/getAttendanceRecords', async (req, res, next) => {
    res.json(await service.getAttendanceRecords(req.query))
})
router.post('/createAttendanceRecord', async (req, res, next) => {
    res.json(await service.createAttendanceRecord(req.body))
})
router.get('/deleteAttendanceRecord', async (req, res, next) => {
    res.json(await service.deleteAttendanceRecord(req.query))
})
router.post('/updateAttendanceRecord', async (req, res, next) => {
    res.json(await service.updateAttendanceRecord(req.body))
})

module.exports = router;