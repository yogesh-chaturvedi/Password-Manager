const express = require("express");
const router = express.Router();
const { signupValidation, loginValidation } = require('../Middlewares.js/AuthMiddleware')
const { SignUp, Login } = require('../controllers/AuthController')

router.post('/signUp', signupValidation, SignUp)
router.post('/login', loginValidation, Login)

module.exports = router;