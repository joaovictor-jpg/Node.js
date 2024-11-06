import * as yup from "yup";
import { TipoRequestBodyAbrigo } from "../../tipos/tipoAbrigo";
import { NextFunction, Request, Response } from "express";
import tratarErrorValidacaoYup from "../../utils/trataValidacaoYup";

const esquemaBodyAbrigo: yup.Schema<Omit<TipoRequestBodyAbrigo, "endereco">> = yup.object({
    nome: yup.string().defined().required(),
    email: yup.string().defined().required().matches(
        /(^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[\.][a-z]+$)/mg,
        "Email inválido"
    ),
    senha: yup.string().defined().required().matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
        "senha inválida"
    ),
    celular: yup.string().defined().required().matches(
        /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
        "celular inválido"
    )
});

const middlewareValidadorBodyAbrigo = (req: Request, res: Response, next: NextFunction) => {
    tratarErrorValidacaoYup(esquemaBodyAbrigo, req, res, next);
}

export { middlewareValidadorBodyAbrigo }