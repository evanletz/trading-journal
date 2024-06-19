import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import Stripe from "stripe"
import { internal } from "./_generated/api";
import { httpRouter } from "convex/server";

const http = httpRouter();

type Metadata = {
    userId: string
}

export const pay = action({
  args: { price_type: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) {
        throw new Error('you must be logged in to subscribe');
    }

    if (!user.emailVerified) {
      throw new Error('you must have a verified email to subscribe')
    }

    let price
    if (args.price_type === 'basic') {
      price = process.env.PRICE_BASIC_ID
    } else if (args.price_type === 'unlimited') {
      price = process.env.PRICE_UNLTD_ID
    } else if (args.price_type === 'upgrade') {
      price = process.env.PRICE_UPGRADE_ID
    } else {
      throw new Error('No product defined')
    }

    const domain = process.env.HOSTING_URL ?? "http://localhost:3000";
    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: "2023-10-16",
    });
    const session = await stripe.checkout.sessions.create({
      line_items: [{price: price, quantity: 1}],
      customer_email: user.email,
      metadata: {
        userId: user.subject,
      },
      mode: "payment",
      success_url: `${domain}/create`,
      cancel_url: `${domain}`,
      // allow_promotion_codes: true,
      discounts: [
        {
          coupon: process.env.LAUNCH_COUPON_ID
        }
      ]
    });

    return session.url!;
  },
});

export const fulfill = internalAction({
  args: { signature: v.string(), payload: v.string() },
  handler: async (ctx, args) => {
    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: "2023-10-16",
    });

    const webhookSecret = process.env.STRIPE_WEBHOOKS_SECRET as string;
    try {
      const event = await stripe.webhooks.constructEventAsync(
        args.payload,
        args.signature,
        webhookSecret
      );

      const completedEvent = event.data.object as Stripe.Checkout.Session & {
        metadata: Metadata;
      }
      if (event.type === "checkout.session.completed") {
        const userId = completedEvent.metadata.userId;

        await ctx.runMutation(internal.users.updateSubscription, {
          userId,
          subscriptionId: completedEvent.payment_intent as string ?? "promo_" + completedEvent.id,
          endsOn: 0,
          price: completedEvent.amount_subtotal!
        })
      }

      if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
          completedEvent.subscription as string
        )

        await ctx.runMutation(internal.users.updateSubscriptionBySubId, {
          subscriptionId: subscription.items.data[0]?.price.id,
          endsOn: subscription.current_period_end * 1000
        })
      }

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: (err as { message: string }).message };
    }
  },
});