import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"

export default function JeansPage() {
  // Mock product data for Jeans
  const products = [
    { id: "j1", name: "Star Slim Fit Jeans", price: "₱1,499", image: "/placeholder.svg?height=600&width=480" },
    { id: "j2", name: "Cosmic Straight Jeans", price: "₱1,399", image: "/placeholder.svg?height=600&width=480" },
    { id: "j3", name: "Orbit Distressed Jeans", price: "₱1,599", image: "/placeholder.svg?height=600&width=480" },
    { id: "j4", name: "Nebula Baggy Jeans", price: "₱1,699", image: "/placeholder.svg?height=600&width=480" },
    { id: "j5", name: "Stellar Black Denim", price: "₱1,499", image: "/placeholder.svg?height=600&width=480" },
    { id: "j6", name: "Astral Cargo Jeans", price: "₱1,599", image: "/placeholder.svg?height=600&width=480" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold">Jeans Collection</h1>
          <p className="text-muted-foreground mt-2">Classic and contemporary denim styles</p>
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

