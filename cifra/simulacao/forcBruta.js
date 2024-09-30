import { createHash } from 'crypto';

class Usuario {
    constructor(nome, senha) {
        this.nome = nome;
        this.hash = this.criarHash(senha);
    }

    criarHash(senha) {
        return createHash('sha256').update(senha).digest('hex');
    }

    autenticar(nome, senha) {
        if (this.nome === nome && this.hash === this.criarHash(senha)) {
            console.log(`Usuário ${nome}, está logado`);
            return true;
        }

        //console.log('Nome ou senha incorreta');
        return false;
    };
};


const novoUsuario = new Usuario('João', '1000');

for (let senhaTeste = 0; senhaTeste < 10000; senhaTeste++) {
    if (novoUsuario.autenticar('João', senhaTeste.toString())) {
        console.log(`Senha do usuário é ${senhaTeste}`);
    }
};
