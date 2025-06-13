import { Request, Response } from "express";
import { CreateHaircutService } from "../../service/haircut/CreateHaircutService";

class CreateHaircutController {
  async handle(req: Request, res: Response) {
    const { name, price } = req.body;
    const user_id = req.user_id;

    if (!name || !price || !user_id) {
      res.status(400).json({ error:"Preencha os campos completamente, nome, preço e id de usuário" });
      return 
    }

    const haircutService = new CreateHaircutService();

    try {
      const haircut = await haircutService.execute({
        name,
        price,
        user_id,
      });
      res.status(201).json(haircut);
      return
    } catch (error) {

      res.status(500).json({ error: "Internal server error." });
      return 
    }
  }
}

export { CreateHaircutController };
