"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Package, CheckCircle, Truck, MapPin, CreditCard, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/lib/cart-context"

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")
  const mapRef = useRef<HTMLCanvasElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    // Redirect if not logged in
    if (user === null) {
      router.push("/auth/signin?redirect=/account/orders")
      return
    }

    // Load order from localStorage
    const loadOrder = () => {
      setIsLoading(true)

      // In a real app, this would be an API call
      setTimeout(() => {
        const storedOrders = localStorage.getItem(`orders-${user?.id}`)

        if (storedOrders) {
          const orders = JSON.parse(storedOrders)
          const foundOrder = orders.find((o: any) => o.id === params.id)

          if (foundOrder) {
            // Add tracking points for the map
            if (!foundOrder.trackingPoints) {
              foundOrder.trackingPoints = generateTrackingPoints(foundOrder.status)
            }
            setOrder(foundOrder)
          } else {
            router.push("/account/orders")
          }
        } else {
          router.push("/account/orders")
        }

        setIsLoading(false)
      }, 1000)
    }

    if (user) {
      loadOrder()
    }
  }, [user, router, params.id])

  // Generate tracking points based on order status
  const generateTrackingPoints = (status: string) => {
    // Origin point (warehouse)
    const origin = {
      lat: 14.5995,
      lng: 120.9842,
      label: "Warehouse",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    }

    // Destination (customer address)
    const destination = { lat: 14.5547, lng: 121.0244, label: "Your Address", date: null }

    // Intermediate points
    const sortingFacility = {
      lat: 14.6042,
      lng: 121.0438,
      label: "Sorting Facility",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    }

    const localHub = {
      lat: 14.5869,
      lng: 121.0582,
      label: "Local Distribution Hub",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    }

    const outForDelivery = {
      lat: 14.565,
      lng: 121.0614,
      label: "Out for Delivery",
      date: status === "delivered" ? new Date(Date.now() - 12 * 60 * 60 * 1000) : null,
    }

    // Create tracking points array based on status
    const points = [origin]

    if (status === "processing") {
      return [...points, destination]
    }

    points.push(sortingFacility)

    if (status === "shipped") {
      return [...points, localHub, destination]
    }

    points.push(localHub, outForDelivery)

    if (status === "delivered") {
      destination.date = new Date()
      return [...points, destination]
    }

    return [...points, destination]
  }

  // Draw the map with tracking points
  useEffect(() => {
    if (!order || !mapRef.current) return

    const canvas = mapRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions based on its container
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      }
    }

    resizeCanvas()

    const drawMap = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#f0f0f0"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw some roads
      ctx.strokeStyle = "#d0d0d0"
      ctx.lineWidth = 3

      // Horizontal roads
      for (let y = 20; y < canvas.height; y += 40) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical roads
      for (let x = 20; x < canvas.width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw tracking route
      if (order.trackingPoints && order.trackingPoints.length > 1) {
        const points = order.trackingPoints

        // Map the geo coordinates to canvas coordinates
        const canvasPoints = points.map((point: any) => {
          // This is a very simplified mapping just for visualization
          const x = (((point.lng - 120.9842) * 5000) % (canvas.width - 40)) + 20
          const y = (((point.lat - 14.5547) * 5000) % (canvas.height - 40)) + 20
          return { x, y, label: point.label, date: point.date }
        })

        // Draw the route line
        ctx.beginPath()
        ctx.moveTo(canvasPoints[0].x, canvasPoints[0].y)
        ctx.strokeStyle = "#3b82f6" // blue
        ctx.lineWidth = 3

        for (let i = 1; i < canvasPoints.length; i++) {
          // If this point doesn't have a date yet (not reached), use dashed line
          if (!canvasPoints[i].date) {
            ctx.setLineDash([5, 5])
          } else {
            ctx.setLineDash([])
          }
          ctx.lineTo(canvasPoints[i].x, canvasPoints[i].y)
          ctx.stroke()

          // Start a new path segment
          ctx.beginPath()
          ctx.moveTo(canvasPoints[i].x, canvasPoints[i].y)
        }

        // Draw points
        for (let i = 0; i < canvasPoints.length; i++) {
          const point = canvasPoints[i]

          // Draw circle
          ctx.beginPath()
          ctx.arc(point.x, point.y, 8, 0, Math.PI * 2)

          if (!point.date) {
            // Future point (not reached yet)
            ctx.fillStyle = "#e5e7eb" // gray
            ctx.strokeStyle = "#6b7280"
          } else if (i === canvasPoints.length - 1 && order.status === "delivered") {
            // Destination point when delivered
            ctx.fillStyle = "#10b981" // green
            ctx.strokeStyle = "#059669"
          } else if (i === 0) {
            // Origin point
            ctx.fillStyle = "#3b82f6" // blue
            ctx.strokeStyle = "#2563eb"
          } else {
            // Intermediate point
            ctx.fillStyle = "#6366f1" // indigo
            ctx.strokeStyle = "#4f46e5"
          }

          ctx.fill()
          ctx.lineWidth = 2
          ctx.stroke()

          // Draw label
          ctx.fillStyle = "#000000"
          ctx.font = "12px Arial"
          ctx.textAlign = "center"
          ctx.fillText(point.label, point.x, point.y - 15)

          // Draw date if available
          if (point.date) {
            ctx.font = "10px Arial"
            ctx.fillStyle = "#6b7280"
            ctx.fillText(new Date(point.date).toLocaleDateString(), point.x, point.y + 20)
          }
        }
      }
    }

    // Draw the map
    drawMap()

    // Handle window resize
    const handleResize = () => {
      resizeCanvas()
      drawMap()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [order])

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Get progress percentage based on status
  const getProgressPercentage = (status: string) => {
    switch (status) {
      case "processing":
        return 25
      case "shipped":
        return 75
      case "delivered":
        return 100
      default:
        return 0
    }
  }

  if (isLoading || !order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto py-12 px-4">
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Calculate subtotal
  const calculateSubtotal = () => {
    return order.items.reduce((total: number, item: any) => {
      const price = Number.parseFloat(item.price.replace(/[^0-9.]/g, ""))
      return total + price * item.quantity
    }, 0)
  }

  // Mock shipping cost
  const shippingCost = 150
  const subtotal = calculateSubtotal()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="mb-8">
          <Link
            href="/account/orders"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to orders
          </Link>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Order #{order.id}</h1>
              <p className="text-muted-foreground">Placed on {formatDate(order.date)}</p>
            </div>
            <Badge
              className={`
              ${order.status === "processing" ? "bg-blue-500 hover:bg-blue-600" : ""}
              ${order.status === "shipped" ? "bg-amber-500 hover:bg-amber-600" : ""}
              ${order.status === "delivered" ? "bg-green-500 hover:bg-green-600" : ""}
              ${order.status === "cancelled" ? "bg-red-500 hover:bg-red-600" : ""}
            `}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="details" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="details">Order Details</TabsTrigger>
            <TabsTrigger value="tracking">Tracking & Delivery</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            {/* Order Progress */}
            {order.status !== "cancelled" && (
              <div className="mb-12 bg-white p-6 rounded-lg border">
                <h2 className="text-lg font-medium mb-4">Order Status</h2>
                <Progress value={getProgressPercentage(order.status)} className="h-2 mb-6" />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div
                    className={`${order.status === "processing" || order.status === "shipped" || order.status === "delivered" ? "text-green-600" : ""}`}
                  >
                    <div className="flex justify-center mb-2">
                      <div
                        className={`rounded-full p-2 ${order.status === "processing" || order.status === "shipped" || order.status === "delivered" ? "bg-green-100" : "bg-neutral-100"}`}
                      >
                        <Package
                          className={`h-5 w-5 ${order.status === "processing" || order.status === "shipped" || order.status === "delivered" ? "text-green-600" : "text-neutral-400"}`}
                        />
                      </div>
                    </div>
                    <p className="text-sm font-medium">Order Confirmed</p>
                    <p className="text-xs text-muted-foreground">
                      {order.status === "processing" || order.status === "shipped" || order.status === "delivered"
                        ? formatDate(order.date)
                        : "Pending"}
                    </p>
                  </div>

                  <div
                    className={`${order.status === "shipped" || order.status === "delivered" ? "text-green-600" : ""}`}
                  >
                    <div className="flex justify-center mb-2">
                      <div
                        className={`rounded-full p-2 ${order.status === "shipped" || order.status === "delivered" ? "bg-green-100" : "bg-neutral-100"}`}
                      >
                        <Truck
                          className={`h-5 w-5 ${order.status === "shipped" || order.status === "delivered" ? "text-green-600" : "text-neutral-400"}`}
                        />
                      </div>
                    </div>
                    <p className="text-sm font-medium">Shipped</p>
                    <p className="text-xs text-muted-foreground">
                      {order.status === "shipped" || order.status === "delivered" ? "In Transit" : "Pending"}
                    </p>
                  </div>

                  <div className={`${order.status === "delivered" ? "text-green-600" : ""}`}>
                    <div className="flex justify-center mb-2">
                      <div
                        className={`rounded-full p-2 ${order.status === "delivered" ? "bg-green-100" : "bg-neutral-100"}`}
                      >
                        <CheckCircle
                          className={`h-5 w-5 ${order.status === "delivered" ? "text-green-600" : "text-neutral-400"}`}
                        />
                      </div>
                    </div>
                    <p className="text-sm font-medium">Delivered</p>
                    <p className="text-xs text-muted-foreground">
                      {order.status === "delivered" ? "Completed" : "Pending"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Items */}
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg border mb-8">
                  <h2 className="text-lg font-medium mb-4">Order Items</h2>
                  <div className="space-y-6">
                    {order.items.map((item: any) => (
                      <div key={`${order.id}-${item.id}`} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                        <div className="w-20 h-20 bg-neutral-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="font-medium">{item.price}</p>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            <p>Quantity: {item.quantity}</p>
                            {(item.color || item.size) && (
                              <p>
                                {item.color && `Color: ${item.color}`}
                                {item.color && item.size && " / "}
                                {item.size && `Size: ${item.size}`}
                              </p>
                            )}
                          </div>
                          <div className="mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Add item to cart and redirect to checkout
                                addItem({
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  image: item.image,
                                  quantity: item.quantity,
                                  color: item.color,
                                  colorName: item.colorName,
                                  size: item.size,
                                })
                                router.push("/cart")
                              }}
                            >
                              Buy Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="bg-white p-6 rounded-lg border">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-lg font-medium">Shipping Information</h2>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="font-medium">John Doe</p>
                    <p className="text-muted-foreground">
                      123 Main Street, Apt 4B
                      <br />
                      Makati City, Metro Manila
                      <br />
                      Philippines, 1200
                      <br />
                      +63 912 345 6789
                    </p>
                  </div>

                  {order.trackingNumber && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-1">Tracking Number:</p>
                      <p className="font-medium">{order.trackingNumber}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Track Package
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg border sticky top-24">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₱{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>₱{shippingCost.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-medium text-lg mb-6">
                    <span>Total</span>
                    <span>{order.total}</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Paid with Credit Card (•••• 4242)</span>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => {
                        // Add all items from this order to cart
                        order.items.forEach((item: any) => {
                          addItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            quantity: item.quantity,
                            color: item.color,
                            colorName: item.colorName,
                            size: item.size,
                          })
                        })
                        router.push("/cart")
                      }}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Buy Again
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        // Find the AI chatbot and open it
                        const chatbotButton = document.querySelector('[aria-label="Open chat assistant"]')
                        if (chatbotButton) {
                          ;(chatbotButton as HTMLButtonElement).click()
                        }
                      }}
                    >
                      Need Help?
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tracking">
            <div className="bg-white p-6 rounded-lg border mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Navigation className="h-5 w-5 text-mahogany" />
                <h2 className="text-lg font-medium">Shipment Tracking</h2>
              </div>

              {order.trackingNumber ? (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Tracking Number</p>
                      <p className="font-medium">{order.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Carrier</p>
                      <p className="font-medium">Starboy Express</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                      <p className="font-medium">
                        {order.status === "delivered"
                          ? "Delivered"
                          : order.status === "shipped"
                            ? "1-2 days"
                            : "5-7 days"}
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden mb-6">
                    <div className="h-[300px] relative">
                      <canvas ref={mapRef} className="w-full h-full"></canvas>
                      <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md text-xs">
                        <div className="flex items-center gap-1 mb-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>Origin</span>
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                          <span>Transit Point</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>Destination</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Tracking History</h3>
                    <div className="space-y-4">
                      {order.trackingPoints &&
                        order.trackingPoints
                          .filter((p: any) => p.date)
                          .map((point: any, index: number) => (
                            <div key={index} className="flex gap-4">
                              <div className="relative">
                                <div
                                  className={`w-4 h-4 rounded-full ${
                                    index === 0
                                      ? "bg-blue-500"
                                      : index === order.trackingPoints.length - 1 && order.status === "delivered"
                                        ? "bg-green-500"
                                        : "bg-indigo-500"
                                  }`}
                                ></div>
                                {index < order.trackingPoints.filter((p: any) => p.date).length - 1 && (
                                  <div className="absolute top-4 bottom-0 left-1/2 w-0.5 -ml-px h-full bg-gray-200"></div>
                                )}
                              </div>
                              <div className="flex-1 pb-4">
                                <p className="font-medium">{point.label}</p>
                                <p className="text-sm text-muted-foreground">{new Date(point.date).toLocaleString()}</p>
                              </div>
                            </div>
                          ))}

                      {order.status !== "delivered" && (
                        <div className="flex gap-4">
                          <div className="relative">
                            <div className="w-4 h-4 rounded-full bg-gray-300 border-2 border-gray-200"></div>
                          </div>
                          <div className="flex-1 pb-4">
                            <p className="font-medium">Delivery</p>
                            <p className="text-sm text-muted-foreground">Pending</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Tracking information not available yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Your order is being processed. Tracking information will be available once your order ships.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}

