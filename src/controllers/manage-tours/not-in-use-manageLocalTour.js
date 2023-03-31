const { PrismaClient } = require("@prisma/client")


const prisma = new PrismaClient()

exports.getLocalTours = async (req, res) => {
    const localRes = await prisma.localTours.findMany({
        include: {
            Posts: true,
            Points: true
        }
    });

    res.status(200).json({localRes})
}

exports.addLocalTour = async (req, res) => {
    /* the follow fields is Needed for now
        country String @db.VarChar(120)
        state   String @db.VarChar(120)
        city    String @db.VarChar(100)
    */
    const newLocal = await prisma.localTours.create({
        data: {...req.body}
    })
    res.status(201).json({newLocal})
}

exports.addPoint = async (req, res) => {
    const id = req.params.id
    if(!id) return res.status(404).json({message: "Unable to find user!"});

    const posts = await prisma.profile.findUnique({
        where: {id},
        include: {
            posts: true
        }
    })
    res.status(200).json({message: "success", data: posts})
}