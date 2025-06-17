import { Request, Response } from "express";
import { CountHairCutsService } from "../../service/haircut/CountHairCurtService";

class CountHairCutsController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    if (!user_id) {
      res.status(400).json({ error: "User ID is required." });
      return
    }

    const countHaircuts = new CountHairCutsService();

    try {
      const count = await countHaircuts.execute({ user_id });

    
      res.status(200).send({count});
      return
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
      return 
    }
  }
}

export { CountHairCutsController };
