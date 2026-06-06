import nodemailer from "nodemailer";

const buildTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Faltan variables SMTP (SMTP_HOST, SMTP_USER, SMTP_PASS)");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
};

const getFrom = () => process.env.MAIL_FROM || process.env.SMTP_USER;

const asunto = (tipo) =>
  tipo === "activation"
    ? "Activa tu cuenta en Gavel Gold"
    : "Recuperacion de contraseña - Gavel Gold";

const cuerpoTexto = (tipo, codigo) =>
  tipo === "activation"
    ? `Tu codigo de activacion es: ${codigo}\n\nUsalo junto con tu contraseña para completar el registro.`
    : `Tu codigo para recuperar contraseña es: ${codigo}\n\nEste codigo vence en 1 hora.`;

const cuerpoHtml = (tipo, codigo) =>
  tipo === "activation"
    ? `<p>Tu codigo de activacion es:</p><p><b>${codigo}</b></p><p>Usalo junto con tu contraseña para completar el registro.</p>`
    : `<p>Tu codigo para recuperar contraseña es:</p><p><b>${codigo}</b></p><p>Este codigo vence en 1 hora.</p>`;

export const sendCodeEmail = async ({ to, codigo, tipo }) => {
  const transporter = buildTransporter();
  await transporter.sendMail({
    from: getFrom(),
    to,
    subject: asunto(tipo),
    text: cuerpoTexto(tipo, codigo),
    html: cuerpoHtml(tipo, codigo),
  });
};
