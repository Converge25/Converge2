import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
  SectionHeading, GradientText, GradientBg, HoverCard, AnimatedIcon 
} from '@/components/ui/theme';
import { 
  BarChart2, TrendingUp, Users, Mail, MessageSquare, 
  Instagram, Clock, ExternalLink, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line 
} from 'recharts';

// Dashboard overview stats
const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#14B8A6'];

export default function Dashboard() {
  // Fetch dashboard data
  const { data = {}, isLoading } = useQuery({
    queryKey: ['/api/dashboard'],
    // Default error handling is provided by the query client
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading dashboard data...</p>
        </div>
      </div>
    );
  }
  
  // Access dashboard data or use empty defaults
  const stats = data.stats || {
    totalRevenue: 0,
    leadCount: 0,
    emailOpens: 0,
    campaignCount: 0
  };
  
  const recentCampaigns = data.recentCampaigns || [
    { id: 1, name: 'Summer Sale Announcement', type: 'email', status: 'active', sent: 1250, opened: 870, date: '2023-07-15' },
    { id: 2, name: 'New Collection Launch', type: 'sms', status: 'completed', sent: 980, opened: 750, date: '2023-07-10' },
    { id: 3, name: 'Customer Feedback Request', type: 'email', status: 'scheduled', sent: 0, opened: 0, date: '2023-07-20' }
  ];
  
  const leadSourceData = data.leadSourceData || [
    { name: 'Email Campaigns', value: 400 },
    { name: 'Social Media', value: 300 },
    { name: 'Website Popups', value: 250 },
    { name: 'SMS Marketing', value: 150 }
  ];
  
  const monthlyRevenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 5000 },
    { name: 'Mar', revenue: 3000 },
    { name: 'Apr', revenue: 7000 },
    { name: 'May', revenue: 5000 },
    { name: 'Jun', revenue: 6000 },
    { name: 'Jul', revenue: 8500 }
  ];
  
  const customerEngagementData = [
    { name: 'Jan', email: 40, sms: 24, social: 16 },
    { name: 'Feb', email: 30, sms: 28, social: 18 },
    { name: 'Mar', email: 50, sms: 26, social: 17 },
    { name: 'Apr', email: 45, sms: 32, social: 22 },
    { name: 'May', email: 65, sms: 35, social: 26 },
    { name: 'Jun', email: 58, sms: 38, social: 29 },
    { name: 'Jul', email: 80, sms: 42, social: 35 }
  ];
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <SectionHeading>
          Dashboard Overview
        </SectionHeading>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-gray-600"
            onClick={() => {
              alert("Showing last 30 days data");
            }}
          >
            <Clock className="h-4 w-4 mr-2" /> Last 30 Days
          </Button>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
            onClick={() => {
              alert("Exporting reports...");
              // Here we would call the export API, for now just showing a message
            }}
          >
            <TrendingUp className="h-4 w-4 mr-2" /> Export Reports
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <HoverCard colorAccent="blue">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-500 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12.5% from last month
                </p>
              </div>
              <AnimatedIcon color="blue">
                <BarChart2 className="h-5 w-5" />
              </AnimatedIcon>
            </div>
          </CardContent>
        </HoverCard>
        
        <HoverCard colorAccent="purple">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Leads</p>
                <p className="text-2xl font-bold">{stats.leadCount.toLocaleString()}</p>
                <p className="text-xs text-green-500 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +8.2% from last month
                </p>
              </div>
              <AnimatedIcon color="purple">
                <Users className="h-5 w-5" />
              </AnimatedIcon>
            </div>
          </CardContent>
        </HoverCard>
        
        <HoverCard colorAccent="indigo">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Email Opens</p>
                <p className="text-2xl font-bold">{stats.emailOpens.toLocaleString()}</p>
                <p className="text-xs text-yellow-500 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +2.1% from last month
                </p>
              </div>
              <AnimatedIcon color="indigo">
                <Mail className="h-5 w-5" />
              </AnimatedIcon>
            </div>
          </CardContent>
        </HoverCard>
        
        <HoverCard colorAccent="pink">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Campaigns</p>
                <p className="text-2xl font-bold">{stats.campaignCount}</p>
                <p className="text-xs text-green-500 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +5.3% from last month
                </p>
              </div>
              <AnimatedIcon color="pink">
                <MessageSquare className="h-5 w-5" />
              </AnimatedIcon>
            </div>
          </CardContent>
        </HoverCard>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              <GradientText>Monthly Revenue</GradientText>
            </CardTitle>
            <CardDescription>
              Revenue trend over the past 7 months
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRevenueData}
                margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="revenue" 
                  name="Revenue" 
                  fill="url(#colorRevenue)" 
                  radius={[4, 4, 0, 0]} 
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#A78BFA" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Lead Sources Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              <GradientText>Lead Sources</GradientText>
            </CardTitle>
            <CardDescription>
              Distribution of leads by source
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} leads`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Campaign Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              <GradientText>Customer Engagement</GradientText>
            </CardTitle>
            <CardDescription>
              Engagement across different channels
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={customerEngagementData}
                margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="email" 
                  name="Email" 
                  stroke="#6366F1" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 7 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="sms" 
                  name="SMS" 
                  stroke="#8B5CF6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 7 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="social" 
                  name="Social" 
                  stroke="#EC4899" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 7 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Recent Campaigns */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              <GradientText>Recent Campaigns</GradientText>
            </CardTitle>
            <CardDescription>
              Your latest marketing campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCampaigns.map((campaign) => (
                <div key={campaign.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">{campaign.name}</div>
                    <div className="flex items-center">
                      {campaign.type === 'email' ? (
                        <Mail className="h-4 w-4 text-indigo-600 mr-1" />
                      ) : campaign.type === 'sms' ? (
                        <MessageSquare className="h-4 w-4 text-purple-600 mr-1" />
                      ) : (
                        <Instagram className="h-4 w-4 text-pink-600 mr-1" />
                      )}
                      <span className="text-xs text-gray-500">{campaign.type}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="bg-gray-200 rounded-full px-2 py-1">
                      {campaign.status === 'active' ? (
                        <span className="text-green-600">Active</span>
                      ) : campaign.status === 'completed' ? (
                        <span className="text-blue-600">Completed</span>
                      ) : (
                        <span className="text-yellow-600">Scheduled</span>
                      )}
                    </div>
                    <div className="text-gray-500">{campaign.date}</div>
                  </div>
                  
                  {campaign.status !== 'scheduled' && (
                    <div className="mt-2">
                      <div className="flex justify-between mb-1 text-xs text-gray-500">
                        <span>Opened ({campaign.opened} of {campaign.sent})</span>
                        <span>{Math.round((campaign.opened / campaign.sent) * 100)}%</span>
                      </div>
                      <Progress value={(campaign.opened / campaign.sent) * 100} className="h-1.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button 
              variant="link" 
              className="text-indigo-600 w-full"
              onClick={() => {
                window.location.href = "/app/campaigns";
              }}
            >
              View all campaigns <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* AI Assistant Section */}
      <GradientBg variant="subtle" className="rounded-lg p-6 shadow-md">
        <div className="flex items-start space-x-6">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <Sparkles className="h-10 w-10 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">
              <GradientText>AI Marketing Assistant</GradientText>
            </h3>
            <p className="text-gray-600 mb-4">
              Let our AI assistant help you optimize your marketing campaigns, write engaging content, and analyze performance data to boost conversions.
            </p>
            <Button 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md"
              onClick={() => {
                window.location.href = "/app/ai";
              }}
            >
              Get AI Recommendations
            </Button>
          </div>
        </div>
      </GradientBg>
    </div>
  );
}