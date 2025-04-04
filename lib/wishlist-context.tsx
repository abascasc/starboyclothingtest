"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export type WishlistItem = {
  id: string | number
  name: string
  price: string
  image: string
}

type WishlistContextType = {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string | number) => void
  clearWishlist: () => void
  isInWishlist: (id: string | number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const { user } = useAuth()
  const { toast } = useToast()

  // Load wishlist from localStorage on mount and when user changes
  useEffect(() => {
    if (user) {
      const storedWishlist = localStorage.getItem(`wishlist-${user.id}`)
      if (storedWishlist) {
        setItems(JSON.parse(storedWishlist))
      }
    } else {
      // Clear wishlist when user logs out
      setItems([])
    }
  }, [user])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist-${user.id}`, JSON.stringify(items))
    }
  }, [items, user])

  const addItem = (newItem: WishlistItem) => {
    if (!user) return

    setItems((prevItems) => {
      // Check if item already exists in wishlist
      if (!prevItems.some((item) => item.id === newItem.id)) {
        toast({
          title: "Added to wishlist",
          description: `${newItem.name} has been added to your wishlist`,
        })
        return [...prevItems, newItem]
      }
      return prevItems
    })
  }

  const removeItem = (id: string | number) => {
    if (!user) return

    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id)
      if (itemToRemove) {
        toast({
          title: "Removed from wishlist",
          description: `${itemToRemove.name} has been removed from your wishlist`,
        })
      }
      return prevItems.filter((item) => item.id !== id)
    })
  }

  const clearWishlist = () => {
    if (!user) return

    setItems([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    })
  }

  const isInWishlist = (id: string | number) => {
    return items.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

