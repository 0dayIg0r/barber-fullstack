import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../../utils/stripe";
import { saveSubscription } from "../../utils/managerSubscription";
import dotenv from "dotenv";

dotenv.config();

export class WebHookController {
  async handle(req: Request, res: Response) {
    let event: Stripe.Event;

    const signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature as string,
        process.env.STRIPE_WEBHOOK_SECRET as string,
      );
    } catch (err: any) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    try {
      switch (event.type) {
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          const createAction = event.type === "customer.subscription.created";
          const deleteAction = event.type === "customer.subscription.deleted";

          await saveSubscription(
            subscription.id,
            subscription.customer.toString(),
            createAction,
            deleteAction
          );
          break;
        }

        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;

          // Verifique se subscription e customer existem antes de chamar saveSubscription
          if (session.subscription && session.customer) {
            await saveSubscription(
              session.subscription.toString(),
              session.customer.toString(),
              true // createAction é true para checkout.session.completed
            );
          } else {
            // Log para identificar casos onde subscription ou customer são nulos
            console.warn(
              "⚠️ Webhook: checkout.session.completed recebido sem subscription ou customer. Session ID:",
              session.id,
              "Subscription:",
              session.subscription,
              "Customer:",
              session.customer
            );
            
          }
          break;
        }

        case "invoice.payment_succeeded":
        case "payment_intent.succeeded":
        case "payment_intent.created":
        case "charge.succeeded":
        case "invoice.created":
        case "invoice.finalized":
        case "payment_method.attached":
          // Esses eventos são ignorados intencionalmente, mas podem ser logados se necessário para depuração
          break;

        default:
          // Logar tipos de eventos não tratados para monitoramento
          console.log(`Unhandled event type: ${event.type}`);
          break;
      }

      res.status(200).send();
      return;
    } catch (error: any) { 
      res.status(500).send("Erro interno ao processar webhook");
      return;
    }
  }
}