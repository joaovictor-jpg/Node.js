import { createHash } from 'crypto';

function criarHash(senha) {
    return createHash('sha256').update(senha).digest('hex');
}

console.log(criarHash('teste'));


class Usuario {
    constructor(nome, senha) {
        this.nome = nome;
        this.hash = criarHash(senha);
    }

    autenticar(nome, senha) {
        if(this.nome === nome && this.hash === criarHash(senha)) {
            console.log(`Usuário ${nome}, está logado`);
            return true;
        }

        console.log('Nome ou senha incorreta');
        return false;
    };
};


const novoUsuario = new Usuario('João', 'senha');

console.log(novoUsuario);

// Teste de sucesso
novoUsuario.autenticar('João', 'senha');

// Teste de senha incorreta
novoUsuario.autenticar('João23', 'senha');