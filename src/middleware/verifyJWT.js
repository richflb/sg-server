const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    console.log(req)
    const authHeader = req.headers['authorization'];
    console.log(">>>> authHeader", authHeader, "\n>>>>>> User", req.user)
    if (!authHeader) return res.sendStatus(401);
     // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            console.log(err)
            console.log(">>>>>> decoded:", decoded)
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.email;
            next();
        }
    );
}

module.exports = verifyJWT