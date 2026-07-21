'use client';

import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, [role="button"], [tabindex]:not([tabindex="-1"])';

export function AmbientCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRingRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const progressRing = progressRingRef.current;
    const canUseCursor =
      window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 992px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!cursor || !progressRing || !canUseCursor) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasPosition = false;
    let frameId = 0;
    let pausedByRobotChat = false;
    let pointerInside = false;

    const setVisible = (visible: boolean) => {
      if (visible && !pausedByRobotChat) cursor.classList.add('is-visible');
      else cursor.classList.remove('is-visible');
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.25;
      currentY += (targetY - currentY) * 0.25;
      cursor.style.transform = `translate3d(${currentX - 3}px, ${currentY - 3}px, 0)`;
      frameId = window.requestAnimationFrame(render);
    };

    const startRendering = () => {
      if (!frameId && !pausedByRobotChat && !document.hidden) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const stopRendering = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      progressRing.style.strokeDashoffset = String(100 - progress * 100);
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      pointerInside = true;

      if (!hasPosition) {
        currentX = targetX;
        currentY = targetY;
        hasPosition = true;
        setVisible(true);
      }
      startRendering();

      const target = event.target instanceof Element ? event.target : null;
      cursor.classList.toggle(
        'is-interactive',
        Boolean(target?.closest(INTERACTIVE_SELECTOR))
      );
    };

    const handleMouseLeave = () => {
      pointerInside = false;
      setVisible(false);
      stopRendering();
    };
    const handleMouseEnter = () => {
      pointerInside = true;
      if (hasPosition) {
        setVisible(true);
        startRendering();
      }
    };
    const pauseForRobotChat = () => {
      pausedByRobotChat = true;
      cursor.classList.add('is-paused');
      setVisible(false);
      stopRendering();
    };
    const resumeAfterRobotChat = () => {
      pausedByRobotChat = false;
      cursor.classList.remove('is-paused');
      if (hasPosition && pointerInside) {
        setVisible(true);
        startRendering();
      }
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopRendering();
      } else if (hasPosition && pointerInside && !pausedByRobotChat) {
        startRendering();
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    window.addEventListener('robot-chat:cursor-pause', pauseForRobotChat);
    window.addEventListener('robot-chat:cursor-resume', resumeAfterRobotChat);

    updateProgress();

    return () => {
      stopRendering();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      window.removeEventListener('robot-chat:cursor-pause', pauseForRobotChat);
      window.removeEventListener('robot-chat:cursor-resume', resumeAfterRobotChat);
    };
  }, []);

  return (
    <div ref={cursorRef} className="ambient-cursor" aria-hidden="true">
      <svg viewBox="0 0 36 36" focusable="false">
        <circle ref={progressRingRef} cx="18" cy="18" r="16" pathLength="100" />
      </svg>
    </div>
  );
}
