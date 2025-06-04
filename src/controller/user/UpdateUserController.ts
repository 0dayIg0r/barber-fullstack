import { Request, Response } from "express";
import { UpdateUserService } from "../../service/user/UpdateUserService";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { name, address } = req.body;
    const user_id = req.user_id;

    if (!user_id) {
      return res.status(400).json({ error: "ID do usuário não fornecido." });
    }

    if (!name && !address) {
      return res
        .status(400)
        .json({
          error:
            "Pelo menos um campo para atualização deve ser informado (nome ou endereço).",
        });
    }

    const updateUserService = new UpdateUserService();

    try {
      const user = await updateUserService.execute({ name, address, user_id });

      if (!user) {
        return res
          .status(404)
          .json({ error: "Usuário não encontrado para atualização." });
      }

      return res.status(200).json(user);
    } catch (error) {
      error;
      return res
        .status(500)
        .json({ error: "Erro ao atualizar os dados do usuário." });
    }
  }
}

export { UpdateUserController };
