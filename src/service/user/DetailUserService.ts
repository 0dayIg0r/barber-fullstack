import prismaClient from "../../prisma";
interface UserRequest {
  user_id: string;
}

class UserDetailService {
  async execute({ user_id }: UserRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        service: true,
        created_at: true,
        subscriptions: {
          select: {
            id: true,
            priceId: true,
            status: true,
          },
        },
      },
    });

    return user;
  }
}

export { UserDetailService };
