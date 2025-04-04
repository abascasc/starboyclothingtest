"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [resetCode, setResetCode] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await resetPassword(email)

      if (success) {
        setIsSubmitted(true)
        toast({
          title: "Reset code sent",
          description: "Please check the console for the reset code (in a real app, this would be sent to your email)",
        })
      } else {
        setError("Email not found. Please check your email or sign up for an account.")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault()

    if (!resetCode.trim()) {
      setError("Please enter the reset code")
      return
    }

    // Navigate to reset password page with email and code
    router.push(`/auth/reset-password?email=${encodeURIComponent(email)}&code=${resetCode}`)
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          <span className="text-2xl font-bold tracking-tighter">STARBOY</span>
        </Link>
        <h1 className="text-2xl font-bold mt-6">Forgot Password</h1>
        <p className="text-muted-foreground mt-2">
          {isSubmitted
            ? "Enter the reset code sent to your email"
            : "Enter your email address to receive a password reset code"}
        </p>
      </div>

      <div className="mb-6">
        <Link href="/auth/signin" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Link>
      </div>

      {error && (
        <Alert className="mb-6 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-600">{error}</AlertDescription>
        </Alert>
      )}

      {isSubmitted ? (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Mail className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-600">
              For this demo, please check the browser console to see the reset code.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="reset-code">Reset Code</Label>
            <Input
              id="reset-code"
              placeholder="Enter 6-digit code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Verify Code
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Code"}
          </Button>
        </form>
      )}

      <div className="text-center text-sm mt-6">
        Remember your password?{" "}
        <Link href="/auth/signin" className="underline underline-offset-4 hover:text-primary">
          Sign in
        </Link>
      </div>
    </div>
  )
}

