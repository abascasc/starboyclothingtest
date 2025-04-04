"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, AlertCircle, CheckCircle, Lock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const code = searchParams.get("code") || ""
  const { toast } = useToast()
  const { updatePassword, checkResetCode } = useAuth()

  // Validate the reset code on page load
  useEffect(() => {
    const validateCode = async () => {
      if (!email || !code) {
        setError("Invalid reset link. Please request a new password reset.")
        return
      }

      const isValid = await checkResetCode(email, code)
      if (!isValid) {
        setError("Invalid or expired reset code. Please request a new password reset.")
      }
    }

    validateCode()
  }, [email, code, checkResetCode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate passwords
    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const success = await updatePassword(email, code, password)

      if (success) {
        setIsSuccess(true)
        toast({
          title: "Password reset successful",
          description: "Your password has been updated. You can now sign in with your new password.",
        })

        // Redirect to sign in page after 3 seconds
        setTimeout(() => {
          router.push("/auth/signin")
        }, 3000)
      } else {
        setError("Failed to reset password. The reset code may be invalid or expired.")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          <span className="text-2xl font-bold tracking-tighter">STARBOY</span>
        </Link>
        <h1 className="text-2xl font-bold mt-6">Reset Password</h1>
        <p className="text-muted-foreground mt-2">Create a new password for your account</p>
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

      {isSuccess ? (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            Your password has been reset successfully. Redirecting to sign in page...
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Lock className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-600">Create a new password for {email}</AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Password must be at least 6 characters long</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || !!error}>
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </Button>
        </form>
      )}
    </div>
  )
}

