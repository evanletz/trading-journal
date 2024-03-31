"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/clerk-react";
import { UpgradeButton } from "@/components/upgrade-button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { Id } from "../../../convex/_generated/dataModel";
import { useIsSubscribed } from "@/hooks/useIsSubscribed";
import { ImageEditor } from "@/components/ui/image-editor";

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

  const isSubscribed = useIsSubscribed();

  return (
    <div className="mt-16">
      <h1 className="text-4xl font-bold mb-8">New Trade Entry</h1>
      <p className="text-lg max-w-md mb-8">
        Create a new entry to improve your trading!
      </p>

      {!imageA && (
        <>
          {!isSubscribed && (
            <div className="flex items-center justify-center gap-2">
              <UpgradeButton />
              <p> to create a new trade entry!</p>
            </div>
          )}
          {isSubscribed && (
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
                onUploadBegin={() => {
                  if (!isSubscribed) {
                    toast({
                      title: "You must be subscribed to create a new entry!",
                      variant: "destructive",
                    });
                  }
                }}
              />
            </div>
          )}
        </>
      )}
      {imageA && <ImageEditor image={imageA} />}

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
