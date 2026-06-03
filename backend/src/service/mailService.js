import nodemailer from "nodemailer";

const buildTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Faltan variables SMTP (SMTP_HOST, SMTP_USER, SMTP_PASS)");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
};

const getFrom = () => process.env.MAIL_FROM || process.env.SMTP_USER;

export const sendActivationEmail = async ({ to, token }) => {
  const transporter = buildTransporter();
  await transporter.sendMail({
    from: getFrom(),
    to,
    subject: "Activa tu cuenta en Gavel Gold",
    text: `Tu token de activacion es: ${token}\n\nUsalo junto con tu contraseña para completar el registro.`,
    html: `
      <p>Tu token de activacion es:</p>
      <p><b>${token}</b></p>
      <p>Usalo junto con tu contraseña para completar el registro.</p>
    `,
  });
};

export const sendPasswordResetEmail = async ({ to, token }) => {
  const transporter = buildTransporter();
  await transporter.sendMail({
    from: getFrom(),
    to,
    subject: "Recuperacion de contraseña - Gavel Gold",
    text: `Tu token para recuperar contraseña es: ${token}\n\nEste token vence en 1 hora.`,
    html: `
      <p>Tu token para recuperar contraseña es:</p>
      <p><b>${token}</b></p>
      <p>Este token vence en 1 hora.</p>
    `,
  });
};
