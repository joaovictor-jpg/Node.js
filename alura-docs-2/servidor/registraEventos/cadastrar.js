import { cadastrarUsuario, encontrarUsario } from "../db/usuariosdb.js";

export default function registrarEventosCadastro(socket, io) {
    socket.on("cadastrar_usuario", async (dados) => {

        const usuario = await encontrarUsario(dados.nome);

        if(usuario === null) {
            const resultado = await cadastrarUsuario(dados);
            
            if(resultado.acknowledged) {
                socket.emit("cadastro_sucesso");
            } else {
                socket.emit("cadastro_error");
            }
        } else {
            socket.emit("usuario_ja_existente");
        }

    });
};