"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, X } from "lucide-react"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { Input } from "@/components/ui/input"
import { useSearchParams, useRouter } from "next/navigation"

// Mock product data - in a real app, this would come from a database or API
const allProducts = [
  {
    id: "1",
    name: "Graphic Tee",
    price: "₱899",
    image: "/placeholder.svg?height=600&width=480",
    category: "t-shirts",
    color: "black",
  },
  {
    id: "2",
    name: "Logo Hoodie",
    price: "₱1,499",
    image: "/placeholder.svg?height=600&width=480",
    category: "hoodies",
    color: "gray",
  },
  {
    id: "3",
    name: "Cargo Pants",
    price: "₱1,299",
    image: "/placeholder.svg?height=600&width=480",
    category: "pants",
    color: "green",
  },
  {
    id: "4",
    name: "Cap",
    price: "₱799",
    image: "/placeholder.svg?height=600&width=480",
    category: "headwear",
    color: "black",
  },
  {
    id: "5",
    name: "Varsity Jacket",
    price: "₱2,499",
    image: "/placeholder.svg?height=600&width=480",
    category: "jackets",
    color: "blue",
  },
  {
    id: "6",
    name: "Denim Jeans",
    price: "₱1,399",
    image: "/placeholder.svg?height=600&width=480",
    category: "pants",
    color: "blue",
  },
  {
    id: "7",
    name: "Bucket Hat",
    price: "₱899",
    image: "/placeholder.svg?height=600&width=480",
    category: "headwear",
    color: "white",
  },
  {
    id: "8",
    name: "Oversized Tee",
    price: "₱999",
    image: "/placeholder.svg?height=600&width=480",
    category: "t-shirts",
    color: "white",
  },
  {
    id: "9",
    name: "Track Pants",
    price: "₱1,199",
    image: "/placeholder.svg?height=600&width=480",
    category: "pants",
    color: "black",
  },
  {
    id: "10",
    name: "Crossbody Bag",
    price: "₱1,099",
    image: "/placeholder.svg?height=600&width=480",
    category: "accessories",
    color: "black",
  },
  {
    id: "11",
    name: "Socks (3 Pack)",
    price: "₱599",
    image: "/placeholder.svg?height=600&width=480",
    category: "accessories",
    color: "gray",
  },
  {
    id: "12",
    name: "Beanie",
    price: "₱699",
    image: "/placeholder.svg?height=600&width=480",
    category: "headwear",
    color: "green",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  // Filter products based on search query
  useEffect(() => {
    if (initialQuery) {
      const query = initialQuery.toLowerCase()
      const results = allProducts.filter(
        (product) => product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query),
      )
      setFilteredProducts(results)
    } else {
      setFilteredProducts([])
    }
  }, [initialQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    router.push("/search")
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
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          {initialQuery && (
            <p className="text-muted-foreground">
              {filteredProducts.length} results for "{initialQuery}"
            </p>
          )}
        </div>

        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </form>
        </div>

        {initialQuery ? (
          filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-4">No products found</h2>
              <p className="text-muted-foreground mb-6">We couldn't find any products matching your search.</p>
              <Button asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">Search for products</h2>
            <p className="text-muted-foreground mb-6">Enter a search term above to find products.</p>
            <Button asChild>
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

