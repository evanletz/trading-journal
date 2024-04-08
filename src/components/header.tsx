"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import Link from "next/link";
import { useIsSubscribed } from "@/hooks/useIsSubscribed";
import { UpgradeButton } from "./upgrade-button";
import { SettingsMenu } from "./settings-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Button } from "./ui/button";

export function Header() {
  const isSubscribed = useIsSubscribed();

  return (
    <div className="border-b">
      <div className="h-16 container flex justify-between items-center">
        <Link href="/">Trading Journal</Link>

          <NavigationMenu>
            <SignedIn>
              <NavigationMenuList className="flex gap-8 items-center">
                <NavigationMenuItem>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/create" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Create
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </SignedIn>
          </NavigationMenu>

        <div className="flex gap-4 items-center">
          <SignedIn>
            <SettingsMenu />
            {!isSubscribed && <UpgradeButton />}
            <UserButton />
          </SignedIn>
          <SignedOut>
            <NavigationMenu>
              <SignedOut>
                <NavigationMenuList className="flex align-right">
                  <NavigationMenuItem>
                    <Link href="/pricing" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Pricing
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </SignedOut>
            </NavigationMenu>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
