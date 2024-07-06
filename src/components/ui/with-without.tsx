export default function WithWithoutSection() {
  return (
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
  );
}
