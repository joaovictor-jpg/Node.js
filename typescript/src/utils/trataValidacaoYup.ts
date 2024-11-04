import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

const tratarErrorValidacaoYup = (esquema: yup.Schema<unknown>, req: Request, res: Response, next: NextFunction) => {
    try {
        esquema.validateSync(req.body, { abortEarly: false });
        next();
    } catch (erros) {
        const errorsYup = erros as yup.ValidationError;
        const errosDeValidacao: Record<string, string> = {};
        errorsYup.inner.forEach((erro) => {
            if(erro.path) {
                errosDeValidacao[erro.path] = erro.message;
            }
        })
    }
};

export default tratarErrorValidacaoYup;