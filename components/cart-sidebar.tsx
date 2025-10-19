"use client"

import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function CartSidebar() {
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

  if (!state.isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/10 z-40 transition-opacity"
        onClick={() => dispatch({ type: "TOGGLE_CART" })}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Shopping Cart
              {state.items.length > 0 && (
                <Badge className="bg-orange-500">{state.items.reduce((sum, item) => sum + item.quantity, 0)}</Badge>
              )}
            </h2>
            <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "TOGGLE_CART" })}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some products to get started</p>
                <Button onClick={() => dispatch({ type: "TOGGLE_CART" })} className="bg-orange-500 hover:bg-orange-600">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">{item.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-orange-500">${item.price.toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id, item.name)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping === 0 && subtotal > 50 && (
                  <p className="text-xs text-green-600">🎉 You qualify for free shipping!</p>
                )}
                {shipping > 0 && (
                  <p className="text-xs text-gray-500">Add ${(50 - subtotal).toFixed(2)} more for free shipping</p>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span className="text-orange-500">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link href="/cart" className="block">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => dispatch({ type: "TOGGLE_CART" })}
                  >
                    View Cart
                  </Button>
                </Link>
                <Link href="/checkout" className="block">
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => dispatch({ type: "TOGGLE_CART" })}
                  >
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
