import { Request, Response } from "express";
import CreateUserService from "../../service/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    // Validação básica dos dados obrigatórios
    if (!name || !email || !password) {
      res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
      return;
    }

    const createUserService = new CreateUserService();

    try {
      const user = await createUserService.execute({
        name,
        email,
        password,
      });

      res.status(201).json(user);
      return;
    } catch (error: any) {
      if (
        error.message.includes("duplicate") ||
        error.message.includes("already exists")
      ) {
        res.status(409).json({ error: "Este email já está em uso." });
        return;
      }

      res.status(500).json({ error: "Erro ao criar usuário." });
      return;
    }
  }
}

export default CreateUserController;
