const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const signUp = async (req, res) => {
console.log(req)
    const { username, email, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.users.create({
            data: {
                userName: username,
                email: email,
                password: hashedpassword,
                Authentication: {
                    create : {
                        password: hashedpassword,
                        email: email
                    }
                }
            }
        });
        console.log(newUser);
        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { signUp };