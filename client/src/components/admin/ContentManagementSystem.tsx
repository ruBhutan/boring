import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import {
  FileText,
  Image as ImageIcon,
  Video,
  Calendar as CalendarIcon,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Upload,
  Download,
  Settings,
  Globe,
  Smartphone,
  Tablet,
  Monitor,
  Save,
  Copy,
  RefreshCw
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  status: 'draft' | 'published' | 'scheduled';
  category: string;
  tags: string[];
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  readingTime: number;
  views: number;
}

interface WebsitePage {
  id: string;
  title: string;
  slug: string;
  content: string;
  template: string;
  status: 'active' | 'inactive';
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  lastModified: string;
  modifiedBy: string;
}

interface MediaAsset {
  id: string;
  filename: string;
  originalName: string;
  type: 'image' | 'video' | 'document';
  size: number;
  mimeType: string;
  url: string;
  alt: string;
  description: string;
  uploadDate: string;
  uploadedBy: string;
  usageCount: number;
  tags: string[];
}

interface SEOSettings {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string;
  ogImage: string;
  twitterCard: string;
  favicon: string;
  robotsTxt: string;
  sitemapUrl: string;
}

const ContentManagementSystem: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [websitePages, setWebsitePages] = useState<WebsitePage[]>([]);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [seoSettings, setSeoSettings] = useState<SEOSettings | null>(null);
  
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('blog');
  
  // Search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Form states
  const [blogFormData, setBlogFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: 'Admin',
    status: 'draft',
    category: '',
    tags: [],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    publishDate: new Date().toISOString()
  });

  const [pageFormData, setPageFormData] = useState<Partial<WebsitePage>>({
    title: '',
    slug: '',
    content: '',
    template: 'default',
    status: 'active',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API calls
      const mockBlogPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Discovering the Hidden Gems of Bhutan',
          slug: 'discovering-hidden-gems-bhutan',
          excerpt: 'Explore the lesser-known treasures of the Last Shangri-La, from remote monasteries to pristine valleys.',
          content: '<p>Bhutan, the Land of the Thunder Dragon, holds countless secrets waiting to be discovered...</p>',
          featuredImage: '/blog/bhutan-hidden-gems.jpg',
          author: 'Travel Writer',
          status: 'published',
          category: 'Travel Tips',
          tags: ['Adventure', 'Culture', 'Hidden Gems'],
          publishDate: '2024-01-15T10:00:00Z',
          createdAt: '2024-01-10T14:30:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
          seoTitle: 'Hidden Gems of Bhutan - Discover Secret Places',
          seoDescription: 'Uncover the secret treasures of Bhutan with our comprehensive guide to hidden gems and off-the-beaten-path destinations.',
          seoKeywords: 'Bhutan hidden gems, secret places Bhutan, off-the-beaten-path',
          readingTime: 8,
          views: 1250
        },
        {
          id: '2',
          title: 'Best Time to Visit Bhutan: A Seasonal Guide',
          slug: 'best-time-visit-bhutan-seasonal-guide',
          excerpt: 'Plan your perfect Bhutan trip with our comprehensive seasonal guide covering weather, festivals, and activities.',
          content: '<p>Choosing the right time to visit Bhutan can make or break your travel experience...</p>',
          featuredImage: '/blog/bhutan-seasons.jpg',
          author: 'Travel Expert',
          status: 'published',
          category: 'Travel Planning',
          tags: ['Planning', 'Weather', 'Festivals'],
          publishDate: '2024-01-20T09:00:00Z',
          createdAt: '2024-01-18T11:15:00Z',
          updatedAt: '2024-01-20T09:00:00Z',
          seoTitle: 'Best Time to Visit Bhutan - Complete Seasonal Guide',
          seoDescription: 'Discover the best time to visit Bhutan with our detailed seasonal guide covering weather, festivals, and activities.',
          seoKeywords: 'best time visit Bhutan, Bhutan weather, Bhutan seasons',
          readingTime: 12,
          views: 2100
        }
      ];

      const mockWebsitePages: WebsitePage[] = [
        {
          id: '1',
          title: 'About Bhutan Mind Break',
          slug: 'about',
          content: '<h1>About Us</h1><p>Welcome to Bhutan Mind Break, your premier destination for authentic Bhutan experiences...</p>',
          template: 'about',
          status: 'active',
          seoTitle: 'About Bhutan Mind Break - Your Bhutan Travel Experts',
          seoDescription: 'Learn about Bhutan Mind Break, the leading tour company specializing in authentic Bhutan travel experiences.',
          seoKeywords: 'about Bhutan Mind Break, Bhutan tour company, authentic travel',
          lastModified: '2024-01-15T16:30:00Z',
          modifiedBy: 'Admin'
        },
        {
          id: '2',
          title: 'Contact Us',
          slug: 'contact',
          content: '<h1>Contact Us</h1><p>Get in touch with our travel experts to plan your perfect Bhutan adventure...</p>',
          template: 'contact',
          status: 'active',
          seoTitle: 'Contact Bhutan Mind Break - Plan Your Bhutan Trip',
          seoDescription: 'Contact our Bhutan travel experts to plan your perfect trip. Get personalized assistance and expert advice.',
          seoKeywords: 'contact Bhutan tours, Bhutan travel planning, trip consultation',
          lastModified: '2024-01-12T14:20:00Z',
          modifiedBy: 'Admin'
        }
      ];

      const mockMediaAssets: MediaAsset[] = [
        {
          id: '1',
          filename: 'tigers-nest-monastery.jpg',
          originalName: 'Tigers Nest Monastery Beautiful View.jpg',
          type: 'image',
          size: 2048576,
          mimeType: 'image/jpeg',
          url: '/images/tigers-nest-monastery.jpg',
          alt: 'Tigers Nest Monastery perched on cliff',
          description: 'Iconic Tigers Nest Monastery (Paro Taktsang) built on a cliff face',
          uploadDate: '2024-01-10T10:00:00Z',
          uploadedBy: 'Admin',
          usageCount: 15,
          tags: ['monastery', 'landmark', 'Paro', 'featured']
        },
        {
          id: '2',
          filename: 'bhutan-cultural-dance.mp4',
          originalName: 'Traditional Bhutanese Cultural Dance Performance.mp4',
          type: 'video',
          size: 52428800,
          mimeType: 'video/mp4',
          url: '/videos/bhutan-cultural-dance.mp4',
          alt: 'Traditional Bhutanese cultural dance performance',
          description: 'Authentic Bhutanese cultural dance performed during local festival',
          uploadDate: '2024-01-12T15:30:00Z',
          uploadedBy: 'Content Team',
          usageCount: 8,
          tags: ['culture', 'dance', 'festival', 'video']
        }
      ];

      const mockSEOSettings: SEOSettings = {
        defaultTitle: 'Bhutan Mind Break - Authentic Bhutan Tours & Travel Experiences',
        titleTemplate: '%s | Bhutan Mind Break',
        defaultDescription: 'Discover authentic Bhutan with our expertly crafted tours. Experience the Last Shangri-La through cultural immersion, adventure, and spiritual journeys.',
        defaultKeywords: 'Bhutan tours, Bhutan travel, authentic experiences, cultural tours, adventure travel',
        ogImage: '/images/og-default.jpg',
        twitterCard: 'summary_large_image',
        favicon: '/favicon.ico',
        robotsTxt: 'User-agent: *\nAllow: /',
        sitemapUrl: '/sitemap.xml'
      };

      setBlogPosts(mockBlogPosts);
      setWebsitePages(mockWebsitePages);
      setMediaAssets(mockMediaAssets);
      setSeoSettings(mockSEOSettings);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlogPost = () => {
    setEditMode(false);
    setBlogFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      author: 'Admin',
      status: 'draft',
      category: '',
      tags: [],
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
      publishDate: new Date().toISOString()
    });
    setIsDialogOpen(true);
  };

  const handleEditBlogPost = (post: BlogPost) => {
    setEditMode(true);
    setBlogFormData(post);
    setSelectedItem(post);
    setIsDialogOpen(true);
  };

  const handleSaveBlogPost = async () => {
    try {
      setLoading(true);
      if (editMode && selectedItem) {
        const updatedPosts = blogPosts.map(post =>
          post.id === selectedItem.id
            ? { ...post, ...blogFormData, updatedAt: new Date().toISOString() }
            : post
        );
        setBlogPosts(updatedPosts);
      } else {
        const newPost: BlogPost = {
          ...blogFormData,
          id: Date.now().toString(),
          slug: blogFormData.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '',
          readingTime: Math.ceil((blogFormData.content?.length || 0) / 200),
          views: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } as BlogPost;
        setBlogPosts([...blogPosts, newPost]);
      }
      setIsDialogOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error saving blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = ['Travel Tips', 'Travel Planning', 'Culture', 'Adventure', 'Festivals'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <div className="flex gap-2">
          {activeTab === 'blog' && (
            <Button onClick={handleCreateBlogPost}>
              <Plus className="h-4 w-4 mr-2" />
              New Blog Post
            </Button>
          )}
          {activeTab === 'media' && (
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="pages">Website Pages</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
          <TabsTrigger value="seo">SEO Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="blog" className="space-y-4">
          {/* Blog Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">Search Posts</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by title or content..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blog Posts List */}
          <div className="grid gap-4">
            {filteredBlogPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 flex-1">
                      {post.featuredImage && (
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{post.title}</h3>
                          <Badge variant={post.status === 'published' ? 'default' : 
                                        post.status === 'draft' ? 'secondary' : 'outline'}>
                            {post.status}
                          </Badge>
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>By {post.author}</span>
                          <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                          <span>{post.readingTime} min read</span>
                          <span>{post.views} views</span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditBlogPost(post)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <div className="grid gap-4">
            {websitePages.map((page) => (
              <Card key={page.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{page.title}</h3>
                        <Badge variant={page.status === 'active' ? 'default' : 'secondary'}>
                          {page.status}
                        </Badge>
                        <Badge variant="outline">{page.template}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">/{page.slug}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Last modified: {new Date(page.lastModified).toLocaleDateString()}</span>
                        <span>By {page.modifiedBy}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaAssets.map((asset) => (
              <Card key={asset.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  {asset.type === 'image' ? (
                    <img
                      src={asset.url}
                      alt={asset.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : asset.type === 'video' ? (
                    <Video className="h-12 w-12 text-gray-400" />
                  ) : (
                    <FileText className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-1 truncate" title={asset.originalName}>
                    {asset.originalName}
                  </h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>{formatFileSize(asset.size)}</div>
                    <div>{asset.mimeType}</div>
                    <div>Used {asset.usageCount} times</div>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {asset.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {asset.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{asset.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1 mt-3">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          {seoSettings && (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>General SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="defaultTitle">Default Site Title</Label>
                      <Input
                        id="defaultTitle"
                        value={seoSettings.defaultTitle}
                        onChange={(e) => setSeoSettings({
                          ...seoSettings,
                          defaultTitle: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="titleTemplate">Title Template</Label>
                      <Input
                        id="titleTemplate"
                        value={seoSettings.titleTemplate}
                        onChange={(e) => setSeoSettings({
                          ...seoSettings,
                          titleTemplate: e.target.value
                        })}
                        placeholder="%s | Site Name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="defaultDescription">Default Meta Description</Label>
                    <Textarea
                      id="defaultDescription"
                      value={seoSettings.defaultDescription}
                      onChange={(e) => setSeoSettings({
                        ...seoSettings,
                        defaultDescription: e.target.value
                      })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="defaultKeywords">Default Keywords</Label>
                    <Input
                      id="defaultKeywords"
                      value={seoSettings.defaultKeywords}
                      onChange={(e) => setSeoSettings({
                        ...seoSettings,
                        defaultKeywords: e.target.value
                      })}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media & Open Graph</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ogImage">Default OG Image</Label>
                      <Input
                        id="ogImage"
                        value={seoSettings.ogImage}
                        onChange={(e) => setSeoSettings({
                          ...seoSettings,
                          ogImage: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitterCard">Twitter Card Type</Label>
                      <Select
                        value={seoSettings.twitterCard}
                        onValueChange={(value) => setSeoSettings({
                          ...seoSettings,
                          twitterCard: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="summary">Summary</SelectItem>
                          <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                          <SelectItem value="app">App</SelectItem>
                          <SelectItem value="player">Player</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technical SEO</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sitemapUrl">Sitemap URL</Label>
                      <Input
                        id="sitemapUrl"
                        value={seoSettings.sitemapUrl}
                        onChange={(e) => setSeoSettings({
                          ...seoSettings,
                          sitemapUrl: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="favicon">Favicon URL</Label>
                      <Input
                        id="favicon"
                        value={seoSettings.favicon}
                        onChange={(e) => setSeoSettings({
                          ...seoSettings,
                          favicon: e.target.value
                        })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="robotsTxt">Robots.txt Content</Label>
                    <Textarea
                      id="robotsTxt"
                      value={seoSettings.robotsTxt}
                      onChange={(e) => setSeoSettings({
                        ...seoSettings,
                        robotsTxt: e.target.value
                      })}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save SEO Settings
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Blog Post Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editMode ? 'Edit Blog Post' : 'Create New Blog Post'}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="content" className="space-y-4">
            <TabsList>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={blogFormData.title}
                    onChange={(e) => {
                      setBlogFormData({
                        ...blogFormData,
                        title: e.target.value,
                        slug: generateSlug(e.target.value)
                      });
                    }}
                    placeholder="Blog post title"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={blogFormData.slug}
                    onChange={(e) => setBlogFormData({...blogFormData, slug: e.target.value})}
                    placeholder="blog-post-slug"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={blogFormData.excerpt}
                  onChange={(e) => setBlogFormData({...blogFormData, excerpt: e.target.value})}
                  placeholder="Brief description of the blog post"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={blogFormData.content}
                  onChange={(e) => setBlogFormData({...blogFormData, content: e.target.value})}
                  placeholder="Blog post content (HTML supported)"
                  rows={10}
                />
              </div>

              <div>
                <Label htmlFor="featuredImage">Featured Image URL</Label>
                <Input
                  id="featuredImage"
                  value={blogFormData.featuredImage}
                  onChange={(e) => setBlogFormData({...blogFormData, featuredImage: e.target.value})}
                  placeholder="/images/featured-image.jpg"
                />
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={blogFormData.seoTitle}
                  onChange={(e) => setBlogFormData({...blogFormData, seoTitle: e.target.value})}
                  placeholder="SEO optimized title"
                />
              </div>

              <div>
                <Label htmlFor="seoDescription">Meta Description</Label>
                <Textarea
                  id="seoDescription"
                  value={blogFormData.seoDescription}
                  onChange={(e) => setBlogFormData({...blogFormData, seoDescription: e.target.value})}
                  placeholder="SEO meta description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="seoKeywords">Keywords</Label>
                <Input
                  id="seoKeywords"
                  value={blogFormData.seoKeywords}
                  onChange={(e) => setBlogFormData({...blogFormData, seoKeywords: e.target.value})}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={blogFormData.author}
                    onChange={(e) => setBlogFormData({...blogFormData, author: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={blogFormData.category}
                    onValueChange={(value) => setBlogFormData({...blogFormData, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={blogFormData.tags?.join(', ')}
                  onChange={(e) => setBlogFormData({
                    ...blogFormData,
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                  })}
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={blogFormData.status}
                    onValueChange={(value: BlogPost['status']) => setBlogFormData({...blogFormData, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Input
                    id="publishDate"
                    type="datetime-local"
                    value={blogFormData.publishDate ? new Date(blogFormData.publishDate).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setBlogFormData({
                      ...blogFormData,
                      publishDate: new Date(e.target.value).toISOString()
                    })}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBlogPost} disabled={loading}>
              {loading ? 'Saving...' : (editMode ? 'Update Post' : 'Create Post')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManagementSystem;
