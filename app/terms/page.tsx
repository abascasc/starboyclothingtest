import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
import Header from "@/components/header"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <Link
          href="/auth/signup"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign up
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: March 30, 2025</p>

          <div className="prose max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Starboy ("we," "our," or "us"). By accessing or using our website, mobile application, or any
              of our services, you agree to be bound by these Terms of Service.
            </p>

            <h2>2. Account Registration</h2>
            <p>
              To use certain features of our service, you may need to register for an account. You agree to provide
              accurate, current, and complete information during the registration process and to update such information
              to keep it accurate, current, and complete.
            </p>

            <h2>3. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities
              that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2>4. Ordering and Payments</h2>
            <p>
              When you place an order through our service, you agree to provide current, complete, and accurate purchase
              and account information. All payments must be made through our approved payment methods. Prices for
              products are subject to change without notice.
            </p>

            <h2>5. Shipping and Delivery</h2>
            <p>
              We will make every effort to ship products within the timeframes indicated on our website. However,
              shipping times are estimates and not guaranteed. We are not responsible for delays caused by shipping
              carriers or customs.
            </p>

            <h2>6. Returns and Refunds</h2>
            <p>
              Products may be returned within 30 days of delivery if they are in their original condition with tags
              attached. Refunds will be processed to the original payment method within 14 business days of receiving
              the returned items.
            </p>

            <h2>7. Intellectual Property</h2>
            <p>
              All content on our service, including but not limited to text, graphics, logos, images, and software, is
              the property of Starboy or its content suppliers and is protected by copyright and other intellectual
              property laws.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              In no event shall Starboy be liable for any indirect, incidental, special, consequential, or punitive
              damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Philippines, without
              regard to its conflict of law provisions.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by
              posting the updated Terms on our website and updating the "Last updated" date.
            </p>

            <h2>11. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at support@starboy.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

