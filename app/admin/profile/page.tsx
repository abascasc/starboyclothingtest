"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, User, Upload } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminProfile() {
  const { user, updateAdminProfile, getAdminUsers } = useAuth()
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [department, setDepartment] = useState("")
  const [bio, setBio] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editingUser, setEditingUser] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const userId = searchParams.get("id")

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
      return
    }

    if (!user.isAdmin) {
      toast({
        title: "Access Denied",
        description: "You need administrator privileges to access this page.",
        variant: "destructive",
      })
      router.push("/")
      return
    }

    // If userId is provided in query params, load that user's profile
    if (userId && userId !== user.id) {
      const adminUsers = getAdminUsers()
      const targetUser = adminUsers.find((admin) => admin.id === userId)

      if (targetUser) {
        setEditingUser(targetUser)
        setName(targetUser.name || "")
        setPosition(targetUser.position || "")
        setDepartment(targetUser.department || "")
        setBio(targetUser.bio || "")
        setProfileImage(targetUser.profileImage || "")
      } else {
        toast({
          title: "User Not Found",
          description: "The requested admin user could not be found.",
          variant: "destructive",
        })
        router.push("/admin/dashboard")
      }
    } else {
      // Load current user's profile
      setName(user.name || "")
      setPosition(user.position || "")
      setDepartment(user.department || "")
      setBio(user.bio || "")
      setProfileImage(user.profileImage || "")
    }
  }, [user, router, toast, userId, getAdminUsers])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!name) {
      setError("Name is required")
      return
    }

    setIsLoading(true)

    try {
      const targetId = editingUser ? editingUser.id : user?.id

      if (!targetId) {
        throw new Error("User ID not found")
      }

      const success = await updateAdminProfile(targetId, {
        name,
        position,
        department,
        bio,
        profileImage,
      })

      if (success) {
        setSuccess("Profile updated successfully")
        toast({
          title: "Profile Updated",
          description: "The admin profile has been updated successfully.",
        })
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An error occurred while updating the profile")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, you would upload the file to a server
    // For this demo, we'll use a placeholder URL based on the file name
    setProfileImage(`/placeholder.svg?height=200&width=200&text=${encodeURIComponent(file.name)}`)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/admin/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center mr-4"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {editingUser ? `Edit Profile: ${editingUser.name}` : "My Admin Profile"}
            </CardTitle>
            <CardDescription>
              {editingUser
                ? "Edit this administrator's profile information"
                : "Manage your administrator profile and account settings"}
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSaveProfile}>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profileImage || "/placeholder.svg?height=200&width=200"} alt={name} />
                    <AvatarFallback>
                      <User className="h-16 w-16 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="w-full">
                    <Label htmlFor="profile-image" className="sr-only">
                      Profile Image
                    </Label>
                    <div className="relative">
                      <Input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("profile-image")?.click()}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Photo
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editingUser ? editingUser.email : user.email}
                      disabled
                      className="bg-neutral-50"
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        placeholder="e.g. Store Manager"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={department} onValueChange={setDepartment}>
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Management">Management</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Support">Customer Support</SelectItem>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="General">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="A brief description about yourself"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Admin Role</Label>
                    <Input
                      id="role"
                      type="text"
                      value={editingUser ? editingUser.adminRole : user.adminRole || "Admin"}
                      disabled
                      className="bg-neutral-50"
                    />
                    <p className="text-xs text-muted-foreground">Role changes must be performed by a super admin</p>
                  </div>
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-600">{success}</p>}
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

