"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  UpgradeButtonExisting,
  UpgradeButtonNew,
} from "@/components/upgrade-button";
import { useIsSubscribed } from "@/hooks/useIsSubscribed";
import { ImageEditor } from "@/components/ui/image-editor";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/clerk-react";

export default function CreatePage() {
  const { user } = useUser();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const [imageA, setImageA] = useState("");
  const { toast } = useToast();

  const isSubscribed = useIsSubscribed();
  const fullUser = useQuery(api.users.getUserById, { userId: user?.id! });
  const credits = fullUser?.credits;
  const profileType = fullUser?.profileType;

  let badgeText = undefined;
  if (credits) {
    if (credits === 0) {
      badgeText = "0 ENTRIES REMAINING";
    } else if (profileType === "free" && credits === 1) {
      badgeText = "1 FREE ENTRY REMAINING";
    } else if (profileType === "basic") {
      badgeText = `${credits.toString()} / 100 entries remaining`;
    } else if (profileType === "unlimited") {
      badgeText = "Enjoy unlimited entries!";
    }
  }

  return (
    <div className="min-h-96">
      <h1 className="text-4xl font-bold mb-8">New Trade Entry</h1>
      <p className="text-lg max-w-md mb-8">
        Create a new entry to improve your trading!
      </p>

      {!imageA && (
        <>
          {!isSubscribed && (
            <div className="flex items-center justify-center gap-2">
              <UpgradeButtonNew />
              <p> to create a new trade entry!</p>
            </div>
          )}
          {isSubscribed &&
            fullUser?.profileType === "basic" &&
            fullUser?.credits === 0 && (
              <div className="flex items-center justify-center gap-2">
                <UpgradeButtonExisting price_type="upgrade" />
                <p> to create a new trade entry!</p>
              </div>
            )}
          {isSubscribed && (credits || 0) > 0 && (
            <div className="flex justify-center mb-8">
              <div className="flex justify-center border rounded w-48">
                <UploadButton
                  uploadUrl={generateUploadUrl}
                  fileTypes={[".png", ".jpeg", ".jpg"]}
                  onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                    setImageA((uploaded[0].response as any).storageId);
                  }}
                  onUploadError={(error: unknown) => {
                    throw new Error(
                      "Error: There was an issue uploading the image. Please try again."
                    );
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
            </div>
          )}
        </>
      )}
      {imageA && <ImageEditor image={imageA} />}
      {(credits || 0) > 0 && (
        <div className="flex justify-center sm:justify-end">
          <Badge variant="outline">{badgeText}</Badge>
        </div>
      )}
    </div>
  );
}
