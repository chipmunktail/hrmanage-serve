var express = require('express');
var router = express.Router();
var service = require('../service/attendancecalendar.service');


// router.get('/getAttendanceCalendars', async (req, res, next) => {
//     res.json(await service.getAttendanceCalendars(req.query))
// })
// router.post('/createAttendanceCalendar', async (req, res, next) => {
//     res.json(await service.createAttendanceCalendar(req.body))
// })
// router.get('/deleteAttendanceCalendar', async (req, res, next) => {
//     res.json(await service.deleteAttendanceCalendar(req.query))
// })
// router.post('/updateAttendanceCalendar', async (req, res, next) => {
//     res.json(await service.updateAttendanceCalendar(req.body))
// })

router.post('/importAttendanceCalendar', async (req, res, next) => {
    res.json(await service.importAttendanceCalendar(req.body))
})
router.get('/getCalendarByRange', async (req, res, next) => {
    res.json(await service.getCalendarByRange(req.query))
})
router.get('/updateCalendar', async (req, res, next) => {
    res.json(await service.updateCalendar(req.query))
})
router.post('/checkWorkDay', async (req, res, next) => {
    res.json(await service.checkWorkDay(req.body))
})

module.exports = router;