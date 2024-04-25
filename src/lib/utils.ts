import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Doc, Id } from "../../convex/_generated/dataModel";
import Stripe from "stripe";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(imageId: string) {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${imageId}`
}

interface EntriesByDate {
  [key: string]: [Doc<"trades">]
}
export function groupByDate(entries: Doc<"trades">[]) {
  let result: EntriesByDate = {}
  entries.map((entry) => {
    const tradeDate = entry.tradeDate.slice(0, 10)
    if (!(tradeDate in result)) {
      result[tradeDate] = [entry]
    } else {
      result[tradeDate].push(entry)
    }
  })
  const ordered = Object.keys(result)
    .sort()
    .reverse()
    .reduce<{ [key: string]: any }>(
      (obj, key) => {
        obj[key] = result[key];
        return obj
      }, {}
    )
  return ordered
}

export async function confirmPayment(paymentIntent: string) {
  // check if user subscribed by confirming payment intent is 'succeeded'
  // also add profileType as second arg to check that price of payment
  // intent matches up. if price is $20 then check secondary 
  // payment intent field
  if (paymentIntent === undefined) {
    return false
  }

  const stripe = new Stripe(process.env.STRIPE_KEY!, {
    apiVersion: "2023-10-16",
  });

  try {
    const confirmation = await stripe.paymentIntents.retrieve(paymentIntent)
    return confirmation.status === 'succeeded'
  } catch {
    return false
  }
}