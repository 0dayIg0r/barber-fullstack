import { Request, Response } from "express";
import { CheckSubService } from "../../service/haircut/CheckSubService";

class CheckSubController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const checkSub = new CheckSubService();

    const status = await checkSub.execute({
      user_id,
    });

    res.status(200).send(status);
    return;
  }
}

export { CheckSubController };
