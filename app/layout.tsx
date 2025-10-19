import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { CartProvider } from "@/components/cart-provider"
import { AuthProvider } from "@/components/auth-provider"
import { WishlistProvider } from "@/components/wishlist-provider"
import { CartSidebar } from "@/components/cart-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Clickora - Electronics Store",
  description: "Your one-stop shop for electronics, gadgets, and tech accessories",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
              <CartSidebar />
              <Toaster />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
