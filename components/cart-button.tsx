"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function CartButton() {
  const { totalItems } = useCart()

  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href="/cart">
        <div className="relative">
          <ShoppingBag className="h-5 w-5" />
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
          <span className="sr-only">Cart</span>
        </div>
      </Link>
    </Button>
  )
}

