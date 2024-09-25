import "dotenv/config";
import registrarEventosCadastrar from "./registraEventos/cadastrar.js";
import registrarEventosLogin from "./registraEventos/login.js";
import registrarEventosInicio from "./registraEventos/rnicio.js";
import registrarEventosDocumentos from "./registraEventos/documentos.js";
import autorizarUsuario from "./middlawares/autorizaUsuario.js";
import io from "./servidor.js";

const nspUsuarios = io.of("/usuarios");

nspUsuarios.use(autorizarUsuario);

nspUsuarios.on("connection", (socket) => {
  registrarEventosInicio(socket, nspUsuarios);
  registrarEventosDocumentos(socket, nspUsuarios);
});

io.of("/").on("connection", (socket) => {
  registrarEventosCadastrar(socket, io);
  registrarEventosLogin(socket, io);
});
