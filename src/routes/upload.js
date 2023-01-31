const fileUpload = require("express-fileupload");
const route = require("express").Router()

const fileUploadController = require("../controllers/fileUploadController")
const imageUploadMiddleware = require("../middleware/files_uplodas/imageUploadMiddleware")

route.post("/upload",
            fileUpload({createParentPath: true}),
            imageUploadMiddleware.isImageMissing,
            imageUploadMiddleware.parseImageExt([".png", ".jpg", ".jpeg"]),
            imageUploadMiddleware.hasFileSizeLimit,
            fileUploadController.fileSaveOnServer
        )

module.exports = route;