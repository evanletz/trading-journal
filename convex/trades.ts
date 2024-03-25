import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserId } from "./util";
import { getFullUser, isUserSubscribed } from "./users";

export const createTrade = mutation({
    args: {
        tradeDate: v.optional(v.string()),
        ticker: v.optional(v.string()),
        pnl: v.optional(v.number()),
        description: v.optional(v.string()),
        imageId: v.string(),
        texts: v.array(
          v.object({
            id: v.string(),
            stickerNum: v.number(),
            stickerId: v.number(),
            x: v.number(),
            y: v.number(),
            text: v.optional(v.string()),
          })
        ),
      },
    handler: async (ctx, args) => {
        const userId = await getUserId(ctx)
        if (!userId) {
            return [];
        }

        const isSubscribed = await isUserSubscribed(ctx)
        const user = await getFullUser(ctx, userId);
        if (!user) {
            throw new Error('No user with that ID found')
        }
        if (!isSubscribed && user.credits <= 0) {
            throw new Error('You must be subscribed to create a new trade')
        }
        await ctx.db.patch(user._id, {
            credits: Math.max(0, user.credits - 1)
        })

        return await ctx.db.insert('trades', {
            userId: userId,
            tradeDate: args.tradeDate,
            ticker: args.ticker,
            pnl: args.pnl,
            description: args.description,
            imageId: args.imageId,
            texts: args.texts
        })
    }
})