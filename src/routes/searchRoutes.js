const { PrismaClient } = require("@prisma/client");
const fs = require("fs")
const { join } = require("path")

const getSearch = (tipo) => {
    const filePath = join(__dirname, "../../data/search", `search${tipo}DB.json`)
    const data = fs.existsSync(filePath) 
        ? fs.readFileSync(filePath) 
        :[];
    
    try{
        return JSON.parse(data)
    } catch (err){
        return []
    }
}

/* Express route*/
const searchGuides = (app) => {
    app.route("/search/:q?")
    .get((request, response) => {
        if(!request.params.q){
            return response.status(404).json(
                {
                    status: "Not Found", 
                    message: "You must pass an name!"
                });
        }

        const {guides, tours} = request.query
	    if(!guides & !tours){
            return response.status(404).json(
                {
                    status: "Not Found", 
                    message: "You must pass any search parameters!"
                });
        }
        let gKey = guides.split(" ")
        const datas = getSearch("Guides")

        const result = datas.filter(data => {
            let r;
            const dataSpliter = data.fullname.split(" ")
            for(let i = 0 ; i < gKey.length; i++){
                r = dataSpliter.find((item) => item.toLowerCase() === gKey[i].toLowerCase())
                if(r){
                    return data
                }
            }
        });

        response.status(200).json(result)
        
    })
}

const prisma = new PrismaClient();

const searchTours = (app) => {
    app.route("/tours")
    .get(async (request, response) => {
        console.log("Search Tours >>> searchRoutes.js")
        const posts = await prisma.profile.findMany({
            include: {
                Posts: {
                    include: {Points: true, LocalTour: true}
                } //true,
                
            }
        })
        response.status(200).json({message: "success", data: posts})
        
    })
}

const getAllGuides = (app) => {
    app.route("/get-all-guides")
    .get(async (request, response) => {
        const data = getSearch("Guides")
        if(data.length == 0) return response.status(404).json({"error": "not found"})
        response.status(200).json(data) // 'data' is an objets's array 
    })
}
module.exports = {
    searchGuides,
    searchTours,
    getAllGuides
};