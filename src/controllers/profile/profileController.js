const { PrismaClient } = require('@prisma/client');
const { saveGuides } = require('../../utils/publicStore');

const prisma = new PrismaClient();

const profileCreate = async (request, response) => {
    const id = request.params.id;
    const {firstName, lastName, ...rest} = request.body;
    const newProfile = await prisma.profile.create({
        data: {
            userID: id,
            firstName,
            lastName,
            ...rest
        }
    });
    saveGuides(newProfile)
    response.status(201).send(newProfile);
}

const profileGet = async (request, response) => {
    const id = request.params.id;
    const profile = await prisma.profile.findUnique({
        where: { userID: id }
    });
    response.status(200).json({...profile});
}

const profileUpdate = async (request, response) => {
    const id = request.params.id;
    const { ...allData } = request.body;
    const profile = await prisma.profile.update({
        where: { userID: id },
        data: {...allData}
    });
    await saveGuides(profile)
    response.status(200).send(profile);
}

const profileDelete = async (request, response) => {
    const id = request.params.id;
    const deleteProfile = await prisma.profile.delete({
        where: {userID: id}
    })
    response.status(200).send(deleteProfile);
}

module.exports = {
    profileCreate,
    profileGet,
    profileUpdate,
    profileDelete
}