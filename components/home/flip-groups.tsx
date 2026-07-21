'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, SyntheticEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

type CountyItem = {
  slug: string;
  name: string;
  stateAbbr: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type TrustItem = {
  label: string;
  value: string;
  sub: string;
};

const FLIP_TRANSITION = 'transform 550ms cubic-bezier(0.2, 0.8, 0.2, 1)';

const faceStyle: CSSProperties = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
};

const backFaceStyle: CSSProperties = {
  ...faceStyle,
  transform: 'rotateX(180deg)',
};

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reducedMotion;
}

export function CountyFlipGrid({ counties }: { counties: CountyItem[] }) {
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [flipCount, setFlipCount] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setFlipCount(0);
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const cards = cardRefs.current.filter((card): card is HTMLAnchorElement => Boolean(card));
      const count = cards.length;
      if (!count) return;

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewportMiddle = viewportHeight * 0.5;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const firstCard = cards[0];
      const lastCard = cards[count - 1];

      const documentTop = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        return rect.top + scrollY;
      };

      const documentCenter = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        return rect.top + rect.height / 2 + scrollY;
      };

      // Recorded county sequence:
      // tile 1 begins when the full set reaches the viewport; tile 9 completes at mid-screen.
      const startScroll = Math.max(...cards.map((card) => documentTop(card) - viewportHeight));
      const endScroll = documentCenter(lastCard) - viewportMiddle;
      let nextCount = 0;

      if (firstCard.getBoundingClientRect().bottom < 0) {
        nextCount = count;
      } else if (endScroll <= startScroll) {
        const allPartiallyVisible = cards.every((card) => {
          const rect = card.getBoundingClientRect();
          return rect.bottom > 0 && rect.top < viewportHeight;
        });
        nextCount = allPartiallyVisible ? count : 0;
      } else if (scrollY >= endScroll) {
        nextCount = count;
      } else if (scrollY >= startScroll) {
        const progress = Math.min(1, Math.max(0, (scrollY - startScroll) / (endScroll - startScroll)));
        nextCount = Math.min(count, Math.max(1, Math.floor(progress * (count - 1) + 1 + 1e-6)));
      }

      setFlipCount((current) => (current === nextCount ? current : nextCount));
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    scheduleUpdate();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [counties.length, reducedMotion]);

  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      data-flip-program="county-scroll-scrub"
    >
      {counties.map((county, index) => {
        const flipped = index < flipCount;
        const countyName = `${county.name}, ${county.stateAbbr}`;

        return (
          <Link
            key={county.slug}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            href={`/sell-land/${county.slug}`}
            aria-label={`Review property in ${countyName}`}
            className="group relative block min-h-[64px] rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 [perspective:1000px]"
            role="listitem"
          >
            <span
              className="absolute inset-0 [transform-style:preserve-3d]"
              style={{
                transform: flipped ? 'rotateX(180deg)' : 'rotateX(0deg)',
                transition: FLIP_TRANSITION,
              }}
            >
              <span
                className="absolute inset-0 flex items-center justify-between rounded-xl border border-border bg-background px-5 py-4 text-sm font-medium text-foreground transition-colors group-hover:border-amber/40 group-hover:text-amber"
                style={faceStyle}
                aria-hidden={flipped}
              >
                <span>{countyName}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </span>
              <span
                className="absolute inset-0 flex items-center justify-between rounded-xl border border-forest/20 bg-meadow px-5 py-4 text-sm font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                style={backFaceStyle}
                aria-hidden={!flipped}
              >
                <span>{countyName}</span>
                <span className="flex items-center gap-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-amber">
                  County page <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function HomepageFAQFlipList({ faqs }: { faqs: FAQItem[] }) {
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const detailsRefs = useRef<Array<HTMLDetailsElement | null>>([]);
  const [autoFlipped, setAutoFlipped] = useState<boolean[]>(() => faqs.map(() => false));
  const [manualFront, setManualFront] = useState<Set<number>>(() => new Set());
  const reducedMotion = useReducedMotion();

  const keepAnswerOnFront = useCallback((index: number) => {
    setManualFront((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      return next;
    });
  }, []);

  const revealAnswer = useCallback(
    (index: number) => {
      keepAnswerOnFront(index);
      const details = detailsRefs.current[index];
      if (details) details.open = true;
    },
    [keepAnswerOnFront],
  );

  useEffect(() => {
    if (reducedMotion) {
      setAutoFlipped(faqs.map(() => false));
      return;
    }

    let frame = 0;
    const lag = 2;

    const update = () => {
      frame = 0;
      const items = itemRefs.current;
      const count = faqs.length;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const lastItem = items[count - 1];
      if (!lastItem) return;

      const crossedViewportBottom = (element: HTMLElement | null) =>
        Boolean(element && element.getBoundingClientRect().top <= viewportHeight);

      const next = faqs.map((_, index) => {
        const triggerIndex = index + lag;
        if (triggerIndex < count) return crossedViewportBottom(items[triggerIndex]);
        if (index === count - 1) return crossedViewportBottom(items[index]);
        return crossedViewportBottom(lastItem);
      });

      setAutoFlipped((current) => {
        const unchanged = current.length === next.length && current.every((value, index) => value === next[index]);
        return unchanged ? current : next;
      });
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    scheduleUpdate();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [faqs, reducedMotion]);

  const handleToggle = (index: number, event: SyntheticEvent<HTMLDetailsElement>) => {
    if (event.currentTarget.open) keepAnswerOnFront(index);
  };

  return (
    <dl className="flex flex-col gap-4 [perspective:1200px]" data-flip-program="faq-lag-two">
      {faqs.map((faq, index) => {
        const flipped = !reducedMotion && autoFlipped[index] && !manualFront.has(index);

        return (
          <article
            key={faq.question}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            className="relative min-h-[98px] [perspective:1000px]"
          >
            <div
              className="relative min-h-[98px] [transform-style:preserve-3d]"
              style={{
                transform: flipped ? 'rotateX(180deg)' : 'rotateX(0deg)',
                transition: FLIP_TRANSITION,
              }}
            >
              <div
                className="relative"
                style={{ ...faceStyle, pointerEvents: flipped ? 'none' : 'auto' }}
                aria-hidden={flipped}
              >
                <details
                  ref={(element) => {
                    detailsRefs.current[index] = element;
                  }}
                  className="group min-h-[98px] rounded-xl border border-border bg-card p-6 open:border-amber/30 transition-all"
                  onToggle={(event) => handleToggle(index, event)}
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-foreground list-none"
                    tabIndex={flipped ? -1 : 0}
                  >
                    <dt>{faq.question}</dt>
                    <ChevronDown className="h-5 w-5 text-amber shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <dd className="mt-4 text-sm leading-7 text-muted-foreground">{faq.answer}</dd>
                </details>
              </div>
              <button
                type="button"
                className="absolute inset-0 flex w-full items-center justify-between gap-4 rounded-xl border border-forest/20 bg-meadow p-6 text-left text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
                style={{ ...backFaceStyle, pointerEvents: flipped ? 'auto' : 'none' }}
                aria-hidden={!flipped}
                tabIndex={flipped ? 0 : -1}
                onClick={() => revealAnswer(index)}
              >
                <span className="font-semibold leading-snug">{faq.question}</span>
                <span className="shrink-0 text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-amber">
                  Answer inside &rarr;
                </span>
              </button>
            </div>
          </article>
        );
      })}
    </dl>
  );
}

export function TrustFlipGrid({ items }: { items: TrustItem[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<boolean[]>(() => items.map(() => false));
  const [inView, setInView] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setFlipped(items.map(() => false));
      return;
    }
    if (!inView || items.length < 2) return;

    const flipRandomPair = () => {
      if (document.hidden) return;

      const indexes = items.map((_, index) => index);
      for (let index = indexes.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [indexes[index], indexes[swapIndex]] = [indexes[swapIndex], indexes[index]];
      }
      const selected = new Set(indexes.slice(0, 2));

      setFlipped((current) => current.map((value, index) => (selected.has(index) ? !value : value)));
    };

    const timer = window.setInterval(flipRandomPair, 3000);
    return () => window.clearInterval(timer);
  }, [inView, items, reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      role="list"
      data-flip-program="sulieman-random-pair"
    >
      {items.map((item, index) => {
        const showingBack = !reducedMotion && flipped[index];

        return (
          <div
            key={item.label}
            className="relative min-h-[188px] rounded-xl [perspective:1000px]"
            role="listitem"
            aria-label={`${item.value}. ${item.label}. ${item.sub}`}
          >
            <div
              className="absolute inset-0 [transform-style:preserve-3d]"
              style={{
                transform: showingBack ? 'rotateX(180deg)' : 'rotateX(0deg)',
                transition: 'transform 650ms cubic-bezier(0.4, 0.1, 0.2, 1)',
              }}
            >
              <div
                className="absolute inset-0 flex flex-col justify-center rounded-xl border border-border bg-background p-6"
                style={faceStyle}
                aria-hidden={showingBack}
              >
                <div className="text-2xl font-black text-amber mb-1">{item.value}</div>
                <div className="text-sm font-semibold text-foreground mb-1">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.sub}</div>
              </div>
              <div
                className="absolute inset-0 flex flex-col justify-center rounded-xl border border-forest/20 bg-meadow p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                style={backFaceStyle}
                aria-hidden={!showingBack}
              >
                <div className="text-2xl font-black text-amber mb-1">{item.value}</div>
                <div className="text-sm font-semibold text-white mb-1">{item.label}</div>
                <div className="text-xs text-white/70">{item.sub}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
