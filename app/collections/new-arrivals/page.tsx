"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock, X, Check, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

// New arrivals products (selected from all products)
const newArrivalsProducts = [
  {
    id: "1",
    name: "Graphic Tee",
    price: "₱899",
    image: "/placeholder.svg?height=600&width=480",
    daysAgo: 2,
  },
  {
    id: "5",
    name: "Varsity Jacket",
    price: "₱2,499",
    image: "/placeholder.svg?height=600&width=480",
    daysAgo: 3,
  },
  {
    id: "7",
    name: "Bucket Hat",
    price: "₱899",
    image: "/placeholder.svg?height=600&width=480",
    daysAgo: 5,
  },
  {
    id: "8",
    name: "Oversized Tee",
    price: "₱999",
    image: "/placeholder.svg?height=600&width=480",
    daysAgo: 7,
  },
  {
    id: "10",
    name: "Crossbody Bag",
    price: "₱1,099",
    image: "/placeholder.svg?height=600&width=480",
    daysAgo: 10,
  },
  {
    id: "12",
    name: "Beanie",
    price: "₱699",
    image: "/placeholder.svg?height=600&width=480",
    daysAgo: 14,
  },
]

export default function NewArrivalsPage() {
  const [timeFilter, setTimeFilter] = useState("all")
  const [countdown, setCountdown] = useState({ days: 3, hours: 12, minutes: 45, seconds: 0 })
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "success" | "error">("idle")
  const { toast } = useToast()

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Filter products based on time
  const filteredProducts =
    timeFilter === "all"
      ? newArrivalsProducts
      : newArrivalsProducts.filter((product) => {
          if (timeFilter === "week") return product.daysAgo <= 7
          if (timeFilter === "twoWeeks") return product.daysAgo <= 14
          return true
        })

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) {
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
      // Store subscription in localStorage
      const subscriptions = JSON.parse(localStorage.getItem("early-access-subscriptions") || "[]")

      // Check if email already exists
      if (subscriptions.includes(email)) {
        toast({
          title: "Already subscribed",
          description: "This email is already subscribed for early access.",
          variant: "default",
        })
      } else {
        // Add new subscription
        subscriptions.push(email)
        localStorage.setItem("early-access-subscriptions", JSON.stringify(subscriptions))

        setSubscriptionStatus("success")

        toast({
          title: "Subscription successful",
          description: "You're now on the early access list!",
        })
      }

      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-neutral-100 to-neutral-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-4 bg-black hover:bg-black">Just Dropped</Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">New Arrivals</h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                  Be the first to shop our latest drops. Fresh styles added weekly to keep your wardrobe current and
                  cutting-edge.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow-sm inline-block"
              >
                <p className="text-sm text-muted-foreground mb-2">New drop countdown:</p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{countdown.days}</div>
                    <div className="text-xs text-muted-foreground">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{countdown.hours}</div>
                    <div className="text-xs text-muted-foreground">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{countdown.minutes}</div>
                    <div className="text-xs text-muted-foreground">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{countdown.seconds}</div>
                    <div className="text-xs text-muted-foreground">Seconds</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="container mx-auto py-12 px-4">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all products
          </Link>

          {/* Time Filters */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-bold">Latest Drops</h2>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <select
                className="bg-transparent border-none text-sm font-medium focus:outline-none focus:ring-0"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="week">This Week</option>
                <option value="twoWeeks">Last 2 Weeks</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-black hover:bg-black">New</Badge>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="outline" className="bg-white">
                    {product.daysAgo === 0 ? "Today" : product.daysAgo === 1 ? "Yesterday" : `${product.daysAgo}d ago`}
                  </Badge>
                </div>
                <ProductCard id={product.id} image={product.image} name={product.name} price={product.price} />
              </motion.div>
            ))}
          </motion.div>

          {/* Early Access CTA */}
          <div className="mt-20 border border-black rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Get Early Access</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Sign up for our newsletter to get early access to new drops 24 hours before they're available to the
              public.
            </p>
            <Button size="lg" className="bg-black hover:bg-neutral-800" onClick={() => setIsSubscribeModalOpen(true)}>
              Subscribe Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />

      {/* Subscribe Modal */}
      <AnimatePresence>
        {isSubscribeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => subscriptionStatus !== "success" && setIsSubscribeModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">
                    {subscriptionStatus === "success" ? "You're In!" : "Get Early Access"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {subscriptionStatus === "success"
                      ? "Thank you for subscribing to early access."
                      : "Be the first to shop new arrivals."}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsSubscribeModalOpen(false)
                    if (subscriptionStatus === "success") {
                      setSubscriptionStatus("idle")
                      setEmail("")
                    }
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              {subscriptionStatus === "success" ? (
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">Successfully Subscribed</h4>
                  <p className="text-muted-foreground mb-6">
                    We've added {email} to our early access list. You'll be notified 24 hours before new drops go live.
                  </p>
                  <Button
                    className="w-full bg-black hover:bg-neutral-800"
                    onClick={() => {
                      setIsSubscribeModalOpen(false)
                      setSubscriptionStatus("idle")
                      setEmail("")
                    }}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      By subscribing, you agree to receive marketing emails and early access notifications.
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button type="submit" className="w-full bg-black hover:bg-neutral-800" disabled={isSubmitting}>
                      {isSubmitting ? "Subscribing..." : "Get Early Access"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsSubscribeModalOpen(false)}
                    >
                      Maybe Later
                    </Button>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>Already subscribed? Check your email for exclusive early access links.</p>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

