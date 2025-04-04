"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-2xl mx-4 shadow-xl"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Search Starboy</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search for products, collections, and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-6 text-lg"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-mahogany hover:bg-mahogany/90"
                  >
                    Search
                  </Button>
                </div>
              </form>

              <div>
                <h3 className="font-medium mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {["T-shirts", "Hoodies", "Caps", "New Arrivals", "Summer Collection", "Hotwheels"].map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery(term)
                        router.push(`/search?q=${encodeURIComponent(term)}`)
                        setIsOpen(false)
                      }}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "T-shirts",
                    "Hoodies",
                    "Caps",
                    "Jeans",
                    "Shorts",
                    "Shoes",
                    "Accessories",
                    "New Arrivals",
                    "Best Sellers",
                  ].map((category) => (
                    <Button
                      key={category}
                      variant="ghost"
                      className="justify-start"
                      onClick={() => {
                        router.push(`/collections/${category.toLowerCase().replace(" ", "-")}`)
                        setIsOpen(false)
                      }}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

