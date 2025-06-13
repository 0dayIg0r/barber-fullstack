import { Request, Response } from "express";
import { UpdateUserService } from "../../service/user/UpdateUserService";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { name, address } = req.body;
    const user_id = req.user_id;

    if (!user_id) {
      res.status(400).json({ error: "ID do usuário não fornecido." });
      return;
    }

    if (!name && !address) {
      res.status(400).json({
        error:
        "Pelo menos um campo para atualização deve ser informado (nome ou endereço).",
      });
      return 
    }

    const updateUserService = new UpdateUserService();

    try {
      const user = await updateUserService.execute({ name, address, user_id });

      if (!user) {
        res
          .status(404)
          .json({ error: "Usuário não encontrado para atualização." });
        return;
      }

      res.status(200).json(user);
      return 
    } catch (error) {
      error;
      res
      .status(500)
      .json({ error: "Erro ao atualizar os dados do usuário." });
      return 
    }
  }
}

export { UpdateUserController };
