"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { useIsSubscribed } from "@/hooks/useIsSubscribed";
import { UpgradeButton } from "./upgrade-button";
import { SettingsMenu } from "./settings-menu";

export function Header() {
  const isSubscribed = useIsSubscribed();

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
          <SettingsMenu />
          <SignedIn>
            {!isSubscribed && <UpgradeButton />}
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
