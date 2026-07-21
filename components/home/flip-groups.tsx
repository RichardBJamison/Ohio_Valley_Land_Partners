'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, SyntheticEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, MapPin, TreePine } from 'lucide-react';

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

export type AccountabilityItem = {
  name: string;
  description: string;
  href: string;
  icon: 'tree' | 'map';
  tag: string;
};

export type ProcessItem = {
  step: string;
  title: string;
  description: string;
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
    const sequenceLead = 1;

    const update = () => {
      frame = 0;
      const items = itemRefs.current;
      const count = faqs.length;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const firstItem = items[0];
      const lastItem = items[count - 1];
      if (!firstItem || !lastItem) return;

      const firstRect = firstItem.getBoundingClientRect();
      const lastRect = lastItem.getBoundingClientRect();
      const sequenceStep =
        count > 1
          ? Math.max(1, (lastRect.top - firstRect.top) / (count - 1))
          : Math.max(1, lastRect.height);

      const crossedViewportCue = (element: HTMLElement | null, cueOffset = 0) =>
        Boolean(element && element.getBoundingClientRect().top <= viewportHeight - cueOffset);

      const next = faqs.map((_, index) => {
        const triggerIndex = index + sequenceLead;
        if (triggerIndex < count) return crossedViewportCue(items[triggerIndex]);

        // Continue the cadence past the final card instead of collapsing the
        // remaining flips onto one shared viewport-bottom trigger.
        const overflowSteps = triggerIndex - (count - 1);
        return crossedViewportCue(lastItem, sequenceStep * overflowSteps);
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
    <dl className="flex flex-col gap-4 [perspective:1200px]" data-flip-program="faq-lead-one">
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

function useRandomPairFlip(itemCount: number) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<boolean[]>(() => Array(itemCount).fill(false));
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
      setFlipped(Array(itemCount).fill(false));
      return;
    }
    if (!inView || itemCount < 1) return;

    const flipRandomPair = () => {
      if (document.hidden) return;

      const indexes = Array.from({ length: itemCount }, (_, index) => index);
      for (let index = indexes.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [indexes[index], indexes[swapIndex]] = [indexes[swapIndex], indexes[index]];
      }
      const selected = new Set(indexes.slice(0, Math.min(2, itemCount)));

      setFlipped((current) =>
        Array.from({ length: itemCount }, (_, index) =>
          selected.has(index) ? !current[index] : Boolean(current[index]),
        ),
      );
    };

    const timer = window.setInterval(flipRandomPair, 3000);
    return () => window.clearInterval(timer);
  }, [inView, itemCount, reducedMotion]);

  return { flipped, reducedMotion, rootRef };
}

