import { Request, Response } from "express";
import { UserDetailService } from "../../service/user/DetailUserService";

class UserDetailController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const userDetailService = new UserDetailService();

    const detailUser = await userDetailService.execute({user_id});

     res.json(detailUser);
     return
    
  }
}

export { UserDetailController };
