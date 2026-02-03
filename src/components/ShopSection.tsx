import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PaymentModal from "./PaymentModal";
import ServerConfigModal from "./ServerConfigModal";

gsap.registerPlugin(ScrollTrigger);

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  icon: React.ReactNode;
  category: "nitro" | "decoration" | "boost" | "server";
}

const products: Product[] = [
  {
    id: "nitro-1month",
    title: "Nitro Discord 1 mois",
    description: "Profitez d'un mois complet de Discord Nitro avec toutes les fonctionnalités premium.",
    price: "GRATUIT",
    badge: "Offre Exclusive",
    category: "nitro",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
  {
    id: "nitro-1year",
    title: "Nitro Discord 1 an",
    description: "Une année complète de Discord Nitro à un prix imbattable.",
    price: "3€",
    badge: "Meilleure Offre",
    category: "nitro",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
  {
    id: "nitro-5months",
    title: "Nitro Discord 5 mois",
    description: "5 mois de Discord Nitro avec accès complet à toutes les fonctionnalités premium.",
    price: "7€",
    category: "nitro",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
  {
    id: "decorations",
    title: "Décorations Discord",
    description: "Personnalisez votre profil Discord avec des décorations exclusives et uniques.",
    price: "2€",
    originalPrice: "10€",
    badge: "Promo -80%",
    category: "decoration",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.72c0 4.42-3.05 8.58-7.5 9.82V4.18h-.5z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    id: "decorations-5",
    title: "Décorations Discord (5)",
    description: "Pack de 5 décorations Discord exclusives pour personnaliser votre profil.",
    price: "10€",
    category: "decoration",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.72c0 4.42-3.05 8.58-7.5 9.82V4.18h-.5z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    id: "boost-10",
    title: "Discord Boost (10)",
    description: "Boostez votre serveur Discord avec 10 boosts pour débloquer les fonctionnalités premium.",
    price: "3€",
    category: "boost",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  {
    id: "nitro-lifetime",
    title: "Nitro Discord à Vie",
    description: "Accès illimité à Discord Nitro pour toujours avec toutes les fonctionnalités premium.",
    price: "50€",
    badge: "Offre Premium",
    category: "nitro",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
  {
    id: "boost-20",
    title: "Discord Boost (20)",
    description: "Pack de 20 boosts pour un serveur Discord ultra-boosté avec tous les avantages.",
    price: "6€",
    category: "boost",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  {
    id: "decorations-50",
    title: "Décorations Discord (50)",
    description: "Mega pack de 50 décorations Discord exclusives pour personnaliser votre profil.",
    price: "35€",
    category: "decoration",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.72c0 4.42-3.05 8.58-7.5 9.82V4.18h-.5z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    id: "decorations-70",
    title: "Décorations Discord (70)",
    description: "Collection complète de 70 décorations Discord pour une personnalisation totale.",
    price: "45€",
    category: "decoration",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.72c0 4.42-3.05 8.58-7.5 9.82V4.18h-.5z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    id: "boost-300",
    title: "Discord Boost (300)",
    description: "Pack massif de 300 boosts pour un serveur Discord ultra-premium avec tous les avantages.",
    price: "100€",
    badge: "Mega Pack",
    category: "boost",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  {
    id: "server-custom",
    title: "Serveur Personnalisé",
    description: "Créez votre propre serveur Discord avec options personnalisées.",
    price: "Dés 5€",
    badge: "Personnalisable",
    category: "server",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
      </svg>
    ),
  },
];

const categoryConfig = {
  nitro: {
    title: "Discord Nitro",
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/30",
    accentColor: "text-blue-400",
  },
  decoration: {
    title: "Décorations",
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/30",
    accentColor: "text-purple-400",
  },
  server: {
    title: "Serveurs Personnalisés",
    color: "from-green-500/20 to-green-600/10",
    borderColor: "border-green-500/30",
    accentColor: "text-green-400",
  },
  boost: {
    title: "Discord Boost",
    color: "from-pink-500/20 to-pink-600/10",
    borderColor: "border-pink-500/30",
    accentColor: "text-pink-400",
  },
};

export default function ShopSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showServerConfigModal, setShowServerConfigModal] = useState(false);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedByCategory = {
    nitro: filteredProducts.filter(p => p.category === "nitro"),
    decoration: filteredProducts.filter(p => p.category === "decoration"),
    server: filteredProducts.filter(p => p.category === "server"),
    boost: filteredProducts.filter(p => p.category === "boost"),
  };

  useEffect(() => {
    cardsRef.current = []; // Reset refs on each render
    const ctx = gsap.context(() => {
      // Title animation on scroll
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out",
      });

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 60,
            rotateX: -10,
            duration: 0.6,
            delay: index * 0.08,
            ease: "power3.out",
          });

          // Enhanced hover animation
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -15,
              scale: 1.08,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(card.querySelector(".card-glow"), {
              opacity: 1,
              duration: 0.3,
            });
            // Rotation effect
            gsap.to(card, {
              rotationX: 3,
              rotationY: -3,
              duration: 0.4,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
              rotationX: 0,
              rotationY: 0,
            });
            gsap.to(card.querySelector(".card-glow"), {
              opacity: 0,
              duration: 0.3,
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProducts]);

  const handlePayClick = (product: Product) => {
    setSelectedProduct(product);
    setShowPaymentModal(true);
  };

  const renderCategorySection = (category: "nitro" | "decoration" | "boost" | "server") => {
    const config = categoryConfig[category];
    const categoryProducts = groupedByCategory[category];

    if (categoryProducts.length === 0) return null;

    return (
      <div key={category} className="mb-16">
        <h3 className={`text-2xl sm:text-3xl font-bold mb-8 ${config.accentColor}`}>
          {config.title}
        </h3>

        <div className={`bg-gradient-to-br ${config.color} border ${config.borderColor} rounded-2xl p-8 mb-8`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product, index) => (
              <div
                key={product.id}
                ref={(el) => {
                  if (el) cardsRef.current[categoryProducts.indexOf(product)] = el;
                }}
                className="group relative"
              >
                <Card className="h-full bg-card/60 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-300 overflow-hidden relative">
                  {/* Glow effect */}
                  <div className="card-glow absolute inset-0 bg-gradient-to-br from-foreground/10 via-foreground/5 to-foreground/0 opacity-0 transition-opacity pointer-events-none" />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="bg-primary text-primary-foreground font-medium text-xs animate-pulse">
                        {product.badge}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="relative z-10 pb-3">
                    <div className="flex justify-center mb-3 text-primary group-hover:text-accent transition-colors duration-300 transform group-hover:scale-110">
                      {product.icon}
                    </div>
                    <CardTitle className="text-lg font-semibold text-center mb-1">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-center text-xs line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10 pb-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary group-hover:text-accent transition-all duration-300">
                        {product.price}
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {product.originalPrice}
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="relative z-10 pt-0">
                    {category === "server" ? (
                      <Button
                        onClick={() => setShowServerConfigModal(true)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-5 text-sm group-hover:box-glow-subtle transition-all duration-300 transform group-hover:scale-105"
                        size="sm"
                      >
                        Configurer
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handlePayClick(product)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-5 text-sm group-hover:box-glow-subtle transition-all duration-300 transform group-hover:scale-105"
                        size="sm"
                      >
                        Payer
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="shop-section"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">
        <h2
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-12 text-foreground tracking-wider"
        >
          Nos Offres
        </h2>

        {/* Search */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <Input
              placeholder="Rechercher une offre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 bg-card border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary transition-colors text-lg"
            />
          </div>
        </div>

        {/* Category sections */}
        {renderCategorySection("nitro")}
        {renderCategorySection("decoration")}
        {renderCategorySection("server")}
        {renderCategorySection("boost")}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Aucune offre trouvée. Essayez une autre recherche.</p>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {selectedProduct && selectedProduct.category !== "server" && (
        <PaymentModal
          product={selectedProduct}
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* Server Config Modal */}
      <ServerConfigModal
        isOpen={showServerConfigModal}
        onClose={() => setShowServerConfigModal(false)}
      />
    </section>
  );
}
