import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { blogPosts, relatedPosts } from "@/type/blog.data"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="relative h-96">
              <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black opacity-30" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <Badge className="bg-orange-500 text-white mb-4">{post.category}</Badge>
                <h1 className="text-4xl font-bold mb-4 text-balance">{post.title}</h1>
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="mr-4">{post.publishedAt}</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="mb-8">
                <CardContent className="p-8">
                  {/* Article Content */}
                  <div className="prose prose-lg max-w-none">
                    {post.content.split("\n\n").map((paragraph, index) => {
                      if (paragraph.startsWith("## ")) {
                        return (
                          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            {paragraph.replace("## ", "")}
                          </h2>
                        )
                      }
                      if (paragraph.startsWith("### ")) {
                        return (
                          <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                            {paragraph.replace("### ", "")}
                          </h3>
                        )
                      }
                      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                        return (
                          <p key={index} className="font-semibold text-gray-900 mb-4">
                            {paragraph.replace(/\*\*/g, "")}
                          </p>
                        )
                      }
                      if (paragraph.startsWith("- ")) {
                        const listItems = paragraph.split("\n").filter((item) => item.startsWith("- "))
                        return (
                          <ul key={index} className="list-disc list-inside mb-4 space-y-2">
                            {listItems.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-gray-700">
                                {item.replace("- ", "")}
                              </li>
                            ))}
                          </ul>
                        )
                      }
                      return (
                        <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      )
                    })}
                  </div>

                  <Separator className="my-8" />

                  {/* Tags */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">Share this article:</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="hover:bg-blue-50 bg-transparent">
                        <Facebook className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="hover:bg-blue-50 bg-transparent">
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="hover:bg-blue-50 bg-transparent">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="hover:bg-gray-50 bg-transparent">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Author Bio */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">About {post.author}</h3>
                      <p className="text-gray-600 mb-3">
                        {post.author} is a technology writer and reviewer with over 5 years of experience covering the
                        latest trends in consumer electronics and gaming hardware.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Follow
                        </Button>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Table of Contents */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Table of Contents</h3>
                  <nav className="space-y-2 text-sm">
                    <a href="#introduction" className="block text-gray-600 hover:text-orange-600">
                      Introduction
                    </a>
                    <a href="#key-features" className="block text-gray-600 hover:text-orange-600">
                      Key Features
                    </a>
                    <a href="#top-picks" className="block text-gray-600 hover:text-orange-600">
                      Top Picks
                    </a>
                    <a href="#conclusion" className="block text-gray-600 hover:text-orange-600">
                      Conclusion
                    </a>
                  </nav>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-orange-900 mb-3">Stay Updated</h3>
                  <p className="text-sm text-orange-800 mb-4">Get the latest tech articles delivered to your inbox.</p>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Subscribe Now</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedPost.title}</h3>
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}