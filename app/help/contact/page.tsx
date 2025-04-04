"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [inquiryType, setInquiryType] = useState("general")
  const [orderNumber, setOrderNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!name || !email || !message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Store contact submission in localStorage for demo purposes
      const submissions = JSON.parse(localStorage.getItem("contact-submissions") || "[]")
      submissions.push({
        name,
        email,
        subject,
        message,
        inquiryType,
        orderNumber,
        timestamp: new Date().toISOString(),
      })
      localStorage.setItem("contact-submissions", JSON.stringify(submissions))

      setIsSubmitting(false)
      setIsSubmitted(true)

      toast({
        title: "Message sent",
        description: "We've received your message and will get back to you soon.",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-12 px-4">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Have a question, feedback, or need assistance? We're here to help. Fill out the form below or use one of our
            contact methods to get in touch with our team.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <div className="border rounded-lg p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out to us. We've received your message and will get back to you as soon as
                    possible, usually within 24-48 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 border rounded-lg p-6">
                  <div className="space-y-2">
                    <Label htmlFor="inquiry-type">Inquiry Type</Label>
                    <RadioGroup
                      value={inquiryType}
                      onValueChange={setInquiryType}
                      className="flex flex-wrap gap-4"
                      id="inquiry-type"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general">General Inquiry</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="order" id="order" />
                        <Label htmlFor="order">Order Support</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="product" id="product" />
                        <Label htmlFor="product">Product Question</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="returns" id="returns" />
                        <Label htmlFor="returns">Returns & Exchanges</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {inquiryType === "order" && (
                    <div className="space-y-2">
                      <Label htmlFor="order-number">Order Number (if applicable)</Label>
                      <Input
                        id="order-number"
                        placeholder="e.g., ORD-12345"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What is your message about?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Sending Message...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground">support@starboy.com</p>
                      <p className="text-xs text-muted-foreground mt-1">We typically respond within 24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-sm text-muted-foreground">(02) 8123-4567</p>
                      <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9:00 AM - 6:00 PM PHT</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Store Location</h3>
                      <p className="text-sm text-muted-foreground">
                        123 Fashion Street
                        <br />
                        Makati City, Metro Manila
                        <br />
                        Philippines
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Open daily, 10:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Frequently Asked</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/help/faqs" className="text-primary hover:underline">
                      What is your return policy?
                    </Link>
                  </li>
                  <li>
                    <Link href="/help/shipping-returns" className="text-primary hover:underline">
                      How long does shipping take?
                    </Link>
                  </li>
                  <li>
                    <Link href="/help/size-guide" className="text-primary hover:underline">
                      How do I find my size?
                    </Link>
                  </li>
                  <li>
                    <Link href="/help/faqs" className="text-primary hover:underline">
                      Do you ship internationally?
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

