import { generateKeyPairSync, publicEncrypt, privateDecrypt } from 'crypto';

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,

    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    },
});

console.log('Chave Pública:', publicKey);
console.log('Chave Privada:', privateKey);

const dadosCriptografados = publicEncrypt(
    publicKey,
    Buffer.from('Mensagem Secreta')
);

console.log('Dados Criptografados:', dadosCriptografados.toString('base64'));

const dadosDescriptografados = privateDecrypt(
    privateKey,
    dadosCriptografados
);

console.log('Dados Descriptografados:', dadosDescriptografados.toString('utf-8'));