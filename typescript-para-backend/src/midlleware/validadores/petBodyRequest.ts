import * as yup from "yup";
import { pt } from "yup-locale-pt";
import { TipoRequestPetBody } from "../../tipos/tiposPet";
import EnumEspecie from "../../enum/EnumEspecies";
import EnumPorte from "../../enum/EnumPorte";
import { NextFunction, Request, Response } from "express";

yup.setLocale(pt);

const esquemaBodyPet: yup.ObjectSchema<Omit<TipoRequestPetBody, "adotante">> = yup.object({
    nome: yup.string().defined().required(),
    especie: yup.string().oneOf(Object.values(EnumEspecie)).defined().required(),
    porte: yup.string().oneOf(Object.values(EnumPorte)).defined().required(),
    dataDeNascimento: yup.date().defined().required(),
    adotado: yup.boolean().defined().required()
});

const middlewareValidadorBodyPet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await esquemaBodyPet.validate(req.body, {
            abortEarly: false
        });
        next();
    } catch (error) {
        const yupErrors = error as yup.ValidationError;

        const validationErrors: Record<string, string> = {};

        yupErrors.inner.forEach(error => {
            if (!error.path) return;
            validationErrors[error.path] = error.message;
        });
        res.status(400).json({ error: validationErrors });
    }
}

export { middlewareValidadorBodyPet };

