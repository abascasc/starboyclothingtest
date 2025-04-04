'use client';
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Footer from "@/components/footer"

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-12 px-4">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Shipping & Returns</h1>
          <p className="text-muted-foreground mb-8">
            Learn about our shipping methods, delivery times, and return policies.
          </p>

          <Tabs defaultValue="shipping" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="shipping">Shipping Information</TabsTrigger>
              <TabsTrigger value="returns">Returns & Exchanges</TabsTrigger>
            </TabsList>

            <TabsContent value="shipping" className="space-y-6">
              <div>
                <h2 className="text-xl font-medium mb-4">Shipping Methods</h2>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Shipping Method
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Estimated Delivery
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Cost
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">Standard Shipping</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">3-7 business days</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">₱150</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">Express Shipping</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">1-3 business days</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">₱300</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">Same-Day Delivery (Metro Manila only)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">Same day (order before 11 AM)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">₱450</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">International Shipping</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">7-14 business days</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">Varies by location</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-4">Free Shipping</h2>
                <p className="mb-4">
                  We offer free standard shipping on all domestic orders over ₱3,000. International orders over ₱10,000
                  also qualify for free standard international shipping.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-4">Shipping Restrictions</h2>
                <p className="mb-4">
                  We currently ship to most countries worldwide. However, there may be restrictions for certain
                  locations. If you're unsure whether we ship to your country, please{" "}
                  <Link href="/help/contact" className="text-primary hover:underline">
                    contact us
                  </Link>{" "}
                  before placing your order.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-4">Order Tracking</h2>
                <p className="mb-4">
                  Once your order ships, you'll receive a confirmation email with tracking information. You can also
                  track your order by logging into your account and viewing your order history.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="returns" className="space-y-6">
              <div>
                <h2 className="text-xl font-medium mb-4">Return Policy</h2>
                <p className="mb-4">
                  We want you to be completely satisfied with your purchase. If you're not happy with your order, you
                  can return it within 30 days of delivery for a full refund or exchange.
                </p>
                <p className="mb-4">
                  To be eligible for a return, your item must be unused and in the same condition that you received it.
                  It must also be in the original packaging with all tags attached.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-4">Non-Returnable Items</h2>
                <p className="mb-4">The following items cannot be returned:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Sale items marked as "Final Sale"</li>
                  <li>Customized or personalized products</li>
                  <li>Intimate apparel and swimwear for hygiene reasons</li>
                  <li>Gift cards</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-4">How to Initiate a Return</h2>
                <ol className="list-decimal pl-5 space-y-2 mb-4">
                  <li>
                    Log in to your account and go to your order history, or{" "}
                    <Link href="/help/contact" className="text-primary hover:underline">
                      contact our customer service team
                    </Link>
                    .
                  </li>
                  <li>Select the order and items you wish to return.</li>
                  <li>Choose whether you want a refund or an exchange.</li>
                  <li>Print the return shipping label (for domestic orders only).</li>
                  <li>Package your items securely with the original packaging.</li>
                  <li>Drop off your package at the nearest courier location.</li>
                </ol>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-4">Return Shipping Costs</h2>
                <p className="mb-4">
                  For domestic returns, we provide a prepaid return shipping label. The cost of return shipping (₱150)
                  will be deducted from your refund.
                </p>
                <p className="mb-4">
                  For international returns, customers are responsible for return shipping costs and must arrange their
                  own return shipping.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-4">Refund Process</h2>
                <p className="mb-4">
                  Once we receive your return, we'll inspect the item(s) to ensure they meet our return policy
                  requirements. If approved, your refund will be processed within 3-5 business days. The refund will be
                  issued to your original payment method.
                </p>
                <p className="mb-4">
                  Please note that it may take an additional 5-10 business days for the refund to appear in your
                  account, depending on your payment provider.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-medium mb-4">Need more help?</h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about shipping, returns, or exchanges, our customer service team is here to
              help.
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

