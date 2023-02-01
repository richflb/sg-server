const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// const fs = require("fs")
// const { join } = require("path")


// const filePath = join(__dirname, "../", "usersDB.json")

// const getUsers = () => {
//     const data = fs.existsSync(filePath) 
//         ? fs.readFileSync(filePath) 
//         :[];
    
//     try{
//         return JSON.parse(data)
//     } catch (err){
//         return []
//     }
// }

// const saveUser = (userData) => {
//     fs.writeFileSync(filePath, JSON.stringify(userData, null, "\t"))
// }


/* Express route*/
const usersRoutes = (app) => {
    app.route("/user/:uid?/contacts")
    .get(async (request, response) => {
        const uid = request.params.uid;
        if(!uid){
            return response.status(400).json({status: "error", message: "User id is required"});
        }

        const contacts = await prisma.users.findUnique({
            where: {id: uid},
            include: {
                Contacts: true,
                Profile: true
            }
        });

        response.status(200).json(contacts)
        
    })
    .post(async (request, response) => {
        /* Please! In Frontend, Set the name input attribute as the same 
        field names in DB Contacts table, FOR NOW.
        */
        const uid = request.params.uid;
        const { ...contactsSended } = request.body;
        console.log("Contacts sended in Body", contactsSended);

        if(!uid){
            return response.status(400).json({status: "error", message: "User id is required"});
        }

        const profile = await prisma.users.findUnique({
           where: {id: uid},
           include: {Profile: true}
        });

        console.log(profile)
        
        const contacts = await prisma.contacts.create({
            data: {
                userID: uid,
                profileID: profile.Profile.id,
                addressID: 123,
                ...contactsSended
            }
        });

        response.status(200).json(contacts)
        
    })
    .put(async (request, response) => {
        /* Please! In Frontend, Set the name input attribute as the same 
        field names in DB Contacts table, FOR NOW.
        */
        const uid = request.params.uid;
        const { ...contactsSended } = request.body;
        console.log("Contacts sended in Body", contactsSended);

        if(!uid){
            return response.status(400).json({status: "error", message: "User id is required"});
        }

        const profile = await prisma.users.findUnique({
           where: {id: uid},
           include: {Profile: true}
        });

        console.log(profile)
        
        const contacts = await prisma.contacts.update({
            where: {userID: uid},
            data: {
                ...contactsSended
            }
        });

        response.status(200).json(contacts)
    })
    .delete(async (request, response) => {
        /* Please! In Frontend, Set the name input attribute as the same 
        field names in DB Contacts table, FOR NOW.
        */
        const uid = request.params.uid;
        const { ...contactsSended } = request.body;
        console.log("Contacts sended in Body", contactsSended);

        if(!uid){
            return response.status(400).json({status: "error", message: "User id is required"});
        }

        const profile = await prisma.users.findUnique({
           where: {id: uid},
           include: {Profile: true}
        });

        console.log(profile)
        
        const contacts = await prisma.contacts.delete({where: {userID: uid}});

        response.status(200).json(contacts)
        
    })
}


module.exports = usersRoutes;