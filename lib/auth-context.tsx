"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

// Update the User and RegisteredUser types to include admin-specific fields
type User = {
  id: string
  name: string
  email: string
  isAdmin?: boolean
  adminRole?: string
  position?: string
  profileImage?: string
  department?: string
  bio?: string
} | null

type RegisteredUser = {
  id: string
  name: string
  email: string
  password: string
  isAdmin?: boolean
  adminRole?: string
  position?: string
  profileImage?: string
  department?: string
  bio?: string
}

type AuthContextType = {
  user: User
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<boolean>
  updatePassword: (email: string, resetCode: string, newPassword: string) => Promise<boolean>
  checkResetCode: (email: string, resetCode: string) => Promise<boolean>
  registerAdmin: (email: string, password: string, name: string, role?: string) => Promise<void>
  updateAdminProfile: (userId: string, updates: any) => Promise<boolean>
  getAdminUsers: () => RegisteredUser[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Ensure admin user exists
const ensureAdminUser = () => {
  const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]") as RegisteredUser[]

  // Check if admin user already exists
  const adminExists = registeredUsers.some((user) => user.email === "admin@example.com")

  if (!adminExists) {
    // Add admin user
    const adminUser: RegisteredUser = {
      id: "admin-1",
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      isAdmin: true,
      adminRole: "owner",
      position: "CEO",
      department: "Management",
      profileImage: "/placeholder.svg?height=200&width=200&text=Admin",
      bio: "The big boss",
    }
    registeredUsers.push(adminUser)
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Ensure admin user exists in localStorage
    ensureAdminUser()

    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]") as RegisteredUser[]

      // Find the user with matching email
      const foundUser = registeredUsers.find((user) => user.email.toLowerCase() === email.toLowerCase())

      // If user not found or password doesn't match, throw error
      if (!foundUser) {
        throw new Error("User not registered. Please sign up first.")
      }

      if (foundUser.password !== password) {
        throw new Error("Invalid password. Please try again.")
      }

      // User exists and password matches, proceed with login
      const loggedInUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        isAdmin: foundUser.isAdmin,
        adminRole: foundUser.adminRole,
        position: foundUser.position,
        profileImage: foundUser.profileImage,
        department: foundUser.department,
        bio: foundUser.bio,
      }

      setUser(loggedInUser)
      localStorage.setItem("user", JSON.stringify(loggedInUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // Get existing registered users
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]") as RegisteredUser[]

      // Check if email already exists
      if (registeredUsers.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("Email already registered. Please sign in instead.")
      }

      // Create new user
      const isAdmin = email.toLowerCase() === "admin@example.com"
      const newUser: RegisteredUser = {
        id: isAdmin ? "admin-1" : `user-${Date.now()}`,
        name,
        email,
        password,
        isAdmin,
        adminRole: undefined,
        position: undefined,
        profileImage: undefined,
        department: undefined,
        bio: undefined,
      }

      // Add to registered users
      registeredUsers.push(newUser)
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))

      // Ensure admin user exists
      ensureAdminUser()
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  // Password reset functionality
  const resetPassword = async (email: string): Promise<boolean> => {
    // Get registered users
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]") as RegisteredUser[]

    // Check if email exists
    const userExists = registeredUsers.some((user) => user.email.toLowerCase() === email.toLowerCase())

    if (!userExists) {
      return false
    }

    // Generate a 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString()

    // Store reset code in localStorage (in a real app, this would be sent via email)
    const resetRequests = JSON.parse(localStorage.getItem("passwordResetRequests") || "{}")
    resetRequests[email.toLowerCase()] = {
      code: resetCode,
      expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes expiry
    }
    localStorage.setItem("passwordResetRequests", JSON.stringify(resetRequests))

    // In a real app, you would send an email with the reset code
    console.log(`Reset code for ${email}: ${resetCode}`)

    return true
  }

  const checkResetCode = async (email: string, resetCode: string): Promise<boolean> => {
    const resetRequests = JSON.parse(localStorage.getItem("passwordResetRequests") || "{}")
    const request = resetRequests[email.toLowerCase()]

    if (!request) {
      return false
    }

    // Check if code matches and hasn't expired
    if (request.code === resetCode && request.expiresAt > Date.now()) {
      return true
    }

    return false
  }

  const updatePassword = async (email: string, resetCode: string, newPassword: string): Promise<boolean> => {
    // Verify reset code first
    const isValidCode = await checkResetCode(email, resetCode)

    if (!isValidCode) {
      return false
    }

    // Update password
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]") as RegisteredUser[]
    const updatedUsers = registeredUsers.map((user) => {
      if (user.email.toLowerCase() === email.toLowerCase()) {
        return { ...user, password: newPassword }
      }
      return user
    })

    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))

    // Clear the reset request
    const resetRequests = JSON.parse(localStorage.getItem("passwordResetRequests") || "{}")
    delete resetRequests[email.toLowerCase()]
    localStorage.setItem("passwordResetRequests", JSON.stringify(resetRequests))

    return true
  }

  // Add a new function to register an admin user
  const registerAdmin = async (email: string, password: string, name: string, role = "editor"): Promise<void> => {
    setIsLoading(true)
    try {
      // Get existing registered users
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]") as RegisteredUser[]

      // Check if email already exists
      if (registeredUsers.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("Email already registered. Please sign in instead.")
      }

      // Create new admin user
      const newAdmin: RegisteredUser = {
        id: `admin-${Date.now()}`,
        name,
        email,
        password,
        isAdmin: true,
        adminRole: role,
        position: "Staff",
        department: "General",
        profileImage: "/placeholder.svg?height=200&width=200&text=Admin",
        bio: "",
      }

      // Add to registered users
      registeredUsers.push(newAdmin)
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))
    } finally {
      setIsLoading(false)
    }
  }

  // Add a function to update admin profile
  const updateAdminProfile = async (
    userId: string,
    updates: {
      name?: string
      position?: string
      department?: string
      profileImage?: string
      bio?: string
    },
  ): Promise<boolean> => {
    try {
      // Get registered users
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]") as RegisteredUser[]

      // Find and update the user
      const updatedUsers = registeredUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, ...updates }
        }
        return user
      })

      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))

      // If the current user is being updated, update the user state
      if (user && user.id === userId) {
        setUser({ ...user, ...updates })
        localStorage.setItem("user", JSON.stringify({ ...user, ...updates }))
      }

      return true
    } catch (error) {
      console.error("Failed to update profile:", error)
      return false
    }
  }

  // Add a function to get all admin users
  const getAdminUsers = (): RegisteredUser[] => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]") as RegisteredUser[]
    return registeredUsers.filter((user) => user.isAdmin)
  }

  // Update the AuthContext value to include the new functions
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        checkResetCode,
        registerAdmin,
        updateAdminProfile,
        getAdminUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

