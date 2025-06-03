import { Request, Response } from "express";
import { CreateHaircutService } from "../../service/haircut/CreateHaircutService";

class CreateHaircutController {
  async handle(req: Request, res: Response) {
    const { name, price } = req.body;
    const user_id = req.user_id;

    const haircutService = new CreateHaircutService();

    const haircut = await haircutService.execute({
      name,
      price,
      user_id,
    });

    res.status(201).send(haircut);

    return;
  }
}

export { CreateHaircutController}