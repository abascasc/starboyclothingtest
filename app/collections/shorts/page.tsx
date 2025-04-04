import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"

export default function ShortsPage() {
  // Mock product data for Shorts
  const products = [
    { id: "sh1", name: "Cosmic Sweat Shorts", price: "₱899", image: "/placeholder.svg?height=600&width=480" },
    { id: "sh2", name: "Stellar Basketball Shorts", price: "₱999", image: "/placeholder.svg?height=600&width=480" },
    { id: "sh3", name: "Orbit Cargo Shorts", price: "₱1,199", image: "/placeholder.svg?height=600&width=480" },
    { id: "sh4", name: "Nebula Denim Shorts", price: "₱1,099", image: "/placeholder.svg?height=600&width=480" },
    { id: "sh5", name: "Astral Beach Shorts", price: "₱899", image: "/placeholder.svg?height=600&width=480" },
    { id: "sh6", name: "Galaxy Track Shorts", price: "₱899", image: "/placeholder.svg?height=600&width=480" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold">Shorts Collection</h1>
          <p className="text-muted-foreground mt-2">Stay cool with our range of stylish shorts</p>
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

