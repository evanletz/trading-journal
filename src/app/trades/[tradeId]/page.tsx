"use client";

import { useParams } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ImageEditor } from "@/components/ui/image-editor";

export default function TradesPage() {
  const params = useParams<{ tradeId: Id<"trades"> }>();
  const trade = useQuery(api.trades.getEntry, {
    entryId: params.tradeId,
  });
  if (!trade) {
    throw new Error('Error: unable to retrieve this entry.')
  }
  return <ImageEditor image={trade?.imageId} trade={trade} />;
}
