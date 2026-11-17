"use client";

import { useEffect, useRef } from "react";

interface MockupVideoProps {
  name: string;
}

/**
 * Muted looping clip for the phone mockup. It is fetched only once the mockup is
 * on screen, pauses off screen, and stays a still poster for reduced motion.
 */
export function MockupVideo({ name }: MockupVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!video.src) video.src = `/mockup/${name}.mp4`;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [name]);

  return (
    <video
      ref={videoRef}
      poster={`/mockup/${name}.webp`}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className="absolute inset-0 size-full object-cover"
    />
  );
}
