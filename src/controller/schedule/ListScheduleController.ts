import { Request, Response } from "express";
import { ListScheduleService } from "../../service/schedule/ListScheduleService";

class ListScheduleController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    if (!user_id) {
      return res.status(400).json({ error: "O ID do usuário é obrigatório." });
    }

    const listSchedule = new ListScheduleService();
    
    try {
      const schedule = await listSchedule.execute({ user_id });
      return res.status(200).json(schedule);
    } catch (error) {

      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}

export { ListScheduleController };
