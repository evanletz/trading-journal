"use client";

import { useAction, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";

function CheckoutUnlimited() {
  const pay = useAction(api.stripe.pay);
  const router = useRouter();

  async function handleUpgradeClick() {
    const price_type = "unlimited";
    const url = await pay({ price_type });
    router.push(url);
  }

  handleUpgradeClick();
}

export default CheckoutUnlimited;
