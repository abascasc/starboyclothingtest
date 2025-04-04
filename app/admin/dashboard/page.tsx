"use client"

import { Label } from "@/components/ui/label"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  ArrowLeft,
  LogOut,
  Package,
  Tag,
  Image,
  FileText,
  Plus,
  Trash2,
  Edit,
  Search,
  LayoutDashboard,
  UserCircle,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { products } from "@/lib/product-data"

// Import the admin chatbot
import AdminChatbot from "@/components/admin-chatbot"

type CartActivity = {
  userId: string
  userName: string
  userEmail: string
  timestamp: string
  action: string
  items: Array<{
    id: string | number
    name: string
    price: string
    quantity: number
  }>
}

// Mock voucher data
const voucherData = [
  { code: "NEWDROP25", discount: "25%", description: "25% off new arrivals", active: true },
  { code: "SUMMER10", discount: "10%", description: "10% off summer collection", active: true },
  { code: "FREESHIP", discount: "₱150", description: "Free shipping on any order", active: true },
  { code: "WELCOME30", discount: "30%", description: "30% off for new customers", active: true },
  { code: "FLASH50", discount: "50%", description: "Flash sale discount", active: false },
]

// Mock order data
const orderData = [
  { id: "ORD-123456", customer: "John Doe", date: "Apr 1, 2025", status: "processing", total: "₱3,596" },
  { id: "ORD-123455", customer: "Jane Smith", date: "Mar 30, 2025", status: "shipped", total: "₱4,297" },
  { id: "ORD-123454", customer: "Mike Johnson", date: "Mar 28, 2025", status: "delivered", total: "₱2,398" },
  { id: "ORD-123453", customer: "Sarah Williams", date: "Mar 25, 2025", status: "delivered", total: "₱1,698" },
]

