import prismaClient from "../prisma";
import { stripe } from "./stripe";

export async function saveSubscription(
  subscriptionId: string,
  custimerId: string,
  createAction = false,
  deleteAction = false
) {
  const findUser = await prismaClient.user.findFirst({
    where: {
      stripe_customer_id: custimerId,
    },
    include: {
      subscriptions: true,
    },
  });

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id as string,
    userId: findUser?.id as string,
    status: subscription.status as string,
    priceId: subscription.items.data[0].price.id as string,
  };

  if (createAction) {
    try {
    await prismaClient.subscription.upsert({
      where: {
        id: subscriptionData.id,
      },
      update: {
        status: subscriptionData.status,
        userId: subscriptionData.userId,
        priceId: subscriptionData.priceId,
      },
      create: subscriptionData,
    });
  } catch (e: any) {
    console.error("Erro ao salvar ou atualizar a assinatura:", e.message);
  }
  } else {
    if (deleteAction) {
      await prismaClient.subscription.delete({
        where: {
          id: subscriptionId,
        },
      });

      return;
    }

    try {

        await prismaClient.subscription.update({
            where:{
                id: subscriptionId
            },
            data:{
                status: subscription.status,
                priceId: subscription.items.data[0].price.id
            }
        })
        
    } catch (e:any) {
        console.log(e.message)
        throw new Error(e.message)
    }
  }
}
