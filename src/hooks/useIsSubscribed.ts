import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

export function useIsSubscribed() {
    // call this only during other convex queries? like "isSubscribed"
    const user = useQuery(api.users.getUser)
    return Boolean(user && user.subscriptionId && user.credits > 0)
};