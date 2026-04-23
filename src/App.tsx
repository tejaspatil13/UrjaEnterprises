import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/authContext";
import Index from "./pages/Index.tsx";
import Products from "./pages/Products.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";
import { ScrollToTop } from "./components/ScrollToTop.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            
            {/* Custom SEO Routes for Products mapping to specific categories */}
            <Route path="/products/vcb-closing-tripping-coils" element={<Products predefinedCategory="Tripping Coil" />} />
            <Route path="/products/vcb-mechanisms-and-spares" element={<Products predefinedCategory="VCB Panel Spares" />} />
            <Route path="/products/auxiliary-limit-switches" element={<Products predefinedCategory="Switches" />} />
            <Route path="/products/vcb-pole-assembly-insulators" element={<Products predefinedCategory="VCB Panel Spares" />} />
            
            <Route path="/products/Circuit Breaker" element={<Products predefinedCategory="Circuit Breaker" />} />
            <Route path="/products/Tripping Coil" element={<Products predefinedCategory="Tripping Coil" />} />
            <Route path="/products/Spring Charging Motor" element={<Products predefinedCategory="Spring Charging Motor" />} />
            <Route path="/products/Current Transformer" element={<Products predefinedCategory="Current Transformer" />} />
            <Route path="/products/Switches" element={<Products predefinedCategory="Switches" />} />
            <Route path="/products/VCB Panel Spares" element={<Products predefinedCategory="VCB Panel Spares" />} />
            <Route path="/products/Vacuum Circuit Breaker" element={<Products predefinedCategory="Vacuum Circuit Breaker" />} />
            <Route path="/products/ABB Shunt Opening Release" element={<Products predefinedCategory="ABB Shunt Opening Release" />} />
            <Route path="/products/Potential Transformer" element={<Products predefinedCategory="Potential Transformer" />} />
            <Route path="/products/Busbar Support" element={<Products predefinedCategory="Busbar Support" />} />
            <Route path="/products/Voltage Transformer" element={<Products predefinedCategory="Voltage Transformer" />} />
            <Route path="/products/MCB" element={<Products predefinedCategory="MCB" />} />

            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
