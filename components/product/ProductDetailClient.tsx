"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Share2, Plus, Minus, Facebook, Twitter, Instagram } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Footer from "@/components/footer"

interface Product {
  id: number
  name: string
  description: string
  price: number
  original_price?: number
  image_url: string
  images: string[]
  rating: number
  review_count: number
  category: string
  brand: string
  tags: string[]
  in_stock: boolean
  variants?: {
    colors?: string[]
    sizes?: string[]
  }
}

export default function ProductDetailClient({ product, relatedProducts }: { product: Product | undefined, relatedProducts: Product[] }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (product) {
      setSelectedColor(product.variants?.colors?.[0] || "");
      setSelectedSize(product.variants?.sizes?.[0] || "");
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      },
    });

    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-xl lg:text-2xl font-bold mb-4">Product Not Found</h1>
            <Link href="/products">
              <Button className="bg-orange-500 hover:bg-orange-600 text-sm lg:text-base h-10 lg:h-11">
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <nav className="text-xs lg:text-sm text-gray-600 mb-4 lg:mb-6">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-orange-500">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-orange-500">Single</span>
        </nav>

        <div className="bg-white rounded-lg p-4 lg:p-6 mb-6 lg:mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-3 lg:space-y-4">
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage] || product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 lg:w-20 lg:h-20 rounded border-2 overflow-hidden flex-shrink-0 ${selectedImage === index ? "border-orange-500" : "border-gray-200"}`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 lg:space-y-6">
              <div>
                <h1 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-3 leading-tight">{product.name}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 lg:mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs lg:text-sm text-gray-600">({product.review_count} Customer reviews)</span>
                </div>
                <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
                  <span className="text-xl lg:text-2xl font-bold text-orange-500">${product.price.toFixed(2)}</span>
                  {product.original_price && (
                    <span className="text-base lg:text-lg text-gray-500 line-through">
                      ${product.original_price.toFixed(2)}
                    </span>
                  )}
                  {discount > 0 && <Badge className="bg-red-500 text-xs">-{discount}%</Badge>}
                </div>
                <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-3 lg:space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Model:</label>
                  <div className="flex flex-wrap gap-2">
                    {["11TH", "12TH", "13TH", "14TH", "15TH"].map((model) => (
                      <Button
                        key={model}
                        variant={selectedSize === model ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(model)}
                        className={`h-8 lg:h-9 px-3 lg:px-4 text-xs lg:text-sm ${selectedSize === model ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                      >
                        {model}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Categories:</label>
                  <span className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                    {product.category}, {product.brand}, {product.tags.join(", ")}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags:</label>
                  <span className="text-xs lg:text-sm text-gray-600">{product.tags.join(", ")}</span>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Share:</label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 lg:h-9 w-8 lg:w-9 p-0 bg-transparent">
                      <Facebook className="w-3 h-3 lg:w-4 lg:h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 lg:h-9 w-8 lg:w-9 p-0 bg-transparent">
                      <Twitter className="w-3 h-3 lg:w-4 lg:h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 lg:h-9 w-8 lg:w-9 p-0 bg-transparent">
                      <Share2 className="w-3 h-3 lg:w-4 lg:h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 lg:h-9 w-8 lg:w-9 p-0 bg-transparent">
                      <Instagram className="w-3 h-3 lg:w-4 lg:h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4 pt-2">
                <div className="flex items-center border rounded overflow-hidden w-fit">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 h-10 lg:h-11"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 border-x min-w-[60px] text-center h-10 lg:h-11 flex items-center justify-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 h-10 lg:h-11"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 lg:px-8 h-10 lg:h-11 text-sm lg:text-base flex-1 sm:flex-initial"
                >
                  SHOP NOW
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 lg:p-6 mb-6 lg:mb-8">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="details" className="text-xs lg:text-sm py-2 lg:py-3">
                PRODUCT DETAILS
              </TabsTrigger>
              <TabsTrigger value="additional" className="text-xs lg:text-sm py-2 lg:py-3">
                ADDITIONAL INFO
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-xs lg:text-sm py-2 lg:py-3">
                REVIEW (09)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4 lg:mt-6">
              <div className="prose max-w-none text-sm lg:text-base">
                <p className="leading-relaxed">
                  Travelling salesman and above it there hung a picture that he had recently cut out of an illustrated
                  magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa
                  who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer.
                </p>
                <p className="mt-4 leading-relaxed">
                  Gregor then turned to look out the window at the dull weather. Drops of rain could be heard hitting
                  the pane, which made him feel quite sad. "How about if I sleep a little bit longer and forget all this
                  nonsense", he thought, but that was something he was unable to do because he was used to sleeping on
                  his right side, and in his present state couldn't get into that position.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="additional" className="mt-4 lg:mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-sm lg:text-base">Specifications</h4>
                  <ul className="space-y-1 text-xs lg:text-sm text-gray-600">
                    <li>Brand: {product.brand}</li>
                    <li>Category: {product.category}</li>
                    <li>Model: Tab P11 Plus</li>
                    <li>Display: 11" IPS LCD</li>
                    <li>Storage: 64GB/128GB</li>
                    <li>RAM: 4GB/6GB</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm lg:text-base">Features</h4>
                  <ul className="space-y-1 text-xs lg:text-sm text-gray-600">
                    <li>Android 11</li>
                    <li>MediaTek Helio G90T</li>
                    <li>8MP rear camera</li>
                    <li>5MP front camera</li>
                    <li>7700mAh battery</li>
                    <li>Wi-Fi 802.11ac</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4 lg:mt-6">
              <div className="space-y-4 lg:space-y-6">
                <div className="border-b pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">John Doe</span>
                      <span className="text-gray-500">- 2 days ago</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                    Great tablet for the price! The display is crisp and the performance is smooth for everyday tasks.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">Jane Smith</span>
                      <span className="text-gray-500">- 1 week ago</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                    Good build quality and battery life. Would recommend for students and casual users.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="bg-white rounded-lg p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6">Related Product</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>

      <section className="bg-white py-8 lg:py-12 mt-8 lg:mt-12">
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
  );
}