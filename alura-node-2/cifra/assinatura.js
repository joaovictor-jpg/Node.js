import { generateKeyPairSync, createSign, createVerify } from 'crypto';

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

const dados = 'Essa string será assinada digitalmente';

const assinada = createSign('SHA256');

assinada.update(dados);

const assinatura = assinada.sign(privateKey, 'hex');

console.log('Assinatura Digital:', assinatura);

const verificada = createVerify('SHA256');

verificada.update(dados);

const eVerificada = verificada.verify(publicKey, assinatura, 'hex');

console.log('Assinatura verificada:', eVerificada);