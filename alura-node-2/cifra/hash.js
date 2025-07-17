import { createHash } from 'crypto';

function hashString(input) {
    return createHash('sha256').update(input).digest('hex');
}

class Usuario {
    constructor(nome, senha, email) {
        this.nome = nome;
        this.email = email;
        this.senha = hashString(senha);
    }

    autenticar(nome, senha) {
        if (this.nombre === nome && this.senha === hashString(senha)) {
            console.log('Autenticación exitosa');
            return true;
        } else {
            console.log('Autenticación fallida');
            return false;
        }
    }
}

const usuario = new Usuario('Juan', 'mi_contraseña_secreta', 'teste@gmail.com');
console.log(usuario);
usuario.autenticar('Juan', 'mi_contraseña_secreta');
usuario.autenticar('Juan', 'contraseña_errada');

