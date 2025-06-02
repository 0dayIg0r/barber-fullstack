import { Request, Response } from "express";
import { UpdateUserService } from "../../service/user/UpdateUserService";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { name, address } = req.body;
    const user_id = req.user_id;

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({ name, address, user_id });

    res.json(user);
    return;
  }
}

export { UpdateUserController };
