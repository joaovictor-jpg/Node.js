import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

function hashAndSal(password) {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}

class Usuario {
    constructor(nome, senha, email) {
        this.nome = nome;
        this.email = email;
        [this.salt, this.senha] = hashAndSal(senha).split(':');
    }

    autenticar(nome, senha) {
        if (nome === this.nome) {
            const hash = scryptSync(senha, this.salt, 64);
            const storedHash = Buffer.from(this.senha, 'hex');
            const hashesCorrespondem = timingSafeEqual(hash, storedHash);
            if (hashesCorrespondem) {
                console.log('Autenticación exitosa');
                return true;
            }
        }
        console.log('Autenticación fallida');
        return false;
    }
}

const usuario = new Usuario('Juan', 'mi_contraseña_secreta', 'teste@gmail.com');
console.log(usuario);
usuario.autenticar('Juan', 'mi_contraseña_secreta');
usuario.autenticar('Juan', 'contraseña_errada');