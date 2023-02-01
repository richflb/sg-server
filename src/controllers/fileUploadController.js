const path = require("path");

const UPLOAD_FOLDER = "../../public/uploads";

const fileSaveOnServer = (request, response) => {
    if(!request.files && !request.body.uid){
        return response.status(400).send("No file Sent! or uid is missing")
    }
    let folder = resquest.profile_pic || resquest.capa_pic
    const {files} = request.files
    let fname = request.body.uid

    Object.keys(files).forEach((key, i) => {
        const filepath = path.join(__dirname, UPLOAD_FOLDER, folder, fname)
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