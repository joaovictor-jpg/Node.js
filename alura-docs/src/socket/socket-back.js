import { atualizaDocumento, encontrarDocumento, obterDocumentos } from "../db/documentodb.js";
import io from "../servidor.js";

io.on("connection", (socket) => {

    socket.on("obter_documentos", async (devolverDocumentos) => {
        const documentos = await obterDocumentos();
        devolverDocumentos(documentos);
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
});
