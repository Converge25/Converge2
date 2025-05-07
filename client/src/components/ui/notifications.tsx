
import React from 'react';
import { Toast } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Bell, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationProps {
  type?: NotificationType;
  title: string;
  description?: string;
  duration?: number;
}

const notificationStyles = {
  success: {
    icon: CheckCircle,
    className: 'text-green-500',
  },
  error: {
    icon: XCircle,
    className: 'text-red-500',
  },
  warning: {
    icon: AlertCircle,
    className: 'text-yellow-500',
  },
  info: {
    icon: Info,
    className: 'text-blue-500',
  },
};

export function useNotification() {
  const { toast } = useToast();

  const showNotification = ({
    type = 'info',
    title,
    description,
    duration = 5000,
  }: NotificationProps) => {
    const { icon: Icon, className } = notificationStyles[type];

    toast({
      title,
      description,
      duration,
      className: cn('flex items-center gap-2', className),
      icon: <Icon className="h-5 w-5" />,
    });
  };

  return { showNotification };
}

export function NotificationBell() {
  return (
    <div className="relative">
      <Bell className="h-5 w-5" />
      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
    </div>
  );
}
