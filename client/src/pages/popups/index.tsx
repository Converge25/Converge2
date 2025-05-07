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
  Maximize2, 
  Eye, 
  MousePointer, 
  X, 
  Copy, 
  Layers,
  Settings,
  Clock
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { GradientText } from "@/components/ui/theme";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"; // Corrected import


export default function Popups() {
  const { toast } = useToast();

  // Fetch popups
  const { data: popupsData, isLoading } = useQuery({
    queryKey: ['/api/popups'],
    refetchOnWindowFocus: false,
  });

  const popups = popupsData || [];

  // Placeholder for the form handling function
  const handleCreatePopup = (data: any) => {
    console.log("Creating popup with data:", data);
    // Implement your API call here to create the popup
  };

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      triggerDelay: 0,
    },
  });


  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Popups & Lead Capture</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-1.5" />
              Create Popup
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Lead Capture Popup</DialogTitle>
              <DialogDescription>
                Configure your popup settings and design
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreatePopup)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Popup Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Get 10% Off Today!" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Subscribe to our newsletter" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="triggerDelay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Delay (seconds)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Create Popup</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Popups</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="leads">Collected Leads</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(3).fill(0).map((_, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-28 w-full mb-2 rounded-md" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : popups.filter((p: any) => p.status === 'active').length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Maximize2 className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Active Popups</h3>
                <p className="text-sm text-gray-500 text-center mb-4 max-w-md">
                  You don't have any active popups. Create a popup to capture leads and engage visitors to your store.
                </p>
                <Button
                  onClick={() => {
                    toast({
                      title: "Creating popup",
                      description: "Opening popup creator...",
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Create Your First Popup
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popups
                .filter((popup: any) => popup.status === 'active')
                .map((popup: any) => (
                <Card key={popup.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{popup.name}</CardTitle>
                        <CardDescription>
                          {popup.type} popup
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Switch 
                          checked={popup.isEnabled} 
                          onCheckedChange={() => {
                            toast({
                              title: popup.isEnabled ? "Popup disabled" : "Popup enabled",
                              description: popup.isEnabled ? "The popup is now disabled" : "The popup is now enabled",
                            });
                          }}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 h-28 rounded-md flex items-center justify-center mb-3 relative">
                      <span className="text-xs text-gray-500">Popup Preview</span>
                      <Badge className="absolute top-2 right-2 bg-indigo-100 text-indigo-800">
                        {popup.displayType}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-indigo-600">{popup.impressions || 0}</div>
                        <div className="text-xs text-gray-500">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-indigo-600">{popup.conversions || 0}</div>
                        <div className="text-xs text-gray-500">Leads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-indigo-600">
                          {popup.impressions ? Math.round((popup.conversions / popup.impressions) * 100) : 0}%
                        </div>
                        <div className="text-xs text-gray-500">Rate</div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {popup.targetPages} pages
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {popup.triggerDelay || 0}s delay
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Editing popup",
                          description: "Opening popup editor...",
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
                          title: "Duplicating popup",
                          description: "Creating a copy of this popup",
                        });
                      }}
                    >
                      Duplicate
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="drafts">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(2).fill(0).map((_, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-28 w-full mb-2 rounded-md" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : popups.filter((p: any) => p.status === 'draft').length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Layers className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Draft Popups</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  You don't have any popups in draft mode.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popups
                .filter((popup: any) => popup.status === 'draft')
                .map((popup: any) => (
                <Card key={popup.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{popup.name}</CardTitle>
                        <CardDescription>
                          {popup.type} popup (Draft)
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Draft</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 h-28 rounded-md flex items-center justify-center mb-3 relative">
                      <span className="text-xs text-gray-500">Popup Preview</span>
                      <Badge className="absolute top-2 right-2 bg-gray-200 text-gray-700">
                        {popup.displayType}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      Last edited on {new Date(popup.updatedAt || popup.createdAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Editing popup",
                          description: "Opening popup editor...",
                        });
                      }}
                    >
                      Continue Editing
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Publishing popup",
                          description: "The popup is now active",
                        });
                      }}
                    >
                      Publish
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Collected Leads</CardTitle>
              <CardDescription>
                View and export leads captured through your popups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium text-lg">{popups.reduce((sum: number, popup: any) => sum + (popup.conversions || 0), 0)}</span> total leads collected
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Exporting leads",
                      description: "Your leads are being exported to CSV",
                    });
                  }}
                >
                  Export CSV
                </Button>
              </div>

              {popups.reduce((sum: number, popup: any) => sum + (popup.conversions || 0), 0) === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-sm text-gray-500 mb-4">
                    No leads collected yet. Once your popups are active and capturing leads, they'll appear here.
                  </p>
                </div>
              ) : (
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted py-2 px-4 text-sm font-medium grid grid-cols-12">
                    <div className="col-span-3">Name</div>
                    <div className="col-span-4">Email</div>
                    <div className="col-span-2">Source</div>
                    <div className="col-span-3">Date</div>
                  </div>
                  <div className="divide-y">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="py-2 px-4 text-sm grid grid-cols-12 hover:bg-muted/50">
                        <div className="col-span-3">John Doe</div>
                        <div className="col-span-4">example@email.com</div>
                        <div className="col-span-2">Newsletter Popup</div>
                        <div className="col-span-3 text-gray-500">{new Date().toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardContent className="py-8">
              <h3 className="text-lg font-medium text-center mb-4">Popup Analytics</h3>
              <p className="text-center text-gray-500">
                Detailed analytics and performance metrics will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}