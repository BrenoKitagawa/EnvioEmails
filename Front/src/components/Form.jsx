import React, { useRef, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

const Form = () => {
  const refInput = useRef(null);

  const [emails, setEmails] = useState([]);
  const [emailsError, setEmailsError] = useState([]);
  const [sendMail, setSendMail] = useState(false);
  const [filter, setFilter] = useState("valid");

  async function sendFile(e) {
    e.preventDefault();
    setEmails([]);
    setEmailsError([]);

    const file = refInput.current.files[0];
    if (!file) {
      toast.warning("Selecione um arquivo");
      return;
    }

    setSendMail(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      toast.success("Arquivo enviado com sucesso");

      const ok = [];
      const err = [];

      response.data.emails.forEach(mail => {
        if (mail.status.toLowerCase() !== "erro") {
          ok.push(mail);
        } else {
          err.push(mail);
        }
      });

      setEmails(ok);
      setEmailsError(err);
    } catch {
      toast.error("Erro ao enviar arquivo");
    }
  }

  async function sendMailButton() {
    const response = await api.post("/send");
    if (response.status === 200) {
      toast.success("Emails enviados com sucesso");
    }
  }

  const list = filter === "valid" ? emails : emailsError;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-zinc-800 rounded-3xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        <div className="p-6 border-r border-zinc-700">
          <h1 className="text-xl font-bold text-white mb-4">
            Lista de Emails
          </h1>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setFilter("valid")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${filter === "valid"
                  ? "bg-green-500 text-white"
                  : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"}`}
            >
              ✔ Válidos ({emails.length})
            </button>

            <button
              onClick={() => setFilter("invalid")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${filter === "invalid"
                  ? "bg-red-500 text-white"
                  : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"}`}
            >
              ❌ Inválidos ({emailsError.length})
            </button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {list.length === 0 && (
              <p className="text-zinc-400 text-sm">
                Nenhum email para exibir
              </p>
            )}

            {list.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-zinc-700 rounded-lg px-4 py-2"
              >
                <span className="text-white text-sm">{item.email}</span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded
                    ${item.status.toLowerCase() !== "erro"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 flex flex-col items-center justify-center gap-6">
          <h1 className="text-xl font-bold text-white">
            Upload de Arquivo
          </h1>

          {!sendMail ? (
            <form
              onSubmit={sendFile}
              className="flex flex-col gap-4 w-full max-w-sm"
            >
              <input
                ref={refInput}
                type="file"
                className="block w-full text-sm text-zinc-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:bg-zinc-700 file:text-white
                hover:file:bg-zinc-600"
              />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 transition
                text-white font-semibold py-2 rounded-lg"
              >
                Enviar Arquivo
              </button>
            </form>
          ) : (<>

            <button
              onClick={sendMailButton}
              className="bg-green-600 hover:bg-green-500 transition
              text-white font-semibold py-3 px-6 rounded-xl"
            >
              🚀 Enviar Emails
            </button>

            <button
              onClick={() => setSendMail(false)}
              className="bg-yellow-500 hover:bg-yellow-300 transition
              text-white font-semibold py-3 px-6 rounded-xl"
            >
              Carregar novo arquivo
            </button>
          </>

          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
