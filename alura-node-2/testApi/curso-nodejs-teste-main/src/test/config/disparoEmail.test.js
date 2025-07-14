import { describe, expect, it } from '@jest/globals';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "username",
    pass: "password",
  },
});
const verificarConexao = () => new Promise((resolver, reject) => {
    transporter.verify(function (error, success) {
        if (error) {
            reject(error);
        } else {
            resolver(success);
        }
    });
})

describe('Teste disparo de email', () => {
    it('O sistema deve validar se a conexão com o sistema de disparo de email', async () => {
        const estaConectado = true;

        const validadorConexao = await verificarConexao();

        expect(validadorConexao).toStrictEqual(estaConectado);
    })
})