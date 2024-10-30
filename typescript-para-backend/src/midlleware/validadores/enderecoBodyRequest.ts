import * as yup from "yup";
import EnderecoEntity from "../../entity/Endereco";
import { Request, Response, NextFunction } from "express";

const esquemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> = yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required()
});

const middlewareValidadorBodyEndereco = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await esquemaBodyEndereco.validate(req.body, { abortEarly: false });
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

export { middlewareValidadorBodyEndereco };