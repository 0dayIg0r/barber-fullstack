import { Request, Response } from "express";
import { CheckSubService } from "../../service/haircut/CheckSubService";

class CheckSubController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;


    if (!user_id) {
      res.status(400).json({ error: "É necessário um usuário" });
      return 
    }

    const checkSub = new CheckSubService();

    try {
      const status = await checkSub.execute({ user_id });
      res.status(200).json(status);
      return 
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
      return
    }
  }
}

export { CheckSubController };
