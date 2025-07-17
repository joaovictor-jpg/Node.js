import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

const menssage = 'Mensagem secreta';
const chave = randomBytes(32);
const vi = randomBytes(16);

const cifra = createCipheriv('aes-256-cbc', chave, vi);

const menssagemCifrada = cifra.update(menssage, 'utf8', 'hex') + cifra.final('hex');

console.log('Mensagem Cifrada:', menssagemCifrada);

const decifra = createDecipheriv('aes-256-cbc', chave, vi);
const menssagemDecifrada = decifra.update(menssagemCifrada, 'hex', 'utf8') + decifra.final('utf8');

console.log('Mensagem Decifrada:', menssagemDecifrada);