import { Request, Response } from "express";
import { ListHaircutService } from "../../service/haircut/ListHaircutsService";

class ListHaircutController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const status = req.query.status as string;

    const listHaircuts = new ListHaircutService();

    const haircuts = await listHaircuts.execute({
      user_id,
      status,
    });

    res.status(200).send(haircuts);
    return;
  }
}
export { ListHaircutController };
