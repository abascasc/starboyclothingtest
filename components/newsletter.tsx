"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, AlertCircle, Send, Info, Lock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "success" | "error">("idle")
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)
  const { toast } = useToast()

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleOpenPrivacyDialog = (e: React.MouseEvent) => {
    e.preventDefault()
    setPrivacyDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    if (!email || !validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    // Open privacy dialog if consent hasn't been given yet
    if (!consentGiven) {
      setPrivacyDialogOpen(true)
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Store subscription in localStorage
      const subscriptions = JSON.parse(localStorage.getItem("newsletter-subscriptions") || "[]")

      // Check if email already exists
      if (subscriptions.includes(email)) {
        toast({
          title: "Already subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "default",
        })
      } else {
        // Add new subscription
        subscriptions.push(email)
        localStorage.setItem("newsletter-subscriptions", JSON.stringify(subscriptions))

        setSubscriptionStatus("success")

        toast({
          title: "Subscription successful",
          description: "Thank you for subscribing to our newsletter!",
        })
      }

      setIsSubmitting(false)
    }, 1500)
  }

  const handleTryAgain = () => {
    setSubscriptionStatus("idle")
    setEmail("")
    setConsentGiven(false)
  }

  const handlePrivacyConsent = () => {
    setConsentGiven(true)
    setPrivacyDialogOpen(false)

    // Submit the form after consent is given
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Store subscription in localStorage
      const subscriptions = JSON.parse(localStorage.getItem("newsletter-subscriptions") || "[]")

      // Check if email already exists
      if (subscriptions.includes(email)) {
        toast({
          title: "Already subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "default",
        })
      } else {
        // Add new subscription
        subscriptions.push(email)
        localStorage.setItem("newsletter-subscriptions", JSON.stringify(subscriptions))

        setSubscriptionStatus("success")

        toast({
          title: "Subscription successful",
          description: "Thank you for subscribing to our newsletter!",
        })
      }

      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <motion.section
      className="py-16 px-4 md:px-6 bg-black text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          JOIN OUR NEWSLETTER
        </motion.h2>
        <motion.p
          className="text-lg mb-8 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Subscribe to our newsletter to receive updates on new arrivals, special offers, and exclusive content.
        </motion.p>

        {subscriptionStatus === "idle" ? (
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white text-black rounded-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="rounded-none bg-mahogany hover:bg-mahogany-dark text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    SUBSCRIBING...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    SUBSCRIBE
                  </span>
                )}
              </Button>
            </motion.div>
          </motion.form>
        ) : subscriptionStatus === "success" ? (
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="bg-green-900 border-green-800 text-white">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Thank you for subscribing! We've sent a confirmation email to {email}.
              </AlertDescription>
            </Alert>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="mt-4 border-white text-white hover:bg-white hover:text-black"
                onClick={handleTryAgain}
              >
                Subscribe another email
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="bg-red-900 border-red-800 text-white">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>There was an error subscribing to the newsletter. Please try again.</AlertDescription>
            </Alert>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="mt-4 border-white text-white hover:bg-white hover:text-black"
                onClick={handleTryAgain}
              >
                Try again
              </Button>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          className="mt-6 text-sm text-neutral-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          By subscribing, you agree to our{" "}
          <button onClick={handleOpenPrivacyDialog} className="underline hover:text-white transition-colors">
            Privacy Policy
          </button>{" "}
          and consent to receive marketing emails.
        </motion.div>
      </div>

      {/* Privacy Policy Dialog */}
      <Dialog open={privacyDialogOpen} onOpenChange={setPrivacyDialogOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Lock className="mr-2 h-4 w-4" />
              Newsletter Privacy Policy
            </DialogTitle>
            <DialogDescription>Please review our newsletter privacy policy before subscribing</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <p>
              At Starboy, we value your privacy and are committed to protecting your personal information. This policy
              explains how we collect, use, and safeguard your data when you subscribe to our newsletter.
            </p>

            <h3 className="font-medium text-base">Information We Collect</h3>
            <p>
              When you subscribe to our newsletter, we collect your email address and any preferences you may indicate
              regarding the types of communications you wish to receive.
            </p>

            <h3 className="font-medium text-base">How We Use Your Information</h3>
            <p>We use your email address to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Send you our newsletter with updates on new products, collections, and promotions</li>
              <li>Notify you about special events and exclusive offers</li>
              <li>Provide information about products you might be interested in based on your preferences</li>
            </ul>

            <h3 className="font-medium text-base">Your Rights</h3>
            <p>
              You can unsubscribe from our newsletter at any time by clicking the "Unsubscribe" link at the bottom of
              any email we send. You also have the right to request access to, correction of, or deletion of your
              personal information.
            </p>

            <Alert className="bg-blue-50 border-blue-200 text-blue-800">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                We will never sell or share your email address with third parties for their marketing purposes without
                your explicit consent.
              </AlertDescription>
            </Alert>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="privacy-consent"
              checked={consentGiven}
              onCheckedChange={(checked) => setConsentGiven(checked === true)}
            />
            <Label htmlFor="privacy-consent" className="text-sm">
              I consent to receive marketing emails and understand I can unsubscribe at any time
            </Label>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setPrivacyDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handlePrivacyConsent}
              disabled={!consentGiven}
              className={!consentGiven ? "opacity-50 cursor-not-allowed" : ""}
            >
              Subscribe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.section>
  )
}

