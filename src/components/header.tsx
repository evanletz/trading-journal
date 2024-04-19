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
import Image from "next/image";

export function Header() {
  const isSubscribed = useIsSubscribed();

  return (
    <div className="border-b">
      <div className="h-16 container flex justify-between items-center">
        <div className="w-48 justify-start">
          <div className="hidden dark:block">
            <Link href="/"><Image src="/TradeTrenderLogo-light.png" alt="Trade Trender Logo" width="210" height="70"></Image></Link>
          </div>
          <div className="block dark:hidden">
            <Link href="/"><Image src="/TradeTrenderLogo-dark.png" alt="Trade Trender Logo" width="210" height="70"></Image></Link>
          </div>
        </div>
        

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

        <div className="w-48 justify-end flex gap-4 items-center">
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
