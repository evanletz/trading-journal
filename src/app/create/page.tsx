"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/utils";
import { useSession } from "@clerk/clerk-react";
import { UpgradeButton } from "@/components/upgrade-button";
import { CircleDollarSign, Trash2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { Id } from "../../../convex/_generated/dataModel";
import Link from "next/link";
import { AlertButton } from "@/components/cancel-button";

const defaultErrorState = {
  title: "",
  imageA: "",
  imageB: "",
};

export default function CreatePage() {
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
      tradeDate: undefined,
      ticker: undefined,
      pnl: undefined,
      description: undefined,
      texts: [],
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
  const [stickers, setStickers] = useState<Sticker[]>([]);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = document.body.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStickerNum(stickerNum + 1);

    const id = Date.now(); // Unique ID for the sticker
    let newSticker = { stickerNum: stickerNum, stickerId: id };
    append({ ...newSticker, ...{ x: x, y: y } });
    setStickers([...stickers, { ...newSticker, ...{ x: x, y: y } }]);

    console.log(fields);
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

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createThumbnail = useMutation(api.thumbnails.createThumbnail);
  const createTrade = useMutation(api.trades.createTrade);
  const [imageA, setImageA] = useState("");
  const [imageB, setImageB] = useState("");
  const [errors, setErrors] = useState(defaultErrorState);
  const { toast } = useToast();
  const router = useRouter();
  const session = useSession();

  let imageUrl = "";
  try {
    imageUrl = useQuery(api.files.getImageUrls, {
      imageId: imageA as Id<"_storage">,
    }) as string;
  } catch {}

  return (
    <div className="mt-16">
      <h1 className="text-4xl font-bold mb-8">New Trade Entry</h1>
      <p className="text-lg max-w-md mb-8">
        Create a new entry to improve your trading!
      </p>

      {!imageA && (
        <div className="mb-8 border">
          <UploadButton
            uploadUrl={generateUploadUrl}
            fileTypes={[".png", ".jpeg", ".jpg"]}
            onUploadComplete={async (uploaded: UploadFileResponse[]) => {
              setImageA((uploaded[0].response as any).storageId);
            }}
            onUploadError={(error: unknown) => {
              // Do something with the error.
              alert(`ERROR! ${error}`);
            }}
          />
        </div>
      )}
      {imageA && (
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4 mb-8">
          <div
            className="flex flex-col col-span-2 gap-4 rounded p-2 items-right justify-center border"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div>
              <Image
                // src={getImageUrl(imageA)}
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
                <CircleDollarSign
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
                      <CardDescription>
                        Create your trade's story.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <form id="trade-details-form">
                        {fields.map((field, index) => (
                          <>
                            <div className="flex gap-4 space-y-5">
                              <div className="space-y-2">
                                <label>{index}</label>
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
                              <div key={field.id} className="w-full">
                                <Textarea
                                  {...register(`texts.${index}.text`)}
                                  defaultValue={field.text}
                                  maxLength={200}
                                  onChangeCapture={(e) => {
                                    field.text = e.currentTarget.value;
                                  }}
                                />
                              </div>
                            </div>
                          </>
                        ))}
                      </form>
                    </CardContent>
                    <CardFooter></CardFooter>
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
                          const summaryForm = document.getElementById(
                            "trade-summary-form"
                          ) as HTMLFormElement;
                          const formSummaryData = new FormData(summaryForm);
                          const values = Object.fromEntries(formSummaryData);
                          // console.log({ ...values, texts: fields });
                          const isFormValid = formSchema.safeParse({
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
                            imageId: imageA,
                            texts: fields,
                          });
                          console.log(isFormValid);
                          if (isFormValid.success) {
                            try {
                              const tradeId = await createTrade({
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
                              });
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
                            <Label htmlFor="pnl">Profit/Loss</Label>
                            <Input
                              {...register(`pnl`)}
                              id="pnl"
                              type="number"
                              step="0.01"
                              defaultValue="0"
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
                          <AlertButton resetFunc={reset} />
                          <Button type="submit">Save</Button>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter></CardFooter>
                  </Card>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}

      {/* <h1 className="text-4xl font-bold mb-8">Create a Thumbnail Test</h1>

      <p className="text-lg max-w-md mb-8">
        Create your test so others can vote on their favorite.
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const title = formData.get("title") as string;
          let newErrors = {
            ...defaultErrorState,
          };

          if (!title) {
            newErrors = {
              ...newErrors,
              title: "Fill in this required field",
            };
          }
          if (!imageA) {
            newErrors = {
              ...newErrors,
              imageA: "Fill in this required field",
            };
          }
          if (!imageB) {
            newErrors = {
              ...newErrors,
              imageB: "Fill in this required field",
            };
          }

          setErrors(newErrors);

          const hasErrors = Object.values(newErrors).some(Boolean);
          if (hasErrors) {
            toast({
              title: "Form Errors",
              description: "Fill out all fields before submitting!",
              variant: "destructive",
            });
            return;
          }

          try {
            const thumbnailId = await createThumbnail({
              title: title,
              aImage: imageA,
              bImage: imageB,
              profileImage: session.session?.user.imageUrl,
            });

            router.push(`/thumbnails/${thumbnailId}`);
          } catch (err) {
            toast({
              title: "You ran out of free credits",
              description: (
                <div>
                  <UpgradeButton /> to create more thumbnail tests
                </div>
              ),
              variant: "destructive",
            });
          }
        }}
      >
        <div className="flex flex-col gap-4 mb-8">
          <Label htmlFor="title" />
          <Input
            required
            id="title"
            name="title"
            type="text"
            placeholder="Label your test"
            className={clsx({
              border: errors.title,
              "border-red-500": errors.title,
            })}
          />

          {errors.title && <div className="text-red-500">{errors.title}</div>}
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div
            className={clsx("flex flex-col gap-4 rounded p-2", {
              border: errors.imageA,
              "border-red-500": errors.imageA,
            })}
          >
            <h2 className="text-2xl font-bold">Test Image A</h2>

            {imageA && (
              <Image
                width="200"
                height="200"
                alt="Image Test A"
                src={getImageUrl(imageA)}
              />
            )}

            <UploadButton
              uploadUrl={generateUploadUrl}
              fileTypes={["image/*"]}
              onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                setImageA((uploaded[0].response as any).storageId);
              }}
              onUploadError={(error: unknown) => {
                // Do something with the error.
                alert(`ERROR! ${error}`);
              }}
            />
            {errors.imageA && (
              <div className="text-red-500">{errors.imageA}</div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div
              className={clsx("flex flex-col gap-4 rounded p-2", {
                border: errors.imageB,
                "border-red-500": errors.imageB,
              })}
            >
              <h2 className="text-2xl font-bold">Test Image B</h2>

              {imageB && (
                <Image
                  width="200"
                  height="200"
                  alt="Image Test A"
                  src={getImageUrl(imageB)}
                />
              )}

              <UploadButton
                uploadUrl={generateUploadUrl}
                fileTypes={["image/*"]}
                onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                  setImageB((uploaded[0].response as any).storageId);
                }}
                onUploadError={(error: unknown) => {
                  // Do something with the error.
                  alert(`ERROR! ${error}`);
                }}
              />
              {errors.imageB && (
                <div className="text-red-500">{errors.imageB}</div>
              )}
            </div>
          </div>
        </div>

        <Button>Create Thumbnail Test</Button>
      </form> */}
    </div>
  );
}
