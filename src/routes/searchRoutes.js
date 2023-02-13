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

const saveUser = (userData) => {
    fs.writeFileSync(filePath, JSON.stringify(userData, null, "\t"))
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


const searchTours = (app) => {
    app.route("/search/tours/:keywords?")
    .get(async (request, response) => {
        const keywords = request.params.keywords;
        if(!keywords){
            return response.status(404).json(
                {
                    status: "Not Found", 
                    message: "You must pass an name!"
                });
        }

        // const result = await prisma.posts.findMany({
        //     where: {
        //         legend: {
        //             legend: {
        //                 OR: [
        //                     {
        //                         startsWith: request.keywords
        //                     }
        //                 ]
        //             }
        //         }
        //     }
        // })

        response.status(200).json({Request: request.params})
        
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