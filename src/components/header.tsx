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
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function Header() {
  const user = useQuery(api.users.getUser)

  return (
    <div className="border-b mb-16">
      <div className="h-16 container flex justify-between items-center">
        <div className="w-48 justify-start">
          <div className="hidden dark:block">
            <Link href="/"><Image src="/TradeTrenderLogo-light.png" alt="Trade Trender Logo" width="210" height="70"></Image></Link>
          </div>
          <div className="block dark:hidden">
            <Link href="/"><Image src="/TradeTrenderLogo-dark.png" alt="Trade Trender Logo" width="210" height="70"></Image></Link>
          </div>
        </div>
        
        <div className="hidden sm:inline">
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
        </div>

        <div className="w-48 justify-end flex gap-4 items-center">
          <SignedIn>
            <div className="hidden sm:inline">
              {user && user.profileType === 'free' &&
                <UpgradeButtonNew />
              }
              {user && user.profileType == 'basic' &&
                <UpgradeButtonExisting price_type="upgrade"/>
              }
            </div>
            <div className="hidden sm:inline"><SettingsMenu /></div>
            <div className="hidden sm:inline"><UserButton /></div>
          </SignedIn>
          <SignedOut>
            <NavigationMenu className="hidden sm:inline">
              <NavigationMenuList className="flex align-right">
                <NavigationMenuItem>
                  <Link href="#pricing" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>


        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Create</DropdownMenuItem>
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SettingsMenu />
                <UserButton />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {user && user.profileType === 'free' &&
                  <UpgradeButtonNew />
                }
                {user && user.profileType == 'basic' &&
                  <UpgradeButtonExisting price_type="upgrade"/>
                }
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
