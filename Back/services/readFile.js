import fs from "fs"
import path from "path"

export  async function readFile() {
    try {

        const caminho = path.resolve("uploads", "Emails.txt")

        const content = fs.readFileSync(caminho, 'utf8')
        const slice = content.split("\n")
        const total = slice.length
        const emails = content
            .split("\n")
            .map(e => e.trim())
            .filter(e => e.length > 0);
        const results = [];

        if (total > 10) {
            fs.unlinkSync(caminho);
            return { ok: false, error: "Limite de linhas excedido", total: {} };
        }
        for (const email of emails) {
            if (!email.includes("@")) {
                results.push({ email, status: "erro", message: "Email inválido" });
                continue;
            }
            results.push({ email, status: "Sucesso", message: "Email válido" });

        }

        return { ok: true, total ,results};
    } catch (e) {
        return { ok: false, error: error.message };
    }
}