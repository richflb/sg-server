const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const prisma = new PrismaClient();

exports.verifyToken = async (req, res) => {
    const accessToken = req.token;
    if (!accessToken) return res.status(400).json({ 'message': 'Username and password are required.' });
    
    const auth = await prisma.users.findUnique({
            where: {email: req.user},
            include: {
                Authentication: true,
                Profile: true
            }
        });

        let authToken = auth?.Authentication[0].refreshToken
        if(accessToken === authToken){
            const { id, userName, Profile } = auth;

            return res.status(200).json({
                uid: id,
                username: userName,
                authToken,
                ...Profile
            });
        }
    
        res.sendStatus(401);
}

//module.exports = { verifyToken };