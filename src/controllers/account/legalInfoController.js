const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.legalInfoCreate = async (request, response) => {
  const id = request.params.id;
  const {cpf, crg, address,} = request.body
  const legalInfo =  await prisma.legal_Info.create({
    data: {
        fullName: '',
        birthDate: '',
        CPF: '',
        CRG: '',
        userID: id
    }
  })

  response.send(legalInfo)
}

exports.legalInfoGet = (request, response) => {}

exports.legalInfoUpdate = (request, response) => {}

exports.legalInfoDelete = (request, response) => {}