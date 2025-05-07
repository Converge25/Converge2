import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, CreditCard, Clock, ArrowRight } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const pricingPlans = [
  {
    id: "free",
    name: "Free",
    description: "Basic features for small stores just getting started",
    price: 0,
    features: [
      "Up to 1,000 emails per month",
      "Basic email templates",
      "Simple popup creator",
      "Manual social media posting",
      "Basic analytics"
    ],
    limitations: [
      "No SMS marketing",
      "Limited customer segmentation",
      "No AI features"
    ]
  },
  {
    id: "basic",
    name: "Basic",
    description: "Essential tools for growing businesses",
    price: 29,
    features: [
      "Up to 10,000 emails per month",
      "SMS messaging (up to 1,000 SMS)",
      "Advanced email templates",
      "Enhanced popups with targeting",
      "Social media scheduling",
      "Customer segmentation",
      "Basic AI content suggestions"
    ],
    limitations: [
      "Limited A/B testing",
      "Basic SEO features only"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    description: "Advanced features for established businesses",
    price: 79,
    features: [
      "Unlimited emails",
      "Up to 10,000 SMS messages",
      "Advanced A/B testing",
      "Full social media automation",
      "Complete AI marketing assistant",
      "Advanced analytics and reporting",
      "Advanced SEO tools",
      "Custom popup designs",
      "Priority support"
    ],
    limitations: []
  }
];

export default function SettingsSubscription() {
  const { toast } = useToast();
  
  // Fetch subscription data
  const { data: subscriptionData, isLoading } = useQuery({
    queryKey: ['/api/billing/subscription'],
    refetchOnWindowFocus: false,
    onError: () => {
      toast({
        title: "Error loading subscription",
        description: "Could not load your subscription data. Please try again later.",
        variant: "destructive",
      });
    },
    enabled: false, // Disabled since this endpoint isn't implemented yet
  });
  
  // Mock subscription data
  const subscription = {
    tier: "basic",
    status: "active",
    nextBillingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15) // 15 days from now
  };
  
  const upgradePlan = async (planId: string) => {
    try {
      // In a real app, this would redirect to Shopify billing API
      toast({
        title: "Redirecting to billing",
        description: "You'll be redirected to complete your subscription upgrade.",
      });
    } catch (error) {
      toast({
        title: "Error upgrading plan",
        description: "Could not process your upgrade request. Please try again later.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Subscription Plan</h2>
      </div>
      
      <Tabs defaultValue="current">
        <TabsList className="mb-4">
          <TabsTrigger value="current">Current Plan</TabsTrigger>
          <TabsTrigger value="plans">Available Plans</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>Current Subscription</CardTitle>
              <CardDescription>
                Details about your current subscription plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium capitalize">
                        {subscription.tier} Plan
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <Badge variant={subscription.status === 'active' ? 'success' : 'default'} className="mr-2">
                          {subscription.status}
                        </Badge>
                        Next billing date: {subscription.nextBillingDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        ${pricingPlans.find(p => p.id === subscription.tier)?.price}
                        <span className="text-sm font-normal text-gray-500">/month</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Plan Features</h4>
                    <ul className="space-y-2">
                      {pricingPlans.find(p => p.id === subscription.tier)?.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {pricingPlans.find(p => p.id === subscription.tier)?.limitations.length > 0 && (
                      <>
                        <h4 className="font-medium pt-2">Limitations</h4>
                        <ul className="space-y-2">
                          {pricingPlans.find(p => p.id === subscription.tier)?.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start text-gray-500">
                              <span className="mr-2">•</span>
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Manage Payment Method</Button>
              {subscription.tier !== 'premium' && (
                <Button onClick={() => upgradePlan('premium')}>
                  Upgrade Plan
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="plans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`flex flex-col ${plan.id === subscription.tier ? 'border-blue-500 shadow-md' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      {plan.id === subscription.tier && (
                        <Badge className="mt-1">Current Plan</Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold">${plan.price}</span>
                      <span className="text-sm font-normal text-gray-500">/month</span>
                    </div>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    <h4 className="font-medium">Features</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations.length > 0 && (
                      <>
                        <h4 className="font-medium pt-2">Limitations</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start text-gray-500">
                              <span className="mr-2">•</span>
                              <span className="text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  {plan.id === subscription.tier ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button 
                      className="w-full"
                      variant={plan.id === 'premium' ? 'default' : 'outline'}
                      onClick={() => upgradePlan(plan.id)}
                    >
                      {subscription.tier === 'free' ? 'Subscribe' : 
                       plan.price > pricingPlans.find(p => p.id === subscription.tier)?.price 
                         ? 'Upgrade' : 'Downgrade'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View your past invoices and payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Basic Plan - May 2023</h4>
                      <p className="text-sm text-gray-500">May 1, 2023</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$29.00</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Paid</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Basic Plan - April 2023</h4>
                      <p className="text-sm text-gray-500">April 1, 2023</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$29.00</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Paid</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Basic Plan - March 2023</h4>
                      <p className="text-sm text-gray-500">March 1, 2023</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$29.00</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Paid</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Download All Invoices
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
