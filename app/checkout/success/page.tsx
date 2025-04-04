import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import Header from "@/components/header"

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4 flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. We've received your order and will begin processing it right away. You'll
            receive an email confirmation shortly.
          </p>

          {/* Display discount info if voucher was applied */}
          <div className="bg-neutral-50 p-4 rounded-lg mb-8">
            <p className="text-sm font-medium">Order Summary</p>
            <p className="text-xs text-muted-foreground mb-2">Your discount code NEWDROP25 was applied successfully.</p>
            <p className="text-sm">You saved 25% on your order!</p>
          </div>

          <div className="space-y-4">
            <Button asChild className="w-full bg-mahogany hover:bg-mahogany-dark text-white">
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/account/orders">View Order History</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

