const jwt = require('jsonwebtoken')

const ensureAuthorized = (req, res, next) => {
    // console.log(req.headers['authorization'])
    const authToken = req.headers['authorization']
    if (!authToken) {
        return res.status(400).json({ message: 'unauthorized to access data', success: false })
    }
    else {
        try {
            // console.log(authToken)
            const decoded = jwt.verify(authToken, process.env.SECRET_IS);
            req.users = decoded;
            next()
        }
        catch (error) {
            console.error("JWT verification failed:", error.message);
            return res.status(401).json({ message: 'Unauthorized: Invalid token', success: false });
        }
    }
}


module.exports = ensureAuthorized