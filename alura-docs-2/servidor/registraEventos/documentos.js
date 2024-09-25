import {
    atualizaDocumento,
    encontrarDocumento,
    excluirDocumento,
} from "../db/documentosDb.js";
import { adicionarConexao, encontrarConexao, obterUsuariosNoDocumeno, removerConexao } from "../utils/conexoesDocumento.js";

function registrarEventosDocumentos(socket, io) {
    socket.on("selecionar_documento", async ({ nomeDocumento, nomeUsuario }, devolverTexto) => {

        const documento = await encontrarDocumento(nomeDocumento);

        if (documento) {
            const conexaoEncontrada = encontrarConexao(nomeDocumento, nomeUsuario);

            if (!conexaoEncontrada) {
                socket.join(nomeDocumento);

                socket.data = {
                    usuarioEntou: true,
                };

                adicionarConexao({ nomeDocumento, nomeUsuario });

                const usuariosNoDocumento = obterUsuariosNoDocumeno(nomeDocumento);

                io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);

                devolverTexto(documento.texto);
            } else {
                socket.emit("usuario_ja_no_documento");
            }

        }

        socket.on("disconnect", () => {
            if (socket.data.usuarioEntou) {
                removerConexao(nomeDocumento, nomeUsuario);

                const usuariosNoDocumento = obterUsuariosNoDocumeno(nomeDocumento);

                socket.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
            }
        });
    });

    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);

        if (atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
    });

    socket.on("excluir_documento", async (nome) => {
        const resultado = await excluirDocumento(nome);

        if (resultado.deletedCount) {
            io.emit("excluir_documento_sucesso", nome);
        }
    });
}

export default registrarEventosDocumentos;