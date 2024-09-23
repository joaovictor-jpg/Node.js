import { scryptSync, timingSafeEqual } from "crypto";

function autenticadoUsuario(senhaDigitado, usuario) {
    const hasTeste = scryptSync(senhaDigitado, usuario.salSenha, 64);

    const hasReal = Buffer.from(usuario.hashSenha, "hex");

    const autenticado = timingSafeEqual(hasTeste, hasReal);

    return autenticado;
}

export { autenticadoUsuario };