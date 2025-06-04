import { Request, Response } from "express";
import { NewScheduleService } from "../../service/schedule/NewScheduleService";

class NewScheduleController {
  async handle(req: Request, res: Response) {
    const { haircut_id, customer } = req.body;
    const user_id = req.user_id;

    if (!haircut_id || !customer) {
      return res.status(400).send({ error: "haircut_id e customer são obrigatórios." });
    }

    const newSchedule = new NewScheduleService();

    try {
      const schedule = await newSchedule.execute({
        user_id,
        haircut_id,
        customer,
      });

      return res.status(201).send(schedule);
    } catch (error) {
      
      return res.status(500).send({ error: "Ocorreu um erro ao criar o agendamento." });
    }
  }
}

export { NewScheduleController };
