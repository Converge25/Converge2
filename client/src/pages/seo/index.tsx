import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Globe,
  FileText,
  List,
  Link as LinkIcon,
  AlertTriangle,
  Check,
  ArrowUpRight,
  BarChart4,
  ExternalLink,
  PlusCircle,
  RefreshCw,
  HelpCircle,
  FileSpreadsheet,
  Tag,
  CornerDownRight,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GradientText } from "@/components/ui/theme";

export default function SEO() {
  const { toast } = useToast();

  // Website data state (would be fetched from API)
  const [website, setWebsite] = useState("mystore.myshopify.com");

  // Keywords state for keyword research
  const [keyword, setKeyword] = useState("");

  // SEO settings from backend
  const { data: seoSettingsData, isLoading: seoSettingsLoading } = useQuery({
    queryKey: ["/api/seo/settings"],
    refetchOnWindowFocus: false,
  });

  // SEO audit data
  const { data: seoAuditData, isLoading: seoAuditLoading } = useQuery({
    queryKey: ["/api/seo/audit"],
    refetchOnWindowFocus: false,
  });

  // Keywords data
  const { data: keywordsData, isLoading: keywordsLoading } = useQuery({
    queryKey: ["/api/seo/keywords"],
    refetchOnWindowFocus: false,
  });

  const seoSettings = seoSettingsData || {};
  const seoAudit = seoAuditData || {};
  const keywords = keywordsData || [];

  // Action handlers
  const handleKeywordSearch = () => {
    if (!keyword) {
      toast({
        title: "Enter a keyword",
        description: "Please enter a keyword to research",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Searching for keyword",
      description: `Researching data for "${keyword}"`,
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your SEO settings have been saved",
    });
  };

  const handleRunAudit = () => {
    toast({
      title: "Running SEO audit",
      description: "This may take a few minutes to complete",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Search Engine Optimization</h2>
          <p className="text-gray-500 text-sm">
            Improve your store's visibility in search results
          </p>
        </div>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">
            <BarChart4 className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="audit">
            <FileText className="h-4 w-4 mr-2" />
            Site Audit
          </TabsTrigger>
          <TabsTrigger value="keywords">
            <Tag className="h-4 w-4 mr-2" />
            Keyword Research
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Globe className="h-4 w-4 mr-2" />
            SEO Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-base">
                  <FileText className="h-5 w-5 mr-2 text-indigo-600" />
                  SEO Health Score
                </CardTitle>
                <CardDescription>
                  Overall search optimization health
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-2 flex items-center">
                  <div className="relative w-28 h-28">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-100"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-indigo-600"
                        strokeWidth="10"
                        strokeDasharray={`${(76 * 251.2) / 100} 251.2`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">76%</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">Issues</span>
                      <span className="font-medium">7 found</span>
                    </div>
                    <Progress value={22} className="h-2" />

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="text-center p-2 bg-gray-50 rounded-md">
                        <div className="text-indigo-600 mb-1">
                          <FileSpreadsheet className="h-5 w-5 mx-auto" />
                        </div>
                        <div className="text-xs font-medium">
                          124
                          <br />
                          Pages
                        </div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-md">
                        <div className="text-indigo-600 mb-1">
                          <LinkIcon className="h-5 w-5 mx-auto" />
                        </div>
                        <div className="text-xs font-medium">
                          1,847
                          <br />
                          Backlinks
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-base">
                  <Tag className="h-5 w-5 mr-2 text-purple-600" />
                  Top Keywords
                </CardTitle>
                <CardDescription>Highest performing keywords</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-2">
                  {keywordsLoading
                    ? Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between"
                          >
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        ))
                    : [
                        { keyword: "handmade jewelry", position: 4 },
                        { keyword: "artisan necklaces", position: 7 },
                        { keyword: "custom bracelets", position: 9 },
                        { keyword: "handcrafted rings", position: 12 },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center">
                            <span className="text-gray-400 w-4">
                              {index + 1}.
                            </span>
                            <span className="font-medium ml-2">
                              {item.keyword}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span>Pos.</span>
                            <span
                              className={`ml-1 font-medium ${
                                item.position <= 3
                                  ? "text-green-600"
                                  : item.position <= 10
                                    ? "text-blue-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {item.position}
                            </span>
                          </div>
                        </div>
                      ))}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => {
                      document
                        .querySelector('[value="keywords"]')
                        ?.dispatchEvent(
                          new MouseEvent("click", { bubbles: true }),
                        );
                    }}
                  >
                    View All Keywords
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-base">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  Priority Issues
                </CardTitle>
                <CardDescription>Critical issues to address</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-2">
                  {seoAuditLoading
                    ? Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="flex items-start">
                            <Skeleton className="h-4 w-4 mt-0.5 mr-2" />
                            <div className="space-y-1">
                              <Skeleton className="h-4 w-40" />
                              <Skeleton className="h-3 w-32" />
                            </div>
                          </div>
                        ))
                    : [
                        {
                          issue: "Missing meta descriptions",
                          count: 12,
                          priority: "high",
                        },
                        {
                          issue: "Slow page load time",
                          count: 8,
                          priority: "high",
                        },
                        {
                          issue: "Missing alt text on images",
                          count: 24,
                          priority: "medium",
                        },
                        {
                          issue: "Broken links detected",
                          count: 3,
                          priority: "high",
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start text-sm">
                          <div
                            className={`mt-0.5 mr-2 h-4 w-4 rounded-full ${
                              item.priority === "high"
                                ? "bg-red-500"
                                : item.priority === "medium"
                                  ? "bg-amber-500"
                                  : "bg-blue-500"
                            }`}
                          />
                          <div>
                            <div className="font-medium">{item.issue}</div>
                            <div className="text-xs text-gray-500">
                              {item.count} pages affected
                            </div>
                          </div>
                        </div>
                      ))}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => {
                      document
                        .querySelector('[value="audit"]')
                        ?.dispatchEvent(
                          new MouseEvent("click", { bubbles: true }),
                        );
                    }}
                  >
                    View Full Audit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>SEO Checklist</CardTitle>
              <CardDescription>
                Essential tasks to improve your store's search ranking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    task: "Complete SEO Settings",
                    description:
                      "Set up your base page titles, meta descriptions and customize URL structures.",
                    completed: true,
                    link: "settings",
                  },
                  {
                    task: "Run a Site Audit",
                    description:
                      "Identify technical issues that could be affecting your search ranking.",
                    completed: true,
                    link: "audit",
                  },
                  {
                    task: "Research Keywords",
                    description:
                      "Find the right keywords to target based on search volume and competition.",
                    completed: false,
                    link: "keywords",
                  },
                  {
                    task: "Optimize Product Descriptions",
                    description:
                      "Update product descriptions to include relevant keywords and detailed information.",
                    completed: false,
                    link: null,
                  },
                  {
                    task: "Add Alt Text to Images",
                    description:
                      "Make sure all product images have descriptive alt text for better accessibility and SEO.",
                    completed: false,
                    link: null,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div
                      className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                        item.completed
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Check className="h-3 w-3" />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{item.task}</h4>
                        {item.link && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => {
                              document
                                .querySelector(`[value="${item.link}"]`)
                                ?.dispatchEvent(
                                  new MouseEvent("click", { bubbles: true }),
                                );
                            }}
                          >
                            {item.completed ? "View" : "Start"}{" "}
                            <ArrowUpRight className="ml-1 h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <CardTitle>Site Audit</CardTitle>
                  <CardDescription>
                    Technical SEO analysis of your Shopify store
                  </CardDescription>
                </div>
                <Button onClick={handleRunAudit}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Run New Audit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">
                      Health Score
                    </div>
                    <div className="mt-1 text-2xl font-bold">76%</div>
                    <div className="mt-1 text-xs text-gray-400">
                      <span className="text-green-600">↑ 3%</span> from last
                      audit
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">
                      Pages Crawled
                    </div>
                    <div className="mt-1 text-2xl font-bold">124</div>
                    <div className="mt-1 text-xs text-gray-400">
                      Out of 128 total pages
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">
                      Issues Found
                    </div>
                    <div className="mt-1 text-2xl font-bold">46</div>
                    <div className="mt-1 text-xs text-gray-400">
                      <span className="text-green-600">↓ 12</span> from last
                      audit
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">
                      Last Audit
                    </div>
                    <div className="mt-1 text-xl font-bold">May 1, 2025</div>
                    <div className="mt-1 text-xs text-gray-400">5 days ago</div>
                  </div>
                </div>

                <div className="border rounded-lg">
                  <div className="p-4 border-b">
                    <h3 className="font-medium">Issues by Severity</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm">High Priority</span>
                          </div>
                          <span className="text-sm font-medium">7 issues</span>
                        </div>
                        <Progress
                          value={(7 / 46) * 100}
                          className="h-2 bg-gray-100 [&>div]:bg-red-500"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <div className="h-3 w-3 bg-amber-500 rounded-full mr-2"></div>
                            <span className="text-sm">Medium Priority</span>
                          </div>
                          <span className="text-sm font-medium">24 issues</span>
                        </div>
                        <Progress
                          value={(24 / 46) * 100}
                          className="h-2 bg-gray-100 [&>div]:bg-amber-500"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-sm">Low Priority</span>
                          </div>
                          <span className="text-sm font-medium">15 issues</span>
                        </div>
                        <Progress
                          value={(15 / 46) * 100}
                          className="h-2 bg-gray-100 [&>div]:bg-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg">
                  <div className="p-4 border-b">
                    <h3 className="font-medium">Top Issues Found</h3>
                  </div>
                  <div className="divide-y">
                    {[
                      {
                        issue: "Missing meta descriptions",
                        description:
                          "12 pages are missing meta descriptions which are important for search results.",
                        priority: "high",
                        pages: 12,
                      },
                      {
                        issue: "Slow page load time",
                        description:
                          "8 pages have a load time longer than 3 seconds, affecting user experience and search ranking.",
                        priority: "high",
                        pages: 8,
                      },
                      {
                        issue: "Missing alt text on images",
                        description:
                          "24 images are missing alternative text attributes for accessibility and SEO.",
                        priority: "medium",
                        pages: 24,
                      },
                      {
                        issue: "Broken links detected",
                        description:
                          "3 links on your site lead to 404 pages which can harm user experience and SEO.",
                        priority: "high",
                        pages: 3,
                      },
                      {
                        issue: "Duplicate content found",
                        description:
                          "4 pages have substantial duplicate content that may lead to ranking issues.",
                        priority: "medium",
                        pages: 4,
                      },
                    ].map((item, index) => (
                      <div key={index} className="p-4">
                        <div className="flex items-start">
                          <div
                            className={`flex-shrink-0 h-5 w-5 rounded-full ${
                              item.priority === "high"
                                ? "bg-red-500"
                                : item.priority === "medium"
                                  ? "bg-amber-500"
                                  : "bg-blue-500"
                            }`}
                          />
                          <div className="ml-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{item.issue}</h4>
                              <Badge className="ml-2">
                                {item.pages}{" "}
                                {item.pages === 1 ? "page" : "pages"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {item.description}
                            </p>
                            <Button
                              variant="link"
                              className="h-auto p-0 text-sm mt-2"
                              onClick={() => {
                                toast({
                                  title: "Viewing affected pages",
                                  description: `Showing pages with ${item.issue.toLowerCase()}`,
                                });
                              }}
                            >
                              View affected pages{" "}
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Research</CardTitle>
              <CardDescription>
                Find the best keywords to target for your Shopify store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter a keyword to research"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleKeywordSearch}>
                    <Search className="mr-2 h-4 w-4" />
                    Research Keyword
                  </Button>
                </div>

                {keyword ? (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Keyword: {keyword}</h3>
                        <Badge className="bg-indigo-100 text-indigo-800">
                          Medium Competition
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">
                            Monthly Search Volume
                          </div>
                          <div className="text-xl font-bold mt-1">1,200</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">
                            Keyword Difficulty
                          </div>
                          <div className="text-xl font-bold mt-1">48/100</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">
                            CPC (Google Ads)
                          </div>
                          <div className="text-xl font-bold mt-1">$1.25</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Related Keywords</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-12 bg-gray-50 p-2 text-sm font-medium">
                          <div className="col-span-5">Keyword</div>
                          <div className="col-span-2 text-center">Volume</div>
                          <div className="col-span-2 text-center">
                            Difficulty
                          </div>
                          <div className="col-span-2 text-center">CPC</div>
                          <div className="col-span-1 text-right"></div>
                        </div>
                        <div className="divide-y">
                          {[
                            {
                              keyword: "handmade jewelry",
                              volume: 1200,
                              difficulty: 48,
                              cpc: 1.25,
                            },
                            {
                              keyword: "custom handmade jewelry",
                              volume: 590,
                              difficulty: 35,
                              cpc: 1.05,
                            },
                            {
                              keyword: "handmade jewelry online",
                              volume: 880,
                              difficulty: 42,
                              cpc: 1.15,
                            },
                            {
                              keyword: "buy handmade jewelry",
                              volume: 720,
                              difficulty: 45,
                              cpc: 1.35,
                            },
                            {
                              keyword: "handmade jewelry shop",
                              volume: 480,
                              difficulty: 32,
                              cpc: 0.95,
                            },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-12 p-3 text-sm items-center"
                            >
                              <div className="col-span-5 font-medium">
                                {item.keyword}
                              </div>
                              <div className="col-span-2 text-center">
                                {item.volume.toLocaleString()}
                              </div>
                              <div className="col-span-2 text-center">
                                {item.difficulty}/100
                              </div>
                              <div className="col-span-2 text-center">
                                ${item.cpc.toFixed(2)}
                              </div>
                              <div className="col-span-1 text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => {
                                    setKeyword(item.keyword);
                                    handleKeywordSearch();
                                  }}
                                >
                                  <Search className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">SERP Analysis</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-12 bg-gray-50 p-2 text-sm font-medium">
                          <div className="col-span-1 text-center">Pos.</div>
                          <div className="col-span-6">Title</div>
                          <div className="col-span-3">Domain</div>
                          <div className="col-span-2 text-center">
                            Authority
                          </div>
                        </div>
                        <div className="divide-y">
                          {[
                            {
                              position: 1,
                              title:
                                "Handmade Jewelry - Unique Artisan Crafted Pieces",
                              domain: "etsy.com",
                              authority: 92,
                            },
                            {
                              position: 2,
                              title:
                                "Affordable Handmade Jewelry | Free Shipping",
                              domain: "handmadejewelry.com",
                              authority: 68,
                            },
                            {
                              position: 3,
                              title:
                                "Shop Handmade Jewelry - One-of-a-Kind Pieces",
                              domain: "amazon.com/handmade",
                              authority: 97,
                            },
                            {
                              position: 4,
                              title:
                                "Artisan Jewelry Handcrafted by Local Artists",
                              domain: "localartisans.com",
                              authority: 54,
                            },
                            {
                              position: 5,
                              title:
                                "Handmade Jewelry Store - Unique Custom Designs",
                              domain: "customjewelryshop.com",
                              authority: 48,
                            },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-12 p-3 text-sm items-center"
                            >
                              <div className="col-span-1 text-center font-bold">
                                {item.position}
                              </div>
                              <div className="col-span-6">{item.title}</div>
                              <div className="col-span-3 text-blue-600">
                                {item.domain}
                              </div>
                              <div className="col-span-2 text-center">
                                {item.authority}/100
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                      <h3 className="font-medium">Tracked Keywords</h3>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-12 p-3 text-sm font-medium bg-gray-50">
                        <div className="col-span-4">Keyword</div>
                        <div className="col-span-2">Position</div>
                        <div className="col-span-2">Change</div>
                        <div className="col-span-2">Volume</div>
                        <div className="col-span-2">Difficulty</div>
                      </div>
                      {keywordsLoading
                        ? Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className="grid grid-cols-12 p-3 gap-2"
                              >
                                <Skeleton className="col-span-4 h-4" />
                                <Skeleton className="col-span-2 h-4" />
                                <Skeleton className="col-span-2 h-4" />
                                <Skeleton className="col-span-2 h-4" />
                                <Skeleton className="col-span-2 h-4" />
                              </div>
                            ))
                        : [
                            {
                              keyword: "handmade jewelry",
                              position: 4,
                              change: 2,
                              volume: 1200,
                              difficulty: 48,
                            },
                            {
                              keyword: "artisan necklaces",
                              position: 7,
                              change: -1,
                              volume: 590,
                              difficulty: 35,
                            },
                            {
                              keyword: "custom bracelets",
                              position: 9,
                              change: 3,
                              volume: 480,
                              difficulty: 32,
                            },
                            {
                              keyword: "handcrafted rings",
                              position: 12,
                              change: 0,
                              volume: 320,
                              difficulty: 28,
                            },
                            {
                              keyword: "unique earrings",
                              position: 18,
                              change: 4,
                              volume: 280,
                              difficulty: 25,
                            },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-12 p-3 text-sm items-center"
                            >
                              <div className="col-span-4 font-medium">
                                {item.keyword}
                              </div>
                              <div className="col-span-2">{item.position}</div>
                              <div className="col-span-2">
                                {item.change > 0 ? (
                                  <span className="text-green-600">
                                    ↑ {item.change}
                                  </span>
                                ) : item.change < 0 ? (
                                  <span className="text-red-600">
                                    ↓ {Math.abs(item.change)}
                                  </span>
                                ) : (
                                  <span className="text-gray-500">-</span>
                                )}
                              </div>
                              <div className="col-span-2">
                                {item.volume.toLocaleString()}
                              </div>
                              <div className="col-span-2">
                                {item.difficulty}/100
                              </div>
                            </div>
                          ))}
                      <div className="p-3 flex justify-center">
                        <Button
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: "Adding keyword",
                              description: "Opening keyword tracking form",
                            });
                          }}
                        >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Track New Keyword
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Configure how your store appears in search results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input
                      id="storeName"
                      placeholder="Your store name"
                      defaultValue="Handcrafted Treasures"
                    />
                  </div>

                  <div>
                    <Label htmlFor="storeDescription">Store Description</Label>
                    <Textarea
                      id="storeDescription"
                      placeholder="Brief description of your store"
                      defaultValue="Handcrafted Treasures offers unique, artisan-made jewelry pieces created with care and attention to detail. Our collection features handmade necklaces, bracelets, rings, and earrings."
                      className="min-h-24"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      This will be used as the default meta description for your
                      homepage.
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="titleFormat">Page Title Format</Label>
                      <Input
                        id="titleFormat"
                        placeholder="Page Title Format"
                        defaultValue="{page_title} | {store_name}"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        <HelpCircle className="inline h-3 w-3 mr-1" />
                        Available variables: {"{page_title}"}, {"{store_name}"},{" "}
                        {"{category}"}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="productTitleFormat">
                        Product Title Format
                      </Label>
                      <Input
                        id="productTitleFormat"
                        placeholder="Product Title Format"
                        defaultValue="{product_name} - {store_name}"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        <HelpCircle className="inline h-3 w-3 mr-1" />
                        Available variables: {"{product_name}"},{" "}
                        {"{store_name}"}, {"{category}"}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-base font-medium mb-3">
                    Homepage Meta Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="homeMetaTitle">Homepage Meta Title</Label>
                      <Input
                        id="homeMetaTitle"
                        placeholder="Homepage title"
                        defaultValue="Handcrafted Treasures | Unique Artisan Jewelry"
                      />
                    </div>

                    <div>
                      <Label htmlFor="homeMetaDescription">
                        Homepage Meta Description
                      </Label>
                      <Textarea
                        id="homeMetaDescription"
                        placeholder="Homepage meta description"
                        defaultValue="Discover unique, handcrafted jewelry at Handcrafted Treasures. Our artisan-made pieces include necklaces, bracelets, rings, and earrings. Free shipping on orders over $50."
                        className="min-h-20"
                      />
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-xs text-gray-500">
                          <HelpCircle className="inline h-3 w-3 mr-1" />
                          Recommended length: 150-160 characters
                        </div>
                        <div className="text-xs font-medium">
                          148 characters
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-base font-medium mb-3">URL Structure</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="productUrlStructure">
                        Product URL Structure
                      </Label>
                      <div className="flex items-center mt-1.5">
                        <span className="text-gray-500 mr-1">{website}/</span>
                        <Select defaultValue="products">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select prefix" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="products">products</SelectItem>
                            <SelectItem value="shop">shop</SelectItem>
                            <SelectItem value="store">store</SelectItem>
                            <SelectItem value="item">item</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-gray-500 mx-1">/</span>
                        <Select defaultValue="product-handle">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="product-handle">
                              product-handle
                            </SelectItem>
                            <SelectItem value="product-id">
                              product-id
                            </SelectItem>
                            <SelectItem value="product-id-handle">
                              product-id-handle
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="text-xs text-gray-500 mt-2 flex items-center">
                        <CornerDownRight className="h-3 w-3 mr-1" />
                        Example: {website}/products/silver-moon-necklace
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="collectionUrlStructure">
                        Collection URL Structure
                      </Label>
                      <div className="flex items-center mt-1.5">
                        <span className="text-gray-500 mr-1">{website}/</span>
                        <Select defaultValue="collections">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select prefix" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="collections">
                              collections
                            </SelectItem>
                            <SelectItem value="category">category</SelectItem>
                            <SelectItem value="categories">
                              categories
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-gray-500 mx-1">/</span>
                        <Select defaultValue="collection-handle">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="collection-handle">
                              collection-handle
                            </SelectItem>
                            <SelectItem value="collection-id">
                              collection-id
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="text-xs text-gray-500 mt-2 flex items-center">
                        <CornerDownRight className="h-3 w-3 mr-1" />
                        Example: {website}/collections/necklaces
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>Save SEO Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
