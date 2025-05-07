
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ResponsiveContainer, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Analytics() {
  const data = [
    { name: 'Jan', visits: 400, profit: 240 },
    { name: 'Feb', visits: 300, profit: 139 },
    { name: 'Mar', visits: 200, profit: 980 },
    { name: 'Apr', visits: 278, profit: 390 },
    { name: 'May', visits: 189, profit: 480 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Overview</h1>
      <Card>
        <CardContent className="py-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visits" stroke="#8884d8" name="Visits" />
                <Line type="monotone" dataKey="profit" stroke="#16a34a" name="Profit" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
