import fs from "fs"
import path from "path"

export function readFile() {
    try {

        const caminho = path.resolve("uploads","Emails.txt")
        const content = fs.readFileSync(caminho, 'utf8')
        const slice = content.split("\n")
        const total = slice.length

        if (numbers > 10) {
              fs.unlinkSync(caminho); 
            return { ok: false, error: "Limite de linhas excedido", total:{} };
        }

        return { ok: true, total };
    } catch (e) {
        return { ok: false, error: error.message };
    }
}