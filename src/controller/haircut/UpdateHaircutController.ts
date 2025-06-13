import { Request, Response } from "express";
import { UpdateHairCutService } from "../../service/haircut/UpdateHaircutService";

class UpdateHaircutController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const { name, price, status, haircut_id } = req.body;

    if (!user_id || !haircut_id) {
      res.status(400).json({ error: "O ID do usuário e o ID do corte de cabelo são obrigatórios." });
      return
    }

    const updateHaircut = new UpdateHairCutService();

    try {
      const haircut = await updateHaircut.execute({
        user_id,
        name,
        price,
        status,
        haircut_id,
      });
      res.status(200).json(haircut);
      return
    } catch (error) {
  
      res.status(500).json({ error: "Erro interno do servidor." });
      return
    }
  }
}

export { UpdateHaircutController };
