import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
 
export const generateUploadUrl = mutation({
  args: {
    // ...
  },
  handler: async (ctx, args) => {
    // use `args` and/or `ctx.auth` to authorize the user
    // ...
 
    // Return an upload URL
    return await ctx.storage.generateUploadUrl();
  },
});

export const getImageUrls = query({
  args: {imageId: v.id('_storage')},
  handler: async (ctx, args) => {
    let imageUrl = null
    try {
      imageUrl = await ctx.storage.getUrl(args.imageId)
    } catch {
      imageUrl = ""
    }
    if (!imageUrl) {
      imageUrl = ""
    }
    return imageUrl
  }
})