'use client';

import { useCallback, useState } from 'react';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { sellerPositioning } from '@/lib/public-copy';
import { siteConfig } from '@/lib/seo-config';
import { trackConversionEvent } from '@/components/analytics/conversion-tracker';

export function SellerForm() {
  const [startedAt] = useState(() => Date.now());
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [parcelNumber, setParcelNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState<'initial' | 'follow-up'>('initial');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileExpire = useCallback(() => setTurnstileToken(''), []);

  async function submitToSeller(stage: 'initial' | 'follow-up') {
    const res = await fetch('/api/seller', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: address.trim(),
        email: email.trim(),
        fullName: fullName.trim(),
        parcelNumber: parcelNumber.trim(),
        notes: notes.trim(),
        stage,
        turnstileToken,
        startedAt,
        website,
      }),
    });
    if (!res.ok) throw new Error('Submission failed');
  }

  async function handleInitialSubmit(e: React.FormEvent) {
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
      await submitToSeller('initial');
      setTurnstileToken('');
      setStep('follow-up');
      trackConversionEvent('successful_submission', {
        form_name: 'seller_property_review_initial',
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

  async function handleFollowUpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!fullName.trim()) {
      setError('Your name is required for the follow-up details.');
      trackConversionEvent('form_error', {
        form_name: 'seller_property_review_follow_up',
        error_type: 'validation',
      });
      return;
    }
    setLoading(true);
    try {
      await submitToSeller('follow-up');
      setSubmitted(true);
      trackConversionEvent('successful_submission', {
        form_name: 'seller_property_review_follow_up',
      });
    } catch {
      setError('The extra details did not send. Your address and email are already saved; you can skip this step.');
      trackConversionEvent('form_error', {
        form_name: 'seller_property_review_follow_up',
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
          Your address and email are in. We&apos;ll review the property and determine whether it fits our current buying criteria. There is no obligation to sell.
        </p>
      </div>
    );
  }

  if (step === 'follow-up') {
    return (
      <form
        onSubmit={handleFollowUpSubmit}
        className="flex flex-col gap-4"
        data-analytics-form="seller_property_review_follow_up"
      >
        <div className="rounded-lg border border-border bg-background p-4 text-sm">
          <p className="font-semibold text-foreground">Your first step is complete.</p>
          <p className="mt-1 text-muted-foreground">
            Add these details if you have them. Your property address and email are already saved.
          </p>
          <div className="mt-3 grid gap-2 text-xs text-muted-foreground">
            <p><span className="font-semibold text-foreground">Property:</span> {address}</p>
            <p><span className="font-semibold text-foreground">Email:</span> {email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="seller-follow-up-name" className="text-sm font-semibold text-foreground">
            Your Name
          </Label>
          <Input
            id="seller-follow-up-name"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="seller-parcel" className="text-sm font-semibold text-foreground">
            Parcel Number or County <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="seller-parcel"
            placeholder="Parcel number, county, or both"
            value={parcelNumber}
            onChange={(e) => setParcelNumber(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="seller-notes" className="text-sm font-semibold text-foreground">
            Anything else helpful <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="seller-notes"
            placeholder="For example: inherited property, access issue, tax concern, or what you want us to know."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        <TurnstileWidget key="seller-follow-up-turnstile" onToken={setTurnstileToken} onExpire={onTurnstileExpire} />

        {error && <p className="text-sm text-red-500" role="alert">{error}</p>}

        <Button type="submit" size="lg" className="w-full h-12 font-bold text-base" disabled={loading}>
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : 'Send These Details'}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full h-12 font-bold text-base"
          onClick={() => setSubmitted(true)}
          disabled={loading}
        >
          Skip for Now
        </Button>

        <p className="text-xs text-center text-muted-foreground leading-relaxed">
          We will start with what you already shared. There is no obligation to sell.
        </p>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleInitialSubmit}
      className="flex flex-col gap-4"
      data-analytics-form="seller_property_review"
    >
      <input
        type="text"
        name="website"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
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
