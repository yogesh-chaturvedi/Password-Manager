const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected Successfully");
    }).catch((err) => {
        console.log("there is an error", err);
    })