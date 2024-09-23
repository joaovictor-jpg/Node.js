import { documentosColecao } from "../db/dbConnection.js";


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

export { encontrarDocumento, atualizaDocumento };