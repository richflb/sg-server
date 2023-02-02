const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const prisma = new PrismaClient();

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
console.log(req.body)
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    
    const user = await prisma.users.findUnique({
        where: {
            email: email
        }
    });
    console.log(">>> User", user)
    if (!user) return res.sendStatus(401); 

    const match = await bcrypt.compare(password, user.password);
    
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "email": user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
            { "email": user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        
        const auth = await prisma.authentication.update({
            where: {email},
            data: {refreshToken}
        });
        console.log(">>> Auth no Login request: ", auth)

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };