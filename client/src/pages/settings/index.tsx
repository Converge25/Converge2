import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  CreditCard,
  Store, 
  MailCheck, 
  Globe, 
  Bell, 
  ShieldCheck 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GradientText } from "@/components/ui/theme";

export default function Settings() {
  const { toast } = useToast();
  
  // Fetch user data
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['/api/user'],
    refetchOnWindowFocus: false,
  });
  
  // Fetch shop data
  const { data: shopData, isLoading: shopLoading } = useQuery({
    queryKey: ['/api/shop'],
    refetchOnWindowFocus: false,
  });
  
  const [emailSettings, setEmailSettings] = useState({
    marketingEmails: true,
    productUpdates: true,
    newsletter: false
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    browserNotifications: false,
    campaignCompletions: true,
    leadCaptures: true,
    weeklyReports: true
  });
  
  const user = userData || {};
  const shop = shopData || {};
  
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Settings</h2>
      </div>
      
      <Tabs defaultValue="account">
        <TabsList className="mb-4">
          <TabsTrigger value="account">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="store">
            <Store className="h-4 w-4 mr-2" />
            Store
          </TabsTrigger>
          <TabsTrigger value="emails">
            <MailCheck className="h-4 w-4 mr-2" />
            Email Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Manage your personal account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.profileImageUrl} />
                  <AvatarFallback className="text-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Upload photo",
                        description: "Opening file uploader...",
                      });
                    }}
                  >
                    Change photo
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" defaultValue={user.firstName} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" defaultValue={user.lastName} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue={user.phone} />
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => {
                  toast({
                    title: "Account updated",
                    description: "Your account information has been saved",
                  });
                }}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store Settings</CardTitle>
              <CardDescription>
                Manage your Shopify store connection and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-3 rounded-md">
                  <Store className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium">{shop.name || 'Your Store'}</h3>
                  <p className="text-sm text-gray-500">{shop.domain || 'mystore.myshopify.com'}</p>
                </div>
                <div className="ml-auto">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Reconnecting store",
                        description: "Opening Shopify authentication...",
                      });
                    }}
                  >
                    Reconnect
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="storeName">Store name</Label>
                  <Input id="storeName" defaultValue={shop.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="storeDomain">Store domain</Label>
                  <Input id="storeDomain" defaultValue={shop.domain} disabled />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="storeEmail">Contact email</Label>
                  <Input id="storeEmail" type="email" defaultValue={shop.email} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue={shop.timezone || 'UTC'} />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">API Integration</h3>
                <p className="text-sm text-gray-500">
                  Manage your Shopify API integration settings.
                </p>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Product sync</span>
                    <span className="text-xs text-gray-500">Sync products between Shopify and Converge</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Customer sync</span>
                    <span className="text-xs text-gray-500">Import customers from Shopify to Converge</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Order sync</span>
                    <span className="text-xs text-gray-500">Import orders from Shopify to Converge</span>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => {
                  toast({
                    title: "Store settings updated",
                    description: "Your store settings have been saved",
                  });
                }}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="emails">
          <Card>
            <CardHeader>
              <CardTitle>Email Preferences</CardTitle>
              <CardDescription>
                Manage the emails you receive from us
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Marketing emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new features, products, and offers.
                    </p>
                  </div>
                  <Switch 
                    checked={emailSettings.marketingEmails}
                    onCheckedChange={(checked) => {
                      setEmailSettings({...emailSettings, marketingEmails: checked});
                    }}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Product updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about product updates and improvements.
                    </p>
                  </div>
                  <Switch 
                    checked={emailSettings.productUpdates}
                    onCheckedChange={(checked) => {
                      setEmailSettings({...emailSettings, productUpdates: checked});
                    }}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Newsletter</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive our weekly newsletter with industry insights.
                    </p>
                  </div>
                  <Switch 
                    checked={emailSettings.newsletter}
                    onCheckedChange={(checked) => {
                      setEmailSettings({...emailSettings, newsletter: checked});
                    }}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => {
                  toast({
                    title: "Email preferences updated",
                    description: "Your email settings have been saved",
                  });
                }}
              >
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email.
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => {
                      setNotificationSettings({...notificationSettings, emailNotifications: checked});
                    }}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Browser notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive browser push notifications when you're online.
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.browserNotifications}
                    onCheckedChange={(checked) => {
                      setNotificationSettings({...notificationSettings, browserNotifications: checked});
                      if (checked) {
                        toast({
                          title: "Permission required",
                          description: "We'll ask for your permission to send browser notifications.",
                        });
                      }
                    }}
                  />
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-medium pt-2">Notify me about</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Campaign completions</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when a campaign is completed.
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.campaignCompletions}
                    onCheckedChange={(checked) => {
                      setNotificationSettings({...notificationSettings, campaignCompletions: checked});
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Lead captures</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new leads are captured.
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.leadCaptures}
                    onCheckedChange={(checked) => {
                      setNotificationSettings({...notificationSettings, leadCaptures: checked});
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when weekly performance reports are available.
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) => {
                      setNotificationSettings({...notificationSettings, weeklyReports: checked});
                    }}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => {
                  toast({
                    title: "Notification settings updated",
                    description: "Your notification preferences have been saved",
                  });
                }}
              >
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Manage your subscription plan and payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Current Plan</h3>
                    <p className="text-2xl font-bold mt-1">
                      <GradientText>Pro Plan</GradientText>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Billed Monthly</p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Upgrade plan",
                        description: "Opening plan options...",
                      });
                    }}
                  >
                    Upgrade Plan
                  </Button>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-sm text-gray-500">Your next billing date is:</span>
                  <span className="ml-1 text-sm font-medium">June 15, 2025</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Payment Method</h3>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-gray-500">Expires 04/25</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Edit payment method",
                        description: "Opening payment options...",
                      });
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Add payment method",
                      description: "Opening payment form...",
                    });
                  }}
                >
                  Add Payment Method
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Billing History</h3>
                <div className="border rounded-md divide-y">
                  {[
                    { date: 'May 15, 2025', amount: '$39.99', invoice: 'INV-2025-05' },
                    { date: 'Apr 15, 2025', amount: '$39.99', invoice: 'INV-2025-04' },
                    { date: 'Mar 15, 2025', amount: '$39.99', invoice: 'INV-2025-03' }
                  ].map((invoice, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-4">
                      <div>
                        <p className="font-medium">{invoice.date}</p>
                        <p className="text-sm text-gray-500">{invoice.invoice}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="font-medium">{invoice.amount}</p>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0"
                          onClick={() => {
                            toast({
                              title: "Downloading invoice",
                              description: `Downloading ${invoice.invoice}.pdf`,
                            });
                          }}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}