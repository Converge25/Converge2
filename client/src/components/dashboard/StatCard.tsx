import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  changePercent: number;
  icon: React.ReactNode;
  iconColor: "blue" | "green" | "purple" | "yellow";
  isLoading?: boolean;
};

export default function StatCard({
  title,
  value,
  changePercent,
  icon,
  iconColor,
  isLoading = false,
}: StatCardProps) {
  const getIconColorClass = () => {
    switch (iconColor) {
      case "blue":
        return "bg-blue-100 text-blue-600";
      case "green":
        return "bg-green-100 text-green-600";
      case "purple":
        return "bg-purple-100 text-purple-600";
      case "yellow":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  
  const isPositive = changePercent >= 0;
  
  return (
    <div className="bg-white rounded-lg shadow p-5 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {isLoading ? (
            <Skeleton className="h-8 w-20 mt-1" />
          ) : (
            <p className="text-2xl font-semibold mt-1">{value}</p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColorClass()}`}>
          {icon}
        </div>
      </div>
      
      <div className="mt-2 flex items-center">
        {isLoading ? (
          <Skeleton className="h-5 w-24" />
        ) : (
          <>
            <span className={`text-sm font-medium flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(changePercent).toFixed(1)}%
            </span>
            <span className="text-xs text-gray-500 ml-1.5">vs last period</span>
          </>
        )}
      </div>
    </div>
  );
}
