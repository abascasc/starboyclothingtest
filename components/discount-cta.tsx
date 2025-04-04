"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, ArrowRight, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import confetti from "canvas-confetti"
import { useAuth } from "@/lib/auth-context"

export default function DiscountCTA() {
  const { user } = useAuth()
  const [isVisible, setIsVisible] = useState(true)
  const [isCodeRevealed, setIsCodeRevealed] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const discountCode = "NEWDROP25"

  // Check if user has dismissed the CTA before
  useEffect(() => {
    const dismissed = localStorage.getItem("discountCTADismissed")
    if (dismissed) {
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("discountCTADismissed", "true")
  }

  const handleRevealCode = () => {
    setIsCodeRevealed(true)
    setHasInteracted(true)

    // Trigger confetti effect
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5, x: 0.5 },
      colors: ["#8B0000", "#FFFFFF", "#CCCCCC"],
    })
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(discountCode)

    // Show toast or feedback
    const toast = document.createElement("div")
    toast.className = "fixed top-4 right-4 bg-black text-white py-2 px-4 rounded shadow-lg z-50"
    toast.textContent = "Discount code copied!"
    document.body.appendChild(toast)

    setTimeout(() => {
      document.body.removeChild(toast)
    }, 2000)
  }

  const handleGoToCart = () => {
    if (!user) {
      // Trigger auth popup for non-logged in users
      if (typeof window !== "undefined" && window.showAuthPopup) {
        // @ts-ignore
        window.showAuthPopup()
      } else {
        // Fallback if the global function isn't available
        window.dispatchEvent(new Event("showAuthPopup"))
      }
      return
    }

    // For logged in users, proceed to cart
    // No need to do anything special as the Link component will handle navigation
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-white rounded-xl shadow-2xl overflow-hidden max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-black/70 hover:text-black z-10 bg-white/80 rounded-full p-1"
              aria-label="Close discount offer"
            >
              <X className="h-5 w-5" />
            </motion.button>

            <motion.div
              className="h-2 w-full bg-gradient-to-r from-mahogany via-mahogany-light to-mahogany-dark"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />

            <div className="p-8 text-center">
              <motion.div
                className="flex items-center justify-center mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="relative">
                  <Gift className="h-16 w-16 text-black" />
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  >
                    <Sparkles className="h-16 w-16 text-mahogany" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h3
                className="text-3xl font-bold mb-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                EXCLUSIVE OFFER
              </motion.h3>

              <motion.p
                className="text-xl font-light mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Get 25% Off Your First Order
              </motion.p>

              <motion.div
                className="mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <p className="text-neutral-600">Use this exclusive discount on our new arrivals collection.</p>
              </motion.div>

              {!isCodeRevealed ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Button
                    onClick={handleRevealCode}
                    className="w-full bg-mahogany text-white hover:bg-mahogany-dark py-6 text-lg"
                  >
                    Reveal Discount Code
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="mb-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-neutral-100 border-2 border-mahogany rounded-md p-4 text-center cursor-pointer mb-4"
                    onClick={handleCopyCode}
                  >
                    <p className="text-xs text-neutral-500 mb-1">Click to copy</p>
                    <motion.p
                      className="font-mono font-bold text-2xl tracking-widest"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {discountCode.split("").map((char, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 * index }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    {user ? (
                      <Button asChild className="w-full bg-black text-white hover:bg-neutral-800 py-6 text-lg">
                        <Link href="/cart">
                          Go to Cart
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        onClick={handleGoToCart}
                        className="w-full bg-black text-white hover:bg-neutral-800 py-6 text-lg"
                      >
                        Go to Cart
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    )}
                  </motion.div>
                </motion.div>
              )}

              <motion.p
                className="text-xs text-neutral-500 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                *Valid for new customers only. Cannot be combined with other offers.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

