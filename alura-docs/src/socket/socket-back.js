import io from "../servidor.js";

const documentos = [
    {
        nome: "JavaScript",
        texto: "texto de javascript..."
    },
    {
        nome: "Node",
        texto: "texto de Node..."
    },
    {
        nome: "Socket.io",
        texto: "texto de socket.io..."
    }
]

io.on("connection", (socket) => {
    console.log('Uma pessoa se connectou! ID:', socket.id);

    socket.on("selecionar_documento", (nomeDocumento, devolveTexto) => {
        socket.join(nomeDocumento);

        const documento = encontrarDocumento(nomeDocumento);

        if (documento) {
            //socket.emit("texto_documento", documento.texto);
            devolveTexto(documento.texto);
        }
    });

    socket.on("texto_editor", ({ texto, nomeDocumento }) => {
        const documento = encontrarDocumento(nomeDocumento);

        socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        if (documento) {
            documento.texto = texto;
        }
    });


    socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
    });
});

function encontrarDocumento(nome) {
    const documento = documentos.find((documento) => {
        return documento.nome === nome;
    });
    return documento;
};
