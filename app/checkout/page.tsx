"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Truck, Shield, MapPin, Phone, Mail, User } from "lucide-react"
import Link from "next/link"

interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface PaymentInfo {
  method: "card" | "paypal" | "apple_pay"
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
}

export default function CheckoutPage() {
  const { state: cartState, dispatch: cartDispatch } = useCart()
  const { state: authState } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const [shippingMethod, setShippingMethod] = useState("standard")
  const [sameAsBilling, setSameAsBilling] = useState(true)

  const subtotal = cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shippingMethod === "express" ? 15.99 : shippingMethod === "overnight" ? 25.99 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shippingCost + tax

  useEffect(() => {
    if (cartState.items.length === 0) {
      router.push("/cart")
      return
    }

    // Pre-fill user info if authenticated
    if (authState.user) {
      setShippingInfo((prev) => ({
        ...prev,
        firstName: authState.user?.first_name || "",
        lastName: authState.user?.last_name || "",
        email: authState.user?.email || "",
        phone: authState.user?.phone || "",
      }))
    }
  }, [cartState.items.length, authState.user, router])

  const handleShippingChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      const required = ["firstName", "lastName", "email", "address", "city", "state", "zipCode"]
      return required.every((field) => shippingInfo[field as keyof ShippingInfo].trim() !== "")
    }
    if (step === 2) {
      if (paymentInfo.method === "card") {
        return (
          paymentInfo.cardNumber.length >= 16 &&
          paymentInfo.expiryDate.length >= 5 &&
          paymentInfo.cvv.length >= 3 &&
          paymentInfo.cardName.trim() !== ""
        )
      }
      return true
    }
    return true
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    } else {
      toast({
        title: "Please fill in all required fields",
        description: "Make sure all required information is provided before continuing.",
        variant: "destructive",
      })
    }
  }

  const handlePlaceOrder = async () => {
    if (!validateStep(2)) {
      toast({
        title: "Please complete payment information",
        description: "Make sure all payment details are provided.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    cartDispatch({ type: "CLEAR_CART" })

    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    })

    router.push("/checkout/success")
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
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
          <Link href="/cart" className="hover:text-orange-500">
            Cart
          </Link>
          <span className="mx-2">/</span>
          <span className="text-orange-500">Checkout</span>
        </nav>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                <span className={`ml-2 text-sm ${currentStep >= step ? "text-orange-500" : "text-gray-600"}`}>
                  {step === 1 ? "Shipping" : step === 2 ? "Payment" : "Review"}
                </span>
                {step < 3 && <div className="w-16 h-px bg-gray-300 ml-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="firstName"
                          value={shippingInfo.firstName}
                          onChange={(e) => handleShippingChange("firstName", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="lastName"
                          value={shippingInfo.lastName}
                          onChange={(e) => handleShippingChange("lastName", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => handleShippingChange("email", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={shippingInfo.phone}
                          onChange={(e) => handleShippingChange("phone", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => handleShippingChange("address", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleShippingChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) => handleShippingChange("state", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => handleShippingChange("zipCode", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="space-y-4 pt-4 border-t">
                    <Label>Shipping Method</Label>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                          <div className="flex justify-between">
                            <span>Standard Shipping (5-7 business days)</span>
                            <span className="font-medium">$5.99</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="flex justify-between">
                            <span>Express Shipping (2-3 business days)</span>
                            <span className="font-medium">$15.99</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="overnight" id="overnight" />
                        <Label htmlFor="overnight" className="flex-1 cursor-pointer">
                          <div className="flex justify-between">
                            <span>Overnight Shipping (1 business day)</span>
                            <span className="font-medium">$25.99</span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleNextStep} className="bg-orange-500 hover:bg-orange-600">
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    <Label>Payment Method</Label>
                    <RadioGroup
                      value={paymentInfo.method}
                      onValueChange={(value) => handlePaymentChange("method", value)}
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-600 rounded"></div>
                          PayPal
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="apple_pay" id="apple_pay" />
                        <Label htmlFor="apple_pay" className="flex-1 cursor-pointer flex items-center gap-2">
                          <div className="w-4 h-4 bg-black rounded"></div>
                          Apple Pay
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Credit Card Form */}
                  {paymentInfo.method === "card" && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name *</Label>
                        <Input
                          id="cardName"
                          value={paymentInfo.cardName}
                          onChange={(e) => handlePaymentChange("cardName", e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => handlePaymentChange("cardNumber", formatCardNumber(e.target.value))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => handlePaymentChange("expiryDate", formatExpiryDate(e.target.value))}
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            value={paymentInfo.cvv}
                            onChange={(e) => handlePaymentChange("cvv", e.target.value.replace(/\D/g, ""))}
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Billing Address */}
                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sameAsBilling"
                        checked={sameAsBilling}
                        onCheckedChange={(checked) => setSameAsBilling(checked as boolean)}
                      />
                      <Label htmlFor="sameAsBilling">Billing address same as shipping address</Label>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="bg-transparent">
                      Back to Shipping
                    </Button>
                    <Button onClick={handleNextStep} className="bg-orange-500 hover:bg-orange-600">
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Review Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Shipping Info Review */}
                  <div>
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      <p>
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </p>
                      <p>{shippingInfo.address}</p>
                      <p>
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                      </p>
                      <p>{shippingInfo.email}</p>
                      {shippingInfo.phone && <p>{shippingInfo.phone}</p>}
                    </div>
                  </div>

                  {/* Payment Info Review */}
                  <div>
                    <h4 className="font-medium mb-2">Payment Method</h4>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {paymentInfo.method === "card" && <p>Credit Card ending in {paymentInfo.cardNumber.slice(-4)}</p>}
                      {paymentInfo.method === "paypal" && <p>PayPal</p>}
                      {paymentInfo.method === "apple_pay" && <p>Apple Pay</p>}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium mb-2">Order Items</h4>
                    <div className="space-y-3">
                      {cartState.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                          <div className="w-16 h-16 bg-white rounded overflow-hidden">
                            <img
                              src={item.image_url || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">{item.name}</h5>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="bg-transparent">
                      Back to Payment
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cartState.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="flex-1 truncate">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-orange-500">${total.toFixed(2)}</span>
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-2 text-sm text-gray-600 pt-4">
                  <Shield className="w-4 h-4" />
                  <span>Secure SSL encrypted checkout</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
