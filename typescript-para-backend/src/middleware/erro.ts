import { NextFunction, Request, Response } from "express";
import { EnumHttpStatusCode } from "../enum/EnumHttpsStatusCode";
import { ManipulaErros } from "../utils/manipulandoErros";

export const erroMiddleware = (
    erro: ManipulaErros | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = erro instanceof ManipulaErros
        ? erro.statusCode
        : EnumHttpStatusCode.INTERNAL_SERVER_ERROR;

    const mensagem = erro instanceof ManipulaErros
        ? erro.message
        : "Erro interno do servidor";

    res.status(statusCode).json({ mensagem });
};