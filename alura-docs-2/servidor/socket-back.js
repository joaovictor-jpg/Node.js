import registrarEventosInicio from "./registraEventos/registraEventosInicio.js";
import registrarEventosDocumentos from "./registraEventos/registrarEventosDocumentos.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
  registrarEventosInicio(socket, io);
  registrarEventosDocumentos(socket, io);
});
