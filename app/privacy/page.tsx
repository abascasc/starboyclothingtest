import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
import Header from "@/components/header"

export default function PrivacyPolicyPage() {
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
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: March 30, 2025</p>

          <div className="prose max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, place an order,
              contact customer service, or otherwise communicate with us. This information may include your name, email
              address, phone number, postal address, payment information, and any other information you choose to
              provide.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about products, services, and promotions</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Improve our website and services</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Comply with our legal obligations</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers who perform services on our behalf</li>
              <li>Payment processors to process your payments</li>
              <li>Shipping carriers to deliver your orders</li>
              <li>Law enforcement or other third parties when required by law</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and collect certain
              information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
              sent.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as the
              right to access, correct, delete, or restrict processing of your personal information.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 16, and we do not knowingly collect personal information
              from children under 16. If we learn we have collected personal information from a child under 16, we will
              delete that information.
            </p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you by
              email or by posting a notice on our website prior to the change becoming effective.
            </p>

            <h2>9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@starboy.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

