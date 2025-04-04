"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/lib/wishlist-context"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { useToast } from "@/hooks/use-toast"

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist()
  const { addItem } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Redirect to login if not authenticated
  if (!user && typeof window !== "undefined") {
    router.push("/auth/signin?redirect=/wishlist")
    return null
  }

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
  }

  const handleAddAllToCart = () => {
    setIsLoading(true)

    // Add each item to cart with a small delay to prevent UI freezing
    items.forEach((item, index) => {
      setTimeout(() => {
        addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
        })

        // When all items are added, show toast and reset loading state
        if (index === items.length - 1) {
          toast({
            title: "Added to cart",
            description: "All wishlist items have been added to your cart",
          })
          setIsLoading(false)
        }
      }, index * 300)
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            {items.length > 0 && (
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button variant="outline" size="sm" onClick={clearWishlist}>
                  Clear Wishlist
                </Button>
                <Button size="sm" onClick={handleAddAllToCart} disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add All to Cart"}
                </Button>
              </div>
            )}
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="relative group border rounded-lg p-4">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-neutral-100 mb-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="mt-1 text-sm font-medium">{item.price}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-black hover:bg-neutral-800"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-100 rounded-full mb-6">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Save your favorite items to your wishlist so you can easily find them later.
            </p>
            <Button asChild>
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

