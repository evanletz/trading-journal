import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getFullUser } from "./users";
import { paginationOptsValidator } from "convex/server";
import { getUser, getUserId } from "./util";

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

        const fullUser = await getFullUser(ctx, userId);
        if (!fullUser) {
            throw new Error('No user with that ID found')
        }
        if (fullUser.credits <= 0) {
            throw new Error('You ran out of credits! Upgrade to create a new trade.')
        }

        const imageUrl = await ctx.storage.getUrl(args.imageId)

        await ctx.db.patch(fullUser._id, {
            credits: Math.max(0, fullUser.credits - 1)
        })

        return await ctx.db.insert('trades', {
            userId: fullUser.userId,
            tradeDate: args.tradeDate,
            ticker: args.ticker?.toUpperCase(),
            pnl: args.pnl,
            description: args.description,
            imageId: args.imageId,
            imageUrl: imageUrl || "",
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
        const userId = await getUserId(ctx)
        const trade = await ctx.db.get(args.tradeId)
        if (!trade) {
            throw new Error('No trade found with that ID')
        }
        if (userId !== trade?.userId) {
            throw new Error('Not authorized to make updates to this record')
        }

        return await ctx.db.patch(trade._id, {
            tradeDate: args.tradeDate,
            ticker: args.ticker,
            pnl: args.pnl,
            description: args.description,
            texts: args.texts,
            modifiedTime: Date.now(),
        })
    }
})

export const getEntry = query({
    args: { entryId: v.id('trades') },
    handler: async (ctx, args) => {
        const userId = await getUserId(ctx)
        const entry = await ctx.db.get(args.entryId)
        if (!entry) {
            return null;
        }

        if (userId !== entry?.userId) {
            return null
        }

        return entry
    }
})

export const getEntriesForUser = query({
    args: { paginationOpts: paginationOptsValidator, userId: v.optional(v.union(v.string(), v.null())) },
    handler: async (ctx, args) => {
        const userId = args.userId
        if (!userId) {
            throw new Error('Error: could not find user.');
        }

        return await ctx.db.query('trades')
            .withIndex('by_tradeDate')
            .filter((q) => 
            q.eq(q.field('userId'), userId))
            .order('desc')
            .paginate(args.paginationOpts)
    }
})

export const deleteEntry = mutation({
    args: { tradeId: v.id("trades") },
    handler: async (ctx, args) => {
        const userId = await getUserId(ctx)
        const trade = await ctx.db.get(args.tradeId)
        if (!trade) {
            throw new Error('No trade found with that ID')
        }
        if (userId !== trade?.userId) {
            throw new Error('You are not authorized to make updates to this record')
        }

        return await ctx.db.delete(trade._id)
    }
})