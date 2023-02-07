const { PrismaClient } = require("@prisma/client");
const path = require("path");

const UPLOAD_FOLDER = "../../public/pics/custom";

const prisma = new PrismaClient()

const fileSaveOnServer = async (request, response) => {
console.log(">>>>>>>>>>>>>", request.files)
    if(!request.files || !request.body.uid){
        return response.status(400).send("No file Sent! or uid is missing")
    }
    let folder = request.body.profile_pic || request.body.capa_pic
    const  {files} = request
    let fname = request.body.uid

	let filepath
    Object.keys(files).forEach((key) => {
        filepath = path.join(__dirname, UPLOAD_FOLDER, folder, fname)
        console.log(filepath)
        files[key].mv(filepath, (err) => {
            if(err){
                return response.status(500).json({
                    status: "error",
                    message: err
                })
            }
        })
    });
    
    // To SAVE path on DB
    const pathLink = `/pics/custom/${folder}/${fname}`
    let resU
    if(request.body.profile_pic){
console.log("ENTROU no PROFIL_PIC>>>>>>")
        resU = await prisma.profile.update({
            where: {
                userID: request.body.uid
            },
            data: {
                profilePicFolder: pathLink
            }
        })
    } else {
console.log("ENTROU no PROFIL_PIC>>>>>>")
        resU = await prisma.profile.update({
            where: {
                userID: request.body.uid
            },
            data: {
                capaPicFolder: pathLink
            }
        })
    }

    return response.status(201).json({
        status: "success",
        message: `${Object.keys(files).length} File(s) was uploaded with succes..`,
        files: Object.keys(files).map((item, key) => {
			return {c:item, fname:files[key].name}
        }),
        pathLink,
        resU
    })
}

module.exports =  { fileSaveOnServer };