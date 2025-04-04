"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, ArrowRight, SnowflakeIcon as Confetti } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function NewUserDiscount() {
  const { user } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const [isCodeRevealed, setIsCodeRevealed] = useState(false)
  const discountCode = "WELCOME30"
  const router = useRouter()

  // Check if this is a new user who just signed up
  useEffect(() => {
    if (user && !user.isAdmin) {
      // Check if we've shown this popup to this user before
      const hasSeenWelcomeDiscount = localStorage.getItem(`welcomeDiscountShown_${user.id}`)

      if (!hasSeenWelcomeDiscount) {
        // Check if this is a new signup (within the last minute)
        const userCreationTime = user.createdAt || Date.now()
        const isNewSignup = Date.now() - userCreationTime < 60000 // 1 minute

        if (isNewSignup) {
          // Show the welcome discount popup
          setTimeout(() => {
            setIsVisible(true)
            // Mark that we've shown this popup to this user
            localStorage.setItem(`welcomeDiscountShown_${user.id}`, "true")
          }, 1000) // Show after 1 second
        }
      }
    }
  }, [user])

  const handleDismiss = () => {
    setIsVisible(false)
  }

  const handleRevealCode = () => {
    setIsCodeRevealed(true)

    // Trigger confetti effect
    confetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.5, x: 0.5 },
      colors: ["#FFD700", "#FFFFFF", "#000000"],
    })
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(discountCode)

    // Show toast or feedback
    const toast = document.createElement("div")
    toast.className = "fixed top-4 right-4 bg-black text-white py-2 px-4 rounded shadow-lg z-50"
    toast.textContent = "Welcome discount code copied!"
    document.body.appendChild(toast)

    setTimeout(() => {
      document.body.removeChild(toast)
    }, 2000)
  }

  const handleShopNewArrivals = () => {
    // Close the popup first
    setIsVisible(false)
    // Then navigate to the new arrivals page
    setTimeout(() => {
      router.push("/collections/new-arrivals")
    }, 100)
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
            className="relative bg-gradient-to-br from-black to-neutral-900 rounded-xl shadow-2xl overflow-hidden max-w-md w-full mx-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10 bg-black/30 rounded-full p-1"
              aria-label="Close welcome offer"
            >
              <X className="h-5 w-5" />
            </motion.button>

            <motion.div
              className="h-2 w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
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
                  <Confetti className="h-16 w-16 text-yellow-400" />
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
                    <Sparkles className="h-16 w-16 text-yellow-500" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h3
                className="text-3xl font-bold mb-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                WELCOME TO STARBOY
              </motion.h3>

              <motion.p
                className="text-xl font-light mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Enjoy 30% Off Your First Purchase
              </motion.p>

              <motion.div
                className="mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <p className="text-neutral-300">Thanks for joining us! Here's a special discount just for you.</p>
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
                    className="w-full bg-yellow-500 text-black hover:bg-yellow-400 py-6 text-lg font-bold"
                  >
                    Get Your Welcome Gift
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
                    className="bg-white/10 border-2 border-yellow-500 rounded-md p-4 text-center cursor-pointer mb-4"
                    onClick={handleCopyCode}
                  >
                    <p className="text-xs text-yellow-300 mb-1">Click to copy</p>
                    <motion.p
                      className="font-mono font-bold text-2xl tracking-widest text-white"
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
                    <Button
                      onClick={handleShopNewArrivals}
                      className="w-full bg-white text-black hover:bg-neutral-200 py-6 text-lg"
                    >
                      Shop New Arrivals
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              <motion.p
                className="text-xs text-neutral-400 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                *Valid for 7 days from signup. Cannot be combined with other offers.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

