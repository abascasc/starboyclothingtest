"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/auth-context"

export default function AuthPopup() {
  const { user } = useAuth()
  const [showAuthPopup, setShowAuthPopup] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)

  // Function to show auth popup (can be called from other components)
  useEffect(() => {
    // Create a custom event to show the auth popup
    const showAuthPopupEvent = new Event("showAuthPopup")

    // Add event listener
    const handleShowAuthPopup = () => {
      if (!user) {
        setShowAuthPopup(true)
      }
    }

    window.addEventListener("showAuthPopup", handleShowAuthPopup)

    // Expose a global function to show the auth popup
    window.showAuthPopup = handleShowAuthPopup

    return () => {
      window.removeEventListener("showAuthPopup", handleShowAuthPopup)
      // @ts-ignore
      delete window.showAuthPopup
    }
  }, [user])

  if (user) {
    return null
  }

  return (
    <AnimatePresence>
      {showAuthPopup && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAuthPopup(false)}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Starboy</h2>
            <div className="space-y-4">
              <Button asChild className="w-full py-6 text-lg">
                <Link href="/auth/signin">
                  <User className="mr-2 h-5 w-5" />
                  Sign In
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full py-6 text-lg">
                <Link href="/auth/signup">
                  <User className="mr-2 h-5 w-5" />
                  Create Account
                </Link>
              </Button>
              <div className="text-center text-sm text-muted-foreground mt-6">
                <p>Sign in to access your account, orders, and wishlist.</p>
                <p className="mt-2">Enjoy exclusive benefits and faster checkout.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

