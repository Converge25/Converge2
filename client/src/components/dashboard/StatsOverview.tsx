import { ArrowUp, ArrowDown } from "lucide-react";
import StatCard from "./StatCard";

type StatsProps = {
  emailOpenRate: number;
  smsClickRate: number;
  socialEngagement: number;
  popupConversion: number;
  emailChangePercent: number;
  smsChangePercent: number;
  socialChangePercent: number;
  popupChangePercent: number;
  isLoading: boolean;
};

export default function StatsOverview({
  emailOpenRate = 0,
  smsClickRate = 0,
  socialEngagement = 0,
  popupConversion = 0,
  emailChangePercent = 0,
  smsChangePercent = 0,
  socialChangePercent = 0,
  popupChangePercent = 0,
  isLoading = false,
}: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Email Open Rate"
        value={`${(emailOpenRate * 100).toFixed(1)}%`}
        changePercent={emailChangePercent}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
          </svg>
        }
        iconColor="blue"
        isLoading={isLoading}
      />
      
      <StatCard
        title="SMS Click Rate"
        value={`${(smsClickRate * 100).toFixed(1)}%`}
        changePercent={smsChangePercent}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        }
        iconColor="green"
        isLoading={isLoading}
      />
      
      <StatCard
        title="Social Engagement"
        value={`${(socialEngagement * 100).toFixed(1)}%`}
        changePercent={socialChangePercent}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        }
        iconColor="purple"
        isLoading={isLoading}
      />
      
      <StatCard
        title="Popup Conversion"
        value={`${(popupConversion * 100).toFixed(1)}%`}
        changePercent={popupChangePercent}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        iconColor="yellow"
        isLoading={isLoading}
      />
    </div>
  );
}
