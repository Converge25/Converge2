
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface LeadCapturePopupProps {
  isOpen: boolean;
  onClose: () => void;
  config: {
    title: string;
    description: string;
    buttonLabel: string;
    design: {
      backgroundColor: string;
      textColor: string;
      buttonColor: string;
    }
  }
}

interface FormData {
  email: string;
  name?: string;
  phone?: string;
}

export function LeadCapturePopup({ isOpen, onClose, config }: LeadCapturePopupProps) {
  const form = useForm<FormData>();
  const { toast } = useToast();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          source: 'popup'
        }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      toast({
        title: "Success!",
        description: "Thank you for subscribing!",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent style={{
        backgroundColor: config.design.backgroundColor,
        color: config.design.textColor
      }}>
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" required />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              style={{ backgroundColor: config.design.buttonColor }}
              className="w-full"
            >
              {config.buttonLabel}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
