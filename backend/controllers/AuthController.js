// const bodyParser = require('body-parser')
const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const SignUp = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email })
    if (user) {
        return res.status(403).json({ message: "already signUp", success: false })
    }
    else {
        try {
            const user = new UserModel({ name, email, password })
            user.password = await bcrypt.hash(password, 10)
            await user.save();
            res.json({ message: "Account has been created successfull", success: true })
        }
        catch (error) {
            console.log("there is an error", error)
        }
    }
}



const Login = async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
        res.status(400).json({ message: "you need to signUp first", success: false })
    }
    else {
        try {
            let isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                const token = jwt.sign({ email: user.email, _id: user._id }, process.env.SECRET_IS, { expiresIn: '24h' });
                return res.status(200).json({ message: "Login Successful", success: true, email: user.email, name: user.name, _id: user._id, token })
            }
            else {
                return res.status(400).json({ message: "Incorrect Password", success: false })
            }
        }
        catch (error) {
            console.log("there is an error", error)
        }
    }
}


module.exports = { SignUp, Login }
