"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Authenticated,
  useMutation,
  usePaginatedQuery,
  useQuery,
} from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Id } from "../../../convex/_generated/dataModel";
import { groupByDate } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { DeleteButton } from "@/components/cancel-button";
import { useUser } from "@clerk/clerk-react";

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

function Trades() {
  const { user } = useUser();
  const currency = useQuery(api.users.getCurrency);
  const deleteFunc = useMutation(api.trades.deleteEntry);
  const {
    results: entries,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.trades.getEntriesForUser,
    { userId: user?.id! },
    { initialNumItems: 15 }
  );
  const entriesByDate = groupByDate(entries ?? []);
  let totalTrades = 0;
  let pnls = [];
  let totalPnl = "0";
  let winRate = 0;
  let avgPnl = "0";
  let avgWin = "0";
  let avgLoss = "0";
  if (entries.length > 0) {
    totalTrades = entries.length;
    pnls = entries.map((entry) => entry.pnl!);
    totalPnl = pnls.reduce((a, b) => a + b).toLocaleString();
    const numWinningTrades = pnls.reduce((a, b) => a + (b > 0 ? 1 : 0), 0); // count of pnls > 0
    const numLosingTrades = pnls.reduce((a, b) => a + (b < 0 ? 1 : 0), 0); // count of pnls < 0
    const sumWinningTrades = pnls.reduce((a, b) => a + (b > 0 ? b : 0), 0); // sum of pnls > 0
    const sumLosingTrades = pnls.reduce((a, b) => a + (b < 0 ? b : 0), 0); // sum of pnls < 0
    winRate = Math.round((numWinningTrades / totalTrades) * 100);
    avgPnl = Math.round(sumWinningTrades / totalTrades).toLocaleString() || "0";
    avgWin =
      Math.round(sumWinningTrades / numWinningTrades).toLocaleString() || "0";
    avgLoss =
      Math.round(sumLosingTrades / numLosingTrades).toLocaleString() || "0";
  }

  if (entries?.length == 0) {
    return (
      <div className="flex mt-12 text-xl items-center justify-center">
        <p>Create a new journal entry to see your past trades here!</p>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex m-auto sm:m-8 rounded-2xl justify-items-center gap-1 grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2">
          <div className="border min-h-24 text-center bg-gray-900 w-36 sm:w-48 flex flex-col items-center justify-center rounded">
            <p className="text-xl font-bold">{totalTrades}</p>
            <p>Total Trades</p>
          </div>
          <div className="border min-h-24 text-center bg-gray-900 w-36 sm:w-48 flex flex-col items-center justify-center rounded">
            <p className="text-xl font-bold">
              {currency}
              {totalPnl}
            </p>
            <p>Total PnL</p>
          </div>
          <div className="border min-h-24 text-center bg-gray-900 w-36 sm:w-48 flex flex-col items-center justify-center rounded">
            <p className="text-xl font-bold">{winRate}%</p>
            <p>Win Rate</p>
          </div>
          <div className="border min-h-24 text-center bg-gray-900 w-36 sm:w-48 flex flex-col items-center justify-center rounded">
            <p className="text-xl font-bold">
              {currency}
              {avgPnl}
            </p>
            <p>Avg. PnL</p>
          </div>
          <div className="border min-h-24 text-center bg-gray-900 w-36 sm:w-48 flex flex-col items-center justify-center rounded">
            <p className="text-xl font-bold">
              {currency}
              {avgWin}
            </p>
            <p>Avg. Win</p>
          </div>
          <div className="border min-h-24 text-center bg-gray-900 w-36 sm:w-48 flex flex-col items-center justify-center rounded">
            <p className="text-xl font-bold">
              {currency}
              {avgLoss}
            </p>
            <p>Avg. Loss</p>
          </div>
        </div>
        {Object.entries(entriesByDate).map(([date, entries]) => {
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
                                  {entry.pnl.toLocaleString()}
                                </p>
                              </>
                            )}
                            {entry.pnl < 0 && (
                              <>
                                <TrendingDown color="red" />
                                <p>
                                  {currency}
                                  {entry.pnl.toLocaleString()}
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

                {status === "CanLoadMore" && (
                  <div className="w-full mt-8 mb-16 flex flex-col items-center">
                    <Button size={"lg"} onClick={() => loadMore(15)}>
                      Load More
                    </Button>
                  </div>
                )}
              </div>
            </>
          );
        })}
      </>
    );
  }
}

export default function DashboardPage() {
  return (
    <div className="min-h-96">
      <Authenticated>
        <Trades />
      </Authenticated>
    </div>
  );
}
