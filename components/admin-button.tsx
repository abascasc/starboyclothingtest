"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, Lock, LogIn, UserPlus, ChevronDown, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

type RegisteredUser = {
  id: string
  name: string
  email: string
  isAdmin?: boolean
  adminRole?: string
}

export default function AdminButton() {
  const [adminUsers, setAdminUsers] = useState<RegisteredUser[]>([])
  const [hasAdmins, setHasAdmins] = useState(false)
  const router = useRouter()
  const { user, getAdminUsers, signOut } = useAuth()

  // Check if there are registered admin users
  useEffect(() => {
    const admins = getAdminUsers()
    setAdminUsers(admins)
    setHasAdmins(admins.length > 0)
  }, [getAdminUsers])

  // Update the admin button to change appearance based on login status
  // If user is already logged in as admin, show their profile with a different color
  if (user?.isAdmin) {
    return (
      <motion.div
        className="fixed bottom-4 left-4 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white rounded-full p-3 shadow-lg flex items-center gap-2"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="pr-1 text-sm font-medium">Admin Active</span>
              <ChevronDown className="h-4 w-4" />
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Admin Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/profile">
                <UserPlus className="mr-2 h-4 w-4" />
                Manage Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                signOut()
                router.push("/")
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    )
  }

  // If there are registered admins but user is not logged in as admin
  if (hasAdmins) {
    return (
      <motion.div
        className="fixed bottom-4 left-4 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-neutral-700 text-white rounded-full p-3 shadow-lg flex items-center gap-2"
          onClick={() => router.push("/admin/login")}
        >
          <LogIn className="h-5 w-5" />
          <span className="pr-1 text-sm font-medium">Admin Login</span>
        </motion.button>
      </motion.div>
    )
  }

  // Default: No admins registered yet
  return (
    <motion.div
      className="fixed bottom-4 left-4 z-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-mahogany text-white rounded-full p-3 shadow-lg flex items-center gap-2"
          >
            <Lock className="h-5 w-5" />
            <span className="pr-1 text-sm font-medium">Admin</span>
            <ChevronDown className="h-4 w-4" />
          </motion.button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Admin Access</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/admin/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/admin/register">
              <UserPlus className="mr-2 h-4 w-4" />
              Register
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}

