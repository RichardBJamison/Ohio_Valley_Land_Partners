'use client';

import { useEffect, useRef, useState } from 'react';
import {
  WAYNE_DEPLOYMENT_ID,
  WAYNE_DISMISS_KEY,
  WAYNE_EMBED_SCRIPT,
  WAYNE_STARTED_KEY,
} from '@/lib/wayne';
import { X } from 'lucide-react';

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

export function WayneAvatar() {
  const [phase, setPhase] = useState<'wait' | 'open' | 'closed'>('wait');
  const [startVideo, setStartVideo] = useState(false);
  const embedRef = useRef<TavusEl | null>(null);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(WAYNE_DISMISS_KEY) === '1';
    } catch {
      /* storage blocked */
    }
    if (dismissed) {
      setPhase('closed');
      return;
    }

    const timer = window.setTimeout(() => {
      setPhase('open');
      setStartVideo(true);
      try {
        sessionStorage.setItem(WAYNE_STARTED_KEY, '1');
      } catch {
        /* storage blocked */
      }
    }, 5000);

    return () => window.clearTimeout(timer);
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

  async function closePanel() {
    try {
      sessionStorage.setItem(WAYNE_DISMISS_KEY, '1');
    } catch {
      /* storage blocked */
    }
    await hangUp();
    setPhase('closed');
  }

  function reopen() {
    try {
      sessionStorage.removeItem(WAYNE_DISMISS_KEY);
    } catch {
      /* storage blocked */
    }
    setPhase('open');
    setStartVideo(true);
  }

  if (phase === 'wait') return null;

  if (phase === 'closed') {
    return (
      <button
        type="button"
        onClick={reopen}
        className="fixed z-[80] left-4 bottom-[5.75rem] lg:bottom-5 flex items-center gap-2 rounded-full border border-amber/40 bg-dark px-3 py-2 text-sm font-semibold text-dark-foreground shadow-lg hover:border-amber"
        aria-label="Talk to Wayne, Ohio Valley Land Partners AI host"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-amber text-sm font-bold text-forest">W</span>
        Talk to Wayne
      </button>
    );
  }

  return (
    <section
      className="fixed z-[80] left-4 top-24 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-2xl"
      aria-label="Wayne, Ohio Valley Land Partners AI host"
    >
      <div className="flex items-center gap-2 bg-dark px-3 py-2 text-dark-foreground">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-amber text-xs font-bold text-forest">W</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Wayne</p>
          <p className="truncate text-[11px] text-dark-foreground/70">OVLP AI host</p>
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
      <div className="relative aspect-square bg-dark">
        {startVideo ? (
          <div className="absolute inset-0">
            <tavus-embed
              ref={embedRef}
              deployment-id={WAYNE_DEPLOYMENT_ID}
              allow="microphone; camera; autoplay; clipboard-write"
              layout="inline"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