export default function AdminDashboard() {
  const { user, signOut, getAdminUsers } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [cartActivities, setCartActivities] = useState<CartActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [adminUsers, setAdminUsers] = useState<any[]>([])
  const [productData, setProductData] = useState(products)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(productData)
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null)
  const [isVoucherDialogOpen, setIsVoucherDialogOpen] = useState(false)
  const [isAddVoucherDialogOpen, setIsAddVoucherDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)

  useEffect(() => {
    // Check if user is admin
    if (user === null) {
      // Still loading, wait
      return
    }

    if (!user?.isAdmin) {
      toast({
        title: "Access Denied",
        description: "You need administrator privileges to access this page.",
        variant: "destructive",
      })
      router.push("/")
      return
    }

    // Load cart activities from localStorage
    const storedActivities = localStorage.getItem("cartActivities")
    if (storedActivities) {
      setCartActivities(JSON.parse(storedActivities))
    }

    // Load admin users
    setAdminUsers(getAdminUsers())

    setIsLoading(false)
  }, [user, router, toast, getAdminUsers])

  // Filter products when search query changes
  useEffect(() => {
    if (searchQuery) {
      const filtered = productData.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(productData)
    }
  }, [searchQuery, productData])

  const handleSignOut = async () => {
    await signOut()
    toast({
      title: "Signed Out",
      description: "You've been signed out of the admin dashboard.",
    })
    router.push("/")
  }

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product)
    setIsEditDialogOpen(true)
  }

  const handleDeleteProduct = (product: any) => {
    setSelectedProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const handleAddProduct = () => {
    setIsAddDialogOpen(true)
  }

  const handleSaveProduct = (updatedProduct: any) => {
    // In a real app, this would update the database
    // For now, we'll update our local state
    const updatedProducts = productData.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    setProductData(updatedProducts)
    setIsEditDialogOpen(false)

    toast({
      title: "Product Updated",
      description: `${updatedProduct.name} has been updated successfully.`,
    })
  }

  const handleConfirmDelete = () => {
    if (!selectedProduct) return

    // In a real app, this would delete from the database
    // For now, we'll update our local state
    const updatedProducts = productData.filter((p) => p.id !== selectedProduct.id)
    setProductData(updatedProducts)
    setIsDeleteDialogOpen(false)

    toast({
      title: "Product Deleted",
      description: `${selectedProduct.name} has been deleted.`,
    })
  }

  const handleAddNewProduct = (newProduct: any) => {
    // In a real app, this would add to the database
    // For now, we'll update our local state
    const updatedProducts = [
      ...productData,
      {
        ...newProduct,
        id: `new-${Date.now()}`, // Generate a temporary ID
        images: [newProduct.image],
        colors: [{ name: "Default", value: "#000000" }],
        sizes: [{ name: "One Size", value: "OS", inStock: true }],
        details: ["New product"],
        care: ["Standard care"],
        sku: `ST-NEW-${Date.now()}`,
        inStock: true,
      },
    ]

    setProductData(updatedProducts)
    setIsAddDialogOpen(false)

    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added successfully.`,
    })
  }

  const handleEditVoucher = (voucher: any) => {
    setSelectedVoucher(voucher)
    setIsVoucherDialogOpen(true)
  }

  const handleAddVoucher = () => {
    setIsAddVoucherDialogOpen(true)
  }

  const handleSaveVoucher = (updatedVoucher: any) => {
    // In a real app, this would update the database
    // For now, we'll just show a toast
    setIsVoucherDialogOpen(false)

    toast({
      title: "Voucher Updated",
      description: `${updatedVoucher.code} has been updated successfully.`,
    })
  }

  const handleAddNewVoucher = (newVoucher: any) => {
    // In a real app, this would add to the database
    // For now, we'll just show a toast
    setIsAddVoucherDialogOpen(false)

    toast({
      title: "Voucher Added",
      description: `${newVoucher.code} has been added successfully.`,
    })
  }

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setIsOrderDialogOpen(true)
  }

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would update the database
    // For now, we'll just show a toast
    setIsOrderDialogOpen(false)

    toast({
      title: "Order Updated",
      description: `Order ${orderId} status changed to ${newStatus}.`,
    })
  }

  // Calculate some stats for the dashboard
  const totalUsers = new Set(cartActivities.map((activity) => activity.userId)).size
  const totalItems = cartActivities.reduce((total, activity) => {
    return total + activity.items.reduce((sum, item) => sum + item.quantity, 0)
  }, 0)
  const totalRevenue = cartActivities.reduce((total, activity) => {
    return (
      total +
      activity.items.reduce((sum, item) => {
        const price = Number.parseFloat(item.price.replace(/[^0-9.]/g, ""))
        return sum + price * item.quantity
      }, 0)
    )
  }, 0)

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mahogany mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user?.isAdmin) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-screen">
        <div className="text-center max-w-md">
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertDescription className="text-red-600">
              You need administrator privileges to access this page.
            </AlertDescription>
          </Alert>
          <Button asChild className="bg-mahogany hover:bg-mahogany-dark">
            <Link href="/">Return to Store</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Admin Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter">STARBOY</span>
            <span className="text-sm bg-mahogany text-white px-2 py-0.5 rounded">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle className="h-5 w-5 text-neutral-500" />
                    )}
                  </div>
                  <span>{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile">
                    <UserCircle className="mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="text-sm flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                View Store
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex">
        {/* Sidebar */}
        <div className="w-64 mr-8">
          <div className="bg-white rounded-lg border shadow-sm p-4 sticky top-24">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">Logged in as</p>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.adminRole || "Admin"}</p>
            </div>

            <nav className="space-y-1">
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "dashboard" ? "bg-mahogany hover:bg-mahogany-dark" : ""}`}
                onClick={() => setActiveTab("dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === "products" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "products" ? "bg-mahogany hover:bg-mahogany-dark" : ""}`}
                onClick={() => setActiveTab("products")}
              >
                <Package className="mr-2 h-4 w-4" />
                Products
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "orders" ? "bg-mahogany hover:bg-mahogany-dark" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Orders
              </Button>
              <Button
                variant={activeTab === "vouchers" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "vouchers" ? "bg-mahogany hover:bg-mahogany-dark" : ""}`}
                onClick={() => setActiveTab("vouchers")}
              >
                <Tag className="mr-2 h-4 w-4" />
                Vouchers
              </Button>
              <Button
                variant={activeTab === "content" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "content" ? "bg-mahogany hover:bg-mahogany-dark" : ""}`}
                onClick={() => setActiveTab("content")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Content
              </Button>
              <Button
                variant={activeTab === "media" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "media" ? "bg-mahogany hover:bg-mahogany-dark" : ""}`}
                onClick={() => setActiveTab("media")}
              >
                <Image className="mr-2 h-4 w-4" />
                Media
              </Button>
              <Button
                variant={activeTab === "users" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "users" ? "bg-mahogany hover:bg-mahogany-dark" : ""}`}
                onClick={() => setActiveTab("users")}
              >
                <Users className="mr-2 h-4 w-4" />
                Users
              </Button>
              <Button
                variant={activeTab === "admins" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "admins" ? "bg-mahogany hover:bg-mahogany-dark" : ""}`}
                onClick={() => setActiveTab("admins")}
              >
                <UserCircle className="mr-2 h-4 w-4" />
                Admin Team
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-mahogany" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₱{totalRevenue.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Users</CardTitle>
                    <Users className="h-4 w-4 text-mahogany" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalUsers}</div>
                    <p className="text-xs text-muted-foreground">+180 new users</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Items in Carts</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-mahogany" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalItems}</div>
                    <p className="text-xs text-muted-foreground">+19% from last hour</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-mahogany" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12.5%</div>
                    <p className="text-xs text-muted-foreground">+2.1% from last week</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderData.slice(0, 5).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium
                              ${order.status === "processing" ? "bg-blue-100 text-blue-800" : ""}
                              ${order.status === "shipped" ? "bg-amber-100 text-amber-800" : ""}
                              ${order.status === "delivered" ? "bg-green-100 text-green-800" : ""}
                            `}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">{order.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Admin Team</CardTitle>
                  <CardDescription>Active administrators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {adminUsers.map((admin) => (
                      <div key={admin.id} className="flex items-center gap-3 p-3 border rounded-md">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                          {admin.profileImage ? (
                            <img
                              src={admin.profileImage || "/placeholder.svg"}
                              alt={admin.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserCircle className="h-6 w-6 text-neutral-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{admin.name}</p>
                          <p className="text-xs text-muted-foreground">{admin.adminRole || "Admin"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Admin Team Tab */}
          {activeTab === "admins" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Admin Team Management</h1>
                <Button asChild className="bg-mahogany hover:bg-mahogany-dark">
                  <Link href="/admin/register">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Admin
                  </Link>
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminUsers.map((admin) => (
                        <TableRow key={admin.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                                {admin.profileImage ? (
                                  <img
                                    src={admin.profileImage || "/placeholder.svg"}
                                    alt={admin.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <UserCircle className="h-4 w-4 text-neutral-500" />
                                )}
                              </div>
                              <span className="font-medium">{admin.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{admin.email}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                admin.adminRole === "admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : admin.adminRole === "manager"
                                    ? "bg-blue-100 text-blue-800"
                                    : admin.adminRole === "editor"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-neutral-100 text-neutral-800"
                              }`}
                            >
                              {admin.adminRole === "admin"
                                ? "Admin"
                                : admin.adminRole === "manager"
                                  ? "Manager"
                                  : admin.adminRole === "editor"
                                    ? "Editor"
                                    : admin.adminRole === "support"
                                      ? "Support"
                                      : "Admin"}
                            </span>
                          </TableCell>
                          <TableCell>{admin.department || "General"}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/admin/profile?id=${admin.id}`}>View</Link>
                              </Button>
                              {user.adminRole === "super" && (
                                <Button variant="ghost" size="sm" className="text-red-500">
                                  Remove
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Products Management</h1>
                <Button className="bg-mahogany hover:bg-mahogany-dark" onClick={handleAddProduct}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Sort</Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-neutral-100 rounded overflow-hidden">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              {product.name}
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.inStock ? `In Stock` : "Out of Stock"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500"
                                onClick={() => handleDeleteProduct(product)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/products/${product.id}`} target="_blank">
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Order Management</h1>

              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search orders by ID or customer..." className="pl-8" />
                </div>
                <Button variant="outline">Filter</Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderData.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <select
                              className="border rounded p-1 text-xs"
                              defaultValue={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            >
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </TableCell>
                          <TableCell>{order.total}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Vouchers Tab */}
          {activeTab === "vouchers" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Voucher Management</h1>
                <Button className="bg-mahogany hover:bg-mahogany-dark" onClick={handleAddVoucher}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Voucher
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {voucherData.map((voucher) => (
                        <TableRow key={voucher.code}>
                          <TableCell className="font-medium">{voucher.code}</TableCell>
                          <TableCell>{voucher.discount}</TableCell>
                          <TableCell>{voucher.description}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                voucher.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {voucher.active ? "Active" : "Inactive"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditVoucher(voucher)}>
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={voucher.active ? "text-red-500" : "text-green-500"}
                                onClick={() => {
                                  toast({
                                    title: voucher.active ? "Voucher Deactivated" : "Voucher Activated",
                                    description: `${voucher.code} has been ${voucher.active ? "deactivated" : "activated"}.`,
                                  })
                                }}
                              >
                                {voucher.active ? "Deactivate" : "Activate"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Content Management</h1>

              <Tabs defaultValue="product-descriptions">
                <TabsList>
                  <TabsTrigger value="product-descriptions">Product Descriptions</TabsTrigger>
                  <TabsTrigger value="categories">Categories</TabsTrigger>
                  <TabsTrigger value="pages">Pages</TabsTrigger>
                </TabsList>

                <TabsContent value="product-descriptions" className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search products..." className="pl-8" />
                    </div>
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {filteredProducts.slice(0, 5).map((product) => (
                          <div key={product.id} className="border-b pb-4 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{product.name}</h3>
                              <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                                Edit
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                            <div className="flex gap-2">
                              <span className="text-xs bg-neutral-100 px-2 py-1 rounded">{product.category}</span>
                              <span className="text-xs bg-neutral-100 px-2 py-1 rounded">{product.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="categories" className="pt-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">T-Shirts</h3>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Hoodies</h3>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Pants</h3>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Headwear</h3>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Jackets</h3>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pages" className="pt-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Home Page</h3>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">About Us</h3>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Contact</h3>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Terms of Service</h3>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Privacy Policy</h3>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Media Library</h1>
                <Button className="bg-mahogany hover:bg-mahogany-dark">
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Media
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search media..." className="pl-8" />
                </div>
                <Button variant="outline">Filter</Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="border rounded-md overflow-hidden bg-white">
                    <div className="aspect-square bg-neutral-100 relative">
                      <img
                        src={`/placeholder.svg?height=200&width=200&text=Image+${item}`}
                        alt={`Product image ${item}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-white">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-white">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-xs truncate">product-image-{item}.jpg</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">User Management</h1>

              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-8" />
                </div>
                <Button variant="outline">Filter</Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Admin User</TableCell>
                        <TableCell>admin@example.com</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Admin
                          </span>
                        </TableCell>
                        <TableCell>0</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">John Doe</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Customer
                          </span>
                        </TableCell>
                        <TableCell>3</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Jane Smith</TableCell>
                        <TableCell>jane@example.com</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Customer
                          </span>
                        </TableCell>
                        <TableCell>1</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Product Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Make changes to the product information below.</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" defaultValue={selectedProduct.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input id="price" defaultValue={selectedProduct.price.replace("₱", "")} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input id="category" defaultValue={selectedProduct.category} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" defaultValue={selectedProduct.description} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  In Stock
                </Label>
                <div className="col-span-3">
                  <Switch id="stock" defaultChecked={selectedProduct.inStock} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleSaveProduct(selectedProduct)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="py-4">
              <div className="flex items-center gap-4 p-4 border rounded-md">
                <div className="w-16 h-16 bg-neutral-100 rounded overflow-hidden">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{selectedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedProduct.price}</p>
                  <p className="text-xs text-muted-foreground">ID: {selectedProduct.id}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Enter the details for the new product.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-name" className="text-right">
                Name
              </Label>
              <Input id="new-name" placeholder="Product name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-price" className="text-right">
                Price
              </Label>
              <Input id="new-price" placeholder="999" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-category" className="text-right">
                Category
              </Label>
              <Input id="new-category" placeholder="t-shirts" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-description" className="text-right">
                Description
              </Label>
              <Textarea id="new-description" placeholder="Product description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-image" className="text-right">
                Image URL
              </Label>
              <Input id="new-image" placeholder="/placeholder.svg?height=600&width=480" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-stock" className="text-right">
                In Stock
              </Label>
              <div className="col-span-3">
                <Switch id="new-stock" defaultChecked={true} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleAddNewProduct({
                  name: (document.getElementById("new-name") as HTMLInputElement).value,
                  price: `₱${(document.getElementById("new-price") as HTMLInputElement).value}`,
                  category: (document.getElementById("new-category") as HTMLInputElement).value,
                  description: (document.getElementById("new-description") as HTMLTextAreaElement).value,
                  image: (document.getElementById("new-image") as HTMLInputElement).value,
                  inStock: (document.getElementById("new-stock") as HTMLInputElement).checked,
                })
              }
            >
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Admin Chatbot */}
      <AdminChatbot />
    </div>
  )
}

