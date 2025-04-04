"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import FeaturedCollection from "@/components/featured-collection"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import Header from "@/components/header"
import DiscountCTA from "@/components/discount-cta"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <motion.section
        className="relative h-[80vh] bg-neutral-100 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0">
          <motion.img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Hero image"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: isLoaded ? 1 : 1.1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        <motion.div className="relative z-10 text-center px-4" variants={container} initial="hidden" animate="show">
          <motion.h1 className="text-4xl md:text-6xl font-bold text-white mb-4" variants={item}>
            NEW COLLECTION
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-white mb-8" variants={item}>
            Discover our latest streetwear drops
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={item}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="rounded-none bg-white text-black hover:bg-neutral-200" asChild>
                <Link href="/products">SHOP NOW</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="rounded-none bg-transparent border border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/collections/new-arrivals">NEW ARRIVALS</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Starboy X Hotwheels Collaboration */}
      <motion.section
        className="py-16 px-4 md:px-6 bg-gradient-to-r from-red-600 to-red-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">STARBOY X HOTWHEELS</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Limited edition collaboration merging streetwear style with iconic racing heritage. Available for a
              limited time only.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="/products/13" className="block">
                <div className="bg-white p-4 rounded-lg overflow-hidden">
                  <div className="relative aspect-square overflow-hidden rounded mb-4">
                    <motion.img
                      src="/placeholder.svg?height=600&width=480&text=Hotwheels+Hoodie"
                      alt="Hotwheels Hoodie"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      LIMITED
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Hotwheels Hoodie</h3>
                  <p className="text-gray-700 font-medium">₱1,899</p>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={item} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="/products/14" className="block">
                <div className="bg-white p-4 rounded-lg overflow-hidden">
                  <div className="relative aspect-square overflow-hidden rounded mb-4">
                    <motion.img
                      src="/placeholder.svg?height=600&width=480&text=Hotwheels+Tee"
                      alt="Hotwheels Tee"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      LIMITED
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Hotwheels Tee</h3>
                  <p className="text-gray-700 font-medium">₱1,199</p>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={item} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="/products/15" className="block">
                <div className="bg-white p-4 rounded-lg overflow-hidden">
                  <div className="relative aspect-square overflow-hidden rounded mb-4">
                    <motion.img
                      src="/placeholder.svg?height=600&width=480&text=Hotwheels+Cap"
                      alt="Hotwheels Cap"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      LIMITED
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Hotwheels Cap</h3>
                  <p className="text-gray-700 font-medium">₱999</p>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="rounded-none bg-white text-red-600 hover:bg-white/90" asChild>
                <Link href="/collections/hotwheels">SHOP THE COLLECTION</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Collection Links */}
      <motion.section
        className="py-12 px-4 md:px-6 bg-neutral-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="/collections/summer" className="group relative h-64 overflow-hidden rounded-lg block">
                <motion.img
                  src="/placeholder.svg?height=600&width=480&text=Summer+Collection"
                  alt="Summer Collection"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Summer Collection</h3>
                </div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="/collections/new-arrivals" className="group relative h-64 overflow-hidden rounded-lg block">
                <motion.img
                  src="/placeholder.svg?height=600&width=480&text=New+Arrivals"
                  alt="New Arrivals"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">New Arrivals</h3>
                </div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="/collections/best-sellers" className="group relative h-64 overflow-hidden rounded-lg block">
                <motion.img
                  src="/placeholder.svg?height=600&width=480&text=Best+Sellers"
                  alt="Best Sellers"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Best Sellers</h3>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        className="py-16 px-4 md:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            FEATURED PRODUCTS
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <ProductCard id="1" image="/placeholder.svg?height=600&width=480" name="Graphic Tee" price="₱899" />
            </motion.div>
            <motion.div variants={item}>
              <ProductCard id="2" image="/placeholder.svg?height=600&width=480" name="Logo Hoodie" price="₱1,499" />
            </motion.div>
            <motion.div variants={item}>
              <ProductCard id="3" image="/placeholder.svg?height=600&width=480" name="Cargo Pants" price="₱1,299" />
            </motion.div>
            <motion.div variants={item}>
              <ProductCard id="4" image="/placeholder.svg?height=600&width=480" name="Cap" price="₱799" />
            </motion.div>
          </motion.div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="rounded-none" asChild>
                <Link href="/products">VIEW ALL PRODUCTS</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Collection */}
      <FeaturedCollection />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />

      {/* Discount CTA */}
      <DiscountCTA />
    </div>
  )
}

