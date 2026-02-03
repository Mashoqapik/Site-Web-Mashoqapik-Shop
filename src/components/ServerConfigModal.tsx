import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { gsap } from "gsap";

interface ServerConfig {
  type: "community" | "gaming" | "other" | "";
  withBot: boolean;
  botManaged: boolean;
  boostHelp: boolean;
  promo: boolean;
}

interface ServerConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DISCORD_SERVER_URL = "https://discord.gg/Takayama";

export default function ServerConfigModal({ isOpen, onClose }: ServerConfigModalProps) {
  const [config, setConfig] = useState<ServerConfig>({
    type: "",
    withBot: false,
    botManaged: false,
    boostHelp: false,
    promo: false,
  });

  const [step, setStep] = useState(1);
  const [ticketNumber, setTicketNumber] = useState("");
  const [copied, setCopied] = useState(false);

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

  const generateTicket = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `SRV-${timestamp}-${random}`;
  };

  const handleFinish = () => {
    if (config.type) {
      const ticket = generateTicket();
      setTicketNumber(ticket);
      setStep(5);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ticketNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStep(1);
    setConfig({
      type: "",
      withBot: false,
      botManaged: false,
      boostHelp: false,
      promo: false,
    });
    setTicketNumber("");
    setCopied(false);
    onClose();
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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-card/95 backdrop-blur-xl border-border max-h-96 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Créez votre serveur personnalisé</DialogTitle>
        </DialogHeader>

        {step < 5 && (
          <div className="space-y-6 py-4">
            {/* Progress bar */}
            <div>
              <div className="flex justify-between mb-4">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
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
            <div className="step-content min-h-40">
              {step === 1 && (
                <div>
                  <h4 className="text-lg font-semibold mb-4">Type de serveur</h4>
                  <div className="space-y-2">
                    {[
                      { value: "community", label: "Communauté" },
                      { value: "gaming", label: "Jeux" },
                      { value: "other", label: "Autre" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleTypeSelect(option.value as any)}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
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
                  <div className="space-y-2">
                    <label className="flex items-center p-3 rounded-lg border border-foreground/20 hover:border-foreground/50 cursor-pointer transition-all">
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
                      <label className="flex items-center p-3 rounded-lg border border-foreground/20 hover:border-foreground/50 cursor-pointer transition-all ml-4">
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
                  <div className="space-y-2">
                    <label className="flex items-center p-3 rounded-lg border border-foreground/20 hover:border-foreground/50 cursor-pointer transition-all">
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
                    <label className="flex items-center p-3 rounded-lg border border-foreground/20 hover:border-foreground/50 cursor-pointer transition-all">
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
                  <div className="space-y-2 text-sm bg-foreground/5 p-4 rounded-lg">
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
            <div className="flex gap-3">
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
                  onClick={handleFinish}
                  disabled={!config.type}
                  className="flex-1 px-4 py-2 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all disabled:opacity-50"
                >
                  Générer le ticket ({calculatePrice()}€)
                </button>
              )}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 py-4">
            <div className="flex gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-500">Ticket généré!</p>
                <p className="text-sm text-foreground/80 mt-1">
                  Votre code de commande a été créé.
                </p>
              </div>
            </div>

            <div className="p-4 bg-background rounded-lg border border-foreground/20">
              <p className="text-xs text-foreground/60 mb-3">Code de commande</p>
              <div className="flex gap-2">
                <code className="flex-1 font-mono text-sm font-semibold break-all">{ticketNumber}</code>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-all"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm font-semibold text-blue-400 mb-3">Prochaines étapes:</p>
              <ol className="text-sm space-y-2 text-foreground/80">
                <li>1. Rejoignez le serveur communautaire</li>
                <li>2. Créez un ticket avec votre code de commande</li>
                <li>3. Nos équipes traiteront votre demande de serveur</li>
              </ol>
            </div>

            <a
              href={DISCORD_SERVER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold transition-all"
            >
              Rejoindre le serveur Discord
            </a>

            <Button
              onClick={handleClose}
              className="w-full bg-foreground text-background hover:bg-foreground/90"
            >
              Fermer
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
