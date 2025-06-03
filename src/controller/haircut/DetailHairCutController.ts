import { Request, Response } from "express";
import { DetailHaircutService } from "../../service/haircut/DetailHairCutService";

class DetailHaircutController {
  async handle(req: Request, res: Response) {
    const haircut_id = req.query.haircut_id as string;

    const detailHaircut = new DetailHaircutService();

    const detail = detailHaircut.execute({
      haircut_id,
    });

    res.status(200).send(detail)
    return
  }
}

export { DetailHaircutController };
