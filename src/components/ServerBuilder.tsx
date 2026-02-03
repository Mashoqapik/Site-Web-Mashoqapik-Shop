import { useState } from "react";
import { gsap } from "gsap";

interface ServerConfig {
  type: "community" | "gaming" | "other" | "";
  withBot: boolean;
  botManaged: boolean;
  boostHelp: boolean;
  promo: boolean;
}

interface ServerBuilderProps {
  onPay: (config: ServerConfig) => void;
}

export default function ServerBuilder({ onPay }: ServerBuilderProps) {
  const [config, setConfig] = useState<ServerConfig>({
    type: "",
    withBot: false,
    botManaged: false,
    boostHelp: false,
    promo: false,
  });

  const [step, setStep] = useState(1);

  const handleTypeSelect = (type: "community" | "gaming" | "other") => {
    setConfig({ ...config, type });
    gsap.fromTo(
      ".step-content",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3 }
    );
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      gsap.fromTo(
        ".step-content",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      gsap.fromTo(
        ".step-content",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    }
  };

  const handlePay = () => {
    if (config.type) {
      onPay(config);
    }
  };

  const calculatePrice = () => {
    let price = 0;
    if (config.withBot) price += 10;
    if (config.botManaged) price += 15;
    if (config.boostHelp) price += 5;
    if (config.promo) price += 8;
    return price || 5;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-lg border border-foreground/10">
      <h3 className="text-2xl font-bold mb-8 text-center">Configurez votre serveur</h3>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                s === step
                  ? "bg-foreground text-background"
                  : s < step
                  ? "bg-foreground/50 text-foreground"
                  : "bg-foreground/10 text-foreground/50"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
        <div className="h-1 bg-foreground/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-foreground transition-all"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="step-content min-h-64 mb-8">
        {step === 1 && (
          <div>
            <h4 className="text-lg font-semibold mb-4">Type de serveur</h4>
            <div className="space-y-3">
              {[
                { value: "community", label: "Communauté" },
                { value: "gaming", label: "Jeux" },
                { value: "other", label: "Autre" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleTypeSelect(option.value as any)}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    config.type === option.value
                      ? "border-foreground bg-foreground/10"
                      : "border-foreground/20 hover:border-foreground/50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4 className="text-lg font-semibold mb-4">Options du bot</h4>
            <div className="space-y-3">
              <label className="flex items-center p-4 rounded-lg border border-foreground/20 hover:border-foreground/50 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={config.withBot}
                  onChange={(e) =>
                    setConfig({ ...config, withBot: e.target.checked })
                  }
                  className="w-5 h-5"
                />
                <span className="ml-3">Avec bot (+10€)</span>
              </label>
              {config.withBot && (
                <label className="flex items-center p-4 rounded-lg border border-foreground/20 hover:border-foreground/50 cursor-pointer transition-all ml-4">
                  <input
                    type="checkbox"
                    checked={config.botManaged}
                    onChange={(e) =>
                      setConfig({ ...config, botManaged: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                  <span className="ml-3">Bot logé par Takayama (+15€)</span>
                </label>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4 className="text-lg font-semibold mb-4">Services additionnels</h4>
            <div className="space-y-3">
              <label className="flex items-center p-4 rounded-lg border border-foreground/20 hover:border-foreground/50 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={config.boostHelp}
                  onChange={(e) =>
                    setConfig({ ...config, boostHelp: e.target.checked })
                  }
                  className="w-5 h-5"
                />
                <span className="ml-3">Aide au boost du serveur (+5€)</span>
              </label>
              <label className="flex items-center p-4 rounded-lg border border-foreground/20 hover:border-foreground/50 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={config.promo}
                  onChange={(e) =>
                    setConfig({ ...config, promo: e.target.checked })
                  }
                  className="w-5 h-5"
                />
                <span className="ml-3">Pub / Promotion (+8€)</span>
              </label>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h4 className="text-lg font-semibold mb-4">Résumé de votre commande</h4>
            <div className="space-y-2 text-sm">
              <p>Type: <span className="font-semibold">{config.type || "Non sélectionné"}</span></p>
              <p>Bot: <span className="font-semibold">{config.withBot ? "Oui" : "Non"}</span></p>
              {config.withBot && <p>Bot managé: <span className="font-semibold">{config.botManaged ? "Oui" : "Non"}</span></p>}
              <p>Aide boost: <span className="font-semibold">{config.boostHelp ? "Oui" : "Non"}</span></p>
              <p>Promo: <span className="font-semibold">{config.promo ? "Oui" : "Non"}</span></p>
              <hr className="my-3 border-foreground/20" />
              <p className="text-lg font-bold">Total: {calculatePrice()}€</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        {step > 1 && (
          <button
            onClick={handlePrev}
            className="flex-1 px-4 py-2 rounded-lg border border-foreground/30 hover:border-foreground/60 transition-all"
          >
            Précédent
          </button>
        )}
        {step < 4 ? (
          <button
            onClick={handleNext}
            disabled={!config.type && step === 1}
            className="flex-1 px-4 py-2 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all disabled:opacity-50"
          >
            Suivant
          </button>
        ) : (
          <button
            onClick={handlePay}
            disabled={!config.type}
            className="flex-1 px-4 py-2 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all disabled:opacity-50"
          >
            Passer la commande ({calculatePrice()}€)
          </button>
        )}
      </div>
    </div>
  );
}
