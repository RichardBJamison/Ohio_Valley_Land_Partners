'use client';

import { useCallback, useState } from 'react';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Loader2 } from 'lucide-react';
import { trackConversionEvent } from '@/components/analytics/conversion-tracker';

const counties = [
  'Franklin County, OH',
  'Belmont County, OH',
  'Jefferson County, OH',
  'Columbiana County, OH',
  'Harrison County, OH',
  'Carroll County, OH',
  'Ohio County, WV',
  'Marshall County, WV',
  'Brooke County, WV',
];

const useCases = [
  'Hunting / Recreation',
  'Farming / Agriculture',
  'Residential Development',
  'Commercial Development',
  'Long-term Investment / Hold',
];

const budgetRanges = [
  'Under $50K',
  '$50K – $150K',
  '$150K – $500K',
  '$500K – $1M',
  '$1M+',
];

const acreageRanges = [
  'Under 5 acres',
  '5 – 20 acres',
  '20 – 100 acres',
  '100+ acres',
  'No preference',
];

export function InvestorIntakeForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    counties: '',
    acreage: '',
    useCase: '',
    budget: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileExpire = useCallback(() => setTurnstileToken(''), []);

  // Counties now handled via free-text input (split on submit)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.counties.trim()) {
      setError('Name, email, and counties of interest are required.');
      trackConversionEvent('form_error', {
        form_name: 'builders_network_form',
        error_type: 'validation',
      });
      return;
    }
    setLoading(true);
    try {
      const countiesArray = form.counties
        .split(/[\n,]+/)
        .map((c) => c.trim())
        .filter(Boolean);
      const payload = { ...form, counties: countiesArray, turnstileToken };
      const res = await fetch('/api/investor-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
      trackConversionEvent('successful_submission', { form_name: 'builders_network_form' });
    } catch {
      setError("Something went wrong. Email us directly at info@ohiovalleylandpartners.com");
      trackConversionEvent('form_error', {
        form_name: 'builders_network_form',
        error_type: 'request',
      });
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <h3 className="text-xl font-bold text-foreground">You’re on the List</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          We’ll contact you directly when a deal matching your criteria becomes available in the Ohio Valley.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      data-analytics-form="builders_network_form"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="inv-name">Full Name</Label>
          <Input
            id="inv-name"
            placeholder="John Smith"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />
        </div>
        {/* Phone field hidden for GHL A2P compliance — GHL widget is the single opt-in source */}
        <input type="hidden" value={form.phone} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="inv-email">Email</Label>
        <Input
          id="inv-email"
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="inv-counties">Counties of Interest</Label>
        <textarea
          id="inv-counties"
          placeholder="e.g. Franklin County, OH; any county in West Virginia; etc. (separate by commas or new lines)"
          value={form.counties}
          onChange={(e) => setForm((f) => ({ ...f, counties: e.target.value }))}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="inv-acreage">Acreage Range</Label>
          <select
            id="inv-acreage"
            value={form.acreage}
            onChange={(e) => setForm((f) => ({ ...f, acreage: e.target.value }))}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Select...</option>
            {acreageRanges.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="inv-use">Intended Use</Label>
          <select
            id="inv-use"
            value={form.useCase}
            onChange={(e) => setForm((f) => ({ ...f, useCase: e.target.value }))}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Select...</option>
            {useCases.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="inv-budget">Budget Range</Label>
          <select
            id="inv-budget"
            value={form.budget}
            onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-render"
          >
            <option value="">Select...</option>
            {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <TurnstileWidget onToken={setTurnstileToken} onExpire={onTurnstileExpire} />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" size="lg" className="w-full h-12 font-bold" disabled={loading}>
        {loading ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>
        ) : (
          'Get on the Deal List'
        )}
      </Button>

      <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
        See our{' '}
        <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link> and{' '}
        <Link href="/terms" className="underline hover:text-foreground">Terms of Service</Link>.
      </p>
    </form>
  );
}
