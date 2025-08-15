import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogPost } from "@shared/schema";

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params?.id;

  const { data: blogPost, isLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${blogId}`],
    enabled: !!blogId,
  });

  const { data: relatedPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-emerald-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading article...</div>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-emerald-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const related = relatedPosts
    .filter(post => post.id !== blogPost.id && post.category === blogPost.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 bg-gradient-to-br from-teal-50 to-emerald-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/blog">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative">
            <img
              src={blogPost.imageUrl}
              alt={blogPost.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <Badge className="mb-4 bg-teal-600 text-white">
                {blogPost.category}
              </Badge>
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {blogPost.title}
              </h1>
              <div className="flex items-center text-white/90 space-x-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(blogPost.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 mb-6 font-light leading-relaxed">
                  {blogPost.excerpt}
                </p>
                
                <Separator className="my-8" />
                
                <div className="text-gray-700 leading-relaxed space-y-6">
                  {blogPost.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="mt-12 p-6 bg-gradient-to-r from-teal-50 to-green-50 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Ready to Experience Bhutan?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Let our experts help you plan your perfect journey to the Last Shangri-La.
                  </p>
                  <div className="flex gap-3">
                    <Link to="/tours">
                      <Button className="bg-gradient-to-r from-teal-600 to-green-600 text-white">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Packages
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline">
                        Get Custom Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={blogPost.authorImage}
                  alt={blogPost.author}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{blogPost.author}</h3>
                  <p className="text-sm text-gray-600">Travel Expert</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Passionate about sharing the authentic beauty and culture of Bhutan with travelers from around the world.
              </p>
            </Card>

            {/* Share */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Share2 className="w-4 h-4 mr-2" />
                Share This Article
              </h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Facebook
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Twitter
                </Button>
                <Button size="sm" variant="outline">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Related Articles */}
            {related.length > 0 && (
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {related.map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`}>
                      <div className="group cursor-pointer">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-32 object-cover rounded-lg mb-2 group-hover:opacity-90 transition-opacity"
                        />
                        <h4 className="font-semibold text-sm text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}