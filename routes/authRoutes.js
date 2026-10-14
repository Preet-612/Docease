const express = require('express');
const { registerPatient, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register',registerPatienttient)
router.post('login',loginin)


module.exports = router