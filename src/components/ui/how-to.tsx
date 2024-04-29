import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Image from "next/image";
import { useState } from "react";

export default function HowToAccordion() {
    const [step1, setStep1] = useState(false)
    const [step2, setStep2] = useState(true)
    const [step3, setStep3] = useState(true)

    return (
        <div className="justify-center flex grid-cols-2 gap-14 items-center h-72">
            <div className="flex w-96">
                <Accordion type="single" collapsible defaultValue="step-1">
                    <AccordionItem value="step-1">
                    <AccordionTrigger className="data-[state=open]:text-green-500" onClick={() => {setStep1(false); setStep2(true); setStep3(true)}}>1. Upload your chart image</AccordionTrigger>
                    <AccordionContent>
                        Take a screenshot of your trade's chart from any platform.
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="step-2">
                    <AccordionTrigger className="data-[state=open]:text-green-500" onClick={() => {setStep1(true); setStep2(false); setStep3(true)}}>2. Annotate your chart</AccordionTrigger>
                    <AccordionContent>
                        Walk through each step of your trade by clicking on the chart and writing about your thought process at that point in time.
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="step-3">
                    <AccordionTrigger className="data-[state=open]:text-green-500" onClick={() => {setStep1(true); setStep2(true); setStep3(false)}}>3. Track your performance</AccordionTrigger>
                    <AccordionContent>
                        Improve your trading by reviewing your journal in a simple interface.
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="flex w-96 items-center justify-center">
                <Image alt="Step 1 - Upload Your Chart" src="/example.png" width="300" height="300" className="border border-gray-600 rounded-2xl" hidden={step1} />
                <Image alt="Step 1 - Upload Your Chart" src="/chart.png" width="300" height="300" className="border border-gray-600 rounded-2xl" hidden={step2} />
            </div>
        </div>
    )
  }