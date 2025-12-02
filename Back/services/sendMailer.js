import { mailer } from "../util/nodeMailer.js"
import fs from 'fs'

export async function sendMailer() {
    try {
        const uploadsPath = path.resolve("uploads");
        const files = fs.readdirSync(uploadsPath);
        const fileMatch = files.find(file => file.toLowerCase().includes("emails"));
        if (!fileMatch) {
            throw new Error("Nenhum arquivo contendo 'Emails' foi encontrado.");
        }
        const filePath = path.join(uploadsPath, fileMatch);

        const content = fs.readFileSync(filePath, "utf8");

        const emails = content
            .split("\n")
            .map(e => e.trim())
            .filter(e => e.length > 0);

        const results = [];

        for (const email of emails) {
            if (!email.includes("@")) {
                results.push({ email, status: "erro", message: "Email inválido" });
                continue;
            }

            try {
                const result = await mailer(email);
                results.push({ email, status: "ok", result });
            } catch (err) {
                results.push({ email, status: "erro", message: err.message });
            }
        }
    } catch (error) {
        throw new Error("Erro ao processar envio de emails: " + error.message);
    }
}