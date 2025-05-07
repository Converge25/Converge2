import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Plus, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Heart, 
  MessageSquare, 
  Repeat, 
  Share2, 
  Calendar, 
  FileText 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { GradientText } from "@/components/ui/theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Social() {
  const { toast } = useToast();
  
  // Fetch social accounts
  const { data: accountsData, isLoading: accountsLoading } = useQuery({
    queryKey: ['/api/social/accounts'],
    refetchOnWindowFocus: false,
  });
  
  // Fetch posts
  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryKey: ['/api/social/posts'],
    refetchOnWindowFocus: false,
  });
  
  // Fetch scheduled posts
  const { data: scheduledData, isLoading: scheduledLoading } = useQuery({
    queryKey: ['/api/social/scheduled'],
    refetchOnWindowFocus: false,
  });
  
  const accounts = accountsData || [];
  const posts = postsData || [];
  const scheduledPosts = scheduledData || [];
  
  const getPlatformIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-600" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'twitter':
      case 'x':
        return <Twitter className="h-4 w-4 text-sky-500" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4 text-blue-700" />;
      default:
        return <Instagram className="h-4 w-4 text-gray-600" />;
    }
  };
  
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Social Media</h2>
        <Button
          onClick={() => {
            toast({
              title: "Creating post",
              description: "Opening post creator...",
            });
            // Here you would normally navigate to post creation page
            // For now we'll just show a toast notification
          }}
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Create Post
        </Button>
      </div>
      
      <Tabs defaultValue="accounts">
        <TabsList className="mb-4">
          <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts">
          {accountsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(3).fill(0).map((_, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-10 w-10 rounded-full mb-2" />
                    <Skeleton className="h-5 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : accounts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="flex space-x-2 mb-4">
                  <Instagram className="h-8 w-8 text-pink-500" />
                  <Facebook className="h-8 w-8 text-blue-600" />
                  <Twitter className="h-8 w-8 text-sky-500" />
                  <Linkedin className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Social Accounts Connected</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Connect your social media accounts to start posting and analyzing performance.
                </p>
                <Button
                  onClick={() => {
                    toast({
                      title: "Connect account",
                      description: "Opening account connection dialog...",
                    });
                    // Here you would normally open a modal to connect accounts
                    // For now we'll just show a toast notification
                  }}
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Connect Account
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accounts.map((account: any) => (
                <Card key={account.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={account.profileImageUrl} />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                            {account.platform?.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{account.username}</CardTitle>
                          <CardDescription className="flex items-center">
                            {getPlatformIcon(account.platform)}
                            <span className="ml-1">{account.platform}</span>
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={account.status === 'connected' ? 'outline' : 'secondary'}>
                        {account.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <div>Followers: {account.followerCount?.toLocaleString() || 'N/A'}</div>
                      <div>Posts: {account.postCount?.toLocaleString() || 'N/A'}</div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Connected on {new Date(account.connectedAt || account.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Managing account",
                          description: `Opening settings for ${account.username}`,
                        });
                      }}
                    >
                      Manage Account
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Button 
                    variant="ghost"
                    onClick={() => {
                      toast({
                        title: "Connect account",
                        description: "Opening account connection dialog...",
                      });
                    }}
                  >
                    <Plus className="h-5 w-5 mr-1.5" />
                    Connect New Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="posts">
          {postsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array(4).fill(0).map((_, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <Skeleton className="h-8 w-8 rounded-full mr-2" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Posts Yet</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  You haven't created any social media posts yet.
                </p>
                <Button
                  onClick={() => {
                    toast({
                      title: "Creating post",
                      description: "Opening post creator...",
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Create Your First Post
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map((post: any) => (
                <Card key={post.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.account?.profileImageUrl} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                          {post.account?.platform?.substring(0, 2).toUpperCase() || 'SM'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm flex items-center">
                          {post.account?.username}
                          {getPlatformIcon(post.account?.platform)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Posted on {new Date(post.postedAt || post.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{post.content}</p>
                    {post.mediaUrl && (
                      <div className="rounded-md bg-gray-100 h-40 mb-3 flex items-center justify-center text-xs text-gray-500">
                        [Media content]
                      </div>
                    )}
                    <div className="flex justify-between text-gray-500 text-xs">
                      <div className="flex items-center">
                        <Heart className="h-3.5 w-3.5 mr-1" />
                        {post.likeCount || 0}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-3.5 w-3.5 mr-1" />
                        {post.commentCount || 0}
                      </div>
                      <div className="flex items-center">
                        <Repeat className="h-3.5 w-3.5 mr-1" />
                        {post.shareCount || 0}
                      </div>
                      <div className="flex items-center">
                        <Share2 className="h-3.5 w-3.5 mr-1" />
                        Share
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="scheduled">
          {scheduledLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(3).fill(0).map((_, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : scheduledPosts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Scheduled Posts</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  You haven't scheduled any posts for future publication.
                </p>
                <Button
                  onClick={() => {
                    toast({
                      title: "Scheduling post",
                      description: "Opening post scheduler...",
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Schedule a Post
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scheduledPosts.map((post: any) => (
                <Card key={post.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">
                          Scheduled Post
                        </CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          {getPlatformIcon(post.platform)}
                          <span className="ml-1">{post.platform}</span>
                        </CardDescription>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Scheduled
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-medium mb-1 line-clamp-2">{post.content}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {new Date(post.scheduledFor).toLocaleDateString()} at {new Date(post.scheduledFor).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Editing post",
                            description: "Opening post editor...",
                          });
                        }}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Cancelling post",
                            description: "The post has been cancelled.",
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardContent className="py-8">
              <h3 className="text-lg font-medium text-center mb-4">Social Media Analytics</h3>
              <p className="text-center text-gray-500">
                Detailed analytics will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}