"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Filter, Search, X } from "lucide-react"
import ProductCard from "@/components/product-card"
import Footer from "@/components/footer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Header from "@/components/header"

// Mock product data - in a real app, this would come from a database or API
const allProducts = [
  {
    id: "13",
    name: "Hotwheels Hoodie",
    price: "₱1,899",
    image: "/placeholder.svg?height=600&width=480",
    category: "hoodies",
    color: "red",
    popularity: 99,
  },
  {
    id: "14",
    name: "Hotwheels Tee",
    price: "₱1,199",
    image: "/placeholder.svg?height=600&width=480",
    category: "t-shirts",
    color: "black",
    popularity: 97,
  },
  {
    id: "15",
    name: "Hotwheels Cap",
    price: "₱999",
    image: "/placeholder.svg?height=600&width=480",
    category: "headwear",
    color: "red",
    popularity: 96,
  },
  {
    id: "1",
    name: "Graphic Tee",
    price: "₱899",
    image: "/placeholder.svg?height=600&width=480",
    category: "t-shirts",
    color: "black",
    popularity: 95,
  },
  {
    id: "2",
    name: "Logo Hoodie",
    price: "₱1,499",
    image: "/placeholder.svg?height=600&width=480",
    category: "hoodies",
    color: "gray",
    popularity: 98,
  },
  {
    id: "3",
    name: "Cargo Pants",
    price: "₱1,299",
    image: "/placeholder.svg?height=600&width=480",
    category: "pants",
    color: "green",
    popularity: 85,
  },
  {
    id: "4",
    name: "Cap",
    price: "₱799",
    image: "/placeholder.svg?height=600&width=480",
    category: "headwear",
    color: "black",
    popularity: 90,
  },
  {
    id: "5",
    name: "Varsity Jacket",
    price: "₱2,499",
    image: "/placeholder.svg?height=600&width=480",
    category: "jackets",
    color: "blue",
    popularity: 92,
  },
  {
    id: "6",
    name: "Denim Jeans",
    price: "₱1,399",
    image: "/placeholder.svg?height=600&width=480",
    category: "pants",
    color: "blue",
    popularity: 88,
  },
  {
    id: "7",
    name: "Bucket Hat",
    price: "₱899",
    image: "/placeholder.svg?height=600&width=480",
    category: "headwear",
    color: "white",
    popularity: 82,
  },
  {
    id: "8",
    name: "Oversized Tee",
    price: "₱999",
    image: "/placeholder.svg?height=600&width=480",
    category: "t-shirts",
    color: "white",
    popularity: 94,
  },
  {
    id: "9",
    name: "Track Pants",
    price: "₱1,199",
    image: "/placeholder.svg?height=600&width=480",
    category: "pants",
    color: "black",
    popularity: 80,
  },
  {
    id: "10",
    name: "Crossbody Bag",
    price: "₱1,099",
    image: "/placeholder.svg?height=600&width=480",
    category: "accessories",
    color: "black",
    popularity: 78,
  },
  {
    id: "11",
    name: "Socks (3 Pack)",
    price: "₱599",
    image: "/placeholder.svg?height=600&width=480",
    category: "accessories",
    color: "gray",
    popularity: 75,
  },
  {
    id: "12",
    name: "Beanie",
    price: "₱699",
    image: "/placeholder.svg?height=600&width=480",
    category: "headwear",
    color: "green",
    popularity: 83,
  },
]

// Price ranges for filtering
const priceRanges = [
  { id: "price-1", label: "Under ₱500", min: 0, max: 500 },
  { id: "price-2", label: "₱500 - ₱1,000", min: 500, max: 1000 },
  { id: "price-3", label: "₱1,000 - ₱1,500", min: 1000, max: 1500 },
  { id: "price-4", label: "₱1,500 - ₱2,000", min: 1500, max: 2000 },
  { id: "price-5", label: "Over ₱2,000", min: 2000, max: Number.POSITIVE_INFINITY },
]

// Number of products per page
const PRODUCTS_PER_PAGE = 8

