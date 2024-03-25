import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(imageId: string) {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${imageId}`
}



// export const getImageUrls = query({
//   args: {imageId: v.id('_storage')},
//   handler: async (ctx, args) => {
//     return await ctx.storage.getUrl(args.imageId)
//   }
// })

// const imageUrl = useQuery(api.files.getImageUrls, {
//   imageId: imageA as Id<"_storage">,
// });
// if (!imageUrl) {
//   throw new Error("No image found!");
// }