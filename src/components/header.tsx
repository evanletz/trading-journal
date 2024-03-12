"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAction, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

export function Header() {
  const pay = useAction(api.stripe.pay);
  const router = useRouter();
  const user = useQuery(api.users.getUser);

  async function handleUpgradeClick() {
    const url = await pay();
    router.push(url);
  }

  const isSubscribed = user && (user.endsOn ?? 0) > Date.now();
  console.log(user?.endsOn);
  console.log(Date.now());

  return (
    <div className="border-b">
      <div className="h-16 container flex justify-between items-center">
        <Link href="/">Trading Journal</Link>

        <div className="flex gap-8">
          <SignedIn>
            <Link href="/dashboard" className="link">
              Dashboard
            </Link>
            <Link href="/create" className="link">
              Create
            </Link>
            <Link href="/explore" className="link">
              Explore
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/about" className="link">
              About
            </Link>
            <Link href="/pricing" className="link">
              Pricing
            </Link>
          </SignedOut>
        </div>

        <div className="flex gap-4 items-center">
          <SignedIn>
            {!isSubscribed && (
              <Button onClick={handleUpgradeClick}>Upgrade</Button>
            )}
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
