import { GetStartedButton } from "../upgrade-button";
import FeaturesTooltip from "./tooltip";

export default function PricingSection() {
  return (
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
                    <span className="font-bold">Unlimited</span>journal entries
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
  );
}
