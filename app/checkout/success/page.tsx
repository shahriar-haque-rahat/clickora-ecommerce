"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"

export default function CheckoutSuccessPage() {
  const orderNumber = Math.floor(Math.random() * 1000000) + 100000

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          {/* Order Details */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-semibold mb-2">Order Number</h3>
                  <p className="text-orange-500 font-mono text-lg">#{orderNumber}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Estimated Delivery</h3>
                  <p className="text-gray-600">5-7 business days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Confirmation Email</h3>
                <p className="text-sm text-gray-600">
                  A confirmation email with your order details has been sent to your email address.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Package className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Track Your Order</h3>
                <p className="text-sm text-gray-600">You'll receive tracking information once your order ships.</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Continue Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" className="bg-transparent">
                View Order History
              </Button>
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-12 p-6 bg-white rounded-lg border">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              If you have any questions about your order, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <span>📧 support@clickora.com</span>
              <span>📞 1-800-RADIOS-1</span>
              <span>💬 Live Chat Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Stay Updated with <span className="text-orange-500">Clickora</span>
            </h2>
            <p className="text-gray-600 mb-6">Get the latest deals and product updates delivered to your inbox</p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input type="email" placeholder="Enter your Email" className="flex-1 px-4 py-2 border rounded-l" />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-l-none">SUBSCRIBE</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
