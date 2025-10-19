"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, ChevronLeft, ChevronRight, Filter } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  original_price?: number
  image_url: string
  rating: number
  review_count: number
  category: string
  brand: string
  tags: string[]
}

interface Filters {
  category: string[]
  brand: string[]
  priceRange: [number, number]
  colors: string[]
  tags: string[]
}

export default function ProductsClient({ initialProducts, categoryMapping }: { initialProducts: Product[], categoryMapping: { [key: string]: string } }) {
  const searchParams = useSearchParams();
  const [products] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    category: [],
    brand: [],
    priceRange: [0, 100],
    colors: [],
    tags: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  const productsPerPage = 12;

  const urlParams = useMemo(
    () => ({
      category: searchParams.get("category"),
      search: searchParams.get("search"),
    }),
    [searchParams]
  );

  useEffect(() => {
    const { category: categoryParam, search: searchParam } = urlParams;

    if (categoryParam && categoryMapping[categoryParam]) {
      const mappedCategory = categoryMapping[categoryParam];
      setFilters((prev) => {
        if (!prev.category.includes(mappedCategory)) {
          return { ...prev, category: [mappedCategory] };
        }
        return prev;
      });
    }

    if (searchParam) {
      console.log("[v0] Search parameter:", searchParam);
    }
  }, [urlParams, categoryMapping]);

  const processedProducts = useMemo(() => {
    let filtered = [...products];

    if (filters.category.length > 0) {
      filtered = filtered.filter((product) => filters.category.includes(product.category));
    }

    if (filters.brand.length > 0) {
      filtered = filtered.filter((product) => filters.brand.includes(product.brand));
    }

    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return filtered;
  }, [filters, sortBy, products]);

  useEffect(() => {
    setFilteredProducts(processedProducts);
    setCurrentPage(1);
  }, [processedProducts]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <nav className="text-xs lg:text-sm text-gray-600 mb-4 lg:mb-6">
          <span>Home</span> <span className="mx-2">/</span> <span className="text-orange-500">Shop</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="lg:col-span-1">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full justify-center gap-2 h-10"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <ProductFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white p-3 lg:p-4 rounded-lg mb-4 lg:mb-6">
              <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row lg:justify-between lg:items-center">
                <div className="order-2 lg:order-1">
                  <span className="text-xs lg:text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of{" "}
                    {filteredProducts.length} results
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4 order-1 lg:order-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-48 h-9 lg:h-10 text-sm lg:text-base">
                      <SelectValue placeholder="Default sorting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default sorting</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={`rounded-r-none h-9 lg:h-10 px-3 lg:px-4 ${viewMode === "grid" ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={`rounded-l-none h-9 lg:h-10 px-3 lg:px-4 ${viewMode === "list" ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-3 lg:p-4 animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded mb-3 lg:mb-4"></div>
                    <div className="h-3 lg:h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 lg:h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6"
                    : "space-y-3 lg:space-y-4"
                }
              >
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1 lg:gap-2 mt-6 lg:mt-8 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="h-8 lg:h-9 px-2 lg:px-3"
                >
                  <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>

                <div className="flex items-center gap-1 lg:gap-2">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    const showOnMobile =
                      page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1);
                    const showOnDesktop =
                      page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2);

                    if (showOnMobile) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`h-8 lg:h-9 px-2 lg:px-3 text-xs lg:text-sm min-w-[32px] lg:min-w-[36px] ${currentPage === page ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                        >
                          {page}
                        </Button>
                      );
                    } else if ((page === currentPage - 2 || page === currentPage + 2) && showOnDesktop) {
                      return (
                        <span key={page} className="text-gray-400 px-1 hidden lg:inline">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 lg:h-9 px-2 lg:px-3"
                >
                  <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>
              </div>
            )}
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