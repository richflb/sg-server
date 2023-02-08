const fs = require("fs")
const { join } = require("path")


const saveUser = async (userData, tipo) => {
    const filePath = join(__dirname, "../../data/search", `search${tipo}DB.json`)
    fs.writeFileSync(filePath, JSON.stringify(userData, null, "\t"))
    console.log("Public Sotre: ", filePath)
    console.log("Data Saved: ", userData)
}

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

exports.saveGuides = async (data) => {
    let fullname = data?.firstName + ' ' + data?.lastName

    const readData = getSearch("Guides")
    const allDataExcept = readData.filter(item => item.uid !== data?.uid)
    allDataExcept.push(
        {
            fullname,
            ...data
        }
    )
    saveUser(allDataExcept, "Guides")
}

exports.saveTours = (data) => {
    const readData = getSearch("Tours")
    readData.push(data)
    saveUser(readData, "Tours")
}

