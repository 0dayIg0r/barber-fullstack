import { Request, Response } from "express";
import { SubscribeService } from "../../service/subscribe/SubscriptionService";

class SubscribeController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const subscribeService = new SubscribeService();
    const result = await subscribeService.execute({ user_id });

    return res.status(201).json(result);
  }
}
export { SubscribeController };
