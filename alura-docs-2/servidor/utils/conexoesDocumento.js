const conexoesDocumentos = [];

function encontrarConexao(nomeDocumento, nomeUsuario) {
    return conexoesDocumentos.find((conexao) => {
        return (conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario);
    });
}

function adicionarConexao(conexoes) {
    conexoesDocumentos.push(conexoes);
}

function obterUsuariosNoDocumeno(nomeDocumento) {
    return conexoesDocumentos.filter((conexoes) => conexoes.nomeDocumento === nomeDocumento)
        .map((conexao) => conexao.nomeUsuario);
}

function removerConexao(nomeDocumento, nomeUsuario) {
    const indice = conexoesDocumentos.findIndex((conexao) => {
        return (conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario);
    });

    if (indice !== -1) {
        conexoesDocumentos.splice(indice, 1);
    }
}

export { encontrarConexao, adicionarConexao, obterUsuariosNoDocumeno, removerConexao };