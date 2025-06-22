import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import { WebHookController } from "./controller/subscribe/WebHookController";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(cors());

app.use((req:Request, res, next)=>{
  if(req.originalUrl === '/webhooks'){
    next()
  } else{
    express.json()(req,res,next)
  }
})

// COLOCAR AQUI POR CONTA DO CORS
app.post(
  "/webhooks",
  bodyParser.raw({ type: "application/json" }),
  new WebHookController().handle
);

app.use(express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
