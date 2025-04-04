"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sun, Waves, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { motion } from "framer-motion"

// Summer collection products (selected from all products)
const summerProducts = [
  {
    id: "8",
    name: "Oversized Tee",
    price: "₱999",
    image: "/placeholder.svg?height=600&width=480",
    popularity: 94,
  },
  {
    id: "3",
    name: "Cargo Pants",
    price: "₱1,299",
    image: "/placeholder.svg?height=600&width=480",
    popularity: 85,
  },
  {
    id: "7",
    name: "Bucket Hat",
    price: "₱899",
    image: "/placeholder.svg?height=600&width=480",
    popularity: 82,
  },
  {
    id: "4",
    name: "Cap",
    price: "₱799",
    image: "/placeholder.svg?height=600&width=480",
    popularity: 90,
  },
  {
    id: "10",
    name: "Crossbody Bag",
    price: "₱1,099",
    image: "/placeholder.svg?height=600&width=480",
    popularity: 78,
  },
  {
    id: "9",
    name: "Track Pants",
    price: "₱1,199",
    image: "/placeholder.svg?height=600&width=480",
    popularity: 80,
  },
]

export default function SummerCollectionPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortOption, setSortOption] = useState("default")

  // Filter products based on category
  const filteredProducts =
    activeCategory === "all"
      ? summerProducts
      : summerProducts.filter((product) => {
          if (activeCategory === "tops") return ["8"].includes(product.id)
          if (activeCategory === "bottoms") return ["3", "9"].includes(product.id)
          if (activeCategory === "accessories") return ["7", "4", "10"].includes(product.id)
          return true
        })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "popular") {
      return b.popularity - a.popularity
    }
    return 0
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] bg-amber-50 flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="text-amber-300 h-64 w-64 opacity-20" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute bottom-0 w-full"
          >
            <Waves className="text-amber-200 w-full h-24" />
          </motion.div>
          <div className="relative z-10 text-center px-4 max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              SUMMER COLLECTION
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            >
              Lightweight fabrics, vibrant colors, and relaxed fits designed for those sun-soaked days and warm
              evenings.
            </motion.p>
          </div>
        </section>

        <div className="container mx-auto py-12 px-4">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all products
          </Link>

          {/* Category Filters */}
          <div className="flex justify-between items-center mb-12">
            <div className="inline-flex bg-muted rounded-full p-1">
              <Button
                variant={activeCategory === "all" ? "default" : "ghost"}
                className={`rounded-full ${activeCategory === "all" ? "" : "hover:bg-background/50"}`}
                onClick={() => setActiveCategory("all")}
              >
                All
              </Button>
              <Button
                variant={activeCategory === "tops" ? "default" : "ghost"}
                className={`rounded-full ${activeCategory === "tops" ? "" : "hover:bg-background/50"}`}
                onClick={() => setActiveCategory("tops")}
              >
                Tops
              </Button>
              <Button
                variant={activeCategory === "bottoms" ? "default" : "ghost"}
                className={`rounded-full ${activeCategory === "bottoms" ? "" : "hover:bg-background/50"}`}
                onClick={() => setActiveCategory("bottoms")}
              >
                Bottoms
              </Button>
              <Button
                variant={activeCategory === "accessories" ? "default" : "ghost"}
                className={`rounded-full ${activeCategory === "accessories" ? "" : "hover:bg-background/50"}`}
                onClick={() => setActiveCategory("accessories")}
              >
                Accessories
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                className="bg-transparent border-none text-sm font-medium focus:outline-none focus:ring-0"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard id={product.id} image={product.image} name={product.name} price={product.price} />
              </motion.div>
            ))}
          </motion.div>

          {/* Summer Lookbook CTA */}
          <div className="mt-20 bg-amber-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Summer Lookbook 2023</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get inspired with our curated summer looks. Discover how to style our summer collection for beach days,
              city nights, and everything in between.
            </p>
            <Button size="lg" className="bg-black hover:bg-neutral-800" asChild>
              <Link href="/collections/summer/lookbook"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                View Lookbook
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

