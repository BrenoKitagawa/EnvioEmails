import { readFile } from "../services/readFile.js"
import { sendMailer } from "../services/sendMailer.js"

export default {

    async sendMail(req, res) {
        try {
            const result = await sendMailer();

            return res.status(200).json({
                success: true,
                message: "Email enviado com sucesso",
                result
            });
        } catch (error) {
            console.error("Erro ao enviar e-mail:", error);

            return res.status(500).json({
                success: false,
                error: "Erro ao enviar e-mail"
            });
        }
    },
    async uploadArquivos(req, res) {

        if (!req.file) {
            return res.status(400).json({ error: "Nenhum arquivo enviado" })
        }
        try {
            const result = readFile();

            if (!result.ok) {
                return res.status(400).json({ error: result.error, total: result.total });
            }

            return res.status(200).json({ message: "Arquivo válido", total: result.total });
        } catch (error) {

            return res.status(500).json({ e: error.message })

        }



    }


}





