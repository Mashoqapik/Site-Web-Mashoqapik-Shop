import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

interface WelcomeScreenProps {
  onEnter: () => void;
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Initial entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Fade in title
      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
      })
      .to(titleRef.current, {
        textShadow: "0 0 10px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.2)",
        duration: 0.8,
        ease: "power2.inOut",
      }, "-=0.4")
      // Fade in subtitle
      .from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.6");

      // Subtle continuous glow pulse animation
      gsap.to(titleRef.current, {
        textShadow: "0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Arrow bounce animation
      gsap.to(arrowRef.current, {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Fade out welcome screen
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        }
      )
      .call(() => {
        onEnter();
      });
    }, containerRef);

    return () => ctx.revert();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 cursor-pointer"
      onClick={handleEnter}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter mb-6"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          Welcome to Takayama Shop
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light tracking-wide"
          style={{
            fontFamily: "'Roboto Mono', monospace",
            fontWeight: 300,
          }}
        >
          Click to enter
        </p>
      </div>

      {/* Arrow indicator */}
      <div
        ref={arrowRef}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-muted-foreground"
      >
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)",
        }}
      />
    </div>
  );
}
