const express = require('express')
const { getScheduleByDoctor, createSchedule, updateSchedule } = require('../controllers/scheduleController')

const router = express.Router()

router.get('/doctor/:doctorId',getScheduleByDoctor)
router.post('/',createSchedule)
router.patch('/:id',updateSchedule)

module.exports = router