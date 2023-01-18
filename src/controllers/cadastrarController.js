const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const cadastrar = async (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    // const duplicate = usersDB.users.find(person => person.username === user);
    // if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
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

const cadastroFinalizado = (request, response) => {
    response.render("cadastroFinalizado");
  };

module.exports = { cadastrar, cadastroFinalizado };