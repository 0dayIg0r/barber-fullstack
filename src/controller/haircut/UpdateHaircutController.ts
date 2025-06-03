import { Request, Response } from "express";
import { UpdateHairCutService } from "../../service/haircut/UpdateHaircutService";

class UpdateHaircutController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const { name, price, status, haircut_id } = req.body;

    const updateHaircut = new UpdateHairCutService();

    const haircut = await updateHaircut.execute({
      user_id,
      name,
      price,
      status,
      haircut_id,
    });

    res.status(200).send(haircut);
    return;
  }
}

export { UpdateHaircutController };
