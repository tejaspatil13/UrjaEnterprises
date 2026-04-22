import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/authContext";
import { buildQuoteMessage, getWhatsAppUrl, WHATSAPP_NUMBERS } from "@/lib/whatsapp";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, signOutUser } = useAuth();
  const quoteUrl = getWhatsAppUrl(WHATSAPP_NUMBERS[0], buildQuoteMessage());

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-card">
      {/* GST top strip */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="container-pro flex items-center justify-between h-8">
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3 text-accent" />
            <span className="font-medium">GST: 27AIXPP3393C1ZQ</span>
          </div>
          <div className="hidden sm:block opacity-90">
            Nashik, Maharashtra · Est. 2015
          </div>
        </div>
      </div>

      <div className="container-pro">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Urja Enterprises logo"
              className="h-12 w-12 object-contain"
              width={48}
              height={48}
            />
            <div className="leading-tight">
              <div className="font-display font-bold text-xl text-primary">
                Urja Enterprises
              </div>
              <div className="text-xs text-muted-foreground">
                Electrical Equipment & Spares
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    active
                      ? "text-accent bg-accent/10"
                      : "text-foreground/80 hover:text-primary hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            {user && role === "admin" && (
              <Button asChild variant="outline" className="ml-3">
                <Link to="/admin">Admin Panel</Link>
              </Button>
            )}
            {user ? (
              <Button
                variant="outline"
                className="ml-3"
                onClick={async () => {
                  await signOutUser();
                  navigate("/products");
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Button asChild variant="outline" className="ml-3">
                <Link to="/admin">Sign In</Link>
              </Button>
            )}
            <Button asChild variant="default" className="ml-3 bg-accent text-accent-foreground hover:bg-accent-glow font-semibold">
              <a href={quoteUrl} target="_blank" rel="noreferrer">Get Quote</a>
            </Button>
          </nav>

          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <nav className="lg:hidden pb-4 flex flex-col gap-1 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-md text-sm font-medium",
                  location.pathname === item.to
                    ? "text-accent bg-accent/10"
                    : "text-foreground/80 hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
            {user && role === "admin" && (
              <Button asChild variant="outline">
                <Link to="/admin" onClick={() => setOpen(false)}>Admin Panel</Link>
              </Button>
            )}
            {user ? (
              <Button
                variant="outline"
                onClick={async () => {
                  await signOutUser();
                  setOpen(false);
                  navigate("/products");
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link to="/admin" onClick={() => setOpen(false)}>Sign In</Link>
              </Button>
            )}
            <Button asChild className="mt-2 bg-accent text-accent-foreground hover:bg-accent-glow">
              <a href={quoteUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Get Quote</a>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
