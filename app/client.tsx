"use client"

import type React from "react"

import { useEffect } from "react"
import { AuthProvider } from "@/lib/auth-context"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { ThemeProvider } from "@/components/theme-provider"
import AuthPopup from "@/components/auth-popup"
import NewUserDiscount from "@/components/new-user-discount"
import AIChatbot from "@/components/ai-chatbot"
import AdminButton from "@/components/admin-button" // Import the AdminButton component

export default function Providers({ children }: { children: React.ReactNode }) {
  // Add global window type for TypeScript
  useEffect(() => {
    // This is just to ensure the window object is available
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
            <AuthPopup />
            <NewUserDiscount />
            <AIChatbot />
            <AdminButton /> {/* Add the AdminButton component */}
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

