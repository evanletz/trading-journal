import { useAction, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function UpgradeButtonNew() {
  return (
    <Button
      asChild
      className="bg-green-500 flex items-center justify-center text-base font-medium text-center rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
    >
      <Link href="/#pricing">Upgrade</Link>
    </Button>
  );
}

export function UpgradeButtonExisting({ price_type = "upgrade" }) {
  const pay = useAction(api.stripe.pay);
  const router = useRouter();

  async function handleUpgradeClick() {
    const url = await pay({ price_type });
    router.push(url);
  }

  return (
    <Button
      onClick={handleUpgradeClick}
      className="bg-green-500 flex items-center justify-center text-base font-medium text-center rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
    >
      Unlimited Entries
    </Button>
  );
}

export function GetStartedButton({ price_type = "basic" }) {
  const pay = useAction(api.stripe.pay);
  const router = useRouter();
  const user = useQuery(api.users.getUser);

  async function handleUpgradeClick() {
    const url = await pay({ price_type });
    router.push(url);
  }

  return (
    <Button
      asChild
      // onClick={handleUpgradeClick}
      className="bg-green-500 flex w-full items-center justify-center px-5 py-3 mr-3 mt-6 lg:mt-8 text-base font-medium text-center rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
    >
      <Link href={`/pricing/${price_type}`}>
        Get started
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
    </Button>
  );
}
