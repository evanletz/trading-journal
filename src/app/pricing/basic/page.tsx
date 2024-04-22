"use client";

import { useAction, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";

function CheckoutBasic() {
  const pay = useAction(api.stripe.pay);
  const router = useRouter();

  async function handleUpgradeClick() {
    const price_type = "basic";
    const url = await pay({ price_type });
    router.push(url);
  }

  handleUpgradeClick();
}

export default CheckoutBasic;
