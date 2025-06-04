import { Request, Response } from "express";
import { ListHaircutService } from "../../service/haircut/ListHaircutsService";

class ListHaircutController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const status = req.query.status as string;

    
    if (!user_id) {
      return res.status(400).json({ error: "O ID do usuário é obrigatório." });
    }

    const listHaircuts = new ListHaircutService();

    try {
      const haircuts = await listHaircuts.execute({
        user_id,
        status,
      });
      return res.status(200).json(haircuts);
    } catch (error) {
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}

export { ListHaircutController };
