const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const cors = require('cors')
require('./models/db')
const UserData = require('./Routes/UserData')
const AuthRouter = require('./Routes/AuthRouter')
const ResetPasswords = require('./Routes/ResetPasswords')


const app = express()
const port = process.env.PORT || 3000;


app.use(cors())
app.use(bodyParser.json());

app.use('/api', UserData)
app.use('/auth', AuthRouter)
app.use('/reset', ResetPasswords)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})