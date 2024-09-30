const mensagemSecreta = 'Hello World';


// Cifra de César
function cifraMensagem(mensagem, movimentos) {
    const mensagemSifrada = mensagem.split('').map(carcter => {
        const codigoCaracter = carcter.charCodeAt(0);
        return String.fromCharCode(codigoCaracter + movimentos);
    })
    return mensagemSifrada.join('');
};


function decifraMensagem(mensagem, movimentos) {
    const mensagemDecifrada = mensagem.split('').map(carcter => {
        const codigoCaracter = carcter.charCodeAt(0);
        return String.fromCharCode(codigoCaracter - movimentos);
    });

    return mensagemDecifrada.join('');
};


const mensagemCifradas = cifraMensagem(mensagemSecreta, 3);

console.log(mensagemCifradas);

const mensagemDecifrada = decifraMensagem(mensagemCifradas, 3);

console.log(mensagemDecifrada);