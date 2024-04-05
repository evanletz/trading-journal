"use client";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UpgradeButton } from "@/components/upgrade-button";
import { useIsSubscribed } from "@/hooks/useIsSubscribed";
import { ImageEditor } from "@/components/ui/image-editor";

const defaultErrorState = {
  title: "",
  imageA: "",
  imageB: "",
};

export default function CreatePage() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const [imageA, setImageA] = useState("");
  const [imageB, setImageB] = useState("");
  const [errors, setErrors] = useState(defaultErrorState);
  const { toast } = useToast();

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
