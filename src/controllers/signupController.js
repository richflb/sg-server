const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { saveGuides } = require('../utils/publicStore');

const prisma = new PrismaClient();
const DEFAULT_PROFILE_PIC = "/pics/default/profile_pic_default.gif";
const DEFAULT_CAPA_PIC = "/pics/default/capa_pic_default.png";

const signUp = async (req, res) => {
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
                },
                Profile: {
                    create: {
                        firstName: username,
                        lastName: "TourGuide",
                        profilePicFolder: DEFAULT_PROFILE_PIC,
                        capaPicFolder: DEFAULT_CAPA_PIC
                    }
                }
            }
        });


        const profile = await prisma.profile.findUnique({
            where: {
                userID: newUser.id
            }
        });

        
        const { id, firstName, lastName, userID, profilePicFolder, capaPicFolder} = profile
        dataProfile = {
            uid: userID,
            pid: id,
            fullname: `${firstName} ${lastName}`,
            firstName,
            lastName,
            profilePicFolder,
            capaPicFolder
        }
        console.log(newUser, "And Profile:", dataProfile);
        await saveGuides(dataProfile)
        res.status(201).json({ 'success': `New user ${username} created!` });
        
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { signUp };