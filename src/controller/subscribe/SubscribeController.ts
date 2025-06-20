import { Request, Response } from "express";
import { SubscribeService } from "../../service/subscribe/SubscriptionService";

class SubscribeController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const subscribeService = new SubscribeService();
    const subscribe = subscribeService.execute({ user_id });

    res.status(201).send(user_id)
    return
  }
}
export { SubscribeController };
