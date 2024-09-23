import io from "../servidor.js";

io.on("connection", (socket) => {
    console.log('Uma pessoa se connectou! ID:', socket.id);

    socket.on("texto_editor", (texto) => {
        socket.broadcast.emit("texto_editor_clientes", texto);
    })
});

io.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
