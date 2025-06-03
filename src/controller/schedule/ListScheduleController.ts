import { Request, Response } from "express";
import { ListScheduleService } from "../../service/schedule/ListScheduleService";

class ListScheduleController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const listSchedule = new ListScheduleService();

    const schedule = listSchedule.execute({
      user_id,
    });

    res.status(200).send(schedule);
    return;
  }
}

export {ListScheduleController}
