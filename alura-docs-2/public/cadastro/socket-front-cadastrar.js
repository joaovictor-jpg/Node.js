const socket = io();

function emitirCadastrarUsuario(dados) {
    socket.emit("cadastrar_usuario", dados);
};

socket.on("cadastro_sucesso", () => {
    alert("Cadastro realizado com sucesso!");
});

socket.on("cadastro_error", () => {
    alert("Falha ao cadastrar usuário");
});

socket.on("usuario_ja_existente", () => {
    alert("Usuário já cadastrodo");
});

export { emitirCadastrarUsuario };