"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">STARBOY</h3>
            <p className="text-sm text-muted-foreground">
              Starboy is a streetwear brand founded with a passion for creating authentic, high-quality apparel inspired
              by cosmic and stellar aesthetics.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">SHOP</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/collections/new-arrivals"
                  className="text-sm hover:underline"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/best-sellers"
                  className="text-sm hover:underline"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/t-shirts"
                  className="text-sm hover:underline"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/sweaters"
                  className="text-sm hover:underline"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Sweaters
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/summer"
                  className="text-sm hover:underline"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Summer Collection
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">HELP</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help/faqs"
                  className="text-sm hover:underline"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/help/shipping-returns"
                  className="text-sm hover:underline"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/help/size-guide"
                  className="text-sm hover:underline"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/help/contact"
                  className="text-sm hover:underline"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">CONNECT</h3>
            <div className="flex space-x-4 mb-4">
              <Link
                href="#"
                className="hover:text-neutral-500"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="hover:text-neutral-500"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="hover:text-neutral-500"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Starboy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

