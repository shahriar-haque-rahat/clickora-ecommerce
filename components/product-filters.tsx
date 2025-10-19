"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight } from "lucide-react"

interface Filters {
  category: string[]
  brand: string[]
  priceRange: [number, number]
  colors: string[]
  tags: string[]
}

interface ProductFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    color: true,
    category: true,
    brands: true,
    tags: true,
  })

  const categories = [
    "Laptops & Computers",
    "CC TV & Cameras",
    "Home Equipment",
    "TV & Audio",
    "Phones & PCs",
    "Gaming & Fun",
    "Audio Equipment",
    "Accessories",
  ]

  const brands = [
    "Apple",
    "Samsung",
    "Sony",
    "ASUS",
    "Acer",
    "Lenovo",
    "Amazon",
    "Seagate",
    "Aroma",
    "DEWALT",
    "Skullcandy",
  ]

  const colors = [
    { name: "White", value: "white", color: "#ffffff" },
    { name: "Black", value: "black", color: "#000000" },
    { name: "Blue", value: "blue", color: "#3b82f6" },
    { name: "Red", value: "red", color: "#ef4444" },
    { name: "Green", value: "green", color: "#10b981" },
    { name: "Orange", value: "orange", color: "#f97316" },
    { name: "Purple", value: "purple", color: "#8b5cf6" },
    { name: "Pink", value: "pink", color: "#ec4899" },
  ]

  const tags = ["wireless", "audio", "premium", "smartphone", "5g", "storage", "portable", "tablet", "laptop", "gaming"]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const updateFilters = (key: keyof Filters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const toggleArrayFilter = (key: keyof Filters, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilters(key, newArray)
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </CardContent>
      </Card>

      {/* Price Filtering */}
      <Card>
        <CardHeader>
          <CardTitle
            className="text-lg flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("price")}
          >
            Price Filtering
            {expandedSections.price ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </CardTitle>
        </CardHeader>
        {expandedSections.price && (
          <CardContent>
            <div className="space-y-4">
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilters("priceRange", value as [number, number])}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>
                  Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </span>
                <Button size="sm" variant="outline">
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Color */}
      <Card>
        <CardHeader>
          <CardTitle
            className="text-lg flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("color")}
          >
            Color
            {expandedSections.color ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </CardTitle>
        </CardHeader>
        {expandedSections.color && (
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => toggleArrayFilter("colors", color.value)}
                  className={`w-8 h-8 rounded border-2 ${
                    filters.colors.includes(color.value) ? "border-orange-500" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                />
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Category */}
      <Card>
        <CardHeader>
          <CardTitle
            className="text-lg flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("category")}
          >
            Category
            {expandedSections.category ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </CardTitle>
        </CardHeader>
        {expandedSections.category && (
          <CardContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.category.includes(category)}
                    onCheckedChange={() => toggleArrayFilter("category", category)}
                  />
                  <label htmlFor={category} className="text-sm cursor-pointer">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle
            className="text-lg flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("brands")}
          >
            Brands
            {expandedSections.brands ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </CardTitle>
        </CardHeader>
        {expandedSections.brands && (
          <CardContent>
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={filters.brand.includes(brand)}
                    onCheckedChange={() => toggleArrayFilter("brand", brand)}
                  />
                  <label htmlFor={brand} className="text-sm cursor-pointer">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle
            className="text-lg flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("tags")}
          >
            Tags
            {expandedSections.tags ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </CardTitle>
        </CardHeader>
        {expandedSections.tags && (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={filters.tags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    filters.tags.includes(tag) ? "bg-orange-500 hover:bg-orange-600" : "hover:bg-orange-50"
                  }`}
                  onClick={() => toggleArrayFilter("tags", tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Featured Collection */}
      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-4">
          <Badge className="bg-orange-500 text-white mb-2">Featured</Badge>
          <h3 className="font-bold mb-2">2021 Laptop Collection</h3>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            Buy Now
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
