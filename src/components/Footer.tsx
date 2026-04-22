import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, FileText, Zap } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="container-pro py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Urja Enterprises" className="h-10 w-10 bg-background/10 rounded p-1" width={40} height={40} loading="lazy" />
            <div>
              <div className="font-display font-bold text-lg">Urja Enterprises</div>
              <div className="text-xs opacity-70">Since 2015</div>
            </div>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">
            Trusted manufacturer and supplier of high-quality electrical equipment,
            circuit breakers, transformers, and VCB panel spares.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-accent mb-4 uppercase text-xs tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-accent transition-colors">Products</Link></li>
            <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-accent mb-4 uppercase text-xs tracking-wider">Company</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex items-start gap-2">
              <FileText className="h-4 w-4 mt-0.5 text-accent shrink-0" />
              <span>GST: 27AIXPP3393C1ZQ</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="h-4 w-4 mt-0.5 text-accent shrink-0" />
              <span>Business Type: Proprietor</span>
            </li>
            <li>Proprietor: Mr. Ravindra Patil</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-accent mb-4 uppercase text-xs tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
              <span>401, Samarth Heights, Watala, Pathardi Road, Indira Nagar, Nashik, Maharashtra 422009</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent shrink-0" />
              <a href="tel:9823888629" className="hover:text-accent">+91 98238 88629</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent shrink-0" />
              <a href="mailto:Vaishnotej629@gmail.com" className="hover:text-accent break-all">Vaishnotej629@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-pro py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-70">
          <div>© {new Date().getFullYear()} Urja Enterprises. All rights reserved.</div>
          <div>Designed for industrial excellence.</div>
        </div>
      </div>
    </footer>
  );
}
