const express = require("express");
const route = express.Router();


const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function publicContacts(app){
    app.route("/public-contacts/:uid?")
    .get(async (request, response) => {
        const uid = request.params.uid;
        if(!uid){
            return response.status(400).json({status: "error", message: "User id is required"});
        }

        const {Contacts, Profile} = await prisma.users.findUnique({
            where: {id: uid},
            include: {
                Contacts: true,
                Profile: true
            }
        });

        response.status(200).json({Contacts, Profile})
        
    })
}

module.exports = publicContacts;