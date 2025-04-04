"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { motion } from "framer-motion"

interface ProductCardProps {
  id?: string | number
  image: string
  name: string
  price: string
}

export default function ProductCard({
  id = Math.random().toString(36).substr(2, 9),
  image,
  name,
  price,
}: ProductCardProps) {
  const { addItem } = useCart()
  const { user } = useAuth()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const router = useRouter()
  const { toast } = useToast()

  const inWishlist = isInWishlist(id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      // If user is not logged in, show auth popup
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart",
        variant: "destructive",
      })

      // Trigger the auth popup
      if (typeof window !== "undefined" && window.showAuthPopup) {
        // @ts-ignore
        window.showAuthPopup()
      } else {
        // Fallback if the global function isn't available
        window.dispatchEvent(new Event("showAuthPopup"))
      }
      return
    }

    // User is logged in, proceed with adding to cart
    addItem({
      id,
      name,
      price,
      image,
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      // If user is not logged in, show auth popup
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive",
      })

      // Trigger the auth popup
      if (typeof window !== "undefined" && window.showAuthPopup) {
        // @ts-ignore
        window.showAuthPopup()
      } else {
        // Fallback if the global function isn't available
        window.dispatchEvent(new Event("showAuthPopup"))
      }
      return
    }

    // Toggle wishlist status
    if (inWishlist) {
      removeFromWishlist(id)
    } else {
      addToWishlist({
        id,
        name,
        price,
        image,
      })
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Link href={`/products/${id}`} className="group relative block overflow-hidden">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-neutral-100">
          <motion.img
            src={image || "/placeholder.svg"}
            alt={name}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            animate={{ opacity: inWishlist ? 1 : 0 }}
          >
            <Button
              variant="secondary"
              size="icon"
              className={`rounded-full ${inWishlist ? "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700" : ""}`}
              onClick={handleWishlistToggle}
            >
              <motion.div
                whileTap={{ scale: 0.8 }}
                animate={inWishlist ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
              </motion.div>
              <span className="sr-only">{inWishlist ? "Remove from wishlist" : "Add to wishlist"}</span>
            </Button>
          </motion.div>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm font-medium">{name}</h3>
            <p className="mt-1 text-sm font-medium">{price}</p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full mt-2 opacity-0 group-hover:opacity-100 transition-all"
        >
          <Button
            className="w-full bg-black text-white hover:bg-mahogany"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
            as={motion.button}
          >
            {user ? "ADD TO CART" : "SIGN IN TO BUY"}
          </Button>
        </motion.div>
      </Link>
    </motion.div>
  )
}

