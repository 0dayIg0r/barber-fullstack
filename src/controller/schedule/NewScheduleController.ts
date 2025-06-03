import { Request, Response } from "express";
import { NewScheduleService } from "../../service/schedule/NewScheduleService";

class NewScheduleController {
  async handle(req: Request, res: Response) {
    const { haircut_id, customer } = req.body;
    const user_id = req.user_id;

    const newSchedule = new NewScheduleService();

    const schedule = newSchedule.execute({
      user_id,
      haircut_id,
      customer,
    });
    console.log(schedule);

    res.status(201).send(schedule);
  }
}

export { NewScheduleController };
