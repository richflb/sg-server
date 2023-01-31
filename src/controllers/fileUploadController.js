const path = require("path");

// Outra versão
// const fileUpload = (request, response) => {
//     if(!request.files){
//         return response.status(400).send("No file Sent!")
//     }
//     let img = request.files.image
//     let name = request.files.image.name
//     let ext = request.files.image.mimeetype.split('/')[1]

//     img.mv(`src/media/uploads/profile-pic/${name}.${ext}`)
//     return response.status(201).send("Image Received!")
// }
const UPLOAD_FOLDER = "../../public/uploads";

const fileSaveOnServer = (request, response) => {
    if(!request.files){ // já tem o middleware pra fazer esta verificação.
        return response.status(400).send("No file Sent!")
    }
    console.log("ON fileSaveOnServer: file received")

    const {files} = request.files
    let stts;

    Object.keys(files).forEach((key, i) => {
        console.log(">>>>>>key: ", key, ">>> i", i)
        const filepath = path.join(__dirname, UPLOAD_FOLDER, files[i].name)
        console.log(filepath)
        stts = files[key].mv(filepath, (err) => {
            if(err){
                return response.status(500).json({
                    status: "error",
                    message: err
                })
            }
        })
    });
    
    return response.status(201).json({
        status: "success",
        message: `${Object.keys(files).length} File(s) was uploaded with succes..`,
        files: Object.keys(files).map((item, key) => [item, files[key].name])
    })
}
module.exports =  { fileSaveOnServer };