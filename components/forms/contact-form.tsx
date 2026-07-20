'use client';

import { useCallback, useState } from 'react';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { trackConversionEvent } from '@/components/analytics/conversion-tracker';

const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  leadType: z.enum(['land', 'commercial', 'investor', 'partnership', 'inquiry']),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  defaultLeadType?: 'land' | 'commercial' | 'investor' | 'partnership' | 'inquiry';
}

export function ContactForm({ defaultLeadType = 'inquiry' }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileExpire = useCallback(() => setTurnstileToken(''), []);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      leadType: defaultLeadType,
      message: '',
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          source: 'website',
          turnstileToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      toast({
        title: 'Success',
        description: 'Your message has been sent. We\'ll be in touch soon!',
      });
      trackConversionEvent('successful_submission', { form_name: 'contact_form' });

      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
      trackConversionEvent('form_error', {
        form_name: 'contact_form',
        error_type: 'request',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, () => {
          trackConversionEvent('form_error', {
            form_name: 'contact_form',
            error_type: 'validation',
          });
        })}
        className="space-y-6"
        data-analytics-form="contact_form"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone field hidden for GHL A2P compliance — GHL widget is the single opt-in source */}
          <input type="hidden" name="phone" value={form.getValues('phone')} />

        </div>

        <FormField
          control={form.control}
          name="leadType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interest Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="land">Property Review</SelectItem>
                  <SelectItem value="commercial">Commercial Real Estate</SelectItem>
                  <SelectItem value="investor">Investor Relations</SelectItem>
                  <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                  <SelectItem value="inquiry">General Inquiry</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="For a property review, include the property address and anything you already know. No long questionnaire is required."
                  className="min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <TurnstileWidget onToken={setTurnstileToken} onExpire={onTurnstileExpire} />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Sending...' : 'Send Inquiry'}
        </Button>

        <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
          See our{' '}
          <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link> and{' '}
          <Link href="/terms" className="underline hover:text-foreground">Terms of Service</Link>.
        </p>
      </form>
    </Form>
  );
}
