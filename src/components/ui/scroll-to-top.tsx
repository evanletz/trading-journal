import { ChevronUpIcon } from "lucide-react";

export default function ScrollToTop() {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 100, behavior: "smooth" });
      }}
      className="sm:hidden fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-full p-4 shadow-md"
    >
      <ChevronUpIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
    </button>
  );
}
