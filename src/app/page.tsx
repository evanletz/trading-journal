"use client";

import HowToAccordion from "@/components/ui/how-to";
import FeaturesTooltip from "@/components/ui/tooltip";
import { GetStartedButton } from "@/components/upgrade-button";
import FAQs from "@/components/ui/faqs";
import GetStarted from "@/components/ui/get-started";

export default function Home() {
  return (
    <main className="space-y-8 sm:space-y-0">
      <section>
        <div className="max-w-screen-xl -mt-8 md:-mt-4 px-4 pb-8 mx-auto lg:pb-16 sm:gap-8 xl:gap-0 lg:grid-cols-12">
          <div className="flex flex-col mr-auto items-center lg:col-span-7">
            <h1 className="text-center max-w-2xl mb-4 font-extrabold tracking-tight leading-none text-3xl md:text-5xl dark:text-white">
              Get intimate with your trades
            </h1>
            <p className="text-center max-w-xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              An interactive trade journal to accelerate your journey to
              financial freedom.
            </p>
            <div className="flex mb-6 lg:mb-8">
              <video
                width="600"
                height="400"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                preload="none"
                className="border border-gray-600 rounded-2xl"
              >
                <source src="Trade-Trender-Hero-Demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-1 md:gap-4">
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
            <GetStarted />
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900 rounded">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-3xl md:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Tired of losing money <br></br>as a trader?
            </h2>
          </div>
          <div className="flex flex-col items-center md:flex-row md:justify-center space-y-8 md:grid md:grid-cols-2 md:gap-14 md:space-y-0">
            <div className="flex justify-end">
              <div className="bg-gray-800 p-6 w-72 sm:w-96 rounded-3xl border border-red-300 shadow">
                <h3 className="text-center text-lg tracking-tight font-bold text-red-300">
                  Many traders make the same mistakes:
                </h3>
                <ul className="my-8 space-y-4">
                  <li className="flex items-center justify-right gap-4 mb-2">
                    <div className="w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff2600"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x w-5 h-5"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </div>
                    <p>Enter bad trades out of FOMO</p>
                  </li>
                  <li className="flex items-center justify-right gap-4 mb-2">
                    <div className="w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff2600"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x w-5 h-5"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </div>
                    <p>Hold good trades too long out of greed</p>
                  </li>
                  <li className="flex items-center justify-right gap-4 mb-2">
                    <div className="w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff2600"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x w-5 h-5"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </div>
                    <p>Can't identify high-quality setups</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-800 p-6 w-72 sm:w-96 rounded-3xl border border-green-300 shadow">
                <h3 className="text-center text-lg tracking-tight font-bold text-green-300">
                  Trade Trender can help you:
                </h3>
                <ul className="my-8 space-y-4">
                  <li className="flex items-center justify-right gap-4 mb-2">
                    <div className="w-5">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
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
                    </div>
                    <p>Identify your trading tendencies</p>
                  </li>
                  <li className="flex items-center justify-right gap-4 mb-2">
                    <div className="w-5">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
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
                    </div>
                    <p>Determine patterns & mistakes</p>
                  </li>
                  <li className="flex items-center justify-right gap-4 mb-2">
                    <div className="w-5">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
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
                    </div>
                    <p>Retain details about past trades</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-3xl md:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              A hands-on approach<br></br>to trade journaling
            </h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">
              The only way to improve your trading is to truly understand each
              trade you take.
            </p>
          </div>
          <HowToAccordion />
        </div>
      </section>
      <section id="pricing" className="bg-white dark:bg-gray-900 rounded">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-3xl md:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Effective trade journaling is here
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Get tangible results and focus on what you love to do: trading.
            </p>
          </div>
          <div className="flex flex-col items-center md:flex-row md:justify-center space-y-8 md:grid md:grid-cols-2 md:gap-6 md:gap-14 md:space-y-0">
            <div className="flex justify-end">
              <div className="p-6 w-72 text-gray-900 bg-white rounded-3xl border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 className="text-center text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
                  Basic
                </h3>
                <p className="mt-2 mb-4 text-sm text-center">
                  One-time payment. Keep your trades forever.
                </p>
                <div className="my-4 text-center">
                  <div className="flex justify-center items-baseline">
                    <span className="text-xl line-through text-gray-500 dark:text-gray-400">
                      $39
                    </span>
                    <span className="ml-2 text-5xl font-extrabold">$29</span>
                    <span className="text-md text-gray-500 dark:text-gray-400">
                      USD
                    </span>
                  </div>
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
                      100 journal entries
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
                </ul>
                <GetStartedButton price_type="basic" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-0 start-36 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white py-1 px-3 rounded-full text-xs font-semibold">
                Traders' Choice
              </div>
              <div className="p-6 w-72 text-gray-900 bg-white rounded-3xl border border-gray-100 shadow dark:border-yellow-500 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 className="text-center text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
                  Unlimited
                </h3>
                <p className="mt-2 mb-4 text-sm text-center">
                  One-time payment. Keep your trades forever.
                </p>
                <div className="my-4 text-center">
                  <div className="flex justify-center items-baseline">
                    <span className="text-xl line-through text-gray-500 dark:text-gray-400">
                      $59
                    </span>
                    <span className="ml-2 text-5xl font-extrabold">$49</span>
                    <span className="text-md text-gray-500 dark:text-gray-400">
                      USD
                    </span>
                  </div>
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
                      <span className="font-bold">Unlimited</span>journal
                      entries
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
                </ul>
                <GetStartedButton price_type="unlimited" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <h2 className="mb-4 text-center text-3xl md:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Support our launch<br></br>on Product Hunt!
          </h2>
          <div className="flex justify-center items-center mt-8">
            <a
              href="https://www.producthunt.com/posts/trade-trender?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-trade&#0045;trender"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=463245&theme=light"
                alt="Trade&#0032;Trender - Interactive&#0032;trade&#0032;journaling | Product Hunt"
                style={{ width: "250px", height: "54px" }}
                width="250"
                height="54"
              />
            </a>
          </div>
        </div>
      </section>
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md grid grid-cols-1 sm:grid-cols-2">
            <div className="mb-8 sm:mb-0">
              <h2 className="mb-4 text-center sm:text-left text-3xl md:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p>
                Have other questions? Send me an email at{" "}
                <a href="mailto:evan@tradetrender.com" className="underline">
                  evan@tradetrender.com
                </a>
                .
              </p>
            </div>
            <div>
              <FAQs />
            </div>
          </div>
        </div>
      </section>
      <section id="pricing" className="bg-white dark:bg-gray-900 rounded">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center items-center justify-center">
            <h2 className="mb-4 text-3xl md:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Ready to elevate your trading?
            </h2>
            <GetStarted />
          </div>
        </div>
      </section>
    </main>
  );
}
