"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/lib/wishlist-context"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function WishlistButton() {
  const { items } = useWishlist()
  const totalItems = items.length

  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href="/wishlist">
        <div className="relative">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Heart className="h-5 w-5" />
          </motion.div>
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                className="absolute -top-2 -right-2 bg-mahogany text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
          <span className="sr-only">Wishlist</span>
        </div>
      </Link>
    </Button>
  )
}

