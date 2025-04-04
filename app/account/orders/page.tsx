"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Package, Eye, ShoppingBag, Clock, CheckCircle, Truck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/lib/cart-context"

// Mock order data
type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled"

type OrderItem = {
  id: string
  name: string
  price: string
  quantity: number
  image: string
  color?: string
  size?: string
}

type Order = {
  id: string
  date: string
  total: string
  status: OrderStatus
  trackingNumber?: string
  items: OrderItem[]
}

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const { addItem } = useCart()

  useEffect(() => {
    // Redirect if not logged in
    if (user === null) {
      router.push("/auth/signin?redirect=/account/orders")
      return
    }

    // Load orders from localStorage
    const loadOrders = () => {
      setIsLoading(true)

      // In a real app, this would be an API call
      setTimeout(() => {
        const storedOrders = localStorage.getItem(`orders-${user?.id}`)

        if (storedOrders) {
          setOrders(JSON.parse(storedOrders))
        } else {
          // Generate mock orders for demo
          const mockOrders: Order[] = [
            {
              id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
              date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              total: "₱3,596",
              status: "processing",
              items: [
                {
                  id: "1",
                  name: "Graphic Tee",
                  price: "₱899",
                  quantity: 2,
                  image: "/placeholder.svg?height=600&width=480",
                  size: "M",
                  color: "Black",
                },
                {
                  id: "4",
                  name: "Cap",
                  price: "₱799",
                  quantity: 1,
                  image: "/placeholder.svg?height=600&width=480",
                  color: "Black",
                },
              ],
            },
            {
              id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
              date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
              total: "₱4,297",
              status: "shipped",
              trackingNumber: "TRK" + Math.floor(1000000 + Math.random() * 9000000),
              items: [
                {
                  id: "2",
                  name: "Logo Hoodie",
                  price: "₱1,499",
                  quantity: 1,
                  image: "/placeholder.svg?height=600&width=480",
                  size: "L",
                  color: "Gray",
                },
                {
                  id: "3",
                  name: "Cargo Pants",
                  price: "₱1,299",
                  quantity: 1,
                  image: "/placeholder.svg?height=600&width=480",
                  size: "32",
                  color: "Green",
                },
                {
                  id: "11",
                  name: "Socks (3 Pack)",
                  price: "₱599",
                  quantity: 1,
                  image: "/placeholder.svg?height=600&width=480",
                  size: "M",
                  color: "Mixed",
                },
              ],
            },
            {
              id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
              date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
              total: "₱2,398",
              status: "delivered",
              trackingNumber: "TRK" + Math.floor(1000000 + Math.random() * 9000000),
              items: [
                {
                  id: "8",
                  name: "Oversized Tee",
                  price: "₱999",
                  quantity: 1,
                  image: "/placeholder.svg?height=600&width=480",
                  size: "M",
                  color: "White",
                },
                {
                  id: "7",
                  name: "Bucket Hat",
                  price: "₱899",
                  quantity: 1,
                  image: "/placeholder.svg?height=600&width=480",
                  color: "White",
                },
                {
                  id: "10",
                  name: "Crossbody Bag",
                  price: "₱1,099",
                  quantity: 1,
                  image: "/placeholder.svg?height=600&width=480",
                  color: "Black",
                },
              ],
            },
          ]

          setOrders(mockOrders)
          localStorage.setItem(`orders-${user?.id}`, JSON.stringify(mockOrders))
        }

        setIsLoading(false)
      }, 1000)
    }

    if (user) {
      loadOrders()
    }
  }, [user, router])

  // Filter orders based on active tab
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    return order.status === activeTab
  })

  // Get status badge
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Processing</Badge>
      case "shipped":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>
    }
  }

  // Get status icon
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "shipped":
        return <Truck className="h-5 w-5 text-amber-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "cancelled":
        return <X className="h-5 w-5 text-red-500" />
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Handle Buy Again button click
  const handleBuyAgain = (order: Order) => {
    // Add all items from this order to cart
    order.items.forEach((item) => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        color: item.color,
        colorName: item.color,
        size: item.size,
      })
    })

    // Navigate to cart
    router.push("/cart")
  }

  if (isLoading) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="mb-8">
          <Link
            href="/settings"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to settings
          </Link>
          <h1 className="text-3xl font-bold">Order History</h1>
          <p className="text-muted-foreground">View and track your orders</p>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-lg overflow-hidden">
                <div className="bg-neutral-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Order #{order.id}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">Placed on {formatDate(order.date)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/account/orders/${order.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Link>
                    </Button>
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm" onClick={() => handleBuyAgain(order)}>
                        <Package className="h-4 w-4 mr-1" />
                        Buy Again
                      </Button>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    {getStatusIcon(order.status)}
                    <span className="font-medium">
                      {order.status === "processing" && "Your order is being processed"}
                      {order.status === "shipped" && "Your order has been shipped"}
                      {order.status === "delivered" && "Your order has been delivered"}
                      {order.status === "cancelled" && "Your order has been cancelled"}
                    </span>
                  </div>

                  {order.trackingNumber && (
                    <div className="mb-4 text-sm">
                      <span className="text-muted-foreground">Tracking Number: </span>
                      <span className="font-medium">{order.trackingNumber}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.items.map((item) => (
                      <div key={`${order.id}-${item.id}`} className="flex gap-4">
                        <div className="w-16 h-16 bg-neutral-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <div className="text-xs text-muted-foreground">
                            <p>Qty: {item.quantity}</p>
                            {(item.color || item.size) && (
                              <p>
                                {item.color && `Color: ${item.color}`}
                                {item.color && item.size && " / "}
                                {item.size && `Size: ${item.size}`}
                              </p>
                            )}
                          </div>
                          <p className="text-sm mt-1">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {order.items.reduce((total, item) => total + item.quantity, 0)} items
                    </div>
                    <div className="font-medium">Total: {order.total}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-100 rounded-full mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-4">No orders found</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {activeTab === "all"
                ? "You haven't placed any orders yet. Start shopping to see your orders here."
                : `You don't have any ${activeTab} orders.`}
            </p>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

