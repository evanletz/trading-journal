"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { formatDistance } from "date-fns";

export default function DashboardPage() {
  const thumbnails = useQuery(api.thumbnails.getThumbnailsForUser);
  const sortedThumbnails = [...(thumbnails ?? [])].reverse();

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8">
      {thumbnails?.map((thumbnail) => {
        return (
          <Card key={thumbnail._id}>
            <CardHeader className="items-center">
              <Image
                src={getImageUrl(thumbnail.aImage)}
                width="200"
                height="200"
                alt="thumbnail image"
              />
            </CardHeader>
            <CardContent>
              <p>{thumbnail.title}</p>
              <p>
                {formatDistance(new Date(thumbnail._creationTime), new Date(), {
                  addSuffix: true,
                })}
              </p>
              <p>Votes: {thumbnail.aVotes + thumbnail.bVotes}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/thumbnails/${thumbnail._id}`}>View Results</Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
