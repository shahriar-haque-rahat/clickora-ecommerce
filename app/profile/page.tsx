"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { useToast } from "@/hooks/use-toast"
import { User, Package, Heart, Settings, MapPin, Phone, Mail, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Order {
  id: number
  date: string
  status: "pending" | "processing" | "shipped" | "delivered"
  total: number
  items: number
}

type ActiveSection = "profile" | "orders" | "bookmarks" | "addresses" | "settings"

export default function ProfilePage() {
  const { state, logout } = useAuth()
  const { state: wishlistState, removeFromWishlist } = useWishlist() // Added removeFromWishlist
  const { toast } = useToast()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<ActiveSection>("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  })

  // Mock data - replace with actual API calls
  const [orders] = useState<Order[]>([
    { id: 1001, date: "2024-01-15", status: "delivered", total: 89.99, items: 2 },
    { id: 1002, date: "2024-01-10", status: "shipped", total: 45.5, items: 1 },
    { id: 1003, date: "2024-01-05", status: "processing", total: 129.99, items: 3 },
  ])

  useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      router.push("/login")
      return
    }

    if (state.user) {
      setFormData({
        first_name: state.user.first_name,
        last_name: state.user.last_name,
        email: state.user.email,
        phone: state.user.phone || "",
      })
    }
  }, [state, router])

  const handleSaveProfile = () => {
    // Simulate API call to update profile
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "shipped":
        return "bg-blue-500"
      case "processing":
        return "bg-yellow-500"
      case "pending":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="lg:col-span-3 h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!state.isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-orange-500">My Account</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    {state.user?.first_name} {state.user?.last_name}
                  </h3>
                  <p className="text-gray-600 text-sm">{state.user?.email}</p>
                </div>

                <nav className="space-y-2">
                  <Button
                    variant={activeSection === "profile" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeSection === "profile" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}
                    onClick={() => setActiveSection("profile")}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile Information
                  </Button>
                  <Button
                    variant={activeSection === "orders" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeSection === "orders" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}
                    onClick={() => setActiveSection("orders")}
                  >
                    <Package className="w-4 h-4 mr-3" />
                    Order History
                  </Button>
                  <Button
                    variant={activeSection === "bookmarks" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeSection === "bookmarks" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}
                    onClick={() => setActiveSection("bookmarks")}
                  >
                    <Heart className="w-4 h-4 mr-3" />
                    Bookmarks ({wishlistState.items.length})
                  </Button>
                  <Button
                    variant={activeSection === "addresses" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeSection === "addresses" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}
                    onClick={() => setActiveSection("addresses")}
                  >
                    <MapPin className="w-4 h-4 mr-3" />
                    Addresses
                  </Button>
                  <Button
                    variant={activeSection === "settings" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeSection === "settings" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`}
                    onClick={() => setActiveSection("settings")}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
                    Logout
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Profile Information
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-transparent"
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="bg-orange-500 hover:bg-orange-600">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-transparent">
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeSection === "orders" && (
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-orange-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Order #{order.id}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              {order.date}
                              <span>•</span>
                              {order.items} items
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getStatusColor(order.status)} text-white mb-2`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <p className="font-bold">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "bookmarks" && (
              <Card>
                <CardHeader>
                  <CardTitle>Bookmarked Products</CardTitle>
                </CardHeader>
                <CardContent>
                  {wishlistState.items.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
                      <p className="text-gray-600 mb-4">Start browsing and bookmark your favorite products!</p>
                      <Link href="/products">
                        <Button className="bg-orange-500 hover:bg-orange-600">Browse Products</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlistState.items.map((product) => (
                        <div key={product.id} className="border rounded-lg p-4">
                          <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                            <img
                              src={product.image_url || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="font-medium mb-2 line-clamp-2">{product.name}</h4>
                          <p className="font-bold text-orange-500 mb-3">${product.price.toFixed(2)}</p>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                              Add to Cart
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent"
                              onClick={() => removeFromWishlist(product.id)}
                            >
                              <Heart className="w-4 h-4 fill-current text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeSection === "addresses" && (
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
                    <p className="text-gray-600 mb-4">Add your addresses for faster checkout</p>
                    <Button className="bg-orange-500 hover:bg-orange-600">Add New Address</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Notifications</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-sm">Email notifications for orders</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-sm">SMS notifications for shipping updates</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm">Marketing emails and promotions</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Privacy</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-sm">Make my profile visible to other users</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm">Allow data collection for personalized recommendations</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="bg-orange-500 hover:bg-orange-600">Save Settings</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}