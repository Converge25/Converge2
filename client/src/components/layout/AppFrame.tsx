import React from 'react';
import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { GradientBg, GradientDivider } from '@/components/ui/theme';
import { Settings, Bell, Search, User, SunMoon, LogOut, HelpCircle } from 'lucide-react';
import { NotificationBell, useNotification } from '@/components/ui/notifications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppFrameProps {
  children: React.ReactNode;
}

export default function AppFrame({ children }: AppFrameProps) {
  const isMobile = useIsMobile();
  const { showNotification } = useNotification();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center w-full max-w-md">
              <div className="relative w-full">
                <Input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {!isMobile && (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      alert("Theme toggled!");
                      // Here you would implement actual theme toggle functionality
                    }}
                  >
                    <SunMoon className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full text-gray-500 hover:text-gray-700 relative"
                    onClick={() => {
                      showNotification({
                        type: 'info',
                        title: 'Notifications',
                        description: 'You have no new notifications',
                      });
                    }}
                  >
                    <NotificationBell />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      window.location.href = "/app/settings";
                    }}
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar 
                    className="h-8 w-8 transition-all hover:ring-2 hover:ring-indigo-500 cursor-pointer"
                  >
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                      SM
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => window.location.href = "/app/settings"}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.href = "/app/settings"}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help & Support</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Color gradient line */}
          <GradientDivider />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}