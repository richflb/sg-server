const { PrismaClient } = require("@prisma/client")


const prisma = new PrismaClient()

exports.getAllTours = async (req, res) => {
    const posts = await prisma.profile.findMany({
        include: {
            Posts: {
                include: {Points: true, LocalTour: true}
            } //true,
            
        }
    })
    res.status(200).json({message: "success", data: posts})
}

exports.getToursByProfileID = async (req, res) => {
    // pra ser usado na página de perfil 
    const id = req.params.id
    if(!id) return res.status(404).json({message: "Unable to find user!"});

    const posts = await prisma.profile.findUnique({
        where: {id: parseInt(id)},
        include: {
            Posts: {
                include: {Points: true, LocalTour: true}
            } //true,
            
        }
    })
    res.status(200).json({message: "success", data: posts})
}

exports.createTour = async (req, res) => {
    if(!req.body.id) return res.status(401).json({message: "Unable to post without profile id!"});
    if(!req.body.title) return res.status(401).json({message: "You must provide a title to your post."});

    const data = {
        title: req.body.title,
        profileID: req.body.id,
        lengend: req.body?.lengend,
        imageURL: req.body?.imageURL
    }

    console.log(data)
    const newTour = await prisma.localTours.create({
        data: {
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            Posts: {
                create: {
                    title: req.body.title,
                    profileID: parseInt(req.body.id),
                    legend: req.body?.legend,
                    imageURL: req.body?.linkToImg
                },
                //connect: [{id: parseInt(req.params.id)}]
            }
        },
        include: {
            Posts: true
        }
    });

    const newPoint = await prisma.points.create({
        data: {
            address: '',
            referralPoint: req.body.reference,
            localId: newTour.id,
            postId: newTour.Posts.id
        }
    })

    res.status(200).json({message: "Service not Implemented", data: {newTour, newPoint}, })
}

exports.updateTour = async (req, res) => {
    res.status(200).json({message: "Service not Implemented"})
}

exports.deleteTour = (req, res) => {
    res.status(200).json({message: "Service not Implemented"})
}