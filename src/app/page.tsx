"use client";

import HowToAccordion from "@/components/ui/how-to";
import { Button } from "@/components/ui/button";
import FeaturesTooltip from "@/components/ui/tooltip";
import { GetStartedButton } from "@/components/upgrade-button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <section>
        <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-16 sm:gap-8 xl:gap-0 lg:grid-cols-12">
          <div className="flex flex-col mr-auto items-center lg:col-span-7">
            <h1 className="text-center max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              The simplest way to track your trades
            </h1>
            <p className="text-center max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              An ultra-lightweight trade journal to accelerate your journey to
              financial freedom.
            </p>
            <div className="flex mb-6 lg:mb-8">
              <Image src="/chart.png" alt="mockup" width="600" height="400" />
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4">
              <p className="flex items-center justify-right gap-2 mb-2">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                No monthly commitment
              </p>
              <p className="flex items-center justify-right gap-2 mb-2">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Point-and-click journaling
              </p>
              <p className="flex items-center justify-right gap-2 mb-2">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Become a better trader
              </p>
            </div>
            <Button
              asChild
              className="bg-green-500 inline-flex items-center justify-center px-5 py-3 mr-3 mt-6 lg:mt-8 text-base font-medium text-center rounded-lg</Link> hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              <Link href="#pricing">
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
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900 rounded">
        <div className="flex items-center justify-center py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="text-center max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-8 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
              Keep trade tracking simple
            </h2>
            <p className="mb-4 font-medium">Most trade journals have:</p>
            <p className="mb-4 font-light flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff2600"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              Countless features you don't need
            </p>
            <p className="mb-4 font-light flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff2600"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              Complicated processes
            </p>
            <p className="mb-4 font-light flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff2600"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              Steep learning curves
            </p>
            <p className="mt-8 inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
              Jumpstart your trade reviews and get to journaling fast
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-move-down"
              >
                <path d="M8 18L12 22L16 18" />
                <path d="M12 2V22" />
              </svg>
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Get intimate with each trade
            </h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">
              The best way to improve your trading is to truly understand each
              trade you take. Don't settle for the automated import-and-forget
              approach of other journals.
            </p>
          </div>
          <HowToAccordion />
        </div>
      </section>
      <section id="pricing" className="bg-white dark:bg-gray-900 rounded">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              No-hassle trade journaling is here
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Ditch the complicated journals and focus on what you love to do:
              trading.
            </p>
          </div>
          <div className="flex flex-col items-center sm:flex-row sm:justify-center space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-14 lg:space-y-0">
            <div className="flex justify-end">
              <div className="p-6 w-72 text-gray-900 bg-white rounded-3xl border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <div className="my-8 text-center">
                  <div className="flex justify-center items-baseline">
                    <span className="text-xl line-through text-gray-500 dark:text-gray-400">
                      $39
                    </span>
                    <span className="ml-2 text-5xl font-extrabold">$29</span>
                    <span className="text-md text-gray-500 dark:text-gray-400">
                      USD
                    </span>
                  </div>
                  <p className="mt-2 mb-4 text-sm">
                    One-time payment. Keep your trades forever.
                  </p>
                </div>
                <ul className="mb-8">
                  <li>
                    <p className="flex items-center justify-right gap-2 mb-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Point-and-click journaling
                    </p>
                  </li>
                  <li>
                    <p className="flex items-center justify-right gap-2 mb-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Trade review & metrics
                    </p>
                  </li>
                  <li>
                    <p className="flex items-center justify-right gap-2 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff2600"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                      Limited future updates
                    </p>
                  </li>
                  <li>
                    <p className="flex items-center justify-right gap-2 mb-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      100 journal entries
                    </p>
                  </li>
                </ul>
                <GetStartedButton price_type="basic" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-0 start-36 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white py-1 px-3 rounded-full text-xs font-semibold">
                Traders' Choice
              </div>
              <div className="p-6 w-72 text-gray-900 bg-white rounded-3xl border border-gray-100 shadow dark:border-yellow-500 xl:p-8 dark:bg-gray-800 dark:text-white">
                <div className="my-8 text-center">
                  <div className="flex justify-center items-baseline">
                    <span className="text-xl line-through text-gray-500 dark:text-gray-400">
                      $59
                    </span>
                    <span className="ml-2 text-5xl font-extrabold">$49</span>
                    <span className="text-md text-gray-500 dark:text-gray-400">
                      USD
                    </span>
                  </div>
                  <p className="mt-2 mb-4 text-sm">
                    One-time payment. Keep your trades forever.
                  </p>
                </div>
                <ul className="mb-8">
                  <li>
                    <p className="flex items-center justify-right gap-2 mb-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Point-and-click journaling
                    </p>
                  </li>
                  <li>
                    <p className="flex items-center justify-right gap-2 mb-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Trade review & metrics
                    </p>
                  </li>
                  <li>
                    <p className="flex items-center justify-right gap-2 mb-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      All future updates
                      <FeaturesTooltip />
                    </p>
                  </li>
                  <li>
                    <p className="flex items-center justify-right gap-2 mb-2">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="font-bold">Unlimited</span> journal
                      entries
                    </p>
                  </li>
                </ul>
                <GetStartedButton price_type="unlimited" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
