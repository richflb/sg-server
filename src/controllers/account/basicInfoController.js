const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.basicInfoCreate = async (request, response) => {
    const id = request.params.id;
    const {fullname, bi_email, phone, born_date, city, country} = request.body;
    const basicInfo = await prisma.users.update({
        data:{

        }
    })
}


exports.basicInfoGet = async (request, response) => {

    // const id = parseInt(request.params.id);
    // const basicInfo = await prisma.users.findUnique({
    //     where: {id: id},
    //     include:{
    //         Contacts: true,
            
    //     }
    // })
response.status(500).send('Not')

}

exports.basicInfoUpdate = (request, response) => {}

exports.basicInfoDelete = (request, response) => {}