"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CreditCard, Building, Landmark, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

type PaymentPopupProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  paymentMethod: string
  amount: number
}

export default function PaymentPopup({ isOpen, onClose, onSuccess, paymentMethod, amount }: PaymentPopupProps) {
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCvv] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [bankName, setBankName] = useState("")
  const [ewalletNumber, setEwalletNumber] = useState("")
  const [ewalletPin, setEwalletPin] = useState("")

  // Reset state when popup opens
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setIsProcessing(false)
      setProgress(0)
      setError("")
    }
  }, [isOpen])

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  const handleSubmit = () => {
    setError("")

    // Validate based on payment method
    if (paymentMethod.includes("card")) {
      if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
        setError("Please enter a valid card number")
        return
      }
      if (!cardName) {
        setError("Please enter the cardholder name")
        return
      }
      if (!cardExpiry || cardExpiry.length < 5) {
        setError("Please enter a valid expiry date (MM/YY)")
        return
      }
      if (!cardCvv || cardCvv.length < 3) {
        setError("Please enter a valid CVV")
        return
      }
    } else if (paymentMethod.includes("bank")) {
      if (!bankAccount || bankAccount.length < 10) {
        setError("Please enter a valid bank account number")
        return
      }
      if (!bankName) {
        setError("Please enter your bank name")
        return
      }
    } else if (paymentMethod.includes("gcash") || paymentMethod.includes("paymaya")) {
      if (!ewalletNumber || ewalletNumber.length < 11) {
        setError("Please enter a valid mobile number")
        return
      }
      if (!ewalletPin || ewalletPin.length < 4) {
        setError("Please enter your PIN")
        return
      }
    }

    // Proceed to processing
    setStep(2)
    setIsProcessing(true)

    // Simulate processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setStep(3) // Move to success step
          }, 500)
          return 100
        }

        return newProgress
      })
    }, 100)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div className="bg-black text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              {paymentMethod.includes("card") && <CreditCard className="h-5 w-5 mr-2" />}
              {paymentMethod.includes("bank") && <Building className="h-5 w-5 mr-2" />}
              {(paymentMethod.includes("gcash") || paymentMethod.includes("paymaya")) && (
                <Landmark className="h-5 w-5 mr-2" />
              )}
              <h3 className="font-medium">
                {paymentMethod === "credit-card" && "Credit Card Payment"}
                {paymentMethod === "debit-card" && "Debit Card Payment"}
                {paymentMethod === "bank-transfer" && "Bank Transfer"}
                {paymentMethod === "online-banking" && "Online Banking"}
                {paymentMethod === "gcash" && "GCash Payment"}
                {paymentMethod === "paymaya" && "PayMaya Payment"}
              </h3>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white" aria-label="Close payment popup">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Payment Details</h4>
                  <p className="text-sm text-muted-foreground">
                    Amount to pay: <span className="font-medium">₱{amount.toFixed(2)}</span>
                  </p>
                </div>

                {/* Card Payment Form */}
                {paymentMethod.includes("card") && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Cardholder Name</Label>
                      <Input
                        id="card-name"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-expiry">Expiry Date</Label>
                        <Input
                          id="card-expiry"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiryDate(e.target.value))}
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-cvv">CVV</Label>
                        <Input
                          id="card-cvv"
                          type="password"
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Form */}
                {paymentMethod.includes("bank") && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Bank Name</Label>
                      <Input
                        id="bank-name"
                        placeholder="Enter your bank name"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-number">Account Number</Label>
                      <Input
                        id="account-number"
                        placeholder="Enter your account number"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value.replace(/\D/g, ""))}
                      />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-800">
                      <p className="font-medium mb-2">Bank Transfer Instructions:</p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Confirm your payment details</li>
                        <li>You'll be redirected to your bank's secure site</li>
                        <li>Complete the transaction on your bank's website</li>
                        <li>Return to Starboy to confirm your order</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* E-Wallet Form */}
                {(paymentMethod === "gcash" || paymentMethod === "paymaya") && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile-number">Mobile Number</Label>
                      <Input
                        id="mobile-number"
                        placeholder="09XX XXX XXXX"
                        value={ewalletNumber}
                        onChange={(e) => setEwalletNumber(e.target.value.replace(/\D/g, ""))}
                        maxLength={11}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pin">PIN</Label>
                      <Input
                        id="pin"
                        type="password"
                        placeholder="Enter your PIN"
                        value={ewalletPin}
                        onChange={(e) => setEwalletPin(e.target.value.replace(/\D/g, ""))}
                        maxLength={6}
                      />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-800">
                      <p className="font-medium mb-2">
                        {paymentMethod === "gcash" ? "GCash" : "PayMaya"} Instructions:
                      </p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Enter your registered mobile number</li>
                        <li>Enter your secure PIN</li>
                        <li>You'll receive an OTP for verification</li>
                        <li>Confirm the payment to complete your order</li>
                      </ol>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-4 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {error}
                  </div>
                )}

                <div className="mt-6 flex justify-end space-x-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit}>Pay ₱{amount.toFixed(2)}</Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-8">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-medium mb-2">Processing Payment</h4>
                  <p className="text-sm text-muted-foreground">Please wait while we process your payment...</p>
                </div>

                <Progress value={progress} className="h-2 mb-4" />

                <div className="text-center text-sm text-muted-foreground">
                  <p>Do not close this window</p>
                  <p>You will be redirected once the payment is complete</p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>

                <h4 className="text-xl font-medium mb-2">Payment Successful!</h4>
                <p className="text-muted-foreground mb-6">
                  Your payment of ₱{amount.toFixed(2)} has been processed successfully.
                </p>

                <Button onClick={onSuccess} className="w-full">
                  Continue to Order Confirmation
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

