"use client";

import { useEffect, useRef, useState } from "react";
import { FrameArt } from "@/components/frame-art";

export function LazyFrameArt({ gradient, large = false }: { gradient: string; large?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() => typeof window !== "undefined" && !("IntersectionObserver" in window));

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref} className="lazy-frame-art">
      {visible ? (
        <FrameArt gradient={gradient} large={large} />
      ) : (
        <div
          aria-hidden="true"
          className={`relative overflow-hidden ${large ? "h-[28rem] rounded-[2.5rem]" : "h-56 rounded-[2rem]"} bg-gradient-to-br ${gradient} product-lens lazy-frame-placeholder`}
        >
          <div className="absolute inset-0 animate-pulse bg-white/20" />
          <div className="absolute inset-x-10 top-1/2 h-16 -translate-y-1/2 rounded-full border border-[#11263d]/10 bg-white/25" />
        </div>
      )}
    </div>
  );
}
