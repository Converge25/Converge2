import React from 'react';
import { Link } from 'wouter';
import { GradientText, GradientBg, GradientButton } from '@/components/ui/theme';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <GradientBg variant="subtle" className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100">
          <AlertTriangle className="h-8 w-8 text-indigo-600" />
        </div>
        
        <h1 className="text-7xl font-bold mb-2">
          <GradientText>404</GradientText>
        </h1>
        
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <a className="inline-block">
              <GradientButton className="w-full sm:w-auto flex items-center justify-center">
                <Home className="h-4 w-4 mr-2" /> Go Home
              </GradientButton>
            </a>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
          </button>
        </div>
      </div>
    </GradientBg>
  );
}