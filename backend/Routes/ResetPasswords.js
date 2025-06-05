const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/User')
const ResetValidation = require('../Middlewares.js/ResetMiddleware');

router.post('/', ResetValidation, async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await UserModel.findOneAndUpdate({ email }, { password: hashedPassword })
    res.status(200).json({ message: "Password Reset Successfully", success: true })
})

module.exports = router;