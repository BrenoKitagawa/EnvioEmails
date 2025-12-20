import express from "express"
import sendMailController from "./controller/SendMailController.js"
import upload from "./util/multer.js"
const routes = express.Router()
/**
 * @swagger
 * /send:
 *   post:
 *     summary: Enviar emails
 *     description: Envia emails em massa
 *     tags:
 *       - Email

 *     responses:
 *       200:
 *         description: Email enviados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 */
routes.post("/send", sendMailController.sendMail)

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload de arquivo
 *     description: Faz upload de arquivo para envio de emails
 *     tags:
 *       - Upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Arquivo enviado com sucesso
 */
routes.post(
  "/upload",
  upload.single("file"),
  sendMailController.uploadArquivos
)

export default routes