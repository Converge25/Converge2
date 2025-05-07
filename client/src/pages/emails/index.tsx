import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Mail, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function Emails() {
  const { toast } = useToast();
  
  // Fetch email campaigns
  const { data: campaignsData, isLoading: campaignsLoading } = useQuery({
    queryKey: ['/api/emails/campaigns'],
    refetchOnWindowFocus: false,
    onError: () => {
      toast({
        title: "Error loading campaigns",
        description: "Could not load email campaigns. Please try again later.",
        variant: "destructive",
      });
    }
  });
  
  // Fetch email templates
  const { data: templatesData, isLoading: templatesLoading } = useQuery({
    queryKey: ['/api/emails/templates'],
    refetchOnWindowFocus: false,
    onError: () => {
      toast({
        title: "Error loading templates",
        description: "Could not load email templates. Please try again later.",
        variant: "destructive",
      });
    }
  });
  
  const campaigns = campaignsData || [];
  const templates = templatesData || [];
  
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Email Marketing</h2>
        <Button
          onClick={() => {
            toast({
              title: "Creating campaign",
              description: "Opening campaign creator...",
            });
            // Here you would normally navigate to campaign creation page
            // For now we'll just show a toast notification
          }}
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Create Email Campaign
        </Button>
      </div>
      
      <Tabs defaultValue="campaigns">
        <TabsList className="mb-4">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns">
          {campaignsLoading ? (
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
          ) : campaigns.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Mail className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Email Campaigns</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  You haven't created any email campaigns yet.
                </p>
                <Button
                  onClick={() => {
                    toast({
                      title: "Creating your first campaign",
                      description: "Opening campaign creator...",
                    });
                    // Here you would normally navigate to campaign creation page
                    // For now we'll just show a toast notification
                  }}
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Create Your First Campaign
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{campaign.name}</CardTitle>
                    <CardDescription>
                      {campaign.status === 'draft' ? 'Draft' : 
                       campaign.status === 'scheduled' ? `Scheduled for ${new Date(campaign.scheduledFor).toLocaleDateString()}` : 
                       `Sent on ${new Date(campaign.sentAt).toLocaleDateString()}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-medium mb-1">Subject: {campaign.subject}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>Open rate: {campaign.openRate ? `${(campaign.openRate * 100).toFixed(1)}%` : 'N/A'}</span>
                      <span>Click rate: {campaign.clickRate ? `${(campaign.clickRate * 100).toFixed(1)}%` : 'N/A'}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="templates">
          {templatesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(3).fill(0).map((_, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-3/4 mb-1" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : templates.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Email Templates</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  You haven't created any email templates yet.
                </p>
                <Button
                  onClick={() => {
                    toast({
                      title: "Creating template",
                      description: "Opening template creator...",
                    });
                    // Here you would normally navigate to template creation page
                    // For now we'll just show a toast notification
                  }}
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Create Template
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-medium mb-1">
                      Subject: {template.subject || 'No subject'}
                    </p>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>Created on {new Date(template.createdAt).toLocaleDateString()}</span>
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
              <h3 className="text-lg font-medium text-center mb-4">Email Analytics</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { month: 'Jan', opened: 65, clicked: 42 },
                      { month: 'Feb', opened: 72, clicked: 38 },
                      { month: 'Mar', opened: 58, clicked: 35 },
                      { month: 'Apr', opened: 80, clicked: 52 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="opened" fill="#8884d8" name="Opened" />
                    <Bar dataKey="clicked" fill="#82ca9d" name="Clicked" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