export default function ProductsPage() {
  // State for filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("newest")
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Apply filters and search
  useEffect(() => {
    let result = [...allProducts]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((product) => product.name.toLowerCase().includes(query))
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      result = result.filter((product) => selectedColors.includes(product.color))
    }

    // Apply price range filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter((product) => {
        const productPrice = Number.parseFloat(product.price.replace(/[^0-9.]/g, ""))
        return selectedPriceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId)
          return range && productPrice >= range.min && productPrice <= range.max
        })
      })
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => {
          const priceA = Number.parseFloat(a.price.replace(/[^0-9.]/g, ""))
          const priceB = Number.parseFloat(b.price.replace(/[^0-9.]/g, ""))
          return priceA - priceB
        })
        break
      case "price-high":
        result.sort((a, b) => {
          const priceA = Number.parseFloat(a.price.replace(/[^0-9.]/g, ""))
          const priceB = Number.parseFloat(b.price.replace(/[^0-9.]/g, ""))
          return priceB - priceA
        })
        break
      case "popular":
        // Sort by popularity (highest first)
        result.sort((a, b) => b.popularity - a.popularity)
        break
      case "newest":
      default:
        // In a real app, this would sort by date added
        // For now, we'll keep the original order
        break
    }

    setFilteredProducts(result)

    // Calculate total pages
    setTotalPages(Math.ceil(result.length / PRODUCTS_PER_PAGE))

    // Reset to first page when filters change
    setCurrentPage(1)
  }, [searchQuery, selectedCategories, selectedPriceRanges, selectedColors, sortOption])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handlePriceRangeChange = (priceRange: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(priceRange) ? prev.filter((p) => p !== priceRange) : [...prev, priceRange],
    )
  }

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedPriceRanges([])
    setSelectedColors([])
    setSearchQuery("")
  }

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedPriceRanges.length > 0 || selectedColors.length > 0 || searchQuery

  // Get current page products
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    const endIndex = startIndex + PRODUCTS_PER_PAGE
    return filteredProducts.slice(startIndex, endIndex)
  }

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Filter component to reuse in both desktop and mobile views
  const FiltersComponent = () => (
    <>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </div>

      <h2 className="font-medium mb-4">Filters</h2>

      <Accordion type="multiple" className="w-full" defaultValue={["category", "price", "color"]}>
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="t-shirts"
                  checked={selectedCategories.includes("t-shirts")}
                  onCheckedChange={() => handleCategoryChange("t-shirts")}
                />
                <Label htmlFor="t-shirts">T-Shirts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hoodies"
                  checked={selectedCategories.includes("hoodies")}
                  onCheckedChange={() => handleCategoryChange("hoodies")}
                />
                <Label htmlFor="hoodies">Hoodies & Sweatshirts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pants"
                  checked={selectedCategories.includes("pants")}
                  onCheckedChange={() => handleCategoryChange("pants")}
                />
                <Label htmlFor="pants">Pants</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="headwear"
                  checked={selectedCategories.includes("headwear")}
                  onCheckedChange={() => handleCategoryChange("headwear")}
                />
                <Label htmlFor="headwear">Headwear</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accessories"
                  checked={selectedCategories.includes("accessories")}
                  onCheckedChange={() => handleCategoryChange("accessories")}
                />
                <Label htmlFor="accessories">Accessories</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <div key={range.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={range.id}
                    checked={selectedPriceRanges.includes(range.id)}
                    onCheckedChange={() => handlePriceRangeChange(range.id)}
                  />
                  <Label htmlFor={range.id}>{range.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="black"
                  checked={selectedColors.includes("black")}
                  onCheckedChange={() => handleColorChange("black")}
                />
                <Label htmlFor="black">Black</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="white"
                  checked={selectedColors.includes("white")}
                  onCheckedChange={() => handleColorChange("white")}
                />
                <Label htmlFor="white">White</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gray"
                  checked={selectedColors.includes("gray")}
                  onCheckedChange={() => handleColorChange("gray")}
                />
                <Label htmlFor="gray">Gray</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="blue"
                  checked={selectedColors.includes("blue")}
                  onCheckedChange={() => handleColorChange("blue")}
                />
                <Label htmlFor="blue">Blue</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="green"
                  checked={selectedColors.includes("green")}
                  onCheckedChange={() => handleColorChange("green")}
                />
                <Label htmlFor="green">Green</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full mt-6" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}
    </>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
            <h1 className="text-3xl font-bold">All Products</h1>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>

            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <h2 className="text-lg font-semibold mb-4">Filters</h2>
                  <FiltersComponent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <FiltersComponent />
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getCurrentPageProducts().map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                    />
                  ))}
                </div>

                <div className="mt-12 flex justify-center">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={goToPrevPage} disabled={currentPage === 1}>
                      <ArrowLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      // Show pages around current page
                      let pageToShow = i + 1

                      // If we have more than 5 pages and current page is > 3
                      if (totalPages > 5 && currentPage > 3) {
                        pageToShow = currentPage - 2 + i
                      }

                      // Don't show pages beyond total
                      if (pageToShow > totalPages) {
                        return null
                      }

                      return (
                        <Button
                          key={pageToShow}
                          variant={currentPage === pageToShow ? "outline" : "ghost"}
                          className={`h-8 w-8 p-0 ${currentPage === pageToShow ? "bg-primary text-primary-foreground" : ""}`}
                          onClick={() => goToPage(pageToShow)}
                        >
                          {pageToShow}
                        </Button>
                      )
                    })}

                    <Button variant="outline" size="icon" onClick={goToNextPage} disabled={currentPage === totalPages}>
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium mb-4">No products found</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

