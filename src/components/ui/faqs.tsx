import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

export default function FAQSection() {
  return (
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
  );
}

function FAQs() {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="q-1">
          <AccordionTrigger className="data-[state=open]:text-green-500 text-left">
            Why do I need Trade Trender?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Our common mistake as traders is making the same errors over and
              over without understanding why.
            </p>
            <br></br>
            <p>
              Trade Trender is an interactive trading journal designed to help
              you understand your mindset at each step of your trade.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sqtep-2">
          <AccordionTrigger className="data-[state=open]:text-green-500 text-left">
            How does it work?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Upload a screenshot of your chart and click on each significant
              point of your trade - such as where you bought, felt nervous about
              price action, or moved your stop to breakeven.
            </p>
            <br></br>
            <p>
              Writing about each step will help you find repetitive errors over
              time and improve your trading.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q-3">
          <AccordionTrigger className="data-[state=open]:text-green-500 text-left">
            How much does Trade Trender cost?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              For a limited time, Trade Trender is free for all users. Enjoy the
              road to better trading!
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q-4">
          <AccordionTrigger className="data-[state=open]:text-green-500 text-left">
            Does it work with any trading style?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Yes! Whether you're a day trader, swing trader, or investor,
              traders of all styles benefit from understanding their trades and
              mindset.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q-5">
          <AccordionTrigger className="data-[state=open]:text-green-500 text-left">
            What are some upcoming features?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Additional trade metrics, an entry model checklist and multiple
              trading accounts are just some of the features in the works for
              Trade Trender.
            </p>
            <br></br>
            <p>
              Users on the Unlimited Plan get to enjoy all new features shipped
              in the future.
            </p>
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value="q-6">
          <AccordionTrigger className="data-[state=open]:text-green-500 text-left">
            Can I get a refund?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Trade Trender is yours forever after it's purchased, so it can't
              be refunded.
            </p>
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </div>
  );
}
