"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Doc } from "../../../../convex/_generated/dataModel";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { formatDistance } from "date-fns";
import { useIsSubscribed } from "@/hooks/useIsSubscribed";
import { UpgradeButton } from "@/components/upgrade-button";

const formSchema = z.object({
  text: z.string().min(1).max(500),
});

export function Comments({ thumbnail }: { thumbnail: Doc<"thumbnails"> }) {
  const isSubscribed = useIsSubscribed();
  const addComment = useMutation(api.thumbnails.addComment);
  console.log(thumbnail.comments);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await addComment({
      text: values.text,
      thumbnailId: thumbnail._id,
    })
      .then(() => {
        toast({
          title: "Comment Added",
          description: "Thanks for leaving your feedback!",
          variant: "default",
        });
        form.reset();
      })
      .catch(() => {
        toast({
          title: "Something happened",
          description: "Comment couldn't be posted, try again later",
          variant: "destructive",
        });
      });
  }

  return (
    <div>
      <h2 className="my-6 text-2xl font-bold text-center">Comments</h2>

      <div className="max-w-lg mx-auto mb-24">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Make a Comment</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Leave a comment to help the creator improve their thumbnail
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Post Comment</Button>
          </form>
        </Form>

        <div className="space-y-8 mt-12">
          {thumbnail.comments?.map((comment) => {
            return (
              <div key={comment.createdAt} className="border p-4 rounded">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={comment.profileUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <div>{comment.name}</div>
                    <div>
                      {formatDistance(new Date(comment.createdAt), new Date(), {
                        addSuffix: true,
                      })}
                    </div>
                    <div>{comment.text}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {!isSubscribed && (
            <div className="border p-8 rounded text-center space-y-4">
              <div>Upgrade to view all feedback</div>
              <UpgradeButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
