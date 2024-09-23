import { adicionarDocumento, atualizaDocumento, encontrarDocumento, excluirDocumento, obterDocumentos } from "../db/documentodb.js";
import io from "../servidor.js";

io.on("connection", (socket) => {

    socket.on("obter_documentos", async (devolverDocumentos) => {
        const documentos = await obterDocumentos();
        devolverDocumentos(documentos);
    });

    socket.on("gravarDocumento", async (nomeDocumento) => {
        const documentoExiste = (await encontrarDocumento(nomeDocumento)) !== null;

        if (documentoExiste) {
            socket.emit("documento_existente", nomeDocumento);
        } else {
            const documento = await adicionarDocumento(nomeDocumento);

            if (documento.acknowledged) {
                io.emit("adicionar_documento_interface", nomeDocumento);
            }
        }

    });

    socket.on("selecionar_documento", async (nomeDocumento, devolveTexto) => {
        socket.join(nomeDocumento);

        const documento = await encontrarDocumento(nomeDocumento);

        if (documento) {
            //socket.emit("texto_documento", documento.texto);
            devolveTexto(documento.texto);
        }
    });

    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);

        if (atualizacao.modifiedCount) {
            console.log(texto);
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
    });

    socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
    });

    socket.on("excluir_documento", async (nomeDocumento) => {
        const resultado = await excluirDocumento(nomeDocumento);
        console.log(resultado);
    });
});
