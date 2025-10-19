"use client"

import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  original_price?: number
  image_url: string
  rating: number
  review_count: number
  category: string
}

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const { dispatch } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      },
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  if (viewMode === "list") {
    return (
      <Card className="group hover:shadow-lg transition-shadow">
        <CardContent className="p-3 lg:p-4">
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <div className="relative flex-shrink-0 mx-auto sm:mx-0">
              {discount > 0 && (
                <div className="absolute top-2 left-2 z-10">
                  <Badge className="bg-orange-500 text-white text-xs">-{discount}%</Badge>
                </div>
              )}
              <Link href={`/products/${product.id}`}>
                <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-xs lg:text-sm text-gray-500">({product.review_count})</span>
              </div>

              <Link href={`/products/${product.id}`}>
                <h3 className="font-medium text-sm lg:text-base hover:text-orange-500 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-bold text-orange-500 text-sm lg:text-base">${product.price}</span>
                {product.original_price && (
                  <span className="text-xs lg:text-sm text-gray-500 line-through">${product.original_price}</span>
                )}
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
                <Button
                  onClick={handleAddToCart}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs lg:text-sm h-8 lg:h-9 px-3 lg:px-4"
                  size="sm"
                >
                  <ShoppingCart className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  Add to Cart
                </Button>
                <Button variant="ghost" size="sm" className="h-8 lg:h-9 px-2">
                  <Heart className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow relative">
      {discount > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-orange-500 text-white text-xs">-{discount}%</Badge>
        </div>
      )}
      <div className="absolute top-2 right-2 z-10">
        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0">
          <Heart className="w-3 h-3 lg:w-4 lg:h-4" />
        </Button>
      </div>

      <CardContent className="p-3 lg:p-4">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square mb-3 lg:mb-4 bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-xs text-gray-500">({product.review_count})</span>
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="font-medium text-xs lg:text-sm hover:text-orange-500 line-clamp-2 text-center leading-tight min-h-[2.5rem] lg:min-h-[3rem]">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center justify-center gap-2">
            <span className="font-bold text-orange-500 text-sm lg:text-base">${product.price}</span>
            {product.original_price && (
              <span className="text-xs lg:text-sm text-gray-500 line-through">${product.original_price}</span>
            )}
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs lg:text-sm h-8 lg:h-9"
            size="sm"
          >
            <ShoppingCart className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
