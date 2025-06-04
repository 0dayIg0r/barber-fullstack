import prismaClient from "../../prisma";

interface NewScheduleRequest {
  user_id: string;
  haircut_id: string;
  customer: string;
}

class NewScheduleService {
  async execute({ user_id, haircut_id, customer }: NewScheduleRequest) {
    if (customer === "" || haircut_id === "") {
      throw new Error("Não foi possível agendar o serviço"); 
    }

    const userExists = await prismaClient.user.findUnique({
      where: { id: user_id },
    });
    const haircutExists = await prismaClient.haircut.findUnique({
      where: { id: haircut_id },
    });
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }
    if (!haircutExists) {
      throw new Error("Corte de cabelo não encontrado");
    }
    const schedule = await prismaClient.service.create({
      data: {
        user_id,
        haircut_id,
        customer,
      },
    });
    return schedule;
  }
}

export { NewScheduleService };
