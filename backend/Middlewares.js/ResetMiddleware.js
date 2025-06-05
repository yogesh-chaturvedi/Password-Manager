const Joi = require('joi');
const UserModel = require('../models/User')

const ResetValidation = async (req, res, next) => {
    const { email, newPassword, confirmPassword } = req.body
    const users = await UserModel.findOne({ email })
    if (!users) {
        return res.status(400).json({ message: `User with this (${email}) email not found, You need to signUp first`, success: false })
    }
    else {
        if (newPassword === confirmPassword) {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                newPassword: Joi.string().min(4).max(100).required(),
                confirmPassword: Joi.string().min(4).max(100).required(),
            })
            const { error } = schema.validate(req.body)
            if (error) {
                return res.status(400).json({ message: 'bad request', error })
            }
            next()
        }
        else {
            return res.status(400).json({ message: 'Passwords do not match', success: false })
        }
    }
}


module.exports = ResetValidation