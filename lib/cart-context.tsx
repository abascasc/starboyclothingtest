"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export type CartItem = {
  id: string | number
  name: string
  price: string
  image: string
  quantity: number
  color?: string
  colorName?: string
  size?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: string | number, color?: string, size?: string) => void
  updateQuantity: (id: string | number, quantity: number, color?: string, size?: string) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { user } = useAuth()
  const { toast } = useToast()

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setItems(JSON.parse(storedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))

    // Log cart activity for admin tracking if user is logged in
    if (user && items.length > 0) {
      const cartActivities = JSON.parse(localStorage.getItem("cartActivities") || "[]")
      const latestActivity = {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        timestamp: new Date().toISOString(),
        action: "update_cart",
        items: items,
      }

      // Store only the last 50 activities to prevent localStorage from getting too large
      const updatedActivities = [latestActivity, ...cartActivities.slice(0, 49)]
      localStorage.setItem("cartActivities", JSON.stringify(updatedActivities))
    }
  }, [items, user])

  const addItem = (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setItems((prevItems) => {
      // Check if item with same id, color, and size already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size,
      )

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        const quantityToAdd = newItem.quantity || 1
        updatedItems[existingItemIndex].quantity += quantityToAdd

        toast({
          title: "Cart updated",
          description: `${newItem.name} quantity increased to ${updatedItems[existingItemIndex].quantity}`,
        })

        return updatedItems
      } else {
        // Add new item with specified quantity or default to 1
        const quantity = newItem.quantity || 1

        toast({
          title: "Added to cart",
          description: `${newItem.name} has been added to your cart`,
        })

        return [...prevItems, { ...newItem, quantity }]
      }
    })
  }

  const removeItem = (id: string | number, color?: string, size?: string) => {
    setItems((prevItems) => {
      // Find the specific item variant to remove
      const itemToRemoveIndex = prevItems.findIndex(
        (item) =>
          item.id === id && (color === undefined || item.color === color) && (size === undefined || item.size === size),
      )

      if (itemToRemoveIndex >= 0) {
        const itemToRemove = prevItems[itemToRemoveIndex]
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.name} has been removed from your cart`,
        })

        const newItems = [...prevItems]
        newItems.splice(itemToRemoveIndex, 1)
        return newItems
      }

      return prevItems
    })
  }

  const updateQuantity = (id: string | number, quantity: number, color?: string, size?: string) => {
    if (quantity < 1) return

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && (color === undefined || item.color === color) && (size === undefined || item.size === size)
          ? { ...item, quantity }
          : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  // Calculate total number of items
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  // Calculate subtotal (removing currency symbol and converting to number)
  const subtotal = items.reduce((total, item) => {
    const price = Number.parseFloat(item.price.replace(/[^0-9.]/g, ""))
    return total + price * item.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

