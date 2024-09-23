import { documentosColecao } from "../db/dbConnection.js";

function obterDocumentos() {
    const documentos = documentosColecao.find().toArray();
    return documentos;
}

function adicionarDocumento(documento) {
    const novoDocumneto = documentosColecao.insertOne({
        nome: documento,
        texto: ""
    });
    return novoDocumneto;
};

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome
    });
    return documento;
};

function atualizaDocumento(nomeDocumento, texto) {
    const atualizacao = documentosColecao.updateOne({
        nome: nomeDocumento
    }, {
        $set: {
            texto
        }
    })

    return atualizacao;
}

function excluirDocumento(nomeDocumento) {
    const resultado = documentosColecao.deleteOne({
        nome: nomeDocumento
    });
    return resultado;
}

export { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento };