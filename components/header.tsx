"use client"

import type React from "react"

import { Search, ShoppingCart, User, Heart, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { useWishlist } from "@/components/wishlist-provider"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

export function Header() {
  const { state, dispatch } = useCart()
  const { state: authState, logout } = useAuth()
  const { state: wishlistState } = useWishlist()
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const router = useRouter()

  const handleLogout = () => {
    logout()
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const params = new URLSearchParams()
      params.set("search", searchQuery.trim())
      if (selectedCategory !== "all") {
        params.set("category", selectedCategory)
      }
      router.push(`/products?${params.toString()}`)
    } else {
      router.push("/products")
    }
  }

  return (
    <header className="bg-white border-b relative">
      {/* Top bar - Hide on mobile */}
      <div className="bg-gray-100 text-sm py-2 hidden lg:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4 text-xs lg:text-sm">
            <span>📍 Store Location</span>
            <span>📞 Track Your Order</span>
            <span>📞 Call Us For Enquiry</span>
          </div>
          <div className="flex items-center gap-2 text-xs lg:text-sm">
            <span className="hidden xl:inline">❤️ Welcome to Clickora. We provides Best Electronics Item</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src={"/clickora-logo.png"}
              alt={"clickora-logo"}
              width={180}
              height={100}
            />
          </Link>

          {/* Search - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-black hover:text-orange-500 text-sm lg:text-base whitespace-nowrap"
                >
                  All Categories
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-white text-black">
                <DropdownMenuItem asChild>
                  <Link href="/products" className="flex items-center gap-2 py-2">
                    🛍️ All Products
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/products?category=laptops" className="flex items-center gap-2 py-2">
                    💻 Laptops & Computers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products?category=cameras" className="flex items-center gap-2 py-2">
                    📹 CC TV & Cameras
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products?category=home" className="flex items-center gap-2 py-2">
                    🏠 Home Equipment
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products?category=tv-audio" className="flex items-center gap-2 py-2">
                    📺 TV & Audio
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products?category=phones" className="flex items-center gap-2 py-2">
                    📱 Phones & PCs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products?category=gaming" className="flex items-center gap-2 py-2">
                    🎮 Gaming & Fun
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <form onSubmit={handleSearch} className="flex-1 flex">
              <Input
                placeholder="Search for Products"
                className="flex-1 rounded-r-none border-l-0 border-r-0 text-sm lg:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 rounded-l-none px-3 lg:px-4">
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Language/Currency - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-1 text-sm">
              <span>USD</span>
              <span>🇺🇸 English</span>
            </div>

            {/* User Menu */}
            {authState.isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 px-2 lg:px-3">
                    <User className="w-4 h-4" />
                    <span className="hidden xl:inline text-sm">
                      {authState.user?.first_name} {authState.user?.last_name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Order History</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Bookmarks</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="px-2 lg:px-3">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
            )}

            {/* Wishlist button */}
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="relative px-2 lg:px-3">
                <Heart className="w-4 h-4" />
                {wishlistState.items.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0">
                    {wishlistState.items.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart button */}
            <Button
              variant="ghost"
              size="sm"
              className="relative px-2 lg:px-3"
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
            >
              <ShoppingCart className="w-4 h-4" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden mt-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search for Products"
              className="flex-1 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 px-3">
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Navigation - Responsive */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 lg:gap-8 py-3 overflow-x-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-orange-500 whitespace-nowrap text-sm lg:text-base"
                >
                  <Menu className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-white text-black">
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center gap-2 py-2">
                    🏠 Home
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/products" className="flex items-center gap-2 py-2">
                    🛍️ All Products
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/cart" className="flex items-center gap-2 py-2">
                    🛒 Shopping Cart
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/blog" className="flex items-center gap-2 py-2">
                    📝 Blog
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {authState.isAuthenticated ? (
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2 py-2">
                      👤 My Account
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="flex items-center gap-2 py-2">
                      🔐 Login / Sign Up
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2 lg:gap-6 overflow-x-auto">
              <Link
                href="/products?category=laptops"
                className="hover:text-orange-500 whitespace-nowrap text-sm lg:text-base"
              >
                <span className="hidden sm:inline">💻 </span>Laptops
              </Link>
              <Link
                href="/products?category=cameras"
                className="hover:text-orange-500 whitespace-nowrap text-sm lg:text-base"
              >
                <span className="hidden sm:inline">📹 </span>Cameras
              </Link>
              <Link
                href="/products?category=home"
                className="hover:text-orange-500 whitespace-nowrap text-sm lg:text-base"
              >
                <span className="hidden sm:inline">🏠 </span>Home
              </Link>
              <Link
                href="/products?category=tv-audio"
                className="hover:text-orange-500 whitespace-nowrap text-sm lg:text-base"
              >
                <span className="hidden sm:inline">📺 </span>TV & Audio
              </Link>
              <Link
                href="/products?category=phones"
                className="hover:text-orange-500 whitespace-nowrap text-sm lg:text-base"
              >
                <span className="hidden sm:inline">📱 </span>Phones
              </Link>
              <Link
                href="/products?category=gaming"
                className="hover:text-orange-500 whitespace-nowrap text-sm lg:text-base"
              >
                <span className="hidden sm:inline">🎮 </span>Gaming
              </Link>
            </div>

            <div className="ml-auto hidden lg:block">
              {authState.isAuthenticated ? (
                <span className="text-white text-sm">Welcome back!</span>
              ) : (
                <Link href="/login">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-sm">Login / Sign Up</Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
