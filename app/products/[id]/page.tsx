"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, Minus, Plus, Share2, ShoppingBag, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getProductById, getRelatedProducts } from "@/lib/product-data"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"
import Header from "@/components/header"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.value || "")
  const [selectedColorName, setSelectedColorName] = useState(product?.colors[0]?.name || "")
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]?.value || "")
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(product?.images[0] || "")

  const inWishlist = product ? isInWishlist(product.id) : false

  // If product not found, redirect to products page
  if (!product) {
    if (typeof window !== "undefined") {
      router.push("/products")
    }
    return null
  }

  const relatedProducts = product.relatedProducts ? getRelatedProducts(product.relatedProducts) : []

  // Update the handleAddToCart function to trigger auth popup
  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart",
        variant: "destructive",
      })

      // Trigger the auth popup
      if (typeof window !== "undefined" && window.showAuthPopup) {
        // @ts-ignore
        window.showAuthPopup()
      } else {
        // Fallback if the global function isn't available
        window.dispatchEvent(new Event("showAuthPopup"))
      }
      return
    }

    // Add to cart with selected options
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      color: selectedColor,
      colorName: selectedColorName,
      size: selectedSize,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  // Update the handleWishlistToggle function to trigger auth popup
  const handleWishlistToggle = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive",
      })

      // Trigger the auth popup
      if (typeof window !== "undefined" && window.showAuthPopup) {
        // @ts-ignore
        window.showAuthPopup()
      } else {
        // Fallback if the global function isn't available
        window.dispatchEvent(new Event("showAuthPopup"))
      }
      return
    }

    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard",
      })
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleColorChange = (value: string) => {
    setSelectedColor(value)
    const colorName = product.colors.find((c) => c.value === value)?.name || ""
    setSelectedColorName(colorName)

    // Update active image if there's a matching color image
    const colorImage = product.colors.find((c) => c.value === value)?.image
    if (colorImage) {
      setActiveImage(colorImage)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden bg-neutral-100 rounded-lg">
              <img
                src={activeImage || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square overflow-hidden bg-neutral-100 rounded-lg border-2 ${
                    activeImage === image ? "border-black" : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(image)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.isNew && (
              <div className="inline-block bg-black text-white text-xs font-medium px-2.5 py-1 rounded">
                New Arrival
              </div>
            )}
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.9 (120 reviews)</span>
            </div>
            <p className="text-2xl font-bold">{product.price}</p>

            <div className="space-y-6 pt-6">
              {/* Color Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="color">Color</Label>
                  <span className="text-sm font-medium">
                    {product.colors.find((c) => c.value === selectedColor)?.name || "Select a color"}
                  </span>
                </div>
                <RadioGroup id="color" value={selectedColor} onValueChange={handleColorChange} className="flex gap-3">
                  {product.colors.map((color) => (
                    <div key={color.value} className="flex flex-col items-center gap-1">
                      <RadioGroupItem value={color.value} id={`color-${color.value}`} className="sr-only" />
                      <Label
                        htmlFor={`color-${color.value}`}
                        className={`h-8 w-8 rounded-full cursor-pointer border-2 ${
                          selectedColor === color.value ? "border-black" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-xs">{color.name}</span>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="size">Size</Label>
                  <Link href="/help/size-guide" className="text-sm underline">
                    Size Guide
                  </Link>
                </div>
                <RadioGroup
                  id="size"
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="grid grid-cols-4 gap-3"
                >
                  {product.sizes.map((size) => (
                    <div key={size.value}>
                      <RadioGroupItem
                        value={size.value}
                        id={`size-${size.value}`}
                        className="sr-only"
                        disabled={!size.inStock}
                      />
                      <Label
                        htmlFor={`size-${size.value}`}
                        className={`flex h-10 w-full items-center justify-center rounded-md border text-sm font-medium ${
                          selectedSize === size.value
                            ? "border-black bg-black text-white"
                            : "border-input bg-background"
                        } ${!size.inStock ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-muted"}`}
                      >
                        {size.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label>Quantity</Label>
                <div className="flex items-center">
                  <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={incrementQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="flex-1 bg-black hover:bg-neutral-800" size="lg" onClick={handleAddToCart}>
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className={inWishlist ? "text-red-600" : ""}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`mr-2 h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
                  {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-b py-4">
                <Truck className="h-4 w-4" />
                <span>Free shipping on orders over ₱3,000</span>
              </div>

              {/* Share */}
              <Button variant="ghost" className="w-full" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share this product
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details & Care</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="pt-6 space-y-6">
              <div>
                <h3 className="font-medium mb-2">Product Details</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Material</h3>
                <p className="text-muted-foreground">{product.material}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Care Instructions</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {product.care.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Product Code</h3>
                <p className="text-muted-foreground">{product.sku}</p>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-6 space-y-4">
              <div>
                <h3 className="font-medium mb-2">Shipping</h3>
                <p className="text-muted-foreground mb-2">We offer the following shipping options:</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Standard Shipping (3-7 business days): ₱150</li>
                  <li>Express Shipping (1-3 business days): ₱300</li>
                  <li>Same-Day Delivery (Metro Manila only, order before 11 AM): ₱450</li>
                </ul>
                <p className="text-muted-foreground mt-2">Free standard shipping on all domestic orders over ₱3,000.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Returns & Exchanges</h3>
                <p className="text-muted-foreground">
                  We accept returns within 30 days of delivery for unworn items in their original packaging. To initiate
                  a return, please visit our{" "}
                  <Link href="/help/shipping-returns" className="text-primary underline">
                    Returns & Exchanges
                  </Link>{" "}
                  page or contact our customer service team.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

