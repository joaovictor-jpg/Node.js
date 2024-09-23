import registrarEventosInicio from "./registraEventos/rnicio.js";
import registrarEventosCadastrar from "./registraEventos/cadastrar.js";
import registrarEventosDocumentos from "./registraEventos/documentos.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
  registrarEventosInicio(socket, io);
  registrarEventosDocumentos(socket, io);
  registrarEventosCadastrar(socket, io);
});
