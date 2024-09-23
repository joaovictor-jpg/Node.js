import { encontrarUsario } from "../db/usuariosdb.js";
import { autenticadoUsuario } from "../utils/autenticadoUsuario.js";
import gerarJwt from "../utils/gerarJwt.js";

export default function registrarEventosLogin(socket, io) {
    socket.on("autenticar_usuario", async ({ nome, senha }) => {
        const usuario = await encontrarUsario(nome);

        if (usuario) {
            const autenticado = autenticadoUsuario(senha, usuario);

            if (autenticado) {
                const token = gerarJwt({ nomeUsuario: nome });
                
                socket.emit("autenticacao_sucesso", token);
            } else {
                socket.emit("autenticacao_erro");
            }
        } else {
            socket.emit("usuario_nao_encontrado");
        }

    });
}