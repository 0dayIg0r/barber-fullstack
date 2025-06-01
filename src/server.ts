import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());

// Rotas
app.use(router);

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

  res.status(400).json({
    error: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
