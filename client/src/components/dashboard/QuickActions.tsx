import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Hash, CheckCircle } from "lucide-react";

export default function QuickActions() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/app/emails">
            <a className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                <Mail className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">Create Email Campaign</span>
            </a>
          </Link>
          
          
          
          <Link href="/app/social">
            <a className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-purple-600 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-3">
                <Hash className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">Schedule Social Post</span>
            </a>
          </Link>
          
          <Link href="/app/popups">
            <a className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-yellow-600 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-3">
                <CheckCircle className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">Create Popup</span>
            </a>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
