import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  thumbnails: defineTable({
    title: v.string(),
    userId: v.string(),
    aImage: v.string(),
    aVotes: v.number(),
    bImage: v.string(),
    bVotes: v.number(),
    voteIds: v.array(v.string()),
    profileImage: v.optional(v.string()),
    name: v.optional(v.string()),
    comments: v.array(v.object({
      userId: v.string(),
      text: v.string(),
      createdAt: v.number(),
      name: v.string(),
      profileUrl: v.string(),
    }))
  }),

  users: defineTable({
    userId: v.string(),
    email: v.string(),
    subscriptionId: v.optional(v.string()),
    endsOn: v.optional(v.number()),
    credits: v.number(),
    currency: v.string(),
    modifiedTime: v.optional(v.number()),
    profileType: v.string(),
    secondarySubscriptionId: v.optional(v.string())
  })
    .index('by_userId', ['userId'])
    .index('by_subscriptionId', ['subscriptionId']),

  trades: defineTable({
    userId: v.string(),
    tradeDate: v.string(),
    ticker: v.optional(v.string()),
    pnl: v.optional(v.float64()),
    description: v.optional(v.string()),
    imageId: v.id('_storage'),
    imageUrl: v.string(),
    texts: v.optional(v.array(
      v.object({
        id: v.string(),
        stickerNum: v.number(),
        stickerId: v.number(),
        x: v.number(),
        y: v.number(),
        text: v.optional(v.string()),
      })
    )),
    modifiedTime: v.optional(v.number())
  })
    .index('by_tradeDate', ['tradeDate'])
});