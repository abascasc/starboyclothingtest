'use client';
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Footer from "@/components/footer"

export default function FAQsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-12 px-4">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mb-8">
            Find answers to the most common questions about our products, orders, shipping, and more.
          </p>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium py-4">How long does shipping take?</AccordionTrigger>
              <AccordionContent className="pb-4">
                <p className="mb-2">Shipping times vary depending on your location:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Metro Manila: 1-3 business days</li>
                  <li>Other areas in Luzon: 3-5 business days</li>
                  <li>Visayas and Mindanao: 5-7 business days</li>
                  <li>International: 7-14 business days</li>
                </ul>
                <p className="mt-2">
                  Please note that these are estimated delivery times and may vary during peak seasons or due to
                  unforeseen circumstances.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium py-4">What is your return policy?</AccordionTrigger>
              <AccordionContent className="pb-4">
                <p>
                  We accept returns within 30 days of delivery for unworn items in their original packaging. To initiate
                  a return, please contact our customer service team through the{" "}
                  <Link href="/help/contact" className="text-primary hover:underline">
                    Contact Us
                  </Link>{" "}
                  page. Please note that customized items and sale items marked as final sale cannot be returned.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium py-4">How do I find my size?</AccordionTrigger>
              <AccordionContent className="pb-4">
                <p>
                  We provide detailed size guides for all our products. You can find the size guide on each product page
                  or visit our dedicated{" "}
                  <Link href="/help/size-guide" className="text-primary hover:underline">
                    Size Guide
                  </Link>{" "}
                  page. If you're between sizes, we generally recommend sizing up for a more comfortable fit.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium py-4">Do you ship internationally?</AccordionTrigger>
              <AccordionContent className="pb-4">
                <p>
                  Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by
                  location. Please note that customers are responsible for any customs fees, import duties, or taxes
                  that may apply when receiving international shipments.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium py-4">How can I track my order?</AccordionTrigger>
              <AccordionContent className="pb-4">
                <p>
                  Once your order ships, you'll receive a confirmation email with a tracking number. You can use this
                  tracking number on our website or the carrier's website to monitor your shipment. If you have an
                  account, you can also check your order status in the "Orders" section of your account dashboard.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium py-4">Are your products sustainable?</AccordionTrigger>
              <AccordionContent className="pb-4">
                <p>
                  We're committed to increasing sustainability in our production processes. Many of our newer
                  collections use organic cotton and recycled materials. We're continuously working to reduce our
                  environmental footprint and improve our sustainability practices across our entire supply chain.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium py-4">
                How do I care for my Starboy products?
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <p>
                  Each product comes with specific care instructions on the label. Generally, we recommend washing our
                  garments in cold water and air drying to maintain the quality and extend the life of the product. For
                  printed items, we suggest turning them inside out before washing to preserve the print quality.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium py-4">Do you offer gift wrapping?</AccordionTrigger>
              <AccordionContent className="pb-4">
                <p>
                  Yes, we offer gift wrapping services for an additional fee. You can select this option during
                  checkout. Our gift wrapping includes premium packaging and the option to add a personalized message to
                  the recipient.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-medium mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              If you couldn't find the answer you were looking for, please reach out to our customer service team.
            </p>
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              href="/help/contact"
              className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-neutral-800"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

