import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Mail, 
  MessageSquare, 
  Instagram, 
  Plus, 
  Filter,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { GradientText } from "@/components/ui/theme";

export default function Campaigns() {
  const { toast } = useToast();
  const [campaignType, setCampaignType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Fetch all campaigns
  const { data: campaignsData, isLoading } = useQuery({
    queryKey: ['/api/campaigns'],
    refetchOnWindowFocus: false,
  });
  
  const campaigns = campaignsData || [];
  
  // Filter campaigns by type and search query
  const filteredCampaigns = campaigns.filter((campaign: any) => {
    const matchesType = campaignType === "all" || campaign.type === campaignType;
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });
  
  const getCampaignIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4 text-indigo-600" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4 text-purple-600" />;
      case 'social':
        return <Instagram className="h-4 w-4 text-pink-600" />;
      default:
        return <Mail className="h-4 w-4 text-indigo-600" />;
    }
  };
  
  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return "bg-green-100 text-green-800";
      case 'completed':
        return "bg-blue-100 text-blue-800";
      case 'scheduled':
        return "bg-yellow-100 text-yellow-800";
      case 'draft':
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">All Campaigns</h2>
        <div className="flex space-x-2">
          <Button
            onClick={() => {
              toast({
                title: "Creating campaign",
                description: "Select a campaign type to create",
              });
            }}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Create Campaign
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Select 
            value={campaignType} 
            onValueChange={(value) => setCampaignType(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="social">Social</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative flex-1 md:min-w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search campaigns..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, index) => (
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
      ) : filteredCampaigns.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="bg-gray-100 p-3 rounded-full mb-4">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Campaigns Found</h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              {searchQuery 
                ? "No campaigns match your search criteria."
                : campaignType !== "all" 
                  ? `You don't have any ${campaignType} campaigns yet.`
                  : "You haven't created any campaigns yet."}
            </p>
            <Button
              onClick={() => {
                setCampaignType("all");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCampaigns.map((campaign: any) => (
            <Card key={campaign.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{campaign.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      {getCampaignIcon(campaign.type)}
                      <span className="ml-1 capitalize">{campaign.type}</span>
                    </CardDescription>
                  </div>
                  <Badge className={getCampaignStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="font-medium mb-2">
                  {campaign.type === 'email' ? `Subject: ${campaign.subject}` :
                   campaign.type === 'sms' ? `Message: ${campaign.message?.substring(0, 50)}...` :
                   `Platform: ${campaign.platform}`}
                </p>
                
                <div className="text-xs text-gray-500 mb-2">
                  {campaign.status === 'scheduled' 
                    ? `Scheduled for ${new Date(campaign.scheduledFor).toLocaleDateString()}`
                    : campaign.status === 'completed' || campaign.status === 'active'
                      ? `Sent on ${new Date(campaign.sentAt || campaign.createdAt).toLocaleDateString()}`
                      : `Created on ${new Date(campaign.createdAt).toLocaleDateString()}`}
                </div>
                
                {(campaign.status === 'active' || campaign.status === 'completed') && (
                  <div className="mt-2">
                    <div className="flex justify-between mb-1 text-xs text-gray-500">
                      <span>
                        {campaign.type === 'email' ? 'Opens:' : 
                         campaign.type === 'sms' ? 'Delivered:' : 'Engagement:'}
                      </span>
                      <span>
                        {campaign.type === 'email' 
                          ? `${Math.round((campaign.openRate || 0) * 100)}%` 
                          : campaign.type === 'sms' 
                            ? `${Math.round((campaign.deliveryRate || 0) * 100)}%`
                            : `${Math.round((campaign.engagementRate || 0) * 100)}%`}
                      </span>
                    </div>
                    <Progress 
                      value={
                        (campaign.type === 'email' 
                          ? (campaign.openRate || 0) 
                          : campaign.type === 'sms' 
                            ? (campaign.deliveryRate || 0) 
                            : (campaign.engagementRate || 0)) * 100
                      } 
                      className="h-1.5" 
                    />
                  </div>
                )}
                
                <div className="flex justify-end mt-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Opening campaign",
                        description: `Opening details for ${campaign.name}`,
                      });
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}