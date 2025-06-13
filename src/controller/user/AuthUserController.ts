import { Request, Response } from "express";
import { AuthUserService } from "../../service/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email e senha são obrigatórios." });
      return 
    }

    const authUserService = new AuthUserService();

    try {
      const session = await authUserService.execute({
        email,
        password,
      });

      res.status(200).json(session);
      return 
    } catch (error) {
      error;
      res.status(401).json({ error: "Email ou senha inválidos." });
      return
    }
  }
}

export { AuthUserController };
