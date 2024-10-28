import express from "express";
import petRouter from "../router/petRouter";
import adotanteRouter from "../router/adotanteRouter";

const router = (app: express.Router) => {
    app.use("/pets", petRouter);
    app.use("/adotantes", adotanteRouter);
}

export default router;