import { Request, Response } from "express";
import { NewScheduleService } from "../../service/schedule/NewScheduleService";

class NewScheduleController {
  async handle(req: Request, res: Response) {
    const { haircut_id, customer } = req.body;
    const user_id = req.user_id;

    if (!haircut_id || !customer) {
      res.status(400).send({ error: "haircut_id e customer são obrigatórios." });
      return 
    }

    const newSchedule = new NewScheduleService();

    try {
      const schedule = await newSchedule.execute({
        user_id,
        haircut_id,
        customer,
      });

      res.status(201).send(schedule);
      return
    } catch (error) {
      
      res.status(500).send({ error: "Ocorreu um erro ao criar o agendamento." });
      return
    }
  }
}

export { NewScheduleController };
