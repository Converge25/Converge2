import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, Mail, MessageSquare, Instagram, 
  LayoutPanelTop, BarChart2, Search, Settings, 
  ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { GradientText, GradientDivider } from '@/components/ui/theme';

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
};

const NavItem = ({ href, icon, children, active, isCollapsed, onClick }: NavItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center py-3 px-3 rounded-lg transition-all duration-200 group cursor-pointer",
        active 
          ? "bg-gradient-to-r from-indigo-500/90 to-purple-500/90 text-white" 
          : "hover:bg-gray-100/70 text-gray-700",
        isCollapsed ? "justify-center" : ""
      )}
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          window.location.href = href;
        }
      }}
    >
      <span className={cn(
        "p-1 rounded-md",
        active ? "text-white" : "text-indigo-600 group-hover:text-indigo-700"
      )}>
        {icon}
      </span>
      {!isCollapsed && (
        <span className={cn(
          "ml-3 font-medium transition-all",
          active ? "text-white" : "text-gray-700 group-hover:text-gray-900"
        )}>
          {children}
        </span>
      )}
    </div>
  );
};

export default function Sidebar() {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Hide sidebar on mobile screens
  if (isMobile) {
    return null;
  }
  
  return (
    <div 
      className={cn(
        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "h-16 flex items-center px-6 border-b border-gray-200",
        isCollapsed ? "justify-center" : ""
      )}>
        {isCollapsed ? (
          <Sparkles className="h-6 w-6 text-indigo-600" />
        ) : (
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 text-indigo-600 mr-2" />
            <GradientText variant="secondary" className="text-xl font-bold">
              Converge
            </GradientText>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-1">
          <NavItem 
            href="/app/dashboard" 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            active={location === "/app/dashboard"}
            isCollapsed={isCollapsed}
          >
            Dashboard
          </NavItem>
          
          <NavItem 
            href="/app/emails" 
            icon={<Mail className="h-5 w-5" />} 
            active={location.startsWith("/app/emails")}
            isCollapsed={isCollapsed}
          >
            Email Marketing
          </NavItem>
          
          <NavItem 
            href="/app/sms" 
            icon={<MessageSquare className="h-5 w-5" />} 
            active={location.startsWith("/app/sms")}
            isCollapsed={isCollapsed}
          >
            SMS Marketing
          </NavItem>
          
          <NavItem 
            href="/app/social" 
            icon={<Instagram className="h-5 w-5" />} 
            active={location.startsWith("/app/social")}
            isCollapsed={isCollapsed}
          >
            Social Media
          </NavItem>
          
          <NavItem 
            href="/app/popups" 
            icon={<LayoutPanelTop className="h-5 w-5" />} 
            active={location.startsWith("/app/popups")}
            isCollapsed={isCollapsed}
          >
            Popups
          </NavItem>
        </div>
        
        {!isCollapsed && <GradientDivider className="my-6" variant="secondary" />}
        
        <div className="space-y-1 mt-6">
          <NavItem 
            href="/app/analytics" 
            icon={<BarChart2 className="h-5 w-5" />} 
            active={location.startsWith("/app/analytics")}
            isCollapsed={isCollapsed}
          >
            Analytics
          </NavItem>
          
          <NavItem 
            href="/app/seo" 
            icon={<Search className="h-5 w-5" />} 
            active={location.startsWith("/app/seo")}
            isCollapsed={isCollapsed}
          >
            SEO Tools
          </NavItem>
          
          <NavItem 
            href="/app/settings" 
            icon={<Settings className="h-5 w-5" />} 
            active={location.startsWith("/app/settings")}
            isCollapsed={isCollapsed}
          >
            Settings
          </NavItem>
          
          <NavItem 
            href="/app/ai" 
            icon={<Sparkles className="h-5 w-5" />} 
            active={location.startsWith("/app/ai")}
            isCollapsed={isCollapsed}
          >
            AI Assistant
          </NavItem>
        </div>
      </nav>
      
      {/* Collapse button */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center justify-center"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}