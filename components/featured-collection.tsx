"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function FeaturedCollection() {
  return (
    <motion.section
      className="py-16 bg-neutral-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold mb-4">SUMMER COLLECTION</h2>
            <p className="text-lg mb-6">
              Our latest summer collection features lightweight fabrics and bold designs perfect for the season.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="rounded-none bg-mahogany hover:bg-mahogany-dark text-white" asChild>
                <Link href="/collections/summer">EXPLORE COLLECTION</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative h-[500px] overflow-hidden"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.img
              src="/placeholder.svg?height=1000&width=800"
              alt="Summer collection"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

