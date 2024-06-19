import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-12">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="w-48 justify-start">
              <div className="hidden dark:block">
                <Link href="/">
                  <Image
                    src="/TradeTrenderLogo-light.png"
                    alt="Trade Trender Logo"
                    width="210"
                    height="70"
                  ></Image>
                </Link>
              </div>
              <div className="block dark:hidden">
                <Link href="/">
                  <Image
                    src="/TradeTrenderLogo-dark.png"
                    alt="Trade Trender Logo"
                    width="210"
                    height="70"
                  ></Image>
                </Link>
              </div>
              <div className="mt-4">
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
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-2">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="/#pricing" className="hover:underline">
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@tradetrender.com"
                    className="hover:underline"
                  >
                    Feedback & Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="/legal/privacypolicy" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/legal/terms" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 Dev 22 LLC. All Rights Reserved. Made by{" "}
            <a href="https://x.com/evanletz" className="underline">
              Evan Letz
            </a>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}
