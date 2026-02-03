import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import MainPage from "@/components/MainPage";
import ShopSection from "@/components/ShopSection";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleEnter = () => {
    setShowWelcome(false);
  };

  const handleShopClick = () => {
    // Scroll handling is done in MainPage component
  };

  if (showWelcome) {
    return <WelcomeScreen onEnter={handleEnter} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <MainPage onShopClick={handleShopClick} />
      <ShopSection />
    </div>
  );
}
