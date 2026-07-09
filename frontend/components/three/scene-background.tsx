"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ParticleField = dynamic(() => import("./particle-field"), { ssr: false });

// Fixed full-viewport 3D backdrop behind the site content. Desktop-only and
// idle-deferred so it never competes with page load; touch devices and
// reduced-motion users get a static ambient glow instead.
export function SceneBackground() {
  const [show3d, setShow3d] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(() => setShow3d(true))
      : window.setTimeout(() => setShow3d(true), 300);

    return () => {
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,190,124,0.06),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(35,150,127,0.05),transparent_60%)]" />
      {show3d && (
        <div className="absolute inset-0">
          <ParticleField />
        </div>
      )}
    </div>
  );
}
