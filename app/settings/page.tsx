"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Save, ShoppingBag, Download, Trash2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Footer from "@/components/footer"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function SettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { theme: currentTheme, setTheme } = useTheme()
  const [isSaving, setIsSaving] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  // User profile settings
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(true)

  // Appearance settings
  const [theme, setThemeState] = useState("system")
  const [fontSize, setFontSize] = useState("medium")

  // Privacy settings
  const [shareData, setShareData] = useState(false)
  const [cookiePreference, setCookiePreference] = useState("essential")

  // Order count for the badge
  const [orderCount, setOrderCount] = useState(0)

  // Handle theme changes
  useEffect(() => {
    setMounted(true)
    if (mounted) {
      setThemeState(currentTheme || "system")
    }
  }, [currentTheme, mounted])

  // Apply font size
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement

      // Remove any existing font size classes
      root.classList.remove("text-sm", "text-base", "text-lg")

      // Add the appropriate class based on fontSize
      switch (fontSize) {
        case "small":
          root.classList.add("text-sm")
          break
        case "medium":
          root.classList.add("text-base")
          break
        case "large":
          root.classList.add("text-lg")
          break
      }
    }
  }, [fontSize, mounted])

  // Load saved settings from localStorage
  useEffect(() => {
    if (!user) {
      router.push("/auth/signin?redirect=/settings")
      return
    }

    // Load user settings from localStorage
    const savedSettings = localStorage.getItem(`user-settings-${user.id}`)
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)

      // Profile settings
      setName(settings.name || user.name || "")
      setEmail(settings.email || user.email || "")
      setPhone(settings.phone || "")

      // Notification settings
      setEmailNotifications(settings.emailNotifications !== undefined ? settings.emailNotifications : true)
      setSmsNotifications(settings.smsNotifications !== undefined ? settings.smsNotifications : false)
      setMarketingEmails(settings.marketingEmails !== undefined ? settings.marketingEmails : true)

      // Appearance settings
      setThemeState(settings.theme || currentTheme || "system")
      setFontSize(settings.fontSize || "medium")

      // Privacy settings
      setShareData(settings.shareData !== undefined ? settings.shareData : false)
      setCookiePreference(settings.cookiePreference || "essential")
    } else {
      // Set defaults based on user info
      setName(user.name || "")
      setEmail(user.email || "")
    }

    // Load order count
    const storedOrders = localStorage.getItem(`orders-${user.id}`)
    if (storedOrders) {
      const orders = JSON.parse(storedOrders)
      setOrderCount(orders.length)
    }
  }, [user, router, currentTheme])

  // Handle theme change
  const handleThemeChange = (value: string) => {
    setThemeState(value)
    setTheme(value)
  }

  const handleSaveSettings = () => {
    if (!user) return

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      // Save all settings to localStorage
      const settings = {
        // Profile settings
        name,
        email,
        phone,

        // Notification settings
        emailNotifications,
        smsNotifications,
        marketingEmails,

        // Appearance settings
        theme,
        fontSize,

        // Privacy settings
        shareData,
        cookiePreference,

        // Add timestamp
        updatedAt: new Date().toISOString(),
      }

      localStorage.setItem(`user-settings-${user.id}`, JSON.stringify(settings))

      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      })
    }, 1000)
  }

  const handleDownloadData = () => {
    setIsDownloading(true)
    setDownloadProgress(0)

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(interval)

          // Create data object
          const userData = {
            profile: {
              name,
              email,
              phone,
            },
            settings: {
              notifications: {
                email: emailNotifications,
                sms: smsNotifications,
                marketing: marketingEmails,
              },
              appearance: {
                theme,
                fontSize,
              },
              privacy: {
                shareData,
                cookiePreference,
              },
            },
            // Add mock order data
            orders: JSON.parse(localStorage.getItem(`orders-${user?.id}`) || "[]"),
            // Add mock activity data
            activity: {
              lastLogin: new Date().toISOString(),
              loginCount: 12,
              lastPurchase: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            },
          }

          // Create a blob and download it
          const dataStr = JSON.stringify(userData, null, 2)
          const blob = new Blob([dataStr], { type: "application/json" })
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = "my-starboy-data.json"
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)

          setIsDownloading(false)
          toast({
            title: "Data downloaded",
            description: "Your data has been downloaded successfully.",
          })
        }
        return newProgress
      })
    }, 300)
  }

  const handleDeleteAccount = () => {
    if (deleteConfirmText !== "DELETE") {
      toast({
        title: "Confirmation required",
        description: "Please type DELETE to confirm account deletion.",
        variant: "destructive",
      })
      return
    }

    setIsDeleting(true)

    // Simulate deletion process
    setTimeout(() => {
      // Clear all user data from localStorage
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.includes(user?.id || "")) {
          localStorage.removeItem(key)
        }
      })

      // Sign out the user by removing from localStorage
      localStorage.removeItem("user")

      setIsDeleting(false)
      setShowDeleteDialog(false)

      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      })

      // Force a full page reload to update auth state and redirect to home
      window.location.href = "/"
    }, 2000)
  }

  // Redirect to login if not authenticated
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>

        <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders" className="relative">
              Orders
              {orderCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {orderCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and manage your orders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderCount > 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">You have {orderCount} orders</h3>
                    <p className="text-muted-foreground mb-4">
                      View your order history, track shipments, and manage returns.
                    </p>
                    <Button asChild>
                      <Link href="/account/orders">View Order History</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't placed any orders yet. Start shopping to see your orders here.
                    </p>
                    <Button asChild>
                      <Link href="/products">Start Shopping</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive order updates and account notifications via email
                    </p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive order updates and shipping notifications via text message
                    </p>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional offers, new product announcements, and exclusive deals
                    </p>
                  </div>
                  <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how the website looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme Preference</Label>
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div
                      className={`border rounded-md p-3 cursor-pointer flex flex-col items-center ${theme === "light" ? "border-primary bg-primary/5" : "border-muted"}`}
                      onClick={() => handleThemeChange("light")}
                    >
                      <div className="w-full h-24 rounded-md bg-white border mb-2 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-black/10"></div>
                      </div>
                      <span className="text-sm font-medium">Light</span>
                    </div>

                    <div
                      className={`border rounded-md p-3 cursor-pointer flex flex-col items-center ${theme === "dark" ? "border-primary bg-primary/5" : "border-muted"}`}
                      onClick={() => handleThemeChange("dark")}
                    >
                      <div className="w-full h-24 rounded-md bg-gray-900 border border-gray-800 mb-2 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white/20"></div>
                      </div>
                      <span className="text-sm font-medium">Dark</span>
                    </div>

                    <div
                      className={`border rounded-md p-3 cursor-pointer flex flex-col items-center ${theme === "system" ? "border-primary bg-primary/5" : "border-muted"}`}
                      onClick={() => handleThemeChange("system")}
                    >
                      <div className="w-full h-24 rounded-md bg-gradient-to-r from-white to-gray-900 border mb-2 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-black/10 to-white/20"></div>
                      </div>
                      <span className="text-sm font-medium">System</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div
                      className={`border rounded-md p-3 cursor-pointer flex flex-col items-center ${fontSize === "small" ? "border-primary bg-primary/5" : "border-muted"}`}
                      onClick={() => setFontSize("small")}
                    >
                      <div className="w-full h-16 flex items-center justify-center">
                        <span className="text-sm">Aa</span>
                      </div>
                      <span className="text-xs font-medium">Small</span>
                    </div>

                    <div
                      className={`border rounded-md p-3 cursor-pointer flex flex-col items-center ${fontSize === "medium" ? "border-primary bg-primary/5" : "border-muted"}`}
                      onClick={() => setFontSize("medium")}
                    >
                      <div className="w-full h-16 flex items-center justify-center">
                        <span className="text-base">Aa</span>
                      </div>
                      <span className="text-xs font-medium">Medium</span>
                    </div>

                    <div
                      className={`border rounded-md p-3 cursor-pointer flex flex-col items-center ${fontSize === "large" ? "border-primary bg-primary/5" : "border-muted"}`}
                      onClick={() => setFontSize("large")}
                    >
                      <div className="w-full h-16 flex items-center justify-center">
                        <span className="text-lg">Aa</span>
                      </div>
                      <span className="text-xs font-medium">Large</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-md">
                  <h3 className="font-medium mb-2">Preview</h3>
                  <p className={`${fontSize === "small" ? "text-sm" : fontSize === "large" ? "text-lg" : "text-base"}`}>
                    This is how text will appear across the website. The quick brown fox jumps over the lazy dog.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Manage your data sharing and privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow us to share anonymized shopping data to improve our recommendations
                    </p>
                  </div>
                  <Switch checked={shareData} onCheckedChange={setShareData} />
                </div>

                <div className="space-y-2">
                  <Label>Cookie Preferences</Label>
                  <RadioGroup
                    value={cookiePreference}
                    onValueChange={setCookiePreference}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="essential" id="cookies-essential" />
                      <Label htmlFor="cookies-essential">Essential Only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="functional" id="cookies-functional" />
                      <Label htmlFor="cookies-functional">Functional (Includes Preferences)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="cookies-all" />
                      <Label htmlFor="cookies-all">All Cookies (Includes Analytics & Marketing)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Data Management</h3>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" onClick={handleDownloadData} disabled={isDownloading}>
                      {isDownloading ? (
                        <>
                          <span className="mr-2">Downloading...</span>
                          <span className="text-xs">{downloadProgress}%</span>
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download My Data
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete My Account
                    </Button>
                  </div>

                  {isDownloading && (
                    <div className="mt-4">
                      <Progress value={downloadProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Preparing your data for download...</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-500">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Delete Account
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-sm text-red-800">
              <p>You will lose:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Order history and tracking information</li>
                <li>Saved addresses and payment methods</li>
                <li>Wishlist items and preferences</li>
                <li>All other account data</li>
              </ul>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-delete">
                Type <span className="font-bold">DELETE</span> to confirm
              </Label>
              <Input
                id="confirm-delete"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isDeleting || deleteConfirmText !== "DELETE"}
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Import Header component to avoid errors
import Header from "@/components/header"

