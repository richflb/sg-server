const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const accessToken = cookies.jwt;
    
    const { refreshToken } = await prisma.authentication.findUnique({
        where: {
            email: req.user
        }
    })

    // Is refreshToken in db?
    if (accessToken !== refreshToken) {
        console.log("foundUser>>>>", refreshToken)
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    const auth = await prisma.authentication.update({
        where: {email: req.user},
        data: {refreshToken: ''}
    });

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout }