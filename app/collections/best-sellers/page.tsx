"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, TrendingUp, Star, Award, FlameIcon as Fire } from "lucide-react"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Best sellers products (selected from all products)
const bestSellersProducts = [
  {
    id: "2",
    name: "Logo Hoodie",
    price: "₱1,499",
    image: "/placeholder.svg?height=600&width=480",
    rating: 4.9,
    reviews: 128,
    sold: 1250,
    category: "tops",
    popularity: 98,
  },
  {
    id: "1",
    name: "Graphic Tee",
    price: "₱899",
    image: "/placeholder.svg?height=600&width=480",
    rating: 4.8,
    reviews: 215,
    sold: 980,
    category: "tops",
    popularity: 95,
  },
  {
    id: "6",
    name: "Denim Jeans",
    price: "₱1,399",
    image: "/placeholder.svg?height=600&width=480",
    rating: 4.7,
    reviews: 94,
    sold: 750,
    category: "bottoms",
    popularity: 88,
  },
  {
    id: "4",
    name: "Cap",
    price: "₱799",
    image: "/placeholder.svg?height=600&width=480",
    rating: 4.9,
    reviews: 76,
    sold: 620,
    category: "accessories",
    popularity: 90,
  },
  {
    id: "8",
    name: "Oversized Tee",
    price: "₱999",
    image: "/placeholder.svg?height=600&width=480",
    rating: 4.6,
    reviews: 82,
    sold: 580,
    category: "tops",
    popularity: 94,
  },
  {
    id: "3",
    name: "Cargo Pants",
    price: "₱1,299",
    image: "/placeholder.svg?height=600&width=480",
    rating: 4.7,
    reviews: 68,
    sold: 520,
    category: "bottoms",
    popularity: 85,
  },
]

export default function BestSellersPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortBy, setSortBy] = useState("sold")

  // Filter products based on category
  let filteredProducts =
    activeCategory === "all"
      ? bestSellersProducts
      : bestSellersProducts.filter((product) => product.category === activeCategory)

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "sold") return b.sold - a.sold
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "reviews") return b.reviews - a.reviews
    if (sortBy === "popular") return b.popularity - a.popularity
    return 0
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-neutral-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-2 mb-4">
                  <Fire className="h-5 w-5 text-amber-500" />
                  <span className="text-amber-500 font-medium">Most Popular</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Best Sellers</h1>
                <p className="text-lg text-neutral-300 mb-8 max-w-2xl">
                  Our most loved pieces, backed by customer reviews and consistent sell-outs. Discover what everyone's
                  wearing.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex gap-4"
              >
                <div className="bg-neutral-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium">Top Rated</span>
                  </div>
                  <p className="text-xs text-neutral-400">4.8/5 average rating</p>
                </div>
                <div className="bg-neutral-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">High Demand</span>
                  </div>
                  <p className="text-xs text-neutral-400">80% restock rate</p>
                </div>
                <div className="bg-neutral-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Customer Favorites</span>
                  </div>
                  <p className="text-xs text-neutral-400">Based on 5000+ reviews</p>
                </div>
              </motion.div>
            </div>
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

          {/* Filters and Sorting */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <Tabs defaultValue="all" onValueChange={setActiveCategory}>
              <TabsList>
                <TabsTrigger value="all">All Categories</TabsTrigger>
                <TabsTrigger value="tops">Tops</TabsTrigger>
                <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
                <TabsTrigger value="accessories">Accessories</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                className="bg-transparent border-none text-sm font-medium focus:outline-none focus:ring-0"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="sold">Most Sold</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
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
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-amber-500 hover:bg-amber-600">#{index + 1} Best Seller</Badge>
                </div>
                <ProductCard id={product.id} image={product.image} name={product.name} price={product.price} />
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{product.sold.toLocaleString()} sold</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Customer Testimonials */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-center">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-neutral-50 p-6 rounded-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm mb-4">
                  "The Logo Hoodie is the most comfortable hoodie I've ever owned. I wear it almost every day!"
                </p>
                <p className="text-sm font-medium">- Alex T.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-neutral-50 p-6 rounded-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm mb-4">
                  "I've bought the Graphic Tee in every color. The quality is amazing and they wash really well."
                </p>
                <p className="text-sm font-medium">- Jamie K.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-neutral-50 p-6 rounded-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm mb-4">
                  "The Cargo Pants are perfect for everyday wear. So many pockets and the fit is just right."
                </p>
                <p className="text-sm font-medium">- Sam R.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

