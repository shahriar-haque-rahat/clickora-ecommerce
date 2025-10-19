"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import {
  ChevronRight,
  Truck,
  Shield,
  Headphones,
  RotateCcw,
  Star,
  Quote,
  Award,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import { products } from "@/data/product.data"

interface Product {
  id: number
  name: string
  price: number
  original_price?: number
  image_url: string
  rating: number
  review_count: number
  category: string
  featured?: boolean
  badge?: string
}

export default function HomePage() {
  const featuredProducts = products

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Enhanced Responsive */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Main Hero */}
            <div className="lg:col-span-3">
              <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-0">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 items-center">
                    <div>
                      <Badge className="bg-orange-500 text-white mb-3 lg:mb-4 text-xs lg:text-sm">
                        Featured Product
                      </Badge>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 text-balance leading-tight">
                        WATERMA WATCH BEATS STUDIO
                      </h1>
                      <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base leading-relaxed">
                        Experience premium sound quality with our latest wireless headphones featuring noise
                        cancellation technology.
                      </p>
                      <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
                        <span className="text-2xl lg:text-3xl font-bold text-orange-500">$30.52</span>
                        <span className="text-base lg:text-lg text-gray-500 line-through">$50.94</span>
                      </div>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 lg:px-8 h-10 lg:h-12 text-sm lg:text-base">
                        Shop Now
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    <div className="relative order-first md:order-last">
                      <img
                        src="/wireless-headphones-hero-image.png"
                        alt="WATERMA WATCH BEATS STUDIO"
                        className="w-full h-auto max-w-sm mx-auto"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side Cards - Stack on mobile */}
            <div className="space-y-4 lg:space-y-4">
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2 text-sm lg:text-base">Hot Product</h3>
                  <p className="text-xs lg:text-sm text-gray-600 mb-3">Asus AiO Desktops Intel Core i3</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-orange-500 text-sm lg:text-base">$30.52</span>
                    <span className="text-xs lg:text-sm text-gray-500 line-through">$50.94</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs lg:text-sm h-8 lg:h-9"
                  >
                    Shop Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 text-white">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2 text-sm lg:text-base">New Arrival</h3>
                  <p className="text-xs lg:text-sm text-gray-300 mb-3">Latest Gaming Laptop Collection</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black bg-transparent text-xs lg:text-sm h-8 lg:h-9"
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Enhanced Mobile Layout */}
      <section className="bg-white py-6 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="flex items-center gap-3 p-3 lg:p-0">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 lg:w-6 lg:h-6 text-orange-500" />
              </div>
              <div>
                <h4 className="font-semibold text-sm lg:text-base">Free Shipping</h4>
                <p className="text-xs lg:text-sm text-gray-600">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 lg:p-0">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-orange-500" />
              </div>
              <div>
                <h4 className="font-semibold text-sm lg:text-base">Secure Payment</h4>
                <p className="text-xs lg:text-sm text-gray-600">100% secure payment</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 lg:p-0">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Headphones className="w-5 h-5 lg:w-6 lg:h-6 text-orange-500" />
              </div>
              <div>
                <h4 className="font-semibold text-sm lg:text-base">24/7 Support</h4>
                <p className="text-xs lg:text-sm text-gray-600">Dedicated support</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 lg:p-0">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-5 h-5 lg:w-6 lg:h-6 text-orange-500" />
              </div>
              <div>
                <h4 className="font-semibold text-sm lg:text-base">Easy Returns</h4>
                <p className="text-xs lg:text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Partners Section */}
      <section className="bg-white py-8 lg:py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-2">Trusted by Leading Brands</h2>
            <p className="text-gray-600 text-sm lg:text-base">
              We partner with the world's most innovative technology companies
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-8 items-center">
            {[
              { name: "Apple", logo: "🍎" },
              { name: "Samsung", logo: "📱" },
              { name: "Sony", logo: "🎧" },
              { name: "LG", logo: "📺" },
              { name: "Canon", logo: "📷" },
              { name: "HP", logo: "💻" },
            ].map((brand, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 lg:p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="text-2xl lg:text-3xl mb-2">{brand.logo}</div>
                <span className="text-xs lg:text-sm font-medium text-gray-600">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50">
        {/* Featured Products - Enhanced Grid */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 lg:mb-8">
              <h2 className="text-xl lg:text-2xl font-bold">Hot Deal For This Week</h2>
              <Link href="/products">
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent text-sm lg:text-base h-9 lg:h-10"
                >
                  View All Products
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products Section */}
        <section className="py-8 lg:py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 lg:mb-8">
              <h2 className="text-xl lg:text-2xl font-bold">Trending Product</h2>
              <Link href="/products?sort=trending">
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent text-sm lg:text-base h-9 lg:h-10"
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
              {featuredProducts.slice(6, 12).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Weekly Featured Items Section */}
        <section className="py-8 lg:py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6 lg:mb-8">
              <Badge className="bg-orange-500 text-white mb-3 lg:mb-4">Weekly Special</Badge>
              <h2 className="text-xl lg:text-2xl font-bold mb-2">Weekly Featured Item</h2>
              <p className="text-gray-600 text-sm lg:text-base">Hand-picked products with exclusive discounts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {featuredProducts.slice(6, 12).map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={product.image_url || "/placeholder.svg?height=200&width=200"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {product.badge && (
                      <Badge className="absolute top-2 left-2 bg-orange-500 text-white text-xs">{product.badge}</Badge>
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-orange-500 text-orange-500" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">({product.review_count})</span>
                    </div>
                    <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-orange-500">${product.price}</span>
                      {product.original_price && (
                        <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
                      )}
                    </div>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm h-8">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recently Viewed Section */}
        <section className="py-8 lg:py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 lg:mb-8">
              <h2 className="text-xl lg:text-2xl font-bold">Recently Viewed</h2>
              <Button variant="ghost" className="text-orange-500 hover:text-orange-600 text-sm lg:text-base h-9 lg:h-10">
                Clear History
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
              {featuredProducts.slice(10, 16).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Special Offers Section */}
      <section className="py-8 lg:py-12 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4">
          <div className="text-center text-white mb-6 lg:mb-8">
            <Badge className="bg-white text-orange-500 mb-3 lg:mb-4">Limited Time</Badge>
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Deal of the Day</h2>
            <p className="text-orange-100 text-sm lg:text-base">Don't miss out on today's incredible offers</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 lg:p-6 text-white text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">50%</div>
                <div className="text-sm lg:text-base mb-2">OFF</div>
                <div className="text-xs lg:text-sm text-orange-100">On Gaming Laptops</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 lg:p-6 text-white text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">Free</div>
                <div className="text-sm lg:text-base mb-2">Shipping</div>
                <div className="text-xs lg:text-sm text-orange-100">Orders over $99</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 lg:p-6 text-white text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">24h</div>
                <div className="text-sm lg:text-base mb-2">Flash Sale</div>
                <div className="text-xs lg:text-sm text-orange-100">Ends Tomorrow</div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-6 lg:mt-8">
            <Button className="bg-white text-orange-500 hover:bg-gray-100 px-6 lg:px-8 h-10 lg:h-12">
              Shop All Deals
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-2">What Our Customers Say</h2>
            <p className="text-gray-600 text-sm lg:text-base">Over 10,000+ satisfied customers worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Tech Enthusiast",
                rating: 5,
                comment: "Amazing quality products and super fast delivery. The customer service is outstanding!",
              },
              {
                name: "Mike Chen",
                role: "Professional Photographer",
                rating: 5,
                comment: "Best prices I've found online. The camera equipment I ordered exceeded my expectations.",
              },
              {
                name: "Emily Davis",
                role: "Gaming Streamer",
                rating: 5,
                comment: "Perfect gaming setup from Radios. Everything works flawlessly and arrived quickly.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center mb-3 lg:mb-4">
                    <Quote className="w-5 h-5 text-orange-500 mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 lg:mb-4 text-sm lg:text-base leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <div className="font-semibold text-sm lg:text-base">{testimonial.name}</div>
                    <div className="text-xs lg:text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-8 lg:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-2">Why Choose Radios?</h2>
            <p className="text-gray-600 text-sm lg:text-base">Your trusted partner for all electronics needs</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 lg:p-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <Award className="w-6 h-6 lg:w-8 lg:h-8 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2 text-sm lg:text-base">Premium Quality</h3>
                <p className="text-gray-600 text-xs lg:text-sm">Only authentic products from authorized dealers</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 lg:p-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <Users className="w-6 h-6 lg:w-8 lg:h-8 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2 text-sm lg:text-base">Expert Support</h3>
                <p className="text-gray-600 text-xs lg:text-sm">Professional technical support team available 24/7</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 lg:p-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2 text-sm lg:text-base">Fast Delivery</h3>
                <p className="text-gray-600 text-xs lg:text-sm">Same-day shipping on orders placed before 2 PM</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 lg:p-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2 text-sm lg:text-base">Warranty Protection</h3>
                <p className="text-gray-600 text-xs lg:text-sm">Extended warranty options on all electronic products</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 lg:mb-8">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold mb-2">Latest from Our Blog</h2>
              <p className="text-gray-600 text-sm lg:text-base">Stay updated with the latest tech news and reviews</p>
            </div>
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
              >
                View All Posts
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              {
                title: "Best Gaming Laptops of 2024",
                excerpt: "Discover the top gaming laptops that deliver exceptional performance...",
                image: "/gaming-laptop-with-rgb-lighting.png",
                date: "Dec 15, 2024",
                category: "Reviews",
              },
              {
                title: "Smart Home Security Guide",
                excerpt: "Complete guide to setting up a comprehensive smart home security system...",
                image: "/smart-home-security-camera-system.png",
                date: "Dec 12, 2024",
                category: "Guides",
              },
              {
                title: "Wireless Audio Technology Trends",
                excerpt: "Exploring the latest innovations in wireless headphones and speakers...",
                image: "/wireless-headphones-and-earbuds-technology.png",
                date: "Dec 10, 2024",
                category: "Tech News",
              },
            ].map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-orange-500 text-white text-xs">{post.category}</Badge>
                </div>
                <CardContent className="p-4 lg:p-6">
                  <div className="text-xs lg:text-sm text-gray-500 mb-2">{post.date}</div>
                  <h3 className="font-bold mb-2 text-sm lg:text-base line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-xs lg:text-sm line-clamp-3 mb-3 lg:mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-600 p-0 h-auto">
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter - Enhanced Mobile */}
      <section className="bg-white py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
              We Are Ready To <span className="text-orange-500">Help</span>
            </h2>
            <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">
              For information Consult with our expert members
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your Email"
                className="flex-1 px-4 py-3 lg:py-2 border rounded-lg sm:rounded-l sm:rounded-r-none text-sm lg:text-base"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg sm:rounded-l-none h-12 lg:h-10 text-sm lg:text-base">
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
