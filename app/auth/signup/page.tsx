"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordFeedback, setPasswordFeedback] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")
  const { toast } = useToast()
  const { signUp, user } = useAuth()

  // If user is already logged in, redirect them
  useEffect(() => {
    if (user) {
      if (redirect) {
        router.push(redirect)
      } else {
        router.push("/")
      }
    }
  }, [user, redirect, router])

  // Check password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      setPasswordFeedback("")
      return
    }

    // Calculate password strength
    let strength = 0
    let feedback = ""

    // Length check
    if (password.length >= 8) {
      strength += 25
    } else {
      feedback = "Password should be at least 8 characters long"
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      strength += 25
    } else if (!feedback) {
      feedback = "Add uppercase letters for stronger password"
    }

    // Number check
    if (/\d/.test(password)) {
      strength += 25
    } else if (!feedback) {
      feedback = "Add numbers for stronger password"
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 25
    } else if (!feedback) {
      feedback = "Add special characters for stronger password"
    }

    // Set feedback based on strength
    if (strength === 100 && !feedback) {
      feedback = "Strong password"
    } else if (strength >= 75 && !feedback) {
      feedback = "Good password"
    } else if (strength >= 50 && !feedback) {
      feedback = "Moderate password"
    } else if (strength >= 25 && !feedback) {
      feedback = "Weak password"
    }

    setPasswordStrength(strength)
    setPasswordFeedback(feedback)
  }, [password])

  // Change the getStrengthColor function to use specific color classes that won't be affected by the site's theme
  const getStrengthColor = () => {
    if (passwordStrength >= 100) return "!bg-green-500" // Added ! to override any other styles
    if (passwordStrength >= 75) return "!bg-blue-500"
    if (passwordStrength >= 50) return "!bg-yellow-500"
    if (passwordStrength >= 25) return "!bg-orange-500"
    return "!bg-red-500"
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate password strength
    if (passwordStrength < 50) {
      setError("Please create a stronger password")
      setIsLoading(false)
      return
    }

    try {
      // Call the signUp function from auth context
      await signUp(email, password, `${firstName} ${lastName}`)

      toast({
        title: "Account created",
        description: "You've successfully signed up!",
      })

      // Redirect to sign in page with registered flag and redirect parameter
      const redirectParam = redirect ? `&redirect=${encodeURIComponent(redirect)}` : ""
      router.push(`/auth/signin?registered=true${redirectParam}`)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Failed to create account. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // If user is already logged in, don't render the form
  if (user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          <span className="text-2xl font-bold tracking-tighter">STARBOY</span>
        </Link>
        <h1 className="text-2xl font-bold mt-6">Create an account</h1>
        <p className="text-muted-foreground mt-2">Enter your details below to create your account</p>
      </div>

      {error && (
        <Alert className="mb-6 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-600">{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              placeholder="John"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              placeholder="Doe"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
            </Button>
          </div>

          {password && (
            <div className="space-y-1 mt-2">
              <div className="flex justify-between items-center">
                <Progress value={passwordStrength} className={`h-2 ${getStrengthColor()}`} />
                <span className="text-xs ml-2 min-w-[80px] text-right">
                  {passwordStrength === 100
                    ? "Strong"
                    : passwordStrength >= 75
                      ? "Good"
                      : passwordStrength >= 50
                        ? "Moderate"
                        : passwordStrength >= 25
                          ? "Weak"
                          : "Very Weak"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{passwordFeedback}</p>
            </div>
          )}

          <p className="text-xs text-muted-foreground mt-1">
            Password should be at least 8 characters with uppercase letters, numbers, and special characters
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm">
            I agree to the{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href={redirect ? `/auth/signin?redirect=${encodeURIComponent(redirect)}` : "/auth/signin"}
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  )
}

