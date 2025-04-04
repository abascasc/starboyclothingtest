"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Lookbook data
const lookbookItems = [
  {
    id: 1,
    title: "Summer Dawn",
    description: "Lightweight fabrics in neutral tones for early morning beach walks.",
    image: "/placeholder.svg?height=1200&width=800&text=Summer+Dawn",
    products: [
      { id: "8", name: "Oversized Tee", price: "₱999" },
      { id: "3", name: "Cargo Pants", price: "₱1,299" },
    ],
  },
  {
    id: 2,
    title: "Coastal Breeze",
    description: "Relaxed silhouettes in cool tones for seaside afternoons.",
    image: "/placeholder.svg?height=1200&width=800&text=Coastal+Breeze",
    products: [
      { id: "7", name: "Bucket Hat", price: "₱899" },
      { id: "10", name: "Crossbody Bag", price: "₱1,099" },
    ],
  },
  {
    id: 3,
    title: "Sunset Glow",
    description: "Warm amber accents for evening gatherings by the shore.",
    image: "/placeholder.svg?height=1200&width=800&text=Sunset+Glow",
    products: [
      { id: "4", name: "Cap", price: "₱799" },
      { id: "9", name: "Track Pants", price: "₱1,199" },
    ],
  },
  {
    id: 4,
    title: "Urban Heat",
    description: "City-ready pieces that blend comfort with style for hot summer days.",
    image: "/placeholder.svg?height=1200&width=800&text=Urban+Heat",
    products: [
      { id: "8", name: "Oversized Tee", price: "₱999" },
      { id: "4", name: "Cap", price: "₱799" },
    ],
  },
]

export default function SummerLookbookPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % lookbookItems.length)
  }

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + lookbookItems.length) % lookbookItems.length)
  }

  const currentItem = lookbookItems[currentIndex]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Hero section */}
        <div className="w-full h-[70vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />
          <img
            src="/placeholder.svg?height=1200&width=2000&text=Summer+Lookbook"
            alt="Summer Lookbook"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 text-white p-4">
            <motion.h1
              className="text-4xl md:text-6xl font-light tracking-wider mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              SUMMER LOOKBOOK
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Explore our curated summer styles for every moment of your day
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors"
                onClick={() => document.getElementById("lookbook-content")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Lookbook
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Navigation bar */}
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link
            href="/collections/summer"
            className="inline-flex items-center text-sm hover:text-neutral-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Summer Collection
          </Link>

          <h2 className="text-lg font-light tracking-widest uppercase">Explore Styles</h2>

          <div className="w-24">{/* Empty div for spacing */}</div>
        </div>

        {/* Lookbook content */}
        <div id="lookbook-content" className="flex-1 relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Image */}
                <div className="relative h-[50vh] md:h-full">
                  <img
                    src={currentItem.image || "/placeholder.svg"}
                    alt={currentItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-8 md:p-16 bg-neutral-50">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-light mb-6">{currentItem.title}</h2>
                    <p className="text-neutral-600 mb-8 max-w-md">{currentItem.description}</p>

                    <div className="mb-12">
                      <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-4">Featured Items</h3>
                      <ul className="space-y-3">
                        {currentItem.products.map((product) => (
                          <li key={product.id} className="flex justify-between items-center">
                            <span>{product.name}</span>
                            <span className="text-neutral-500">{product.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button asChild className="bg-black hover:bg-neutral-800 text-white rounded-none px-8">
                      <Link href={`/products/${currentItem.products[0].id}`}>Shop This Look</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 transition-all"
            aria-label="Previous look"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 transition-all"
            aria-label="Next look"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Pagination */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center space-x-2">
            {lookbookItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-black w-4" : "bg-neutral-300"
                }`}
                aria-label={`Go to look ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

