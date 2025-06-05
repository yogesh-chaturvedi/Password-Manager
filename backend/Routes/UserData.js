const express = require("express");
const router = express.Router();
const crypto = require('crypto')
const { Password } = require('../models/Passwords');
const ensureAuthorized = require("../Middlewares.js/ensureAuthorized");


const algorithm = "aes-256-cbc"
const secretKey = crypto.createHash("sha256")
    .update(String(process.env.SECRET_KEY || "default_key"))
    .digest("base64")
    .substring(0, 32);

function encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted = encrypted + cipher.final("hex")
    return iv.toString("hex") + ":" + encrypted;
}


function decrypt(encryptedText) {
    const [ivHex, encrypted] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
}


// to fetch data
router.get('/password', ensureAuthorized, async (req, res) => {
    let data = await Password.find({ userId: req.users._id })
    data = data.map((items) => {
        return {
            ...items._doc,
            password: decrypt(items.password)
        }
    })
    res.json(data)
})


// to create data
router.post('/password', ensureAuthorized, async (req, res) => {
    const encrypted = encrypt(req.body.password)
    let password = new Password({ ...req.body, password: encrypted, userId: req.users._id });
    await password.save();
    const decryptedPassword = decrypt(encrypted);
    res.json({
        ...password._doc,
        password: decryptedPassword
    });
})

// to delete data
router.delete('/password/:id', ensureAuthorized, async (req, res) => {
    await Password.findByIdAndDelete(req.params.id)
    res.json({ message: "deleted" })
})

module.exports = router;