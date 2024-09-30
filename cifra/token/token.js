import jwt from 'jsonwebtoken';

const chaveSecreta = 'chaveSecreta';

const token = jwt.sign(
    {
        apelido: 'Rato',
        curso: 'Segurança e node.js'
    }, chaveSecreta
);


console.log(token);


const tokenDecodificado = jwt.verify(token, chaveSecreta);

console.log(tokenDecodificado);