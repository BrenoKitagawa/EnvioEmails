import express from "express"
import sendMailController from "./controller/SendMailController.js"
import upload from "./util/multer.js"
const routes = express.Router()

routes.post("/send",sendMailController.sendMail)
routes.post("/upload",upload.single('file'),sendMailController.uploadArquivos)

export default routes