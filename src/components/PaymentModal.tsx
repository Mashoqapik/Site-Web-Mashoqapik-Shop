import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Copy, Check } from "lucide-react";
import type { Product } from "./ShopSection";

interface PaymentModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ product, isOpen, onClose }: PaymentModalProps) {
  const [step, setStep] = useState<"details" | "warning" | "error" | "success">("details");
  const [ticketNumber, setTicketNumber] = useState("");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const DISCORD_SERVER_URL = "https://discord.gg/Takayama";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      const cleaned = value.replace(/\s/g, "");
      const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim();
      setFormData(prev => ({ ...prev, [name]: formatted.slice(0, 19) }));
      return;
    }

    // Format expiry date
    if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length >= 2) {
        const formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
        setFormData(prev => ({ ...prev, [name]: formatted }));
      } else {
        setFormData(prev => ({ ...prev, [name]: cleaned }));
      }
      return;
    }

    // Limit CVV to 3-4 digits
    if (name === "cvv") {
      const cleaned = value.replace(/\D/g, "");
      setFormData(prev => ({ ...prev, [name]: cleaned.slice(0, 4) }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateTicket = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TKY-${timestamp}-${random}`;
  };

  const handlePaymentAttempt = () => {
    // Check if all fields are filled
    if (!formData.cardNumber || !formData.cardHolder || !formData.expiryDate || !formData.cvv) {
      setStep("error");
      return;
    }

    // Show warning
    setStep("warning");
  };

  const handleConfirmPayment = () => {
    // Generate ticket and show success
    const ticket = generateTicket();
    setTicketNumber(ticket);
    setStep("success");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ticketNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStep("details");
    setFormData({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    });
    setTicketNumber("");
    setCopied(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Paiement</DialogTitle>
          <DialogDescription className="text-sm">
            {product.title} - {product.price}
          </DialogDescription>
        </DialogHeader>

        {step === "details" && (
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Numéro de carte
              </label>
              <Input
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleInputChange}
                maxLength={19}
                className="bg-background border-border text-foreground"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Titulaire de la carte
              </label>
              <Input
                name="cardHolder"
                placeholder="Jean Dupont"
                value={formData.cardHolder}
                onChange={handleInputChange}
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Date d'expiration
                </label>
                <Input
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  maxLength={5}
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  CVV
                </label>
                <Input
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  maxLength={4}
                  type="password"
                  className="bg-background border-border text-foreground"
                />
              </div>
            </div>

            <Button
              onClick={handlePaymentAttempt}
              className="w-full bg-foreground text-background hover:bg-foreground/90"
            >
              Payer {product.price}
            </Button>
          </div>
        )}

        {step === "warning" && (
          <div className="space-y-4 py-4">
            <div className="flex gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-500">⚠️ Site non validé</p>
                <p className="text-sm text-foreground/80 mt-1">
                  Ce site n'est pas encore validé pour les paiements réels. Veuillez ne pas entrer vos vraies informations bancaires.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                onClick={handleConfirmPayment}
                className="w-full bg-foreground text-background hover:bg-foreground/90"
              >
                Continuer (Mode Test)
              </Button>
              <Button
                onClick={() => setStep("details")}
                variant="outline"
                className="w-full"
              >
                Retour
              </Button>
            </div>
          </div>
        )}

        {step === "error" && (
          <div className="space-y-4 py-4">
            <div className="flex gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-500">Erreur de paiement</p>
                <p className="text-sm text-foreground/80 mt-1">
                  Veuillez vérifier vos informations et réessayer.
                </p>
              </div>
            </div>
            <Button
              onClick={() => setStep("details")}
              className="w-full bg-foreground text-background hover:bg-foreground/90"
            >
              Retour
            </Button>
          </div>
        )}

        {step === "success" && (
          <div className="space-y-4 py-4">
            <div className="flex gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-500">Commande confirmée!</p>
                <p className="text-sm text-foreground/80 mt-1">
                  Votre commande a été prise en compte.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-background rounded-lg border border-foreground/20">
                <p className="text-xs text-foreground/60 mb-2">Numéro de ticket</p>
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
                  <li>2. Créez un ticket avec votre numéro de commande</li>
                  <li>3. Nos équipes traiteront votre demande</li>
                </ol>
              </div>

              <a
                href={DISCORD_SERVER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold transition-all"
              >
                Rejoindre le serveur Discord
              </a>
            </div>

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
