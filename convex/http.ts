import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

const http = httpRouter();

http.route({
    path: '/stripe',
    method: 'POST',
    handler: httpAction(async (ctx, request) => {
        const signature = request.headers.get('stripe-signature') as string

        const result = await ctx.runAction(internal.stripe.fulfill, {
            payload: await request.text(),
            signature
        });

        if (result.success) {
            return new Response(null, {
                status: 200
            });
        } else {
            return new Response("Webhook Error", {
                status: 400
            });
        }
    })
})

http.route({
    path: '/clerk',
    method: 'POST',
    handler: httpAction(async (ctx, request) => {
        const payloadString = await request.text();
        const headerPayload = request.headers;

        try {
            const result = await ctx.runAction(internal.clerk.fulfill, {
                headers: {
                    'svix-id': headerPayload.get('svix-id')!,
                    'svix-timestamp': headerPayload.get('svix-timestamp')!,
                    'svix-signature': headerPayload.get('svix-signature')!,
                },
                payload: payloadString,
            })

            switch(result.type) {
                case "user.created":
                    await ctx.runMutation(internal.users.createUser, {
                        userId: result.data.id,
                        email: result.data.email_addresses[0]?.email_address
                    })
                    break
                case "user.deleted":
                    const id = result.data.id!
                    await ctx.runMutation(internal.users.deleteUser, {
                        userId: id
                    })
                    break
            }

            return new Response(null, {
                status: 200
            })

        } catch (err) {
            return new Response(err as string, {
                status: 400
            })
        }
    })
})

export default http