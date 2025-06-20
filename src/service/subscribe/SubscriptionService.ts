import prismaClient from "../../prisma";
import { stripe } from "../../utils/stripe";

interface SubRequest {
  user_id: string;
}

class SubscribeService {
  async execute({ user_id }: SubRequest) {
    const findUser = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    let customerId = findUser?.stripe_customer_id;

    if (!customerId) {
      const striperCustomer = await stripe.customers.create({
        email: findUser?.email,
      });

      await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          stripe_customer_id: striperCustomer.id as string,
        },
      });

      customerId = striperCustomer.id;
    }

    //    iniciar checkout de pagamento

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE,
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STIPE_SUCCESS_URL,
      cancel_url: process.env.STIPE_SUCCESS_URL,
    });

    return { sessionId: stripeCheckoutSession.id };
  }
}
export { SubscribeService };
