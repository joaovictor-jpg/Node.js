import { NextFunction, Request, Response } from "express";
import { RequisicaoRui } from "../utils/manipulaErros";

export const verificaIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = { ...req.params };

  for (const param in params) {
    if (!Number.isInteger(Number(params[param]))) {
      throw new RequisicaoRui(
        `O parametro ${param} deve ser um número inteiro.`
      );
    }
  }
  next();
};