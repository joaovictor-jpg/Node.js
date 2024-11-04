import { NextFunction, Request, Response } from "express";
import { ManipulaErros } from "../utils/manipulaErros";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export const errorMiddleware = (error: ManipulaErros, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode ?? EnumHttpStatusCode.INTERNAL_SERVER_ERROR;
    const message = error.statusCode ? error.message : "Error: Interno do servidor";
    res.status(statusCode).json({ message });
    return next();
}