export function AccountabilityFlipGrid({ items }: { items: AccountabilityItem[] }) {
  const { flipped, reducedMotion, rootRef } = useRandomPairFlip(items.length);
  const icons = { tree: TreePine, map: MapPin };

  return (
    <div
      ref={rootRef}
      className="mx-auto mt-16 max-w-4xl grid grid-cols-1 gap-8 sm:grid-cols-2"
      role="list"
      data-flip-program="sulieman-random-pair"
    >
      {items.map((item, index) => {
        const Icon = icons[item.icon];
        const showingBack = !reducedMotion && flipped[index];

        const face = (back: boolean) => (
          <div
            className={`group relative col-start-1 row-start-1 flex flex-col gap-6 rounded-2xl border p-8 transition-shadow hover:shadow-lg ${
              back
                ? 'border-forest/20 bg-meadow shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
                : 'border-border bg-card hover:border-amber/40'
            }`}
            style={{
              ...(back ? backFaceStyle : faceStyle),
              pointerEvents: showingBack === back ? 'auto' : 'none',
            }}
            aria-hidden={showingBack !== back}
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                  back
                    ? 'bg-white/10 text-amber group-hover:bg-amber group-hover:text-forest'
                    : 'bg-amber/10 text-amber group-hover:bg-amber group-hover:text-forest'
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  back ? 'border-amber/40 text-amber' : 'border-amber/20 text-amber/70'
                }`}
              >
                {item.tag}
              </span>
            </div>
            <div>
              <h3
                className={`text-xl font-semibold transition-colors group-hover:text-amber ${
                  back ? 'text-white' : 'text-foreground'
                }`}
              >
                <Link href={item.href} tabIndex={showingBack === back ? 0 : -1}>
                  <span className="absolute inset-0" />
                  {item.name}
                </Link>
              </h3>
              <p className={`mt-3 text-sm leading-6 ${back ? 'text-white/75' : 'text-muted-foreground'}`}>
                {item.description}
              </p>
            </div>
            <div className="mt-auto">
              <Link
                href={item.href}
                tabIndex={showingBack === back ? 0 : -1}
                className={`text-sm font-semibold transition-colors ${
                  back ? 'text-amber hover:text-amber/80' : 'text-meadow hover:text-meadow/80'
                }`}
              >
                Learn more &rarr;
              </Link>
            </div>
          </div>
        );

        return (
          <article
            key={item.name}
            className="relative [perspective:1000px]"
            role="listitem"
            aria-label={`${item.name}. ${item.description}`}
          >
            <div
              className="grid h-full [transform-style:preserve-3d]"
              style={{
                transform: showingBack ? 'rotateX(180deg)' : 'rotateX(0deg)',
                transition: 'transform 650ms cubic-bezier(0.4, 0.1, 0.2, 1)',
              }}
            >
              {face(false)}
              {face(true)}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function ProcessFlipGrid({ steps }: { steps: ProcessItem[] }) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const innerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const runway = runwayRef.current;
    const shell = shellRef.current;
    const row = rowRef.current;
    const inners = innerRefs.current;
    const count = steps.length;
    if (!runway || !shell || !row || !count || inners.length !== count || inners.some((inner) => !inner)) {
      return;
    }

    const cards = Array.from(row.querySelectorAll<HTMLElement>('[data-process-card]'));
    const simpleFaces = Array.from(row.querySelectorAll<HTMLElement>('[data-process-simple-face]'));
    const detailFaces = Array.from(row.querySelectorAll<HTMLElement>('[data-process-detail-face]'));
    const allComplete = Array(count).fill(1) as number[];
    let frame = 0;
    let staticLayout = false;

    const clamp = (value: number, minimum: number, maximum: number) =>
      Math.max(minimum, Math.min(maximum, value));

    const localFlip = (progress: number, start: number, end: number) => {
      if (progress <= start) return 0;
      if (progress >= end) return 1;
      return (progress - start) / (end - start);
    };

    const applyAmounts = (next: number[]) => {
      next.forEach((amount, index) => {
        const inner = inners[index];
        const card = cards[index];
        const simpleFace = simpleFaces[index];
        const detailFace = detailFaces[index];
        if (!inner || !card) return;

        inner.style.transform = `rotateX(${amount * 180}deg)`;
        card.dataset.flipState = amount >= 0.98 ? 'complete' : amount > 0.02 ? 'turning' : 'waiting';
        simpleFace?.setAttribute('aria-hidden', amount > 0.5 ? 'true' : 'false');
        detailFace?.setAttribute('aria-hidden', amount > 0.5 ? 'false' : 'true');
      });
    };

    const applyStaticLayout = () => {
      if (!staticLayout) {
        staticLayout = true;
        runway.style.height = 'auto';
        shell.style.position = 'relative';
        shell.style.height = 'auto';
      }
      applyAmounts(allComplete);
    };

    const applyScrollLayout = () => {
      if (!staticLayout) return;
      staticLayout = false;
      runway.style.removeProperty('height');
      shell.style.removeProperty('position');
      shell.style.removeProperty('height');
    };

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (reducedMotion || window.innerWidth < 1024) {
        applyStaticLayout();
        return;
      }

      applyScrollLayout();
      const rowHeight = row.getBoundingClientRect().height;
      if (rowHeight > viewportHeight * 0.9) {
        applyStaticLayout();
        return;
      }

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const runwayRect = runway.getBoundingClientRect();
      const runwayTop = runwayRect.top + scrollY;

      // Before the sticky phase, the row travels from fully visible at the
      // viewport bottom to centered. Card 0.2 completes exactly at center.
      const approachDistance = Math.max(1, (viewportHeight - rowHeight) * 0.5);
      const fullyVisibleScroll = runwayTop - approachDistance;
      const approachProgress = clamp((scrollY - fullyVisibleScroll) / approachDistance, 0, 1);

      // Once centered, the sticky runway holds the row while continued scroll
      // scrubs cards 0.3–0.5 in reading order, then releases after 0.5.
      const pinnedDistance = Math.max(1, runwayRect.height - viewportHeight);
      const pinnedProgress = clamp((scrollY - runwayTop) / pinnedDistance, 0, 1);

      applyAmounts([
        localFlip(approachProgress, 0, 0.72),
        localFlip(approachProgress, 0.28, 1),
        localFlip(pinnedProgress, 0.04, 0.32),
        localFlip(pinnedProgress, 0.36, 0.64),
        localFlip(pinnedProgress, 0.68, 0.96),
      ]);
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
      runway.style.removeProperty('height');
      shell.style.removeProperty('position');
      shell.style.removeProperty('height');
    };
  }, [reducedMotion, steps.length]);

  const detailContent = (step: ProcessItem) => (
    <>
      <div className="mb-6 text-5xl font-black text-amber/15">{step.step}</div>
      <h3 className="mb-3 text-lg font-bold text-foreground">{step.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
    </>
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:sr-only" role="list">
        {steps.map((step) => (
          <article key={step.step} className="h-full" role="listitem">
            <div className="h-full rounded-2xl border border-border bg-background p-8">
              {detailContent(step)}
            </div>
          </article>
        ))}
      </div>

      <div ref={runwayRef} className="relative -mt-[18vh] hidden h-[300vh] lg:block" aria-hidden="true">
        <div ref={shellRef} className="sticky top-0 flex h-screen items-center">
          <div
            ref={rowRef}
            className="grid w-full grid-cols-5 gap-8 [perspective:1400px]"
            role="presentation"
            data-flip-program="resonant-sticky-scroll-scrub"
          >
            {steps.map((step, index) => (
              <article key={step.step} className="relative h-full [perspective:1000px]" role="presentation">
                <div data-process-card className="relative grid h-full" data-flip-state="waiting">
                  <div
                    ref={(element) => {
                      innerRefs.current[index] = element;
                    }}
                    className="grid h-full [transform-style:preserve-3d] [will-change:transform]"
                  >
                    <div
                      data-process-simple-face
                      className="col-start-1 row-start-1 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-forest/20 bg-meadow p-8 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                      style={faceStyle}
                      aria-hidden="false"
                    >
                      <div className="text-5xl font-black text-amber">{step.step}</div>
                      <h3 className="mt-6 text-xl font-bold leading-tight text-white">{step.title}</h3>
                    </div>
                    <div
                      data-process-detail-face
                      className="col-start-1 row-start-1 min-h-[300px] rounded-2xl border border-border bg-background p-8"
                      style={backFaceStyle}
                      aria-hidden="true"
                    >
                      {detailContent(step)}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function TrustFlipGrid({ items }: { items: TrustItem[] }) {
  const { flipped, reducedMotion, rootRef } = useRandomPairFlip(items.length);

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
