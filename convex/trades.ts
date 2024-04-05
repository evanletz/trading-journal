import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserId } from "./util";
import { getFullUser, isUserSubscribed, getUser } from "./users";

export const createTrade = mutation({
    args: {
        tradeDate: v.string(),
        ticker: v.optional(v.string()),
        pnl: v.optional(v.float64()),
        description: v.optional(v.string()),
        imageId: v.id('_storage'),
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
            ticker: args.ticker?.toUpperCase(),
            pnl: args.pnl,
            description: args.description,
            imageId: args.imageId,
            texts: args.texts
        })
    }
})

export const updateTrade = mutation({
    args: {
        tradeId: v.id('trades'),
        tradeDate: v.string(),
        ticker: v.optional(v.string()),
        pnl: v.optional(v.float64()),
        description: v.optional(v.string()),
        imageId: v.id('_storage'),
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
        const user = await getUser(ctx, args)
        const trade = await ctx.db.get(args.tradeId)
        if (!trade) {
            throw new Error('No trade found with that ID')
        }
        if (user?.userId !== trade?.userId) {
            console.log(user, trade)
            throw new Error('Not authorized to make updates to this record')
        }

        return await ctx.db.patch(trade._id, {
            tradeDate: args.tradeDate,
            ticker: args.ticker,
            pnl: args.pnl,
            description: args.description,
            // imageId: args.imageId,
            texts: args.texts
        })
    }
})

export const getEntry = query({
    args: {entryId: v.id('trades')},
    handler: async (ctx, args) => {
        const entry = await ctx.db.get(args.entryId)
        if (!entry) {
            return null;
        }

        const isSubscribed = await isUserSubscribed(ctx)
        if (!isSubscribed) {
            throw new Error('You must be signed in to view this journal entry')
        }

        return entry
    }
})

export const getEntriesForUser = query({
    args: {},
    handler: async(ctx, args) => {
        const userId = await getUserId(ctx)
        if (!userId) {
            return [];
        }

        const entries = await ctx.db.query('trades').filter((q) => 
            q.eq(q.field('userId'), userId))
            .collect()
        return Promise.all(
            entries.map(async (entry) => ({
                ...entry,
                ...{imageUrl: await ctx.storage.getUrl(entry.imageId) || ""}
            }))
        )
    }
})