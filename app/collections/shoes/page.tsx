import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"

export default function ShoesPage() {
  // Mock product data for Shoes
  const products = [
    { id: "sh1", name: "Cosmic Runner", price: "₱2,499", image: "/placeholder.svg?height=600&width=480" },
    { id: "sh2", name: "Stellar High Tops", price: "₱2,999", image: "/placeholder.svg?height=600&width=480" },
    { id: "sh3", name: "Orbit Skate Shoes", price: "₱2,799", image: "/placeholder.svg?height=600&width=480" },
    { id: "sh4", name: "Nebula Slip-Ons", price: "₱1,999", image: "/placeholder.svg?height=600&width=480" },
    { id: "sh5", name: "Astral Lifestyle Sneakers", price: "₱2,499", image: "/placeholder.svg?height=600&width=480" },
    { id: "sh6", name: "Galaxy Canvas Low Tops", price: "₱1,899", image: "/placeholder.svg?height=600&width=480" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold">Shoes Collection</h1>
          <p className="text-muted-foreground mt-2">Step out in style with our range of footwear</p>
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

