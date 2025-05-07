import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { shopify } from '@/lib/shopify';
import { Sparkles, Send, BarChartBig, LayoutGrid, MessageSquare, Instagram, Mail, WifiIcon } from 'lucide-react';

export default function Home() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const [shopDomain, setShopDomain] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shopDomain) {
      toast({
        title: 'Shop domain required',
        description: 'Please enter your Shopify shop domain',
        variant: 'destructive',
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      // Redirect to Shopify OAuth flow
      shopify.startAuth(shopDomain);
      // This will redirect, so the code below won't execute
    } catch (error) {
      console.error('Connection error:', error);
      setIsConnecting(false);
      toast({
        title: 'Connection failed',
        description: 'Failed to connect to Shopify. Please check your shop domain and try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400"></div>
      
      <header className="py-6 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Converge</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 font-medium">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 font-medium">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 font-medium">Docs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 font-medium">Blog</a></li>
            </ul>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <LayoutGrid className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero section */}
          <div className="text-center max-w-4xl mx-auto space-y-6 mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Supercharge Your Shopify Marketing
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your all-in-one marketing platform for Shopify. Email campaigns, SMS messaging, 
              social media management, and powerful analytics — all in one beautiful dashboard.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md">
                Learn More <Send className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                onClick={() => {
                  // Direct users to the demo dashboard without Shopify connection
                  window.location.href = "/app/dashboard";
                }}
              >
                Try Demo
              </Button>
            </div>
          </div>

          {/* Connect store card */}
          <Card className="max-w-3xl mx-auto shadow-xl border-0 rounded-xl overflow-hidden mb-20">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h2 className="text-white text-xl font-semibold">Get Started in Minutes</h2>
              <p className="text-blue-100">Connect your Shopify store to unlock all features</p>
            </div>
            
            <CardContent className="p-8">
              <form onSubmit={handleConnect} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="shop" className="text-lg font-medium">Shopify Shop Domain</Label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-full">
                      <Input 
                        id="shop" 
                        placeholder="your-store.myshopify.com" 
                        value={shopDomain}
                        onChange={(e) => setShopDomain(e.target.value)}
                        className="pl-4 pr-10 py-6 text-lg border-2 border-gray-200 rounded-lg focus:border-indigo-400"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <WifiIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isConnecting}
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 py-6 px-8 text-lg font-medium shadow-md"
                    >
                      {isConnecting ? 'Connecting...' : 'Connect Store'}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    For example: "your-store.myshopify.com"
                  </p>
                </div>
              </form>
            </CardContent>
            
            <CardFooter className="bg-gray-50 px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 border-t">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Secure connection</span>
              </div>
              <div className="text-sm text-gray-500">
                Have questions? <a href="#" className="text-indigo-600 hover:underline font-medium">Contact support</a>
              </div>
            </CardFooter>
          </Card>

          {/* Feature highlights */}
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              All-in-One Marketing Suite
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-2 bg-blue-500 w-full"></div>
              <CardContent className="p-6 pt-8">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Mail className="h-6 w-6" />
                </div>
                <CardTitle className="mb-3 text-xl">Email Marketing</CardTitle>
                <p className="text-gray-600 group-hover:text-gray-800">
                  Create beautiful email campaigns, automate workflows, and track open rates and engagement.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-2 bg-purple-500 w-full"></div>
              <CardContent className="p-6 pt-8">
                <div className="bg-purple-100 text-purple-600 p-3 rounded-lg inline-block mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <CardTitle className="mb-3 text-xl">SMS Marketing</CardTitle>
                <p className="text-gray-600 group-hover:text-gray-800">
                  Engage customers with personalized SMS messages, time-sensitive offers and abandoned cart reminders.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-2 bg-indigo-500 w-full"></div>
              <CardContent className="p-6 pt-8">
                <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg inline-block mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <Instagram className="h-6 w-6" />
                </div>
                <CardTitle className="mb-3 text-xl">Social Media</CardTitle>
                <p className="text-gray-600 group-hover:text-gray-800">
                  Schedule and publish content across social platforms while analyzing engagement metrics.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="h-2 bg-pink-500 w-full"></div>
              <CardContent className="p-6 pt-8">
                <div className="bg-pink-100 text-pink-600 p-3 rounded-lg inline-block mb-3 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300">
                  <BarChartBig className="h-6 w-6" />
                </div>
                <CardTitle className="mb-3 text-xl">Analytics</CardTitle>
                <p className="text-gray-600 group-hover:text-gray-800">
                  Gain actionable insights with comprehensive reporting to optimize your marketing efforts.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md text-lg py-6 px-10 mr-4" 
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Connect Your Store
            </Button>
            <Button 
              variant="outline"
              className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-lg py-6 px-10" 
              size="lg"
              onClick={() => {
                window.location.href = "/app/dashboard";
              }}
            >
              Try Demo
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="mt-24 bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-indigo-400" />
                <span className="font-bold text-xl text-white">Converge</span>
              </div>
              <p className="text-gray-400 mb-4">
                The all-in-one marketing platform designed for Shopify stores. Grow your business with our powerful tools.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-3 text-lg">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Case Studies</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Reviews</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 text-lg">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 text-lg">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">API Reference</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 Converge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}