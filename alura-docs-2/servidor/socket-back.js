import registrarEventosCadastrar from "./registraEventos/cadastrar.js";
import registrarEventosLogin from "./registraEventos/login.js";
import registrarEventosInicio from "./registraEventos/rnicio.js";
import registrarEventosDocumentos from "./registraEventos/documentos.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
  registrarEventosCadastrar(socket, io);
  registrarEventosLogin(socket, io);
  registrarEventosInicio(socket, io);
  registrarEventosDocumentos(socket, io);
});
