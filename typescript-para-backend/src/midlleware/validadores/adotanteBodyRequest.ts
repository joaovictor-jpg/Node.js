import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { TipoRequestAdotanteBody } from "../../tipos/tiposAdotantes";
import { pt } from "yup-locale-pt";

yup.setLocale(pt);

const esquemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestAdotanteBody, "endereco">> = yup.object({
    nome: yup.string().defined().required(),
    senha: yup.string().defined().required().min(6).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm, "Senha invalida"),
    celular: yup.string().defined().required().matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "Celular invalido"),
    foto: yup.string().optional(),
});

const middlewareValidadorBodyAdotante = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await esquemaBodyAdotante.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const yupErrors = error as yup.ValidationError;

        const validationErrors: Record<string, string> = {};
        yupErrors.inner.forEach((error) => {
            if (!error.path) return;
            validationErrors[error.path] = error.message;
        });
        res.status(400).json({ error: validationErrors });
    }
}

export { middlewareValidadorBodyAdotante };