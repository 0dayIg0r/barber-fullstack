import { Request, Response } from "express";
import { FinishScheduleService } from "../../service/schedule/FinishScheduleService";

class FinishScheduleController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const schedule_id = req.query.schedule_id as string;

    
    if (!user_id || !schedule_id) {
      return res.status(400).json({ error: "O ID do usuário e o ID do agendamento são obrigatórios." });
    }

    const finishSchedule = new FinishScheduleService();

    try {
      const schedule = await finishSchedule.execute({
        user_id,
        schedule_id,
      });
      return res.status(200).json(schedule);
    } catch (error) {
  
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}

export { FinishScheduleController };
