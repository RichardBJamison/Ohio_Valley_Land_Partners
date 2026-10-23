'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { trackConversionEvent } from '@/components/analytics/conversion-tracker';
import {
  WAYNE_DEPLOYMENT_ID,
  WAYNE_DISMISS_KEY,
  WAYNE_EMBED_SCRIPT,
  WAYNE_STARTED_KEY,
} from '@/lib/wayne';
import { Loader2, X } from 'lucide-react';

type TavusEl = HTMLElement & {
  endConversation?: () => Promise<void>;
  tavus?: { end?: () => Promise<void> };
};

function loadEmbedScript() {
  if (customElements.get('tavus-embed') || document.querySelector(`script[src="${WAYNE_EMBED_SCRIPT}"]`)) {
    return;
  }
  const script = document.createElement('script');
  script.src = WAYNE_EMBED_SCRIPT;
  script.async = true;
  document.head.appendChild(script);
}

function phoneDigits(value: string) {
  return value.replace(/\D/g, '');
}

export function WayneAvatar() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [startVideo, setStartVideo] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [formSent, setFormSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [startedAt] = useState(() => Date.now());
  const [website, setWebsite] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const embedRef = useRef<TavusEl | null>(null);
  const onTurnstileExpire = useCallback(() => setTurnstileToken(''), []);

  useEffect(() => {
    let dismissed = false;
    let alreadyStarted = false;
    try {
      dismissed = sessionStorage.getItem(WAYNE_DISMISS_KEY) === '1';
      alreadyStarted = sessionStorage.getItem(WAYNE_STARTED_KEY) === '1';
    } catch {
      /* storage blocked */
    }
    setOpen(!dismissed);
    if (!dismissed && !alreadyStarted) {
      setStartVideo(true);
      try {
        sessionStorage.setItem(WAYNE_STARTED_KEY, '1');
      } catch {
        /* storage blocked */
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (startVideo) loadEmbedScript();
  }, [startVideo]);

  async function hangUp() {
    const el = embedRef.current;
    try {
      await (el?.endConversation ?? el?.tavus?.end)?.();
    } catch {
      /* call already closed */
    }
    setStartVideo(false);
  }

  function persistClosed() {
    try {
      sessionStorage.setItem(WAYNE_DISMISS_KEY, '1');
    } catch {
      /* storage blocked */
    }
  }

  async function closePanel() {
    persistClosed();
    await hangUp();
    setOpen(false);
  }

  function reopen() {
    try {
      sessionStorage.removeItem(WAYNE_DISMISS_KEY);
    } catch {
      /* storage blocked */
    }
    setOpen(true);
  }

  function beginVideo() {
    setStartVideo(true);
    try {
      sessionStorage.setItem(WAYNE_STARTED_KEY, '1');
    } catch {
      /* storage blocked */
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!address.trim() || !email.trim() || phoneDigits(phone).length < 10) {
      setError('Address, email, and a phone number are required.');
      trackConversionEvent('form_error', {
        form_name: 'wayne_avatar_lead',
        error_type: 'validation',
      });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        address: address.trim(),
        email: email.trim(),
        phone: phone.trim(),
        fullName: fullName.trim(),
        notes: notes.trim(),
        stage: fullName.trim() ? 'follow-up' : 'initial',
        source: 'wayne',
        turnstileToken,
        startedAt,
        website,
      };
      const res = await fetch('/api/seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Submission failed');
      setFormSent(true);
      setTurnstileToken('');
      trackConversionEvent('successful_submission', { form_name: 'wayne_avatar_lead' });
    } catch {
      setError('The details did not send. Call us at (614) 653-7430.');
      trackConversionEvent('form_error', {
        form_name: 'wayne_avatar_lead',
        error_type: 'request',
      });
    } finally {
      setLoading(false);
    }
  }

  if (!ready) return null;

  if (!open) {
    return (
      <button
        type="button"
        onClick={reopen}
        className="fixed z-[80] right-4 bottom-[5.75rem] lg:bottom-5 flex items-center gap-2 rounded-full border border-amber/40 bg-dark px-3 py-2 text-sm font-semibold text-dark-foreground shadow-lg hover:border-amber"
        aria-label="Talk to Wayne, Ohio Valley Land Partners AI host"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-amber text-sm font-bold text-forest">W</span>
        Talk to Wayne
      </button>
    );
  }

  return (
    <section
      className="fixed z-[80] right-4 bottom-[5.75rem] lg:bottom-5 flex w-[min(24rem,calc(100vw-2rem))] max-h-[calc(100dvh-7.5rem)] flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-2xl"
      aria-label="Wayne, Ohio Valley Land Partners AI host"
    >
      <div className="flex items-center gap-2 border-b border-border bg-dark px-3 py-2 text-dark-foreground">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-amber text-xs font-bold text-forest">W</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Wayne</p>
          <p className="truncate text-[11px] text-dark-foreground/70">OVLP AI host · local buyer follow-up</p>
        </div>
        <button
          type="button"
          onClick={() => void closePanel()}
          className="rounded-md p-1 hover:bg-white/10"
          aria-label="Close Wayne"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="relative aspect-[4/3] bg-dark">
        {startVideo ? (
          <div className="absolute inset-0">
            <tavus-embed
              ref={embedRef}
              deployment-id={WAYNE_DEPLOYMENT_ID}
              allow="microphone; camera; autoplay; clipboard-write"
              layout="inline"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-dark-foreground">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-amber text-2xl font-bold text-forest">W</span>
            <p className="text-sm">Wayne can take a property review on this call, or you can type it below.</p>
            <Button type="button" onClick={beginVideo} className="bg-amber text-forest hover:bg-amber/90">
              Start talking
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-y-auto p-3">
        {formSent ? (
          <p className="text-sm text-muted-foreground">
            We have it. A local buyer will follow up. You can close Wayne or keep talking.
          </p>
        ) : (
          <>
            <button
              type="button"
              className="mb-2 text-xs font-semibold text-foreground underline"
              onClick={() => setShowForm((value) => !value)}
            >
              {showForm ? 'Hide the written form' : 'Prefer to type a property review'}
            </button>
            {showForm ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2" data-analytics-form="wayne_avatar_lead">
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
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="wayne-name" className="text-xs">Name</Label>
                    <Input id="wayne-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="wayne-phone" className="text-xs">Phone</Label>
                    <Input id="wayne-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(614) 555-0100" required />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="wayne-email" className="text-xs">Email</Label>
                  <Input id="wayne-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="wayne-address" className="text-xs">Property address</Label>
                  <Input id="wayne-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, city, county" required />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="wayne-notes" className="text-xs">Anything else</Label>
                  <Textarea
                    id="wayne-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Inherited, taxes, access, acreage…"
                    className="min-h-[64px] resize-none"
                  />
                </div>
                <TurnstileWidget onToken={setTurnstileToken} onExpire={onTurnstileExpire} />
                {error ? <p className="text-xs text-red-500" role="alert">{error}</p> : null}
                <Button type="submit" size="sm" disabled={loading}>
                  {loading ? <><Loader2 className="mr-2 h-3 w-3 animate-spin" />Sending…</> : 'Send to a local buyer'}
                </Button>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  Submitting this form lets Ohio Valley Land Partners contact you about this property by phone, email, or SMS.
                </p>
              </form>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
