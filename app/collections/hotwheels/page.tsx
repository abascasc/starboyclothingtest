"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { motion } from "framer-motion"
import { products } from "@/lib/product-data"

export default function HotwheelsCollectionPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Filter products to only show Hotwheels collaboration items (IDs 13, 14, 15)
  const hotwheelsProducts = products.filter((product) => ["13", "14", "15"].includes(product.id))

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Banner */}
      <motion.section
        className="relative h-[50vh] bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center px-4 z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            STARBOY X HOTWHEELS
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Limited edition collaboration merging streetwear style with iconic racing heritage. Available for a limited
            time only.
          </motion.p>
        </div>
      </motion.section>

      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <h2 className="text-3xl font-bold">Hotwheels Collection</h2>
          <p className="text-muted-foreground mt-2">
            Our exclusive collaboration with Hotwheels brings you limited edition streetwear with racing-inspired
            designs.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {hotwheelsProducts.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard id={product.id} image={product.image} name={product.name} price={product.price} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 bg-neutral-100 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">About This Collaboration</h3>
          <p className="mb-4">
            The Starboy X Hotwheels collaboration celebrates the iconic toy brand's racing heritage with exclusive
            streetwear pieces. Each item features premium materials, special packaging, and unique design elements that
            pay homage to the beloved die-cast cars.
          </p>
          <p>
            This limited edition collection won't be restocked once sold out, so grab your favorite pieces while
            supplies last.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

