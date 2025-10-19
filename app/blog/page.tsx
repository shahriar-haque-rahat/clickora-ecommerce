import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { blogPosts, categories, recentPosts } from "@/type/blog.data"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Electronics Blog</h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay updated with the latest tech news, product reviews, and buying guides
            </p>
            <div className="flex max-w-md mx-auto">
              <Input placeholder="Search articles..." className="rounded-r-none" />
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-l-none">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <Image
                      src={blogPosts[0].featuredImage || "/placeholder.svg"}
                      alt={blogPosts[0].title}
                      width={400}
                      height={300}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <Badge className="bg-orange-100 text-orange-800 mb-3">{blogPosts[0].category}</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{blogPosts[0].title}</h3>
                    <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <User className="w-4 h-4 mr-1" />
                      <span className="mr-4">{blogPosts[0].author}</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="mr-4">{blogPosts[0].publishedAt}</span>
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                    <Link href={`/blog/${blogPosts[0].slug}`}>
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>

            {/* Blog Posts Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.slice(1).map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Image
                        src={post.featuredImage || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-orange-100 text-orange-800">{post.category}</Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <User className="w-4 h-4 mr-1" />
                        <span className="mr-4">{post.author}</span>
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="mr-4">{post.publishedAt}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button
                          variant="outline"
                          className="w-full hover:bg-orange-50 hover:border-orange-500 bg-transparent"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Categories</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="flex justify-between items-center py-2 hover:bg-gray-50 px-2 rounded cursor-pointer"
                  >
                    <span className="text-gray-700">{category.name}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Recent Posts</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.slug} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <Link href={`/blog/${post.slug}`} className="block hover:text-orange-600">
                      <h4 className="font-medium text-sm mb-1 line-clamp-2">{post.title}</h4>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <h3 className="text-lg font-semibold text-orange-900">Stay Updated</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-800 mb-4">
                  Get the latest tech news and reviews delivered to your inbox.
                </p>
                <div className="space-y-2">
                  <Input placeholder="Your email address" className="bg-white" />
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}