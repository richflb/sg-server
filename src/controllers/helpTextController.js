const fs = require("fs")
const { join } = require("path")


const filePath = join(__dirname, "../../data", "helpTextDB.json")

const getHelpText = () => {
    const data = fs.existsSync(filePath) 
        ? fs.readFileSync(filePath) 
        :[];
    
    try{
console.log("IN getHelpText:", JSON.stringify({data}))
        return JSON.parse(data)
    } catch (err){
        return []
    }
}

// To write in Data Base (json file simulate).
const saveHelpText = (userData) => {
    fs.writeFileSync(filePath, JSON.stringify(userData, null, "\t"))
}


/* Express route*/

const helpTextRoutes = (app) => {
    app.route("/help-text/:id?")
    .get((req, res) => {
        console.log("http method GET Sended!", "path:", filePath, "id:", req.params.id)
        const data = getHelpText()
        if(data.length > 0){
		console.log("Data Requested: ", data)
            return res.status(200).json({
               text: data.filter(item => item.id === req.params.id)
            });
        }
        res.status(404).json({message: data})
        
    })
    .post((req, res) => {
        console.log("http method POST Sended!")
        const data = getHelpText()
        data.push({
            id: req.params.id,
            ...req.body
        });

        saveHelpText(data)       // Write in "DB"
        res.status(201).json()
        
    })
    .put((req, res) => {
        console.log("http method PUT Sended!")
        const data = getHelpText()
        const text = data.map( text => {
            if(text.id === req.params.id){
                // Here that going to do updating of the text
                return {
                    ...text,
                    ...req.body
                }
            }
            return text
        })
        saveHelpText(text)
        res.status(201).json({message: "Text Updated!"})
    })
    .delete((req, res) => {
        console.log("http method DELETE Sended!")
        const data = getHelpText()
        const dataRemainder = data.filter(text => {
           return text.id !== req.params.id
        })
        saveHelpText(dataRemainder)
        res.status(200).send("User deleted!")
    })
}


module.exports = helpTextRoutes;