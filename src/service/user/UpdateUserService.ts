import prismaClient from "../../prisma";


interface UpdateRequest {
  user_id: string;
  name: string;
  address: string;
}

class UpdateUserService {
  async execute({ user_id, name, address }: UpdateRequest) {
    try {
      const userAlreadyExists = await prismaClient.user.findFirst({
        where: {
          id: user_id,
        },
      });

      if (!userAlreadyExists) {
        throw new Error("Falha ao editar usuário");
      }

      const userUpdated = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          name,
          address,
        },
        select: {
          name: true,
          email: true,
          address: true,
        },
      });

      return userUpdated;
    } catch (err) {
      throw new Error("Falha ao atualizar os dados.");
    }
  }
}

export { UpdateUserService };
