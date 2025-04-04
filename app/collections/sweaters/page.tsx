import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"

export default function SweatersPage() {
  // Mock product data for Sweaters
  const products = [
    { id: "s1", name: "Galaxy Hoodie", price: "₱1,599", image: "/placeholder.svg?height=600&width=480" },
    { id: "s2", name: "Cosmic Crewneck", price: "₱1,399", image: "/placeholder.svg?height=600&width=480" },
    { id: "s3", name: "Stellar Sweatshirt", price: "₱1,499", image: "/placeholder.svg?height=600&width=480" },
    { id: "s4", name: "Orbit Zip-Up", price: "₱1,699", image: "/placeholder.svg?height=600&width=480" },
    { id: "s5", name: "Nebula Pullover", price: "₱1,499", image: "/placeholder.svg?height=600&width=480" },
    { id: "s6", name: "Astral Fleece", price: "₱1,599", image: "/placeholder.svg?height=600&width=480" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold">Sweaters Collection</h1>
          <p className="text-muted-foreground mt-2">Stay warm with our stellar hoodies and sweatshirts</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

