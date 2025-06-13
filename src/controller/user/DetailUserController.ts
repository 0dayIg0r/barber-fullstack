import { Request, Response } from "express";
import { UserDetailService } from "../../service/user/DetailUserService";

class UserDetailController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    if (!user_id) {
      res.status(400).json({ error: "ID do usuário não fornecido." });
      return 
    }

    const userDetailService = new UserDetailService();

    try {
      const detailUser = await userDetailService.execute({ user_id });

      if (!detailUser) {
        res.status(404).json({ error: "Usuário não encontrado." });
        return
      }

      res.status(200).json(detailUser);
      return 
    } catch (error) {
      error;
      res
      .status(500)
      .json({ error: "Erro ao buscar detalhes do usuário." });
      return
    }
  }
}

export { UserDetailController };
