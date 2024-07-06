import Link from "next/link";
import { Button } from "./button";
import { SignInButton } from "@clerk/clerk-react";

export function GetStartedSection() {
  return (
    <section className="bg-white dark:bg-gray-900 rounded">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center items-center justify-center">
          <h2 className="mb-4 text-3xl md:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Ready to elevate your trading?
          </h2>
          <GetStarted />
        </div>
      </div>
    </section>
  );
}

export default function GetStarted() {
  // return (
  //   <Button
  //     asChild
  //     className="bg-green-500 inline-flex items-center justify-center px-5 py-3 mr-3 mt-6 lg:mt-8 text-base font-medium text-center rounded-lg</Link> hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
  //   >
  //     <Link href="#pricing">
  //       Get started
  //       <svg
  //         className="w-5 h-5 ml-2 -mr-1"
  //         fill="currentColor"
  //         viewBox="0 0 20 20"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           fillRule="evenodd"
  //           d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
  //           clipRule="evenodd"
  //         ></path>
  //       </svg>
  //     </Link>
  //   </Button>
  // );

  return (
    <Button
      asChild
      className="bg-green-500 inline-flex items-center justify-center px-5 py-3 mr-3 mt-6 lg:mt-8 text-base font-medium text-center rounded-lg</Link> hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
    >
      <SignInButton mode="modal">Get Started For Free</SignInButton>
    </Button>
  );
}
