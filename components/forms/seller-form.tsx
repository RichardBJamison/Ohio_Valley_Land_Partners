'use client';

import { useCallback, useState } from 'react';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { sellerPositioning } from '@/lib/public-copy';
import { siteConfig } from '@/lib/seo-config';
import { trackConversionEvent } from '@/components/analytics/conversion-tracker';

export function SellerForm() {
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileExpire = useCallback(() => setTurnstileToken(''), []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!address.trim() || !email.trim()) {
      setError('Both fields are required.');
      trackConversionEvent('form_error', {
        form_name: 'seller_property_review',
        error_type: 'validation',
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, email, turnstileToken }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
      trackConversionEvent('successful_submission', {
        form_name: 'seller_property_review',
      });
    } catch {
      setError('Something went wrong. Call us directly at (614) 653-7430.');
      trackConversionEvent('form_error', {
        form_name: 'seller_property_review',
        error_type: 'request',
      });
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <h3 className="text-xl font-bold text-foreground">We Got It</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          We&apos;ll review the address and determine whether the property fits our current buying criteria. There is no obligation to sell.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      data-analytics-form="seller_property_review"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="seller-address" className="text-sm font-semibold text-foreground">
          Property Address
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="seller-address"
            type="text"
            placeholder="123 Elm St, Newark, OH 43055"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="pl-9"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="seller-email" className="text-sm font-semibold text-foreground">
          Your Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="seller-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-9"
            required
          />
        </div>
      </div>

      <TurnstileWidget onToken={setTurnstileToken} onExpire={onTurnstileExpire} />

      {error && (
        <p className="text-sm text-red-500" role="alert">{error}</p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full h-12 font-bold text-base"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Start My Property Review'
        )}
      </Button>

      <Button variant="outline" size="lg" className="w-full h-12 font-bold text-base" asChild>
        <a href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}>
          <Phone className="mr-2 h-4 w-4" />
          Call a Local Buyer
        </a>
      </Button>

      <p className="text-xs text-center text-muted-foreground leading-relaxed">
        {sellerPositioning.reassurance}
      </p>

      <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
        See our{' '}
        <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link> and{' '}
        <Link href="/terms" className="underline hover:text-foreground">Terms of Service</Link>.
      </p>
    </form>
  );
}
