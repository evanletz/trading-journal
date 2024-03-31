import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery } from "convex/react";
import {
  Sun,
  Moon,
  DollarSign,
  Euro,
  PoundSterling,
  JapaneseYen,
  Coins,
  Settings,
} from "lucide-react";
import { useTheme } from "next-themes";
import { api } from "../../convex/_generated/api";

export function SettingsMenu() {
  const { setTheme } = useTheme();
  const updateCurrency = useMutation(api.users.updateCurrency);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Settings className="mr-2 h-6 w-6" strokeWidth={1} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span>Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Coins className="mr-2 h-4 w-4" />
            <span>Currency</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onSelect={async () => {
                  updateCurrency({ newCurrency: "$" });
                }}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                <span>Dollar</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={async () => {
                  updateCurrency({ newCurrency: "€" });
                }}
              >
                <Euro className="mr-2 h-4 w-4" />
                <span>Euro</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={async () => {
                  updateCurrency({ newCurrency: "£" });
                }}
              >
                <PoundSterling className="mr-2 h-4 w-4" />
                <span>Pound</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={async () => {
                  updateCurrency({ newCurrency: "¥" });
                }}
              >
                <JapaneseYen className="mr-2 h-4 w-4" />
                <span>Yen</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
