import { cn } from "@/lib/utils";
import React from "react";

// Gradient text component
interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
}

export function GradientText({ 
  children, 
  className, 
  variant = "primary" 
}: GradientTextProps) {
  const gradientClasses = {
    primary: "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600",
    secondary: "bg-gradient-to-r from-indigo-600 to-purple-600",
    accent: "bg-gradient-to-r from-pink-500 to-purple-600",
  };
  
  return (
    <span className={cn(
      gradientClasses[variant],
      "bg-clip-text text-transparent",
      className
    )}>
      {children}
    </span>
  );
}

// Gradient background component
interface GradientBgProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "subtle";
}

export function GradientBg({ 
  children, 
  className, 
  variant = "primary" 
}: GradientBgProps) {
  const gradientClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600",
    secondary: "bg-gradient-to-r from-indigo-600 to-purple-600",
    accent: "bg-gradient-to-r from-pink-500 to-purple-600",
    subtle: "bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50",
  };
  
  return (
    <div className={cn(
      gradientClasses[variant],
      className
    )}>
      {children}
    </div>
  );
}

// Gradient Button
interface GradientButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
  as?: React.ElementType;
  [key: string]: any;
}

export function GradientButton({ 
  children, 
  className, 
  variant = "primary",
  as: Component = "button",
  ...props
}: GradientButtonProps) {
  const gradientClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
    secondary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700",
    accent: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700",
  };
  
  return (
    <Component 
      className={cn(
        gradientClasses[variant],
        "text-white py-2 px-4 rounded-md shadow-md transition-all duration-300 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// Card with hover effects
interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  colorAccent?: "blue" | "purple" | "indigo" | "pink";
}

export function HoverCard({ 
  children, 
  className,
  colorAccent = "blue" 
}: HoverCardProps) {
  const accentClasses = {
    blue: "border-t-blue-500",
    purple: "border-t-purple-500",
    indigo: "border-t-indigo-500",
    pink: "border-t-pink-500"
  };
  
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden",
      "border-t-4", accentClasses[colorAccent],
      className
    )}>
      {children}
    </div>
  );
}

// Animated icon container
interface AnimatedIconProps {
  children: React.ReactNode;
  className?: string;
  color?: "blue" | "purple" | "indigo" | "pink";
}

export function AnimatedIcon({ 
  children, 
  className,
  color = "blue" 
}: AnimatedIconProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
    indigo: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
    pink: "bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white"
  };
  
  return (
    <div className={cn(
      "p-3 rounded-lg inline-block transition-colors duration-300",
      colorClasses[color],
      className
    )}>
      {children}
    </div>
  );
}

// Section Heading with gradient
interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({ 
  children, 
  className,
  centered = false
}: SectionHeadingProps) {
  return (
    <h2 className={cn(
      "text-2xl md:text-3xl font-bold mb-6",
      centered && "text-center",
      className
    )}>
      <GradientText variant="secondary">{children}</GradientText>
    </h2>
  );
}

// Gradient Divider
interface GradientDividerProps {
  className?: string;
  variant?: "primary" | "secondary" | "accent";
}

export function GradientDivider({ 
  className, 
  variant = "primary" 
}: GradientDividerProps) {
  const gradientClasses = {
    primary: "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600",
    secondary: "bg-gradient-to-r from-indigo-600 to-purple-600",
    accent: "bg-gradient-to-r from-pink-500 to-purple-600",
  };
  
  return (
    <div className={cn(
      "h-0.5 w-full",
      gradientClasses[variant],
      className
    )} />
  );
}