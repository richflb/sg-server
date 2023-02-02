const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
console.log("401 REQQQQQ >>>>>")
		return res.sendStatus(401);}
     // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.email;
		req.token = token;
console.log(">>>> verify middleware >>>>>> User", req.user)
            next();
        }
    );
}

module.exports = verifyJWT