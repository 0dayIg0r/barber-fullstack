import { Request, Response } from "express";
import { AuthUserService } from "../../service/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    const authUserService = new AuthUserService();

    try {
      const session = await authUserService.execute({
        email,
        password,
      });

      return res.status(200).json(session);
    } catch (error) {
      error;
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }
  }
}

export { AuthUserController };
