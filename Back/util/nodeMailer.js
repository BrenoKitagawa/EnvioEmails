import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",  //Pesqueise o HOST
  port: 587,    //Escolha a porta SMTP de envio
  secure: false,
  auth: {
    user: process.env.EMAIL,  //Email
    pass: process.env.SENHA,  //Senha gerada gmail APP
  },
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function mailer(email) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,        //EMAIL DO DISTINATARIO
      subject: "Hello ✔",  
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    console.log("Email enviado para:", email, "ID:", info.messageId);
    await sleep(5000);

    return {
      email,
      status: "ok",
      id: info.messageId,
    };

  } catch (error) {
    console.error("Erro ao enviar para:", email, error);

    return {
      email,
      status: "erro",
      message: error.message,
    };
  }
}
