import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, MessageSquare, Hash, CheckCircle } from "lucide-react";

type Campaign = {
  id: number;
  type: 'email' | 'sms' | 'social' | 'popup';
  title: string;
  date: string;
  rate: number;
  rateType: string;
};

type RecentCampaignsProps = {
  campaigns: Campaign[];
  isLoading: boolean;
  onViewAll: () => void;
};

export default function RecentCampaigns({ campaigns, isLoading, onViewAll }: RecentCampaignsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return (
          <div className="bg-blue-100 rounded-md p-2 mr-3">
            <Mail className="h-5 w-5 text-blue-600" />
          </div>
        );
      case 'sms':
        return (
          <div className="bg-green-100 rounded-md p-2 mr-3">
            <MessageSquare className="h-5 w-5 text-green-600" />
          </div>
        );
      case 'social':
        return (
          <div className="bg-purple-100 rounded-md p-2 mr-3">
            <Hash className="h-5 w-5 text-purple-600" />
          </div>
        );
      case 'popup':
        return (
          <div className="bg-yellow-100 rounded-md p-2 mr-3">
            <CheckCircle className="h-5 w-5 text-yellow-600" />
          </div>
        );
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return `Sent ${date.toLocaleDateString('en-US', options)}`;
  };
  
  return (
    <Card>
      <CardHeader className="px-5 py-4 border-b border-gray-200 flex flex-row justify-between items-center">
        <CardTitle className="text-base font-semibold">Recent Campaigns</CardTitle>
        <button onClick={onViewAll} className="text-sm text-blue-600 hover:text-blue-700">
          View all
        </button>
      </CardHeader>
      <CardContent className="p-2">
        {isLoading ? (
          Array(4).fill(0).map((_, index) => (
            <div key={index} className="px-3 py-2 hover:bg-gray-50 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-md mr-3" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-12 mb-1 ml-auto" />
                  <Skeleton className="h-3 w-16 ml-auto" />
                </div>
              </div>
            </div>
          ))
        ) : (
          campaigns.map((campaign) => (
            <div key={campaign.id} className="px-3 py-2 hover:bg-gray-50 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {getIcon(campaign.type)}
                  <div>
                    <h4 className="text-sm font-medium">{campaign.title}</h4>
                    <p className="text-xs text-gray-500">{formatDate(campaign.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{(campaign.rate * 100).toFixed(1)}%</div>
                  <p className="text-xs text-gray-500">{campaign.rateType}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
