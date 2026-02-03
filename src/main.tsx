import { createRoot } from "react-dom/client";
import { Toaster } from "./components/ui/sonner";
import Home from "./pages/Home";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Home />
      <Toaster />
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Force dark mode on the html element
document.documentElement.classList.add('dark');

createRoot(rootElement).render(<App />);
