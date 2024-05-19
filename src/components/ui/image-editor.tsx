"use client";

import { useState } from "react";
import Image from "next/image";
import { Info, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Textarea } from "./textarea";
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
import { useUser } from "@clerk/clerk-react";

type ImageEditorProps = {
  image: string;
  trade?: Doc<"trades">;
};

export const ImageEditor = (props: ImageEditorProps) => {
  const { user } = useUser();
  const fullUser = useQuery(api.users.getUserById, { userId: user?.id! });

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
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100 - 2;
    const y = ((e.clientY - rect.top) / rect.height) * 100 - 3;
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
    e.preventDefault(); // prevents the annoying highlighting
    setDraggingStickerId(id);
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setOffset({ offsetX, offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault(); // prevents the annoying highlighting

    if (draggingStickerId !== null && offset) {
      const index = stickers.findIndex(
        (sticker) => sticker.stickerId === draggingStickerId
      );
      if (index !== -1) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left - offset.offsetX) / rect.width) * 100;
        const y = ((e.clientY - rect.top - offset.offsetY) / rect.height) * 100;
        const updatedPositions = [...stickers];
        if (
          e.clientX < rect.left ||
          e.clientY < rect.top ||
          e.clientX > rect.right ||
          e.clientY > rect.bottom
        ) {
        } // do nothing if out of bounds
        else {
          updatedPositions[index] = { ...updatedPositions[index], x, y };
        }
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
    <div
      className="flex flex-col grid md:grid-cols-3 sm:grid-cols-1 mb-8 items-center gap-4"
      onMouseUp={handleMouseUp}
    >
      <div
        className="md:col-span-2 grid-cols-1 gap-4 rounded p-2 items-right justify-center"
        style={{ borderColor: "green" }}
      >
        <div
          onMouseMove={handleMouseMove}
          style={{ position: "relative" }}
          className="items-center justify-center flex border h-dvh sm:h-96"
        >
          <Image
            src={imageUrl}
            fill={true}
            alt="Uploaded Trade Image"
            style={{ cursor: "crosshair", objectFit: "contain" }}
            onClick={handleImageClick}
            className="border border-gray-300 rounded"
          />

          {stickers.map(({ stickerId, x, y }) => (
            <div
              id={stickerId.toString()}
              key={stickerId}
              style={{ position: "absolute", left: `${x}%`, top: `${y}%` }}
            >
              <Info
                strokeWidth={3}
                style={{
                  cursor: "move",
                  color: "black",
                  fill: "white",
                  border: "10",
                  borderColor: "black",
                }}
                onMouseDown={(e) => handleStickerMouseDown(stickerId, e)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col col-span-1 gap-4 w-full">
        <Tabs
          defaultValue="details"
          activationMode="manual"
          className="w-full border-b space-y-2 h-full"
          style={{ position: "relative" }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          <div className="overflow-y-auto border rounded border-slate-800 h-full">
            <TabsContent value="details" className="w-full h-96">
              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Details</CardTitle>
                  <CardDescription>
                    Click the image to create your trade's story.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <form id="trade-details-form">
                    {fields.map((field, index) => (
                      <>
                        <div className="flex gap-4 space-y-5 items-center">
                          <div className="flex-col space-y-2 text-center">
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
            </TabsContent>
            <TabsContent value="summary" className="w-full h-96">
              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                  <CardDescription>
                    Enter some information about your trade. Click the 'Save'
                    button below to finish.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    id="trade-summary-form"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (
                        (fullUser?.profileType === "free" &&
                          fullUser?.credits === 0) ||
                        (!isSubscribed && fullUser?.profileType !== "free")
                      ) {
                        toast({
                          title:
                            "You must be subscribed to create a new entry!",
                          variant: "destructive",
                        });
                        return;
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
                            await updateTrade({
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
                            await createTrade(formData);
                            toast({
                              title: "New trade created!",
                              action: (
                                <Button asChild size={"sm"}>
                                  <Link href="/create">
                                    Create another entry
                                  </Link>
                                </Button>
                              ),
                            });
                          }
                          router.push(`/dashboard`);
                        } catch (err) {
                          toast({
                            description: err as string,
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
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
