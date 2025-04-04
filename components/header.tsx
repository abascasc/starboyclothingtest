"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import SearchBar from "@/components/search-bar"
import UserMenu from "@/components/user-menu"
import CartButton from "@/components/cart-button"
import WishlistButton from "@/components/wishlist-button"
import CollectionsMenu from "@/components/collections-menu"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  // Smooth scroll to top function
  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full bg-white border-b transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="w-full flex items-center h-16 px-4 md:px-6 max-w-[2000px] mx-auto">
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Left navigation items */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-start">
          <nav className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-sm font-medium hover:text-mahogany transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/products")
              }}
            >
              Shop
            </Link>
            <CollectionsMenu />
            <Link
              href="/about"
              className="text-sm font-medium hover:text-mahogany transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/about")
              }}
            >
              About
            </Link>
          </nav>
        </div>

        {/* Center logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="flex items-center justify-center"
        >
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("/")
            }}
          >
            <span className="text-xl font-bold tracking-tighter">STARBOY</span>
          </Link>
        </motion.div>

        {/* Right navigation items */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <SearchBar />
          <UserMenu />
          <WishlistButton />
          <CartButton />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white border-b"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="/products"
              className="text-sm font-medium p-2 hover:bg-neutral-100 rounded-md transition-colors"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/products")
                setMobileMenuOpen(false)
              }}
            >
              Shop
            </Link>
            <Link
              href="/collections/summer"
              className="text-sm font-medium p-2 hover:bg-neutral-100 rounded-md transition-colors"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/collections/summer")
                setMobileMenuOpen(false)
              }}
            >
              Summer Collection
            </Link>
            <Link
              href="/collections/new-arrivals"
              className="text-sm font-medium p-2 hover:bg-neutral-100 rounded-md transition-colors"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/collections/new-arrivals")
                setMobileMenuOpen(false)
              }}
            >
              New Arrivals
            </Link>
            <Link
              href="/collections/best-sellers"
              className="text-sm font-medium p-2 hover:bg-neutral-100 rounded-md transition-colors"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/collections/best-sellers")
                setMobileMenuOpen(false)
              }}
            >
              Best Sellers
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium p-2 hover:bg-neutral-100 rounded-md transition-colors"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/about")
                setMobileMenuOpen(false)
              }}
            >
              About
            </Link>
            <Link
              href="/help/contact"
              className="text-sm font-medium p-2 hover:bg-neutral-100 rounded-md transition-colors"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/help/contact")
                setMobileMenuOpen(false)
              }}
            >
              Contact
            </Link>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}

