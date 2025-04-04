"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  Tag,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Building,
  Landmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PaymentPopup from "@/components/payment-popup"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [voucherCode, setVoucherCode] = useState("")
  const [voucherApplied, setVoucherApplied] = useState(false)
  const [voucherError, setVoucherError] = useState("")
  const [discount, setDiscount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [paymentTab, setPaymentTab] = useState("card")
  const [showPaymentPopup, setShowPaymentPopup] = useState(false)

  // Valid voucher codes
  const validVouchers = [
    { code: "NEWDROP25", discount: 0.25, description: "25% off your order" },
    { code: "SUMMER10", discount: 0.1, description: "10% off your order" },
    { code: "FREESHIP", discount: 150, description: "Free shipping" },
    { code: "WELCOME15", discount: 0.15, description: "15% off your first order" },
  ]

  // Apply voucher code
  const applyVoucher = () => {
    // Reset states
    setVoucherError("")
    setVoucherApplied(false)

    // Check if code is empty
    if (!voucherCode.trim()) {
      setVoucherError("Please enter a voucher code")
      return
    }

    // Find matching voucher
    const voucher = validVouchers.find((v) => v.code === voucherCode.trim().toUpperCase())

    if (voucher) {
      setVoucherApplied(true)
      if (voucher.code === "FREESHIP") {
        setDiscount(150) // Fixed amount for shipping
      } else {
        setDiscount(subtotal * voucher.discount)
      }

      // Store the applied voucher in localStorage
      localStorage.setItem(
        "appliedVoucher",
        JSON.stringify({
          code: voucher.code,
          discount: voucher.discount,
          description: voucher.description,
        }),
      )
    } else {
      setVoucherError("Invalid voucher code")
      setDiscount(0)
    }
  }

  // Check for previously applied voucher on component mount
  useEffect(() => {
    const savedVoucher = localStorage.getItem("appliedVoucher")
    if (savedVoucher) {
      const voucher = JSON.parse(savedVoucher)
      setVoucherCode(voucher.code)
      setVoucherApplied(true)
      if (voucher.code === "FREESHIP") {
        setDiscount(150)
      } else {
        setDiscount(subtotal * voucher.discount)
      }
    }
  }, [subtotal])

  // Clear voucher
  const clearVoucher = () => {
    setVoucherCode("")
    setVoucherApplied(false)
    setVoucherError("")
    setDiscount(0)
    localStorage.removeItem("appliedVoucher")
  }

  const handleCheckout = () => {
    if (!user) {
      router.push("/auth/signin?redirect=cart")
      return
    }

    // Show payment popup instead of directly checking out
    setShowPaymentPopup(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentPopup(false)
    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      // Create a new order and add it to the user's order history
      if (user) {
        // Get existing orders or create empty array
        const existingOrders = JSON.parse(localStorage.getItem(`orders-${user.id}`) || "[]")

        // Create new order
        const newOrder = {
          id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
          date: new Date().toISOString(),
          total: `₱${finalTotalWithShipping.toFixed(2)}`,
          status: "processing",
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            color: item.color,
            colorName: item.colorName,
            size: item.size,
          })),
        }

        // Add new order to beginning of array
        existingOrders.unshift(newOrder)

        // Save updated orders
        localStorage.setItem(`orders-${user.id}`, JSON.stringify(existingOrders))
      }

      clearCart()
      clearVoucher()
      router.push("/checkout/success")
    }, 1500)
  }

  // Calculate final total
  const finalTotal = subtotal - discount
  const shippingCost = 150 // Fixed shipping cost
  const finalTotalWithShipping = voucherCode === "FREESHIP" ? finalTotal : finalTotal + shippingCost

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main
        className="flex-1 container mx-auto py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
          <Link href="/" className="text-muted-foreground flex items-center hover:text-mahogany transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </motion.div>

        {items.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div className="md:col-span-2" variants={container} initial="hidden" animate="show">
              <div className="border-b pb-4 mb-4 hidden md:grid md:grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                <div className="md:col-span-6">Product</div>
                <div className="md:col-span-2 text-center">Price</div>
                <div className="md:col-span-2 text-center">Quantity</div>
                <div className="md:col-span-2 text-right">Total</div>
              </div>

              <AnimatePresence>
                {items.map((item) => {
                  const price = Number.parseFloat(item.price.replace(/[^0-9.]/g, ""))
                  const total = price * item.quantity

                  return (
                    <motion.div
                      key={`${item.id}-${item.color}-${item.size}`}
                      variants={item}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="border-b py-4 grid md:grid-cols-12 gap-4 items-center"
                    >
                      <div className="md:col-span-6 flex items-center gap-4">
                        <motion.div
                          className="w-20 h-20 bg-neutral-100 rounded overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          {(item.colorName || item.size) && (
                            <p className="text-sm text-muted-foreground">
                              {item.colorName && `Color: ${item.colorName}`}
                              {item.colorName && item.size && " / "}
                              {item.size && `Size: ${item.size}`}
                            </p>
                          )}
                          <motion.button
                            onClick={() => removeItem(item.id, item.color, item.size)}
                            className="text-sm text-muted-foreground flex items-center hover:text-red-500 mt-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </motion.button>
                        </div>
                      </div>

                      <div className="md:col-span-2 text-center">
                        <div className="md:hidden text-sm text-muted-foreground mb-1">Price</div>
                        {item.price}
                      </div>

                      <div className="md:col-span-2 flex items-center justify-center">
                        <div className="md:hidden text-sm text-muted-foreground mb-1">Quantity</div>
                        <div className="flex items-center border rounded">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, Math.max(1, item.quantity - 1), item.color, item.size)
                              }
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease</span>
                            </Button>
                          </motion.div>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, Number.parseInt(e.target.value) || 1, item.color, item.size)
                            }
                            className="w-12 h-8 text-center border-0"
                          />
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase</span>
                            </Button>
                          </motion.div>
                        </div>
                      </div>

                      <div className="md:col-span-2 text-right font-medium">
                        <div className="md:hidden text-sm text-muted-foreground mb-1">Total</div>₱{total.toFixed(2)}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              <div className="flex justify-between mt-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" onClick={clearCart} className="text-sm">
                    Clear Cart
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₱{subtotal.toFixed(2)}</span>
                  </div>

                  <AnimatePresence>
                    {voucherApplied && (
                      <motion.div
                        className="flex justify-between text-sm text-mahogany"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <span>Discount</span>
                        <span>-₱{discount.toFixed(2)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    {voucherCode === "FREESHIP" ? (
                      <span className="line-through text-muted-foreground">₱{shippingCost.toFixed(2)}</span>
                    ) : (
                      <span>₱{shippingCost.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                {/* Voucher Code Input */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Voucher Code</span>
                  </div>

                  <AnimatePresence mode="wait">
                    {voucherApplied ? (
                      <motion.div
                        className="bg-green-50 border border-green-200 rounded-md p-3 mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                            <div>
                              <p className="text-sm font-medium">{voucherCode}</p>
                              <p className="text-xs text-green-600">
                                {validVouchers.find((v) => v.code === voucherCode)?.description || "Discount applied"}
                              </p>
                            </div>
                          </div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={clearVoucher}
                              className="h-8 text-muted-foreground hover:text-foreground"
                            >
                              Remove
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter code"
                            value={voucherCode}
                            onChange={(e) => setVoucherCode(e.target.value)}
                            className="flex-1"
                          />
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" onClick={applyVoucher} className="whitespace-nowrap">
                              Apply
                            </Button>
                          </motion.div>
                        </div>

                        <AnimatePresence>
                          {voucherError && (
                            <motion.div
                              className="mt-2 text-xs text-red-500 flex items-center"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {voucherError}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <motion.div
                          className="text-xs text-muted-foreground mt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          Try codes: <span className="font-mono font-medium">NEWDROP25</span>,{" "}
                          <span className="font-mono font-medium">SUMMER10</span>,{" "}
                          <span className="font-mono font-medium">FREESHIP</span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Payment Method</span>
                  </div>

                  <Tabs defaultValue="card" onValueChange={setPaymentTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Card</TabsTrigger>
                      <TabsTrigger value="bank">Bank</TabsTrigger>
                      <TabsTrigger value="ewallet">E-Wallet</TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="pt-4">
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            <div>
                              <p className="text-sm font-medium">Credit Card</p>
                              <p className="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="debit-card" id="debit-card" />
                          <Label htmlFor="debit-card" className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            <div>
                              <p className="text-sm font-medium">Debit Card</p>
                              <p className="text-xs text-muted-foreground">Visa Debit, Mastercard Debit</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </TabsContent>

                    <TabsContent value="bank" className="pt-4">
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                          <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                          <Label htmlFor="bank-transfer" className="flex items-center">
                            <Building className="h-4 w-4 mr-2" />
                            <div>
                              <p className="text-sm font-medium">Bank Transfer</p>
                              <p className="text-xs text-muted-foreground">Direct bank transfer</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="online-banking" id="online-banking" />
                          <Label htmlFor="online-banking" className="flex items-center">
                            <Landmark className="h-4 w-4 mr-2" />
                            <div>
                              <p className="text-sm font-medium">Online Banking</p>
                              <p className="text-xs text-muted-foreground">Pay through your bank's website</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </TabsContent>

                    <TabsContent value="ewallet" className="pt-4">
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                          <RadioGroupItem value="gcash" id="gcash" />
                          <Label htmlFor="gcash" className="flex items-center">
                            <div className="w-4 h-4 mr-2 text-blue-500 font-bold text-xs">G</div>
                            <div>
                              <p className="text-sm font-medium">GCash</p>
                              <p className="text-xs text-muted-foreground">Pay with GCash</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="paymaya" id="paymaya" />
                          <Label htmlFor="paymaya" className="flex items-center">
                            <div className="w-4 h-4 mr-2 text-purple-500 font-bold text-xs">P</div>
                            <div>
                              <p className="text-sm font-medium">PayMaya</p>
                              <p className="text-xs text-muted-foreground">Pay with PayMaya</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </TabsContent>
                  </Tabs>
                </div>

                <Separator className="my-4" />

                <motion.div
                  className="flex justify-between font-bold text-lg mb-6"
                  animate={{ scale: voucherApplied ? [1, 1.05, 1] : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span>Total</span>
                  <span>₱{finalTotalWithShipping.toFixed(2)}</span>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    className="w-full bg-mahogany hover:bg-mahogany-dark text-white"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Checkout"
                    )}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-neutral-100 rounded-full mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </motion.div>
            <motion.h2
              className="text-xl font-medium mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Your cart is empty
            </motion.h2>
            <motion.p
              className="text-muted-foreground mb-6 max-w-md mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Looks like you haven't added anything to your cart yet. Browse our products and find something you like.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.main>
      <Footer />

      {/* Payment Popup */}
      <PaymentPopup
        isOpen={showPaymentPopup}
        onClose={() => setShowPaymentPopup(false)}
        onSuccess={handlePaymentSuccess}
        paymentMethod={paymentMethod}
        amount={finalTotalWithShipping}
      />
    </div>
  )
}

