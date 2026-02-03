import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useSoundEffects } from "@/hooks/useSoundEffects";

gsap.registerPlugin(ScrollTrigger);

interface MainPageProps {
  onShopClick: () => void;
}

export default function MainPage({ onShopClick }: MainPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const { playHoverSound, playClickSound } = useSoundEffects();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline();
      
      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
      })
      .from(descriptionRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5");

      // Subtle title glow animation
      gsap.to(titleRef.current, {
        textShadow: "0 0 12px rgba(255, 255, 255, 0.4), 0 0 24px rgba(255, 255, 255, 0.2)",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Button hover animations with scale effect and sound
      const buttons = document.querySelectorAll("button");
      buttons.forEach(btn => {
        btn.addEventListener("mouseenter", () => {
          playHoverSound();
          gsap.to(btn, { scale: 1.08, duration: 0.2, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.out" });
        });
      });

      // Gentle floating animation for background elements
      gsap.to(".floating-element", {
        y: "random(-15, 15)",
        x: "random(-15, 15)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.3,
          from: "random",
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [playHoverSound]);

  const handleShopClick = () => {
    playClickSound();
    const shopSection = document.getElementById("shop-section");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
    onShopClick();
  };

  const handleDiscordClick = () => {
    playClickSound();
    window.open("https://discord.gg/Takayama", "_blank");
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Minimal animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="floating-element absolute top-32 left-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="floating-element absolute top-1/2 right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="floating-element absolute bottom-32 left-1/3 w-56 h-56 bg-primary/3 rounded-full blur-3xl" />
        
        {/* Animated floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${8 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Minimal particle grid */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="floating-element absolute w-0.5 h-0.5 bg-foreground/15 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-heavy bg-background/40 border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-foreground tracking-tight">Takayama Shop</div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="text-sm" onClick={handleDiscordClick}>
              Discord
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 text-center relative z-10">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          Takayama Shop
        </h1>
          <p
            ref={descriptionRef}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light"
          >
            Takayama Shop presents exclusive digital offers and services.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button
              onClick={handleShopClick}
              size="lg"
              className="px-10 py-6 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground box-glow-subtle transition-all duration-300 hover:scale-105"
            >
              Shop
            </Button>
            
            <Button
              onClick={handleDiscordClick}
              size="lg"
              variant="outline"
              className="px-10 py-6 text-base font-medium border-2 border-foreground/30 text-foreground hover:bg-foreground/5 hover:box-glow-subtle transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Rejoindre le Discord
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
