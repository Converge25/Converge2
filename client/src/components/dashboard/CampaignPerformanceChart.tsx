import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  TooltipProps 
} from "recharts";

type ChartDataPoint = {
  date: string;
  email: number;
  sms: number;
  social: number;
};

type CampaignPerformanceChartProps = {
  data: ChartDataPoint[];
  isLoading: boolean;
};

export default function CampaignPerformanceChart({ data, isLoading }: CampaignPerformanceChartProps) {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };
  
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-md border border-gray-200">
          <p className="font-semibold mb-1">{label}</p>
          {payload.map((entry) => (
            <div key={entry.name} className="flex items-center text-sm">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="mr-2">{entry.name}:</span>
              <span className="font-medium">{entry.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <CardTitle className="text-base font-semibold">Campaign Performance</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-1.5"></div>
              Email
            </Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
              SMS
            </Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-1.5"></div>
              Social
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="w-full h-64" />
        ) : (
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate} 
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="email" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]} 
                  name="Email" 
                />
                <Bar 
                  dataKey="sms" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]} 
                  name="SMS" 
                />
                <Bar 
                  dataKey="social" 
                  fill="#8b5cf6" 
                  radius={[4, 4, 0, 0]} 
                  name="Social" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
