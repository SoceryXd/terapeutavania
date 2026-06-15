// Backend opcional em Node.js/Express para formulário de contato.
// Instalar: npm install express nodemailer dotenv
// Rodar: node server.js
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });

  await transporter.sendMail({
    from: `Site Vânia Brito <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO,
    replyTo: email,
    subject: `Novo contato de ${name}`,
    text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`
  });
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000, () => console.log('Site rodando na porta 3000'));
