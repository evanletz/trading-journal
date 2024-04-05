"use client";

import { useState } from "react";
import Image from "next/image";
import { Info, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { ScrollArea } from "./scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Textarea } from "./textarea";
import { UpgradeButton } from "../upgrade-button";
import { Button } from "./button";
import Link from "next/link";
import { Label } from "./label";
import { Input } from "./input";
import { AlertButton } from "../cancel-button";
import { z } from "zod";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";
import { useIsSubscribed } from "@/hooks/useIsSubscribed";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Doc, Id } from "../../../convex/_generated/dataModel";

type ImageEditorProps = {
  image: string;
  trade?: Doc<"trades">;
};

export const ImageEditor = (props: ImageEditorProps) => {
  interface Sticker {
    stickerNum: number;
    stickerId: number;
    x: number;
    y: number;
    text?: string;
  }

  const formSchema = z.object({
    tradeDate: z.string().or(z.literal("")),
    ticker: z.optional(z.string().min(0).max(10)),
    pnl: z.optional(z.number()),
    description: z.optional(z.string().min(0).max(500)),
    texts: z.array(
      z.object({
        stickerNum: z.number(),
        stickerId: z.number(),
        x: z.number(),
        y: z.number(),
        text: z.optional(z.string().min(0).max(200)),
      })
    ),
  });

  const { register, control, reset } = useForm<
    z.infer<typeof formSchema>,
    FieldValues
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tradeDate: props.trade?.tradeDate,
      ticker: props.trade?.ticker,
      pnl: props.trade?.pnl || 0,
      description: props.trade?.description,
      texts: props.trade?.texts,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "texts",
  });

  const [draggingStickerId, setDraggingStickerId] = useState<number | null>(
    null
  );
  const [offset, setOffset] = useState<{
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [stickerNum, setStickerNum] = useState<number>(0);
  const [stickers, setStickers] = useState<Sticker[]>(props.trade?.texts || []);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = document.body.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStickerNum(stickerNum + 1);

    const id = Date.now(); // Unique ID for the sticker
    let newSticker = { stickerNum: stickerNum, stickerId: id };
    append({ ...newSticker, ...{ x: x, y: y } });
    setStickers([...stickers, { ...newSticker, ...{ x: x, y: y } }]);
  };

  const handleStickerMouseDown = (
    id: number,
    e: React.MouseEvent<SVGSVGElement>
  ) => {
    setDraggingStickerId(id);
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setOffset({ offsetX, offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (draggingStickerId !== null && offset) {
      const index = stickers.findIndex(
        (sticker) => sticker.stickerId === draggingStickerId
      );
      if (index !== -1) {
        const rect = document.body.getBoundingClientRect();
        const imageRect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - offset.offsetX;
        // const x =
        //   e.clientX - rect.left - offset.offsetX < imageRect.left
        //     ? imageRect.left
        //     : e.clientX > imageRect.right
        //     ? imageRect.right
        //     : e.clientX - rect.left - offset.offsetX;
        const y = e.clientY - rect.top - offset.offsetY;
        const updatedPositions = [...stickers];
        updatedPositions[index] = { ...updatedPositions[index], x, y };
        setStickers(updatedPositions);
      }
    }
  };

  const handleMouseUp = () => {
    setDraggingStickerId(null);
    setOffset(null);
  };

  const handleStickerDelete = (id: number) => {
    const updatedPositions = stickers.filter(
      (sticker) => sticker.stickerId !== id
    );
    setStickers(updatedPositions);

    // Reassign stickerNum to the remaining stickers
    updatedPositions.map((sticker, index) => {
      sticker.stickerNum = index;
    });
    setStickerNum(updatedPositions.length);

    // Remove corresponding text input
    const updatedStickerTexts = stickers.filter(
      (text) => text.stickerId !== id
    );
    setStickers(updatedStickerTexts);

    updatedStickerTexts.map((stickerText, index) => {
      stickerText.stickerNum = index;
    });
  };

  const { toast } = useToast();
  const router = useRouter();
  const isSubscribed = useIsSubscribed();
  const currency = useQuery(api.users.getCurrency);
  const createTrade = useMutation(api.trades.createTrade);
  const updateTrade = useMutation(api.trades.updateTrade);

  const [imageA, setImageA] = useState(props.image);
  const imageUrl = useQuery(api.files.getImageUrls, {
    imageId: imageA as Id<"_storage">,
  }) as string;

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4 mb-8">
      <div
        className="flex flex-col col-span-2 gap-4 rounded p-2 items-right justify-center border"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div>
          <Image
            src={imageUrl}
            width="1000"
            height="1000"
            alt="Uploaded Trade Image"
            onClick={handleImageClick}
            style={{ cursor: "crosshair" }}
          />
        </div>
        {stickers.map(({ stickerId, x, y }) => (
          <div
            id={stickerId.toString()}
            key={stickerId}
            style={{ position: "absolute", left: x, top: y }}
          >
            <Info
              style={{ cursor: "move", fill: "black" }}
              onMouseDown={(e) => handleStickerMouseDown(stickerId, e)}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col col-span-1 gap-4">
        <Tabs defaultValue="details" activationMode="manual">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <ScrollArea className="h-96 w-full rounded-md border">
              <Card>
                <CardHeader>
                  <CardTitle>Details</CardTitle>
                  <CardDescription>Create your trade's story.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <form id="trade-details-form">
                    {fields.map((field, index) => (
                      <>
                        <div className="flex gap-4 space-y-5">
                          <div className="space-y-2">
                            <label>{index + 1}</label>
                            <Trash2
                              style={{
                                cursor: "pointer",
                                stroke: "red",
                              }}
                              onClick={() => {
                                handleStickerDelete(field.stickerId);
                                remove(index);
                              }}
                            />
                          </div>
                          <div className="w-full">
                            <Textarea
                              {...register(`texts.${index}.text`)}
                              defaultValue={field.text}
                              maxLength={200}
                              onChangeCapture={(e) => {
                                field.text = e.currentTarget.value;
                              }}
                              key={field.id}
                            />
                          </div>
                        </div>
                      </>
                    ))}
                  </form>
                </CardContent>
              </Card>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="summary">
            <ScrollArea className="h-96 w-full rounded-md border">
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                  <CardDescription>
                    Save some information about your trade.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    id="trade-summary-form"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!isSubscribed) {
                        toast({
                          title:
                            "You must be subscribed to create a new entry!",
                          variant: "destructive",
                        });
                      }
                      const summaryForm = document.getElementById(
                        "trade-summary-form"
                      ) as HTMLFormElement;
                      const formSummaryData = new FormData(summaryForm);
                      const isFormValid = formSchema.safeParse({
                        tradeDate: formSummaryData.get("tradeDate") as string,
                        ticker: formSummaryData.get("ticker") as string,
                        pnl: parseFloat(formSummaryData.get("pnl") as string),
                        description: formSummaryData.get(
                          "description"
                        ) as string,
                        imageId: imageA,
                        texts: fields,
                      });
                      if (isFormValid.success) {
                        try {
                          const formData = {
                            tradeDate: formSummaryData.get(
                              "tradeDate"
                            ) as string,
                            ticker: formSummaryData.get("ticker") as string,
                            pnl: parseFloat(
                              formSummaryData.get("pnl") as string
                            ),
                            description: formSummaryData.get(
                              "description"
                            ) as string,
                            imageId: imageA as Id<"_storage">,
                            texts: fields,
                          };
                          if (props.trade?._id) {
                            console.log("updating", props.trade._id);
                            const tradeId = await updateTrade({
                              ...{ tradeId: props.trade._id },
                              ...formData,
                            });
                            toast({
                              title: "Trade entry updated!",
                              description: (
                                <div>
                                  <Button asChild>
                                    <Link href="/create">
                                      Create another entry
                                    </Link>
                                  </Button>
                                </div>
                              ),
                            });
                          } else {
                            console.log("creating new trade");
                            const tradeId = await createTrade(formData);
                            toast({
                              title: "New trade created!",
                              description: (
                                <div>
                                  <Button asChild>
                                    <Link href="/create">
                                      Create another entry
                                    </Link>
                                  </Button>
                                </div>
                              ),
                            });
                          }
                          router.push(`/dashboard`);
                        } catch (err) {
                          toast({
                            title: "You ran out of journal entries",
                            description: (
                              <div>
                                <UpgradeButton /> to journal more trades
                              </div>
                            ),
                            variant: "destructive",
                          });
                        }
                      }
                    }}
                    onReset={() => {
                      reset();
                      reset({ texts: [] });
                      setStickers([]);
                      setImageA("");
                    }}
                  >
                    <div className="mt-4">
                      <Label htmlFor="tradeDate">Date</Label>
                      <Input
                        {...register(`tradeDate`)}
                        id="tradeDate"
                        type="datetime-local"
                        required
                      />
                    </div>
                    <div className="flex gap-4 items-center mt-4">
                      <div>
                        <Label htmlFor="ticker">Ticker</Label>
                        <Input
                          {...register(`ticker`)}
                          id="ticker"
                          type="text"
                          maxLength={10}
                          placeholder="e.g. SPY, NQ, BTC"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pnl">Profit/Loss ({currency})</Label>
                        <Input
                          {...register(`pnl`)}
                          id="pnl"
                          type="number"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        {...register(`description`)}
                        id="description"
                        maxLength={500}
                        placeholder="How did you feel during this trade? What did you learn?"
                      />
                    </div>
                    <div className="flex gap-12 items-center justify-center mt-8">
                      <AlertButton
                        resetFunc={() => router.push("/dashboard")}
                      />
                      <Button type="submit">Save</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
