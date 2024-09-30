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


const novoUsuario = new Usuario('João', 'senha123');

// código omitido
const senhasComuns = ["senha", "123456", "senha123", "admin", "blink182", "meuAniversario", "senha123456", "brasil", "102030"]


senhasComuns.map(senha => {
    if (novoUsuario.autenticar('João', senha.toString())) {
        console.log(`A senha do usuário é ${senha}`);
    }
})
