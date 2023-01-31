// To verify eighter not image was passed or it was missed. 
const isImageMissing = (request, response, next) => {
    if(!request.files) {
        console.log("IN imgExists:", request)
        console.log("IN imgExists:", request.body)
        return response.status(400).json(
            {status: "error", message: "IN imgExists: Missing files"}
        )
    }
    const {files} = request.files 
    console.log("IN imgExists, (request.files):", files, ">>>> Length:", files.length)
    next()
}

// to verify if files size is greather then 5 MB.
const SIZE_MB = 5;
const FILE_SIZE_LIMIT = SIZE_MB * 1024 * 1024;

const hasFileSizeLimit = (request, response, next) => {
    let files = request.files;
    let filesSizeOverFlow = [];

    Object.keys(files).forEach(key => {
        if(files[key].size > FILE_SIZE_LIMIT){
            filesSizeOverFlow.push(files[key].name);
        }
    });

    if(filesSizeOverFlow.length){
        return response.status(400).json({
            status: "error", 
            message: "Thera are FilesSize Limit OverFlow",
            images: filesSizeOverFlow
        })
    }
    next()
}

// Parsing files extensions allowed!
const path = require("path");

const parseImageExt = (extAllowed) => {
    function parseExt(req, res, next){
        let {files} = req.files;
        let fileExtensions = [];

        Object.keys(files).forEach(key => {
            fileExtensions.push(path.extname(files[key].name))
        });

        //as extensões do arquivos são permitidas?
        const allowed = fileExtensions.every(ext => extAllowed.includes(ext));

        if(!allowed){
            return res.status(422).json({
                status: "error",
                message: "Thera are Files  not allowed!",
                images: fileExtensions
            })
        }
        next()
    }

    return parseExt

}
module.exports = {
    isImageMissing,
    hasFileSizeLimit,
    parseImageExt
}