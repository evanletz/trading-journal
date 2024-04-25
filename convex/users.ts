import { v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation, mutation, query } from "./_generated/server";
import { getUserId } from "./util";

const FREE_CREDITS = 1
const BASIC_CREDITS = 100
const UNLTD_CREDITS = 999999

export const getUser = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getUserId(ctx)

        if (!userId) {
            return undefined;
        }
        return getFullUser(ctx, userId);
    }
})

export const isUserSubscribed = async (ctx: QueryCtx | MutationCtx) => {
    const userId = await getUserId(ctx)

    if (!userId) {
        return false;
    }

    const userToCheck = await getFullUser(ctx, userId);

    return Boolean(userToCheck && userToCheck.subscriptionId && userToCheck.credits > 0)
}

export const createUser = internalMutation({
    args: {email: v.string(), userId: v.string()},
    handler: async (ctx, args) => {
        await ctx.db.insert("users", {
            userId: args.userId,
            email: args.email,
            credits: FREE_CREDITS,
            currency: '$',
            profileType: 'free'
        })
    }
})

export const deleteUser = internalMutation({
    args: {userId: v.string()},
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query('users')
            .withIndex('by_userId', (q) => q.eq('userId', args.userId))
            .collect() // getting all records with that user id if many
        if (!user) {
            throw new Error('No user found to delete')
        }
        user.map(async (u) => {
            await ctx.db.delete(u._id);
        })
    },
})

export const updateSubscription = internalMutation({
    args: {subscriptionId: v.string(), userId: v.string(), endsOn: v.number(), price: v.number()},
    handler: async (ctx, args) => {
        const user = await getFullUser(ctx, args.userId);

        if (!user) {
            throw new Error('no user found with that user ID')
        }

        let credits = 0
        let profileType = ''
        if (args.price === 2900) {
            credits = BASIC_CREDITS
            profileType = 'basic'
        } else if (args.price === 4900 || args.price === 2000) {
            credits = UNLTD_CREDITS
            profileType = 'unlimited'
        } else {
            credits = 0
            profileType = ''
        }

        await ctx.db.patch(user._id, {
            subscriptionId: args.subscriptionId,
            endsOn: args.endsOn,
            credits: credits,
            modifiedTime: Date.now(),
            profileType: profileType,
            secondarySubscriptionId: user.subscriptionId ?? undefined
        })
    }
})

export const updateSubscriptionBySubId = internalMutation({
    args: {subscriptionId: v.string(), endsOn: v.number()},
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query('users')
            .withIndex('by_subscriptionId', q => q.eq('subscriptionId', args.subscriptionId))
            .first();

        if (!user) {
            throw new Error('no user found with that user ID')
        }

        await ctx.db.patch(user._id, {
            endsOn: args.endsOn,
            modifiedTime: Date.now(),
        })
    }
})

export function getFullUser(ctx: QueryCtx | MutationCtx, userId: string) {
    return ctx.db
        .query('users')
        .withIndex('by_userId', (q) => q.eq('userId', userId))
        .first()
}

export const updateCurrency = mutation({
    args: {
        newCurrency: v.string()
    },
    handler: async (ctx, args) => {
        const user = await getUser(ctx, args);
        if (!user) {
            throw new Error('no user found with that user ID')
        }

        await ctx.db.patch(user._id, {
            currency: args.newCurrency,
            modifiedTime: Date.now(),
        })
    }
})

export const getCurrency = query({
    args: {},
    handler: async (ctx, args) => {
        const user = await getUser(ctx, args);
        if (!user) {
            return ""
        } else {
            return user.currency
        }
    }
})

export const getCredits = query({
    args: {},
    handler: async (ctx, args) => {
        const user = await getUser(ctx, args);
        if (!user) {
            return undefined
        } else {
            return user.credits
        }
    }
})