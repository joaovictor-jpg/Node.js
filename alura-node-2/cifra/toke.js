import jwt from 'jsonwebtoken';

const chaveSecreta = 'minhaChaveSecreta';

const token = jwt.sign({
    usuario: 'joao',
    admin: true
    }, chaveSecreta, {
    expiresIn: '1h'
})


console.log('Token gerado:', token);

const verificarToken = (token) => {
    try {
        const decoded = jwt.verify(token, chaveSecreta);
        console.log('Token válido:', decoded);
    } catch (error) {
        console.error('Token inválido:', error.message);
    }
}

console.log('Verificando token...');
verificarToken(token);