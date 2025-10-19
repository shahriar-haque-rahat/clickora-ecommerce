"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Footer from "@/components/footer"

export default function CartPage() {
  const { state, dispatch } = useCart()
  const { toast } = useToast()

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_ITEM", payload: id })
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      })
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
    }
  }

  const removeItem = (id: number, name: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4 sm:mb-6">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-orange-500">Shopping Cart</span>
        </nav>

        {state.items.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <ShoppingBag className="w-16 h-16 sm:w-24 sm:h-24 text-gray-300 mx-auto mb-4 sm:mb-6" />
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/products">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2 text-sm sm:text-base">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart ({state.items.length} items)</h1>
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image_url || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-2 text-base sm:text-lg">{item.name}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <span className="font-bold text-orange-500 text-base sm:text-lg">${item.price.toFixed(2)}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id, item.name)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-2 sm:mt-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-3 mt-3 flex-wrap">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-12 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <span className="ml-auto font-semibold text-sm sm:text-base">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Subtotal ({state.items.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Shipping:</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping === 0 && subtotal > 50 && (
                      <p className="text-xs sm:text-sm text-green-600">🎉 You qualify for free shipping!</p>
                    )}
                    {shipping > 0 && (
                      <p className="text-xs sm:text-sm text-gray-500">Add ${(50 - subtotal).toFixed(2)} more for free shipping</p>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold text-base sm:text-lg">
                        <span>Total:</span>
                        <span className="text-orange-500">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-6 space-y-3">
                    <Link href="/checkout" className="block">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base">
                        Proceed to Checkout
                      </Button>
                    </Link>
                    <Link href="/products" className="block">
                      <Button variant="outline" className="w-full bg-transparent text-sm sm:text-base">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <section className="bg-white py-8 sm:py-12 mt-8 sm:mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg sm:max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              We Are Ready To <span className="text-orange-500">Help</span>
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">For information Consult with our expert members</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input type="email" placeholder="Enter your Email" className="flex-1 px-4 py-2 border rounded-l sm:rounded-l-lg text-sm sm:text-base" />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-l-none text-sm sm:text-base">SUBSCRIBE</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}