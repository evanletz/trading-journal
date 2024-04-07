"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import { getImageUrls } from "../../../convex/files";
import { groupByDate } from "@/lib/utils";
import { Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { DeleteButton } from "@/components/cancel-button";

type TradesWithImageUrl = {
  _id: string;
  userId: string;
  tradeDate: string;
  ticker: string;
  pnl: number;
  description: string;
  imageId: string;
  imageUrl: string;
  texts: [];
};

export default function DashboardPage() {
  const entries = useQuery(api.trades.getEntriesForUser);
  const entriesByDate = groupByDate(entries ?? []);

  const currency = useQuery(api.users.getCurrency);
  const deleteFunc = useMutation(api.trades.deleteEntry);

  return (
    <div>
      {entries?.length == 0 && (
        <div className="flex mt-12 text-xl items-center justify-center">
          <p>Create a new journal entry to see your past trades here!</p>
        </div>
      )}
      {entries &&
        Object.entries(entriesByDate).map(([date, entries]) => {
          return (
            <>
              <h2 className="mt-12 text-3xl font-bold">
                {format(parseISO(date), "EEEE, MMMM do yyyy")}
              </h2>
              <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 gap-8">
                {entries?.map((entry: TradesWithImageUrl) => {
                  return (
                    <Card key={entry._id}>
                      <CardHeader className="items-center">
                        <Image
                          src={entry.imageUrl}
                          width="300"
                          height="300"
                          alt="journal image"
                        />
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2 items-center justify-center">
                          <p>{entry.ticker}</p>
                          <span className="flex items-center gap-2">
                            {entry.pnl > 0 && (
                              <>
                                <TrendingUp color="green" />
                                <p>
                                  {currency}
                                  {entry.pnl}
                                </p>
                              </>
                            )}
                            {entry.pnl < 0 && (
                              <>
                                <TrendingDown color="red" />
                                <p>
                                  {currency}
                                  {entry.pnl}
                                </p>
                              </>
                            )}
                            {entry.pnl === 0 && (
                              <>
                                <p>
                                  {currency}
                                  {entry.pnl}
                                </p>
                              </>
                            )}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex gap-4 w-full">
                          <Button className="flex-1" asChild>
                            <Link href={`/trades/${entry._id}`}>
                              View Trade
                            </Link>
                          </Button>
                          <DeleteButton
                            deleteFunc={deleteFunc}
                            args={{ tradeId: entry._id as Id<"trades"> }}
                          />
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </>
          );
        })}
    </div>
  );
}
