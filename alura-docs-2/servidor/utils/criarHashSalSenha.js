import { randomBytes, scryptSync } from "crypto";

function criarHashSalSenha(senhaDigitata) {

    const salSenha = randomBytes(16).toString("hex");
    const hashSenha = scryptSync(senhaDigitata, salSenha, 64).toString("hex");

    return { salSenha, hashSenha };

};

export { criarHashSalSenha };