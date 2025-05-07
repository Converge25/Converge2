import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BotMessageSquare, Lightbulb, Send, FileText, Mail, Brain, CircleCheck, CircleAlert } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

export default function AI() {
  const { toast } = useToast();
  const [userInput, setUserInput] = useState("");
  const [emailPrompt, setEmailPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [showGenerateButtons, setShowGenerateButtons] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Chat history
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI marketing assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  
  // Handle chat form submission
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    // Add user message to chat
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMessage]);
    setUserInput("");
    
    // In a real app, we would send this to an AI API
    // For now, let's just simulate a response
    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you need help with marketing. What specific area would you like assistance with? I can help with email campaigns, social media content, or customer targeting strategies.",
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, assistantResponse]);
    }, 1000);
  };
  
  // Generate AI content (email, social post, etc.)
  const generateContent = async (type: string) => {
    setIsGenerating(true);
    setShowGenerateButtons(false);
    
    // In a real app, we would call an AI API
    // For now, just simulate a response
    setTimeout(() => {
      let content = "";
      
      if (type === "email") {
        content = `Subject: Special Offer for Our Valued Customers

Dear [Customer Name],

We hope this email finds you well. We're excited to share our latest collection with you, featuring items we think you'll love based on your previous purchases.

For a limited time, enjoy 15% off your next order with code: WELCOME15

Shop now and discover our newest arrivals!

Best regards,
[Your Store Team]`;
      } else if (type === "social") {
        content = `✨ NEW ARRIVALS ALERT! ✨

Our spring collection is here and it's everything you've been waiting for! 🌸

👉 Swipe to see our favorite pieces
👉 Limited quantities available
👉 Free shipping on orders over $50

Shop now through the link in our bio!

#SpringFashion #NewArrivals #ShopNow`;
      }
      
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
  };
  
  // Generate email based on prompt
  const handleEmailGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt for your email",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // In a real app, we would call an AI API
    // For now, just simulate a response
    setTimeout(() => {
      setGeneratedContent(`Subject: ${emailPrompt}

Dear [Customer Name],

Thank you for being a valued customer of our store. We appreciate your continued support.

${emailPrompt}

We hope to see you again soon!

Best regards,
[Your Store Team]`);
      
      setIsGenerating(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">AI-Powered Support</h2>
      </div>
      
      <Tabs defaultValue="assistant">
        <TabsList className="mb-4">
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="generator">Content Generator</TabsTrigger>
          <TabsTrigger value="analytics">AI Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assistant">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Marketing Assistant</CardTitle>
              <CardDescription>
                Ask questions about marketing, get campaign ideas, or get help with strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-[400px]">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
                
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Textarea 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1 resize-none"
                  />
                  <Button type="submit" className="self-end">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Marketing Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Ask the AI for marketing tips specific to your industry or product types.</p>
                <Button variant="ghost" className="w-full mt-2">
                  <Lightbulb className="h-4 w-4 mr-1.5" />
                  Get Marketing Tips
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Analyze Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Ask the AI to analyze your campaign performance and suggest improvements.</p>
                <Button variant="ghost" className="w-full mt-2">
                  <BotMessageSquare className="h-4 w-4 mr-1.5" />
                  Analyze My Campaigns
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Customer Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Get AI-powered insights about your customer behavior and preferences.</p>
                <Button variant="ghost" className="w-full mt-2">
                  <Brain className="h-4 w-4 mr-1.5" />
                  Get Customer Insights
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="generator">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Content Generator</CardTitle>
                  <CardDescription>
                    Generate marketing content for various channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {showGenerateButtons ? (
                    <>
                      <Button 
                        onClick={() => generateContent('email')} 
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Generate Email
                      </Button>
                      
                      <Button 
                        onClick={() => generateContent('social')} 
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Social Post
                      </Button>
                      
                      <form onSubmit={handleEmailGeneration} className="space-y-2 pt-4 border-t">
                        <h3 className="text-sm font-medium">Custom Email</h3>
                        <Input
                          value={emailPrompt}
                          onChange={(e) => setEmailPrompt(e.target.value)}
                          placeholder="Enter email topic or purpose..."
                          className="w-full"
                        />
                        <Button type="submit" className="w-full">
                          <Lightbulb className="h-4 w-4 mr-1.5" />
                          Generate Custom Email
                        </Button>
                      </form>
                    </>
                  ) : (
                    <Button 
                      onClick={() => setShowGenerateButtons(true)} 
                      variant="outline" 
                      className="w-full"
                    >
                      Generate Something Else
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Generated Content</CardTitle>
                  <CardDescription>
                    Edit the generated content before using it
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {isGenerating ? (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <Brain className="h-12 w-12 mx-auto text-blue-600 animate-pulse mb-4" />
                        <p className="text-gray-500">Generating content...</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Textarea 
                        value={generatedContent}
                        onChange={(e) => setGeneratedContent(e.target.value)}
                        placeholder="Generated content will appear here..."
                        className="flex-1 resize-none min-h-[300px]"
                      />
                      
                      {generatedContent && (
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline">
                            <CircleCheck className="h-4 w-4 mr-1.5" />
                            Copy to Clipboard
                          </Button>
                          <Button>
                            <CircleCheck className="h-4 w-4 mr-1.5" />
                            Use This Content
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>AI Insights & Recommendations</CardTitle>
              <CardDescription>
                AI-powered insights based on your store and marketing data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="text-base font-medium text-blue-800 mb-1">Improve Email Open Rates</h3>
                      <p className="text-sm text-blue-700">
                        Your email open rates are below industry average. Try these recommendations:
                      </p>
                      <ul className="text-sm text-blue-700 list-disc ml-5 mt-1">
                        <li>Test different subject lines with A/B testing</li>
                        <li>Send emails at optimal times (Tuesdays and Thursdays between 10am-2pm)</li>
                        <li>Segment your audience more specifically</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-green-50 border-green-200">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="text-base font-medium text-green-800 mb-1">Social Media Opportunity</h3>
                      <p className="text-sm text-green-700">
                        Based on your customer demographics, Instagram would be an effective channel for your marketing:
                      </p>
                      <ul className="text-sm text-green-700 list-disc ml-5 mt-1">
                        <li>Your target demographic spends 40% more time on Instagram than other platforms</li>
                        <li>Product category typically sees 3.2% higher engagement on visual platforms</li>
                        <li>Consider investing more in Instagram-specific content</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-purple-50 border-purple-200">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="text-base font-medium text-purple-800 mb-1">Customer Segment Insight</h3>
                      <p className="text-sm text-purple-700">
                        We've identified a high-value customer segment you should target specifically:
                      </p>
                      <ul className="text-sm text-purple-700 list-disc ml-5 mt-1">
                        <li>Customers who purchased in the last 30-60 days</li>
                        <li>Average order value 35% higher than normal</li>
                        <li>Strong interest in new product categories</li>
                        <li>Create a tailored email campaign for this segment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
