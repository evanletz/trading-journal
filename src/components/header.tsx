"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import Link from "next/link";
import { UpgradeButtonExisting, UpgradeButtonNew } from "./upgrade-button";
import { SettingsMenu } from "./settings-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Image from "next/image";
import { getUser } from "../../convex/util";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function Header() {
  const user = useQuery(api.users.getUser)

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
            {user && user.profileType === 'free' &&
              <UpgradeButtonNew />
            }
            {user && user.profileType == 'basic' &&
              <UpgradeButtonExisting price_type="upgrade"/>
            }
            <SettingsMenu />
            <UserButton />
          </SignedIn>
          <SignedOut>
            <NavigationMenu>
              <SignedOut>
                <NavigationMenuList className="flex align-right">
                  <NavigationMenuItem>
                    <Link href="#pricing" legacyBehavior passHref>
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
