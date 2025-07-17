const menssagemSercreta = "minha mensagem secreta";

console.log(menssagemSercreta);

function cifra(mensagem, movimento) {
    let resultado = "";
    for (let i = 0; i < mensagem.length; i++) {
        const codigoAscii = mensagem.charCodeAt(i);
        const novoCodigoAscii = codigoAscii + movimento;
        resultado += String.fromCharCode(novoCodigoAscii);
    }
    return resultado;
}

function decifra(mensagem, movimento) {
    let resultado = "";
    for (let i = 0; i < mensagem.length; i++) {
        const codigoAscii = mensagem.charCodeAt(i);
        const novoCodigoAscii = codigoAscii - movimento;
        resultado += String.fromCharCode(novoCodigoAscii);
    }
    return resultado;
}

console.log(cifra(menssagemSercreta, 3));

console.log(decifra(cifra(menssagemSercreta, 3), 3));


