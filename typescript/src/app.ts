import "express-async-errors";
import express from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";
import { errorMiddleware } from "./middleware/error";
const app = express();
app.use(express.json());
router(app);

app.get("/teste", () => {
  throw new Error("Error teste");
})

app.use(errorMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((erro) => {
    console.log(erro);
  });

export default app;
