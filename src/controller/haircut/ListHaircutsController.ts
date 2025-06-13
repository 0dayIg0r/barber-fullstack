import { Request, Response } from "express";
import { ListHaircutService } from "../../service/haircut/ListHaircutsService";

class ListHaircutController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const status = req.query.status as string;

    if (!user_id) {
      res.status(400).json({ error: "O ID do usuário é obrigatório." });
      return;
    }

    const listHaircuts = new ListHaircutService();

    try {
      const haircuts = await listHaircuts.execute({
        user_id,
        status,
      });
      res.status(200).json(haircuts);
      return;
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor." });
      return;
    }
  }
}

export { ListHaircutController };
