const express = require('express');
const { registerPatient, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register',registerPatient)
router.post('/login',login)


module.exports = router