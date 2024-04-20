"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UpgradeButton } from "@/components/upgrade-button";
import { useIsSubscribed } from "@/hooks/useIsSubscribed";
import { ImageEditor } from "@/components/ui/image-editor";
import { Badge } from "@/components/ui/badge";

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
  const credits = useQuery(api.users.getCredits);

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
            <div className="flex justify-center mb-8">
              <div className="flex justify-center border rounded w-48">
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
            </div>
          )}
        </>
      )}
      {imageA && <ImageEditor image={imageA} />}
      {credits && (
        <div className="flex justify-end">
          <Badge variant="outline">{credits} / 100 new trades remaining</Badge>
        </div>
      )}
    </div>
  );
}
