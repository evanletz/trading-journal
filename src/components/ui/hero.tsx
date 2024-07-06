import GetStarted from "./get-started";

export default function HeroSection() {
  return (
    <section>
      <div className="max-w-screen-xl -mt-8 md:-mt-4 px-4 pb-8 mx-auto lg:pb-16 sm:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="flex flex-col mr-auto items-center lg:col-span-7">
          <h1 className="text-center max-w-2xl mb-4 font-extrabold tracking-tight leading-none text-3xl md:text-5xl dark:text-white">
            Get intimate with your trades
          </h1>
          <p className="text-center max-w-xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            An interactive trade journal to accelerate your journey to financial
            freedom.
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
              {/* No monthly commitment */}
              100% free to use
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
  );
}
