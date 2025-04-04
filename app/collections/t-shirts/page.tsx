import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"

export default function TShirtsPage() {
  // Mock product data for T-Shirts
  const products = [
    { id: "t1", name: "Cosmic Tee", price: "₱899", image: "/placeholder.svg?height=600&width=480" },
    { id: "t2", name: "Stellar Graphic Tee", price: "₱999", image: "/placeholder.svg?height=600&width=480" },
    { id: "t3", name: "Astral Print Tee", price: "₱899", image: "/placeholder.svg?height=600&width=480" },
    { id: "t4", name: "Galaxy Oversized Tee", price: "₱1,099", image: "/placeholder.svg?height=600&width=480" },
    { id: "t5", name: "Orbit Basic Tee", price: "₱799", image: "/placeholder.svg?height=600&width=480" },
    { id: "t6", name: "Nebula Printed Tee", price: "₱999", image: "/placeholder.svg?height=600&width=480" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold">T-Shirts Collection</h1>
          <p className="text-muted-foreground mt-2">Discover our range of stellar graphic and basic tees</p>
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

