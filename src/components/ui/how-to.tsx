import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";
import { useState } from "react";

export default function HowToSection() {
  return (
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
  );
}

function HowToAccordion() {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(true);
  const [step3, setStep3] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center sm:flex-row space-y-8 sm:gap-6 xl:gap-14 lg:space-y-0">
      <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
        <div className="w-96 px-10 sm:px-0 sm:ml-auto">
          <Accordion type="single" collapsible defaultValue="step-1">
            <AccordionItem value="step-1">
              <AccordionTrigger
                className="data-[state=open]:text-green-500"
                onClick={() => {
                  setStep1(false);
                  setStep2(true);
                  setStep3(true);
                }}
              >
                1. Upload your chart image
              </AccordionTrigger>
              <AccordionContent>
                Take a screenshot of your trade's chart from any platform.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="step-2">
              <AccordionTrigger
                className="data-[state=open]:text-green-500"
                onClick={() => {
                  setStep1(true);
                  setStep2(false);
                  setStep3(true);
                }}
              >
                2. Annotate your chart
              </AccordionTrigger>
              <AccordionContent>
                Walk through each step of your trade by clicking on the chart
                and writing about your thought process at that point in time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="step-3">
              <AccordionTrigger
                className="data-[state=open]:text-green-500"
                onClick={() => {
                  setStep1(true);
                  setStep2(true);
                  setStep3(false);
                }}
              >
                3. Track your performance
              </AccordionTrigger>
              <AccordionContent>
                Improve your trading by reviewing your journal in a simple
                interface.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="px-10 sm:px-0 sm:mr-auto">
          <video
            width="600"
            height="400"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="none"
            hidden={step1}
            className="border border-gray-600 rounded-2xl"
          >
            <source src="Trade-Trender-Upload-Demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            width="600"
            height="400"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="none"
            hidden={step2}
            className="border border-gray-600 rounded-2xl"
          >
            <source src="Trade-Trender-Journal-Demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Image
            alt="Step 3 - Review Your Trades"
            src="/Trade-Trender-Dashboard.png"
            width="600"
            height="400"
            className="border border-gray-600 rounded-2xl"
            hidden={step3}
          />
        </div>
      </div>
    </div>
  );
}
