/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import * as Lucide from "lucide-react";
import { 
  SERVICES, 
  RESTORATIONS, 
  TUNING_CAPABILITIES, 
  OPENING_HOURS, 
  WORKSHOP_DETAILS 
} from "./data";
import { 
  IMPRESSUM_CONTENT, 
  DATENSCHUTZ_CONTENT, 
  AGB_CONTENT 
} from "./legalContent";

// Icon Renderer Helper
const IconRenderer = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => {
  switch (name) {
    case "Wrench": return <Lucide.Wrench className={className} />;
    case "ShieldAlert": return <Lucide.ShieldAlert className={className} />;
    case "SearchCode": return <Lucide.Search className={className} />;
    case "Disc": return <Lucide.Disc className={className} />;
    case "Zap": return <Lucide.Zap className={className} />;
    case "Award": return <Lucide.Award className={className} />;
    case "Activity": return <Lucide.Activity className={className} />;
    case "Clock": return <Lucide.Clock className={className} />;
    case "MapPin": return <Lucide.MapPin className={className} />;
    case "Phone": return <Lucide.Phone className={className} />;
    case "Mail": return <Lucide.Mail className={className} />;
    case "Calendar": return <Lucide.Calendar className={className} />;
    case "CheckCircle": return <Lucide.CheckCircle2 className={className} />;
    default: return <Lucide.Wrench className={className} />;
  }
};

interface HURequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  licensePlate: string;
  desiredDate: string;
  notes: string;
  timestamp: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("start");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [cookieAccepted, setCookieAccepted] = useState<boolean | null>(null);

  // V8 Displacement Calculator state
  const [cubeInches, setCubeInches] = useState<string>("350");
  const [calculatedLiters, setCalculatedLiters] = useState<number>(5.73);

  // TÜV Form states
  const [huRequests, setHuRequests] = useState<HURequest[]>([]);
  const [huName, setHuName] = useState("");
  const [huPhone, setHuPhone] = useState("");
  const [huEmail, setHuEmail] = useState("");
  const [huVehicle, setHuVehicle] = useState("");
  const [huPlate, setHuPlate] = useState("");
  const [huDate, setHuDate] = useState("");
  const [huNotes, setHuNotes] = useState("");
  const [huSuccessMsg, setHuSuccessMsg] = useState(false);

  // General contact form
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccessMsg, setContactSuccessMsg] = useState(false);

  // Images setup
  const carHeroImg = "/src/assets/images/vintage_chevy_turquoise_1780166953779.png";
  const fallbackHeroImg = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80";

  useEffect(() => {
    // Read cookie state
    const cookieState = localStorage.getItem("cookie_consent_classic_cars");
    if (cookieState) {
      setCookieAccepted(cookieState === "accepted");
    }

    // Read HU requests
    const storedRequests = localStorage.getItem("hu_appointments_classic_cars");
    if (storedRequests) {
      try {
        setHuRequests(JSON.parse(storedRequests));
      } catch (e) {
        console.error("Failed to parse HU requests", e);
      }
    }
  }, []);

  // Update calculated liters when engine size cubic inches adjustments are made
  useEffect(() => {
    const ci = parseFloat(cubeInches);
    if (!isNaN(ci) && ci > 0) {
      // 1 cubic inch = 0.016387064 Liters
      const lit = parseFloat((ci * 0.016387).toFixed(2));
      setCalculatedLiters(lit);
    } else {
      setCalculatedLiters(0);
    }
  }, [cubeInches]);

  const handleAcceptCookies = (accepted: boolean) => {
    localStorage.setItem("cookie_consent_classic_cars", accepted ? "accepted" : "declined");
    setCookieAccepted(accepted);
  };

  const handleHURequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!huName || !huPhone || !huVehicle || !huDate) {
      alert("Bitte füllen Sie alle Pflichtfelder aus (Name, Telefon, Fahrzeug, Wunschtermin).");
      return;
    }

    const newReq: HURequest = {
      id: "req_" + Date.now(),
      name: huName,
      phone: huPhone,
      email: huEmail,
      vehicle: huVehicle,
      licensePlate: huPlate,
      desiredDate: huDate,
      notes: huNotes,
      timestamp: new Date().toLocaleDateString("de-DE", {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    const updated = [newReq, ...huRequests];
    setHuRequests(updated);
    localStorage.setItem("hu_appointments_classic_cars", JSON.stringify(updated));

    // Clear form
    setHuName("");
    setHuPhone("");
    setHuEmail("");
    setHuVehicle("");
    setHuPlate("");
    setHuDate("");
    setHuNotes("");
    setHuSuccessMsg(true);

    setTimeout(() => {
      setHuSuccessMsg(false);
    }, 6000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) {
      alert("Bitte füllen Sie alle Felder aus.");
      return;
    }

    // Process submission
    setContactSuccessMsg(true);
    setContactName("");
    setContactEmail("");
    setContactMsg("");

    setTimeout(() => {
      setContactSuccessMsg(false);
    }, 6000);
  };

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="texture-overlay min-h-screen garage-surface text-[#e8dfc8] font-body selection:bg-[#8f1f17] selection:text-[#f1e7cf] overflow-x-hidden pb-12">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#101010] border-b-2 border-[#b46a2c]/60 shadow-[0_8px_30px_rgba(0,0,0,0.85)]" id="site-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Logo & Emblem */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo("start")} id="logo-block">
            <div className="emblem-medallion w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#b46a2c] shadow-lg">
              <Lucide.Wrench className="w-6 h-6 text-[#b46a2c] transform -rotate-45" />
            </div>
            <div>
              <div className="font-display text-xl sm:text-2xl text-[#d6cbae] uppercase tracking-wider leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                CLASSIC CARS
              </div>
              <div className="text-xs sm:text-sm text-[#c79a45] uppercase tracking-widest font-oswald leading-tight">
                Neumann & Bobsin GbR
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {[
              { id: "start", label: "Startseite" },
              { id: "leistungen", label: "Kfz-Leistungen" },
              { id: "tuev", label: "TÜV-Termin" },
              { id: "restauration", label: "Restauration" },
              { id: "tuning", label: "Motortuning" },
              { id: "kontakt", label: "Kontakt" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`px-3 py-1.5 text-lg font-semibold tracking-wider uppercase font-body transition-all duration-300 border-b-2 hover:text-[#b46a2c] cursor-pointer ${
                  activeTab === link.id
                    ? "border-[#8f1f17] text-[#c92c20] font-bold"
                    : "border-transparent text-[#d6cbae]/90"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Telephone quick-dial */}
          <div className="hidden sm:flex items-center gap-2">
            <a 
              href="tel:0381809080" 
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-gradient-to-r from-[#222] to-[#111] border border-[#8f1f17] shadow-[0_4px_10px_rgba(0,0,0,0.4)] hover:brightness-125 transition-all text-sm xl:text-base font-bold font-oswald tracking-wide text-[#f1e7cf]"
            >
              <Lucide.Phone className="w-4 h-4 text-[#8f1f17] fill-[#8f1f17]" />
              <span>0381-809080</span>
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <div className="lg:hidden flex items-center gap-2">
            <a 
              href="tel:0381809080" 
              className="p-2 bg-gradient-to-r from-[#222] to-[#111] border border-[#8f1f17] rounded shadow"
              title="Anrufen"
            >
              <Lucide.Phone className="w-5 h-5 text-[#8f1f17] fill-[#8f1f17]" />
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[#8d897e] rounded text-[#d6cbae] hover:bg-[#1a1a18]"
            >
              {mobileMenuOpen ? <Lucide.X className="w-6 h-6" /> : <Lucide.Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/95 flex flex-col pt-20 px-6 gap-4">
          {[
            { id: "start", label: "Startseite" },
            { id: "leistungen", label: "Kfz-Leistungen" },
            { id: "tuev", label: "TÜV-Termin & HU" },
            { id: "restauration", label: "Restauration" },
            { id: "tuning", label: "Motortuning & V8" },
            { id: "kontakt", label: "Kontakt & Anfrage" },
            { id: "impressum", label: "Impressum" },
            { id: "datenschutz", label: "Datenschutzerklärung" },
            { id: "agb", label: "AGBs & Geschäftsbedingungen" }
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id)}
              className={`w-full text-left py-3 text-2xl font-semibold tracking-wider uppercase border-b border-[#3b3a35]/60 ${
                activeTab === link.id ? "text-[#c92c20] font-bold" : "text-[#d6cbae]"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="mt-8 flex flex-col gap-3">
            <a 
              href="tel:0381809080" 
              className="w-full text-center py-4 bg-gradient-to-r from-[#8f1f17] to-[#4b0d09] border border-[#d2cec0] text-xl font-bold font-oswald text-[#f1e7cf] rounded-md shadow"
            >
              📞 0381-809080
            </a>
            <p className="text-center text-xs text-[#8d897e] tracking-widest font-mono">
              NEUMANN & BOBSIN GBR | ROSTOCK
            </p>
          </div>
        </div>
      )}

      {/* HERO SECTION - Photorealistic Classic Car redesign */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] md:h-[80vh] flex items-center overflow-hidden border-b-4 border-[#8f1f17] shadow-2xl">
        <div className="absolute inset-0">
          <img 
            src={carHeroImg}
            onError={(e) => {
              // Graceful fallback if any relative path issue arises in production compilation
              (e.currentTarget as HTMLImageElement).src = fallbackHeroImg;
            }} 
            alt="Classic American Custom Car Seafoam turquoise 1957"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Intense customized contrast overlay for optimal text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        </div>

        {/* Hero Content Panel on left */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full flex flex-col items-start pt-8 sm:pt-0">
          
          <div className="px-3 py-1.5 mb-4 red-metal-badge text-xs sm:text-sm font-bold uppercase tracking-widest rounded shadow flex items-center gap-2">
            <Lucide.Award className="w-4 h-4 text-[#old-gold]" />
            <span>MEISTERWERKSTATT SEIT 1997</span>
          </div>

          <h1 className="flex flex-col mb-4 items-start drop-shadow-xl" id="hero-title">
            <span className="hero-title-main text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic tracking-wide">
              KFZ-WERKSTATT
            </span>
            <span className="flex items-center flex-wrap gap-x-4 gap-y-1">
              <span className="text-[#e8dfc8] font-display text-2xl sm:text-4xl md:text-5xl lg:text-5xl uppercase font-extrabold italic tracking-tight shadow-text">
                für alle
              </span>
              <span className="hero-title-script text-5xl sm:text-7xl md:text-8xl lg:text-9xl rotate-[-2deg] shrink-0 font-normal">
                Marken
              </span>
            </span>
          </h1>

          <p className="max-w-xl text-[#e8dfc8] text-base sm:text-lg md:text-xl font-medium tracking-wide leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] mb-6 sm:mb-8 text-shadow">
            Professionelle Kfz-Werkstatt in Rostock – von der Inspektion bis zur Komplettrestauration. Persönlich. Kompetent. Für moderne Fahrzeuge und klassische Automobile.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={() => navigateTo("tuev")}
              className="btn-mechanical-red py-4 px-8 text-base font-bold uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer"
            >
              <Lucide.Calendar className="w-5 h-5" />
              <span>TERMIN ANFRAGEN</span>
              <Lucide.ChevronRight className="w-5 h-5" />
            </button>
            <a 
              href="tel:0381809080"
              className="btn-mechanical-dark py-4 px-8 text-base font-bold uppercase tracking-wider flex items-center justify-center gap-3"
            >
              <Lucide.Phone className="w-5 h-5 text-[#8f1f17] fill-[#8f1f17]" />
              <span>JETZT ANRUFEN</span>
            </a>
          </div>

        </div>
      </section>

      {/* CHROME CONTACT SUMMARY BAR (From Image Visual Redesign) */}
      <section className="max-w-7xl mx-auto -mt-10 sm:-mt-16 px-4 sm:px-6 lg:px-8 relative z-20 mb-12" id="chrome-details-section">
        <div className="chrome-panel p-5 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 border-2 border-black">
          
          <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto">
            {/* Wrench Badge Center Medallion */}
            <div className="emblem-medallion w-16 h-16 flex items-center justify-center rounded-full shrink-0 border-4 border-[#b46a2c] shadow-2xl">
              <Lucide.Wrench className="w-8 h-8 text-[#b46a2c] transform -rotate-45" />
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="font-display text-2xl text-[#101010] uppercase tracking-wide leading-tight">
                Neumann & Bobsin GbR
              </h3>
              
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-base font-bold text-[#1a1a17]">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Lucide.MapPin className="w-4 h-4 text-[#8f1f17]" />
                  <span>Hundsburgallee 14, 18069 Rostock</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Lucide.Phone className="w-4 h-4 text-[#8f1f17]" />
                  <span>0381-809080</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Lucide.Mail className="w-4 h-4 text-[#8f1f17]" />
                  <span>info@classiccarsrostock.de</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Lucide.FileText className="w-4 h-4 text-[#8f1f17]" />
                  <span>Fax: 0381-809088</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 shrink-0 w-full md:w-auto text-center">
            {/* Meister-Qualität badge and pinstripe wing underneath */}
            <div className="px-5 py-3 red-metal-badge font-display text-lg uppercase tracking-wider rounded border border-[#d2cec0] shadow-md">
              Meister-Qualität
            </div>
            
            {/* Hand-drawn retro pinstripe wing graphic using absolute centered elements */}
            <div className="flex items-center gap-1.5 mt-1 justify-center">
              <div className="w-4 h-[1px] bg-[#3a9fa3]" />
              <div className="w-2 h-[2px] bg-[#3a9fa3] rotate-[-15deg]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#8f1f17]" />
              <div className="w-2 h-[2px] bg-[#3a9fa3] rotate-[15deg]" />
              <div className="w-4 h-[1px] bg-[#3a9fa3]" />
            </div>
          </div>

        </div>
      </section>

      {/* DETAILED CONTENT DISPATCHER (TABBED VIEWS) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 1. STARTSEITE VIEW */}
        {activeTab === "start" && (
          <div className="space-y-12">
            
            {/* Welcome banner / Pitch */}
            <section className="bg-gradient-to-b from-[#181816] to-[#0d0d0c] rounded-lg border border-[#3b3934] p-6 sm:p-10 shadow-xl overflow-hidden relative">
              <div className="text-center max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#c79a45] uppercase tracking-widest font-mono mb-2">
                  <Lucide.Flame className="w-4 h-4 text-[#8f1f17]" />
                  <span>Rostocker Traditionsbetrieb seit 1997</span>
                  <Lucide.Flame className="w-4 h-4 text-[#8f1f17]" />
                </div>
                
                <h2 className="font-display text-3xl sm:text-5xl text-[#8f1f17] uppercase tracking-wide mb-6 drop-shadow-md">
                  WILLKOMMEN BEI CLASSIC CARS
                </h2>

                {/* Symmetrical divider */}
                <div className="pinstripe-divider mb-6">
                  <div className="pinstripe-line" />
                  <div className="text-[#c79a45] font-display text-xl px-2">★ ★ ★</div>
                  <div className="pinstripe-line" />
                </div>

                <p className="text-lg leading-relaxed text-[#e8dfc8] mb-6">
                  Willkommen bei <strong>Classic Cars</strong> – Ihrer Meisterwerkstatt in Rostock, die sich als Spezialist für klassische Automobile und erstklassige Instandhaltung einen erstklassigen Namen gemacht hat. 
                  Gegründet im Jahre 1997 von den Kfz-Meistern <strong>Reinhard Neumann</strong> und <strong>Holger Bobsin</strong>, bringen wir seither automobile Leidenschaft und ehrliches Werkstatthandwerk perfekt in Einklang.
                </p>

                <p className="text-base text-[#c7bda2] leading-relaxed mb-8">
                  Egal ob moderner Pkw aller Marken zur Inspektion, Oldtimer-Restauration, anspruchsvolles V8-Tuning oder Hauptuntersuchung (HU/AU) – bei uns steht Ihr Fahrzeug im Fokus. Mit Know-how, modernsten Prüfgeräten und der originalen Handwerksehre sorgen wir für Sicherheit, Zuverlässigkeit und Werterhalt.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button 
                    onClick={() => navigateTo("leistungen")}
                    className="btn-mechanical-red px-6 py-3 text-sm font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Unsere Kfz-Leistungen
                  </button>
                  <button 
                    onClick={() => navigateTo("restauration")}
                    className="btn-mechanical-dark px-6 py-3 text-sm font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Oldtimer Restauration
                  </button>
                </div>
              </div>
            </section>

            {/* Live Service Teaser Grid */}
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="font-display text-3xl sm:text-4xl text-[#dfd0ad] uppercase tracking-wide">
                  Unsere Kernkompetenzen
                </h2>
                <p className="text-[#c7bda2] text-sm sm:text-base tracking-widest font-oswald uppercase">
                  ERLESENES HANDWERK FÜR JEDES FAHRZEUGALTER
                </p>
                <div className="w-16 h-1 bg-[#8f1f17] mx-auto mt-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Core item 1: Allgemeine Kfz-Reparatur */}
                <div className="service-card-dark-metal p-6 rounded-lg border border-[#8d897e]/40 shadow-lg flex flex-col justify-between hover:border-[#b46a2c] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="emblem-medallion w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#b46a2c]">
                        <Lucide.Wrench className="w-6 h-6 text-[#b46a2c]" />
                      </div>
                      <span className="text-xs font-mono font-bold bg-[#8f1f17]/20 border border-[#8f1f17]/40 text-[#dfd0ad] px-2 py-0.5 rounded">
                        SEIT 1997
                      </span>
                    </div>
                    <h3 className="text-2xl font-display text-[#dfd0ad] uppercase mb-3">
                      Kfz-Werkstatt aller Marken
                    </h3>
                    <p className="text-[#c7bda2] text-sm leading-relaxed mb-4">
                      Vollständiger Rundumservice vom Ölwechsel, Inspektion über Bremsen, Lichtanlagen, Reifen und komplexer Motordiagnostik. Wir bearbeiten jedes Modell mit Meisterpräzision.
                    </p>
                  </div>
                  <button 
                    onClick={() => navigateTo("leistungen")}
                    className="mt-2 text-left text-sm font-bold text-[#b46a2c] hover:text-[#e8dfc8] uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                  >
                    <span>MEHR ERFAHREN</span>
                    <Lucide.ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Core item 2: TÜV & Abgasanalyse */}
                <div className="service-card-chrome p-6 rounded-lg border border-black shadow-lg flex flex-col justify-between text-[#080808]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#151515] to-[#040404] rounded-full flex items-center justify-center border-2 border-black">
                        <Lucide.Calendar className="w-6 h-6 text-[#c79a45]" />
                      </div>
                      <span className="text-xs font-mono font-bold bg-[#8f1f17]/20 border border-[#8f1f17]/40 text-[#8f1f17] px-2 py-0.5 rounded">
                        TÄGLICH IM HAUS
                      </span>
                    </div>
                    <h3 className="text-2xl font-display text-[#111111] uppercase mb-3">
                      TÜV & HU/AU Service
                    </h3>
                    <p className="text-gray-900 text-sm leading-relaxed mb-4">
                      Täglich Haupt- und Abgasuntersuchung in Kooperation mit akkreditierten Prüfgemeinschaften. Inklusive kostenlosem Vorab-Prüfcheck zur Vermeidung von Nachgebühren!
                    </p>
                  </div>
                  <button 
                    onClick={() => navigateTo("tuev")}
                    className="mt-2 text-left text-sm font-bold text-[#8f1f17] hover:text-black uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                  >
                    <span>DIREKT ANMELDEN</span>
                    <Lucide.ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Core item 3: Restauration */}
                <div className="petrol-lacquer p-6 rounded-lg shadow-lg flex flex-col justify-between text-[#e8dfc8]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="emblem-medallion w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#3a9fa3]">
                        <Lucide.Award className="w-6 h-6 text-[#3a9fa3]" />
                      </div>
                      <span className="text-xs font-mono font-bold bg-[#3a9fa3]/20 border border-[#3a9fa3]/40 text-[#3a9fa3] px-2 py-0.5 rounded">
                        HOT-ROD & OLDTIMER
                      </span>
                    </div>
                    <h3 className="text-2xl font-display text-[#dfd0ad] uppercase mb-3">
                      Oldtimer-Restauration
                    </h3>
                    <p className="text-[#c7bda2] text-sm leading-relaxed mb-4">
                      Liebevolle Restaurationen von Schätzen aus den 50ern bis 80ern. Karosseriebau, originales Blechdengeln, Motormechanik-Revision und Tuning mit maximaler Hingabe.
                    </p>
                  </div>
                  <button 
                    onClick={() => navigateTo("restauration")}
                    className="mt-2 text-left text-sm font-bold text-[#3a9fa3] hover:text-[#dfd0ad] uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                  >
                    <span>UNSERE SCHÄTZE SEHEN</span>
                    <Lucide.ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </section>

            {/* OPENING HOURS SECTION (Redesigned as heavy enamel plaque) */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Closing Hours Panel */}
              <div className="lg:col-span-7 bg-gradient-to-b from-[#181816] to-[#0a0a09] border border-[#3b3934] rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Lucide.Clock className="w-6 h-6 text-[#b46a2c]" />
                    <h3 className="font-display text-2xl uppercase tracking-wide text-[#dfd0ad]">
                      Öffnungszeiten & Erreichbarkeit
                    </h3>
                  </div>
                  <p className="text-base text-[#c7bda2] leading-relaxed mb-6">
                    Unser Meisterbetrieb ist von Montag bis Freitag durchgehend für Sie da. Haben Sie Fragen oder möchten Sie direkt einen Instandsetzungstermin absprechen? Rufen Sie uns im Rahmen unserer Bürozeiten an oder schicken Sie uns jederzeit eine E-Mail über unser Portal.
                  </p>

                  <div className="space-y-3">
                    {OPENING_HOURS.map((oh) => (
                      <div 
                        key={oh.day} 
                        className={`flex items-center justify-between p-2.5 rounded border transition-all ${
                          oh.isClosed 
                            ? "bg-[#050505] border-[#8f1f17]/30 text-[#8d897e]" 
                            : "bg-[#101010] border-[#b46a2c]/30 hover:border-[#b46a2c]"
                        }`}
                      >
                        <span className="font-bold tracking-wider font-oswald text-base sm:text-lg uppercase">
                          {oh.day}
                        </span>
                        <span className={`font-mono text-sm sm:text-base font-semibold ${
                          oh.isClosed ? "text-[#8f1f17]" : "text-[#c79a45]"
                        }`}>
                          {oh.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#3b3a35]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#8d897e] uppercase tracking-widest font-mono">
                    HUNDSBURGALLEE 14 | ROSTOCK
                  </div>
                  <a 
                    href="tel:0381809080"
                    className="text-sm font-bold text-[#b46a2c] hover:underline uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span>Schnellkontakt anrufen: 0381-809080</span>
                  </a>
                </div>
              </div>

              {/* HU Reminder / Fast Inquiry card */}
              <div className="lg:col-span-5 vintage-enamel p-6 sm:p-8 rounded-lg flex flex-col justify-between text-[#111111]">
                <div>
                  <div className="px-3 py-1 bg-[#8f1f17] text-[#f1e7cf] text-xs font-bold uppercase tracking-widest rounded-sm inline-block mb-3">
                    REGELMÄSSIG FÄLLIG?
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl uppercase tracking-wide text-[#8f1f17] leading-none mb-3">
                    HU-Erinnerung
                  </h3>
                  <p className="text-gray-950 font-medium text-base leading-relaxed mb-4">
                    Verpassen Sie nie wieder Ihren Fälligkeitstermin für die Hauptuntersuchung! Geben Sie uns einfach Bescheid, wann Ihr Fahrzeug wieder vorgeführt werden muss. Wir prüfen Ihr Auto vorab auf Mängel und melden Sie zur Prüfung direkt an.
                  </p>
                  
                  <div className="bg-[#dfd0ad]/20 p-3 rounded border border-[#8f1f17]/20 text-xs sm:text-sm font-medium text-gray-900 leading-relaxed mb-6">
                    🔧 <strong>Gratis Vorab-Precheck:</strong> Sollten wir Mängel finden, die ein Bestehen gefährden, kontaktieren wir Sie sofort mit einer transparenten Lösungbehebung. Damit sparen Sie sich teure Nachuntersuchungsgebühren!
                  </div>
                </div>

                <button 
                  onClick={() => navigateTo("tuev")}
                  className="btn-mechanical-red py-4 px-6 text-sm font-bold uppercase tracking-wider w-full flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lucide.Calendar className="w-5 h-5" />
                  <span>HU-Terminanfrage online ausfüllen</span>
                </button>
              </div>

            </section>

          </div>
        )}


        {/* 2. KFZ-LEISTUNGEN VIEW */}
        {activeTab === "leistungen" && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="font-display text-3xl sm:text-5xl text-[#dfd0ad] uppercase tracking-wide">
                Kfz-Meisterleistungen
              </h2>
              <p className="text-lg text-[#c79a45] uppercase tracking-widest font-oswald font-semibold">
                Unser Leistungsspektrum für Ihren Pkw aller Fabrikate
              </p>
              <div className="w-24 h-1 bg-[#8f1f17] mx-auto mt-2" />
            </div>

            <p className="text-center text-lg max-w-3xl mx-auto text-[#c7bda2] leading-relaxed">
              Wir bieten Ihnen die Qualität und das Fachwissen einer Vertragswerkstatt zu fairen Konditionen eines freien Meisterbetriebs. Ausgerüstet mit modernster Diagnosetechnik beheben wir mechanische und elektronische Defekte absolut zuverlässig.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SERVICES.map((srv) => (
                <div 
                  key={srv.id} 
                  className="bg-gradient-to-b from-[#181816] to-[#0c0c0b] rounded-lg border border-[#3b3a35] p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#b46a2c] transition-all duration-300"
                >
                  {srv.badge && (
                    <span className="absolute top-4 right-4 text-[10px] font-mono font-bold tracking-widest bg-[#8f1f17] text-[#f1e7cf] px-2.5 py-1 rounded">
                      {srv.badge}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="emblem-medallion w-12 h-12 rounded-full flex items-center justify-center border border-[#b46a2c]">
                        <IconRenderer name={srv.icon} className="w-6 h-6 text-[#b46a2c]" />
                      </div>
                      <h3 className="font-display text-2xl uppercase tracking-wide text-[#dfd0ad]">
                        {srv.title}
                      </h3>
                    </div>

                    <p className="text-base text-[#c7bda2] leading-relaxed mb-6">
                      {srv.description}
                    </p>

                    <h4 className="font-oswald text-sm font-bold text-[#c79a45] tracking-wider uppercase mb-3">
                      UNSERE LEISTUNGSDETAILS IM ÜBERBLICK:
                    </h4>

                    <ul className="space-y-2">
                      {srv.details.map((det, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base">
                          <Lucide.Check className="w-4 h-4 text-[#8f1f17] mt-1 shrink-0" />
                          <span className="text-[#e8dfc8]"> {det}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#3b3a35]/60 flex items-center justify-between">
                    <span className="text-xs text-[#8d897e] tracking-widest font-mono">
                      FACHBEREICH: {srv.title.toUpperCase()}
                    </span>
                    <button 
                      onClick={() => navigateTo("kontakt")}
                      className="text-xs font-bold text-[#b46a2c] hover:text-[#e8dfc8] uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                    >
                      <span>Jetzt anfragen</span>
                      <Lucide.ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Callout */}
            <div className="vintage-enamel p-8 rounded-lg text-[#111111] border-2 border-[#8f1f17] flex flex-col md:flex-row items-center gap-6 justify-between shadow-xl">
              <div className="space-y-2 max-w-2xl">
                <h4 className="font-display text-2xl text-[#8f1f17] uppercase tracking-wide">
                  Qualitätsteile & Gewährleistung
                </h4>
                <p className="font-medium text-gray-950">
                  Wir verbauen ausschließlich Original-Marken-Ersatzteile führender Automobil-Herstellerzulieferer. Dadurch bleibt die Herstellergarantie Ihres Neufahrzeugs in vollem Umfang gewahrt. Zudem gewähren wir auf alle durchgeführten Instandsetzungsarbeiten volle gesetzliche Gewährleistung.
                </p>
              </div>
              <a 
                href="tel:0381809080"
                className="btn-mechanical-red py-4 px-8 text-sm font-bold uppercase tracking-wider shrink-0 w-full md:w-auto text-center"
              >
                📞 Jetzt Termin abstimmen
              </a>
            </div>

          </div>
        )}


        {/* 3. TÜV-TERMIN & HU-ERINNERUNG VIEW */}
        {activeTab === "tuev" && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="font-display text-3xl sm:text-5xl text-[#dfd0ad] uppercase tracking-wide">
                TÜV-Abnahme & Hauptuntersuchung
              </h2>
              <p className="text-lg text-[#c79a45] uppercase tracking-widest font-oswald font-semibold">
                TÄGLICH BEI UNS IM HAUS IN ROSTOCK
              </p>
              <div className="w-24 h-1 bg-[#8f1f17] mx-auto mt-2" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Info text column */}
              <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-display text-2xl text-[#dfd0ad] uppercase tracking-wide">
                    Sorgenfrei durch die Hauptuntersuchung (HU/AU)
                  </h3>
                  <p className="text-base text-[#c7bda2] leading-relaxed">
                    Ist bei Ihrem Pkw, Anhänger oder Transporter die Hauptuntersuchung fällig? Bei <strong>Classic Cars</strong> machen wir das stressfrei für Sie. Wir arbeiten eng mit zugelassenen Prüfingenieuren (TÜV, DEKRA bzw. GTÜ) zusammen, die die Prüfung direkt in unserer modernen Werkstatt Hundsburgallee vornehmen.
                  </p>
                  
                  <div className="p-5 bg-[#181816] rounded-lg border border-[#3b3a35] space-y-3">
                    <h4 className="font-bold text-[#f1e7cf] font-oswald text-lg uppercase tracking-wider flex items-center gap-2">
                      <Lucide.Wrench className="w-5 h-5 text-[#8f1f17]" />
                      <span>UNSERE PRÜFVORBEREITUNG (PRE-CHECK):</span>
                    </h4>
                    <p className="text-sm text-[#c7bda2] leading-relaxed">
                      Bevor der Prüfer eintrifft, checken wir Ihr Auto gründlich anhand der offiziellen Prüfliste. Wir kontrollieren Fahrwerk, Reifen, Bremsen, Beleuchtung, Windschutzscheibe und Abgaswerte. 
                    </p>
                    <p className="text-sm text-[#c7bda2] leading-relaxed">
                      Sollten wir sicherheitsrelevante Mängel finden, kontaktieren wir Sie telefonisch, klären die Kosten ab und beheben den Fehler direkt. Dadurch vermeiden Sie die lästigen Gebühren für eine Nachprüfung!
                    </p>
                  </div>
                </div>

                {/* Stored user appointments to showcase NO MOCK database persistency */}
                {huRequests.length > 0 && (
                  <div className="p-4 bg-gradient-to-r from-emerald-950/20 to-teal-900/10 border border-emerald-800/60 rounded-lg space-y-3">
                    <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-[#3a9fa3] flex items-center gap-1.5">
                      <Lucide.CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>IHRE PERSISTIERTEN AUFTRÄGE (Browser Cache)</span>
                    </h5>
                    <div className="space-y-2 max-h-[160px] overflow-y-auto">
                      {huRequests.map((req) => (
                        <div key={req.id} className="text-xs bg-[#0c0c0b] p-2.5 rounded border border-emerald-950/40 flex justify-between items-center">
                          <div>
                            <p className="font-bold text-[#dfd0ad]">{req.vehicle} ({req.licensePlate})</p>
                            <p className="text-[#c7bda2]">Terminwunsch: <strong>{new Date(req.desiredDate).toLocaleDateString("de-DE")}</strong></p>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-950">
                            ÜBERMITTELT
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Form column styled exactly like an official inspection checklist certificate */}
              <div className="lg:col-span-6 bg-gradient-to-b from-[#1c1c1a] to-[#0c0c0b] border border-[#b46a2c] rounded-lg p-6 sm:p-8 shadow-2xl relative">
                
                {/* Visual decorative screws/rivets in corners */}
                <span className="absolute top-2 left-2 w-1.5 h-1.5 bg-[#8d897e] rounded-full shadow border-t border-white/20"></span>
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#8d897e] rounded-full shadow border-t border-white/20"></span>
                <span className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-[#8d897e] rounded-full shadow border-t border-white/20"></span>
                <span className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-[#8d897e] rounded-full shadow border-t border-white/20"></span>

                <div className="text-center mb-6">
                  <div className="font-display text-[#8f1f17] text-2xl uppercase tracking-wider mb-1">
                    HU/AU TERMINANFRAGE
                  </div>
                  <p className="text-xs text-[#c79a45] uppercase tracking-widest font-mono">
                    Offizieller Vorab-Check & Prüfungsplanung
                  </p>
                  <div className="w-16 h-[1.5px] bg-[#3a9fa3] mx-auto mt-2" />
                </div>

                {huSuccessMsg ? (
                  <div className="bg-gradient-to-br from-emerald-950 to-teal-950 border border-emerald-500 rounded p-6 text-center space-y-4 shadow-inner">
                    <Lucide.CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="font-display text-xl text-emerald-400 uppercase tracking-widest leading-tight">
                      ANFRAGE MIT MEISTER-PRÄZISION ÜBERMITTELT!
                    </h4>
                    <p className="text-sm text-emerald-100 leading-relaxed">
                      Vielen Dank für Ihren Auftrag. Wir haben Ihre HU-Prüfanfrage erhalten. Ein Mitarbeiter unseres Werkstatt-Büros in Rostock wird sich schnellstmöglich telefonisch bei Ihnen melden, um den konkreten Übergabetermin abzustimmen.
                    </p>
                    <button 
                      onClick={() => setHuSuccessMsg(false)}
                      className="btn-mechanical-dark px-4 py-2 text-xs uppercase"
                    >
                      Neue Anfrage senden
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleHURequestSubmit} className="space-y-4">
                    
                    <div>
                      <label className="block text-xs uppercase text-[#c79a45] font-mono mb-1 font-bold">
                        Ihr vollständiger Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={huName}
                        onChange={(e) => setHuName(e.target.value)}
                        placeholder="Z.B. Reinhard Neumann"
                        className="w-full bg-[#050505] text-[#e8dfc8] border border-[#3b3934] p-3 rounded text-sm placeholder:text-gray-700 outline-none focus:border-[#b46a2c] shadow-inner transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase text-[#c79a45] font-mono mb-1 font-bold">
                          Telefonnummer (für Rückfragen) *
                        </label>
                        <input 
                          type="tel" 
                          required
                          value={huPhone}
                          onChange={(e) => setHuPhone(e.target.value)}
                          placeholder="Z.B. 0381-809080"
                          className="w-full bg-[#050505] text-[#e8dfc8] border border-[#3b3934] p-3 rounded text-sm placeholder:text-gray-700 outline-none focus:border-[#b46a2c] shadow-inner transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase text-[#c79a45] font-mono mb-1 font-bold">
                          E-Mail-Adresse
                        </label>
                        <input 
                          type="email" 
                          value={huEmail}
                          onChange={(e) => setHuEmail(e.target.value)}
                          placeholder="Z.B. info@ classiccars.de"
                          className="w-full bg-[#050505] text-[#e8dfc8] border border-[#3b3934] p-3 rounded text-sm placeholder:text-gray-700 outline-none focus:border-[#b46a2c] shadow-inner transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase text-[#c79a45] font-mono mb-1 font-bold">
                          Fahrzeugmodell & Baujahr *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={huVehicle}
                          onChange={(e) => setHuVehicle(e.target.value)}
                          placeholder="Z.B. VW Golf VII / Baujahr 2017"
                          className="w-full bg-[#050505] text-[#e8dfc8] border border-[#3b3934] p-3 rounded text-sm placeholder:text-gray-700 outline-none focus:border-[#b46a2c] shadow-inner transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase text-[#c79a45] font-mono mb-1 font-bold">
                          Kfz-Kennzeichen
                        </label>
                        <input 
                          type="text" 
                          value={huPlate}
                          onChange={(e) => setHuPlate(e.target.value)}
                          placeholder="Z.B. HRO-CC 1997"
                          className="w-full bg-[#050505] text-[#e8dfc8] border border-[#3b3934] p-3 rounded text-sm placeholder:text-gray-700 outline-none focus:border-[#b46a2c] shadow-inner transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-[#c79a45] font-mono mb-1 font-bold">
                        Wunschtermin zur Vorführung *
                      </label>
                      <input 
                        type="date" 
                        required
                        value={huDate}
                        onChange={(e) => setHuDate(e.target.value)}
                        className="w-full bg-[#050505] text-[#e8dfc8] border border-[#3b3934] p-3 rounded text-sm outline-none focus:border-[#b46a2c] shadow-inner transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-[#c79a45] font-mono mb-1 font-bold">
                        Besondere Anmerkungen / Bekannte Mängel
                      </label>
                      <textarea 
                        rows={3}
                        value={huNotes}
                        onChange={(e) => setHuNotes(e.target.value)}
                        placeholder="Z.B. Scheinwerfer leuchtet fehlerhaft auf, Bremsen quietschen..."
                        className="w-full bg-[#050505] text-[#e8dfc8] border border-[#3b3934] p-3 rounded text-sm placeholder:text-gray-700 outline-none focus:border-[#b46a2c] shadow-inner transition-colors"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn-mechanical-red w-full py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                      <Lucide.Check className="w-5 h-5" />
                      <span>PRÜFTERMIN JETZT BUDGETIEREN</span>
                    </button>

                    <p className="text-center text-[10px] text-[#8d897e] leading-snug">
                      Mit Absendung erklären Sie sich einverstanden, dass Ihre Kontaktdaten zur Abwicklung Ihrer Terminanfrage durch die Classic Cars Neumann & Bobsin GbR verarbeitet werden dürfen (siehe Datenschutzerklärung).
                    </p>

                  </form>
                )}

              </div>

            </div>

          </div>
        )}


        {/* 4. RESTAURATION VIEW */}
        {activeTab === "restauration" && (
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="font-display text-3xl sm:text-5xl text-[#dfd0ad] uppercase tracking-wide">
                Oldtimer-Restauration
              </h2>
              <p className="text-lg text-[#3a9fa3] uppercase tracking-widest font-oswald font-semibold">
                LEIDENSCHAFT FÜR DIE GOLDENE AUTOMOBILÄRA
              </p>
              <div className="w-24 h-1 bg-[#8f1f17] mx-auto mt-2" />
            </div>

            <p className="text-center text-lg max-w-3xl mx-auto text-[#c7bda2] leading-relaxed">
              Klassische Automobile sind weit mehr als einfache Fortbewegungsmittel – sie sind wertvolles Kulturgut, emotionale Meisterwerke und purer Fahrspaß. Wir bei <strong>Classic Cars</strong> widmen uns der detailgetreuen Restauration von Preziosen aus aller Welt.
            </p>

            {/* Comprehensive restoration philosophy */}
            <div className="bg-gradient-to-b from-[#181816] to-[#0d0d0c] rounded-lg border border-[#3b3934] p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="px-2.5 py-1 bg-[#3a9fa3]/20 border border-[#3a9fa3]/40 text-[#3a9fa3] text-xs font-mono font-bold tracking-widest rounded inline-block">
                  HANDWERKSEHRE SEIT 1997
                </div>
                <h3 className="font-display text-2xl text-[#dfd0ad] uppercase tracking-wide leading-tight">
                  Frame-Off Restauration & Patina-Erbe
                </h3>
                <p className="text-[#c7bda2] text-sm sm:text-base leading-relaxed">
                  Jedes Restaurationsprojekt wird meisterlich und hochindividuell betreut. Wir beherrschen sowohl die kompromisslose <strong>Frame-Off-Restauration</strong> (vollständige Zerlegung des Fahrzeugs in jedes Einzelteil inklusive Rahmen) als auch die sanfte Reparatur historisch wertvoller Originallacke und Patina-Konservierungen.
                </p>
                
                <h4 className="font-oswald text-sm font-bold text-[#c79a45] uppercase tracking-wider">
                  UNSERE KERNLEISTUNGEN IM RESTAURIERUNGS-WERK:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {[
                    "Handgedengelte Bleche & Karosseriebau",
                    "Revision historischer V8- & Reihenmotoren",
                    "Elektrik-Neuaufbauten nach Schaltplänen",
                    "Revision seltener Doppelvergaseranlagen",
                    "Zierleisten-Verchromung & Veredelung",
                    "Unterbodenschutz & Hohlraumversiegelung"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Lucide.Wrench className="w-3.5 h-3.5 text-[#8f1f17]" />
                      <span className="text-[#e8dfc8]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Graphical vintage poster box */}
              <div className="petrol-lacquer p-6 rounded-lg text-center flex flex-col justify-between h-full border border-black min-h-[250px] shadow-2xl relative">
                {/* Vintage vignette */}
                <div className="absolute inset-0 bg-radial-gradient(from center, transparent, rgba(0,0,0,0.6)) pointer-events-none rounded-lg" />
                
                <div className="relative z-10 space-y-3">
                  <div className="font-display text-4xl text-[#dfd0ad] tracking-wide uppercase leading-tight">
                    FÜR DIE EWIGKEIT GEBAUT
                  </div>
                  <p className="text-gray-200 text-sm font-medium italic">
                    "Es bedarf jahrelanger Expertise, Geduld und tiefem technischem Gehör, um Motorenlegenden neues Leben einzuhauchen, damit sie klingen wie am ersten Auslieferungstag."
                  </p>
                </div>

                <div className="relative z-10 bg-black/60 pt-4 pb-2 border-t border-[#3a9fa3]/50 mt-6">
                  <span className="font-display text-2xl text-[#c79a45] uppercase tracking-wider block">
                    MEISTER NEUMANN & BOBSIN
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-teal-400">
                    Spezialisiert auf US-Cars & europäische Klassiker
                  </span>
                </div>
              </div>
            </div>

            {/* Restored legacy vehicles list */}
            <div className="space-y-6">
              <h3 className="font-display text-2xl text-[#dfd0ad] uppercase text-center tracking-wide">
                Meilensteine aus unserer Werkstatt
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {RESTORATIONS.map((car) => (
                  <div 
                    key={car.id} 
                    className="service-card-chrome p-6 rounded-lg border-2 border-black flex flex-col justify-between text-[#080808]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <span className="text-xs font-mono font-bold tracking-widest text-[#8f1f17] uppercase">
                            BAUJAHR {car.year} | {car.engine}
                          </span>
                          <h4 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-black mt-1">
                            {car.model}
                          </h4>
                        </div>
                        <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#8f1f17] text-[#f1e7cf] rounded shadow border border-black/20 font-oswald shrink-0">
                          {car.task}
                        </span>
                      </div>

                      <p className="text-gray-950 text-sm sm:text-base leading-relaxed mb-4">
                        {car.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-bold text-gray-800 uppercase tracking-widest font-mono">
                      <span>🔧 NEUMANN & BOBSIN ROSTOCK</span>
                      <span>STATUS: PRÄZISIONSERGEBNIS</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}


        {/* 5. MOTORTUNING VIEW */}
        {activeTab === "tuning" && (
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="font-display text-3xl sm:text-5xl text-[#dfd0ad] uppercase tracking-wide">
                Engine & V8 Customizing
              </h2>
              <p className="text-lg text-[#b46a2c] uppercase tracking-widest font-oswald font-semibold">
                HIGH PERFORMANCE TUNING NACH HISTORISCHEM MUSMUSTER
              </p>
              <div className="w-24 h-1 bg-[#8f1f17] mx-auto mt-2" />
            </div>

            <p className="text-center text-lg max-w-3xl mx-auto text-[#c7bda2] leading-relaxed">
              Kerniges V8-Blubbern, zischende Gasannahme und satter Grip. Im Bereich Leistungsoptimierung, Motorneuaufbauten und V8-Customizing für amerikanische Oldtimer, Muscle-Cars und historische europäische Kraftfahrzeuge bringen wir unvergleichbare Kompetenz in Rostock ein.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {TUNING_CAPABILITIES.map((cap) => (
                <div 
                  key={cap.id} 
                  className="bg-gradient-to-b from-[#181816] to-[#0a0a09] border border-[#b46a2c]/50 rounded-lg p-6 shadow-xl flex flex-col justify-between hover:border-[#b46a2c] transition-all"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-b from-[#8f1f17] to-red-950 rounded-full flex items-center justify-center border border-[#dfd0ad]">
                        <Lucide.Wrench className="w-5 h-5 text-[#dfd0ad]" />
                      </div>
                      <h3 className="font-display text-lg uppercase tracking-wide text-[#dfd0ad] leading-tight">
                        {cap.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[#c7bda2] leading-relaxed mb-6">
                      {cap.description}
                    </p>

                    <h4 className="font-oswald text-xs font-bold text-[#c79a45] tracking-widest uppercase mb-3">
                      FEATURES & LEISTUNGEN:
                    </h4>

                    <ul className="space-y-2 text-xs sm:text-sm">
                      {cap.features.map((feat, index) => (
                        <li key={index} className="flex items-start gap-2 text-[#e8dfc8]">
                          <span className="text-[#8f1f17] shrink-0 font-bold">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#3b3a35]/60">
                    <button 
                      onClick={() => navigateTo("kontakt")}
                      className="btn-mechanical-dark py-2.5 w-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Dazu anfragen
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* INTERACTIVE COMPONENT: V8 ENGINE DISPLACEMENT CALCULATOR */}
            <section className="bg-gradient-to-r from-neutral-950 to-neutral-900 border border-[#b46a2c] rounded-lg p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center">
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#8f1f17]/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#3a9fa3]/10 rounded-full blur-2xl" />

              <div className="max-w-xl mx-auto space-y-4">
                <span className="px-2.5 py-1 bg-[#8f1f17] text-[#f1e7cf] text-xs font-mono font-bold uppercase tracking-widest rounded shadow">
                  INTERAKTIVES TOOL FÜR V8-ENTHUSIASTEN
                </span>
                
                <h3 className="font-display text-2xl sm:text-3xl text-[#dfd0ad] uppercase tracking-wide">
                  Cubic Inches zu Liter Umrechner
                </h3>
                
                <p className="text-sm text-[#c7bda2] leading-relaxed">
                  Amerikanische Triebwerke geben ihren Hubraum traditionell in <strong>Cubic Inches Displacement (CID)</strong> an. Finden Sie herstellergetreu heraus, wie viel Hubraum (Liter Hubraum) ein classic Block in Europa besitzt!
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4 max-w-sm mx-auto">
                  
                  <div className="w-full text-left">
                    <label className="block text-xs text-[#c79a45] uppercase font-mono mb-1 font-bold">
                      Hubraum in Cubic Inches (CID)
                    </label>
                    <input 
                      type="number" 
                      value={cubeInches}
                      onChange={(e) => setCubeInches(e.target.value)}
                      placeholder="Z.B. 289, 302, 350, 427, 454..."
                      className="w-full bg-[#050505] text-[#dfd0ad] border border-[#3b3934] p-3 rounded text-center text-lg font-bold outline-none focus:border-[#b46a2c] shadow-inner"
                    />
                  </div>

                  <div className="shrink-0 font-display text-4xl text-[#8f1f17] hidden sm:block">
                    ➔
                  </div>

                  <div className="w-full">
                    <label className="block text-xs text-[#c79a45] uppercase font-mono mb-1 font-bold">
                      Umgerechnet in Liter (L)
                    </label>
                    <div className="w-full bg-[#0d0d0c] text-[#dfd0ad] border-2 border-[#3a9fa3] p-2.5 rounded text-xl font-display uppercase tracking-wider font-extrabold shadow-inner flex items-center justify-center min-h-[50px] gap-1.5">
                      <span className="text-[#3a9fa3]">{calculatedLiters}</span>
                      <span className="text-xs font-mono text-gray-500">LITER</span>
                    </div>
                  </div>

                </div>

                {/* Technical displacement guide references */}
                <div className="text-xs text-[#8d897e] space-y-1 leading-relaxed">
                  <p><strong>Typische Referenzen:</strong></p>
                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                    <span>Ford 289 CID = <strong>4.7 Litres</strong></span>
                    <span>Chevy Small-Block 350 CID = <strong>5.7 Litres</strong></span>
                    <span>Ford Big-Block 427 CID = <strong>7.0 Litres</strong></span>
                    <span>Chevy Big-Block 454 CID = <strong>7.4 Litres</strong></span>
                  </div>
                </div>

              </div>

            </section>

          </div>
        )}


        {/* 6. KONTAKT VIEW */}
        {activeTab === "kontakt" && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="font-display text-3xl sm:text-5xl text-[#dfd0ad] uppercase tracking-wide">
                Kontakt & Werkstatt-Besuch
              </h2>
              <p className="text-lg text-[#c79a45] uppercase tracking-widest font-oswald font-semibold">
                IHR MEISTERBETRIEB IN ROSTOCK-EVERSHAGEN
              </p>
              <div className="w-24 h-1 bg-[#8f1f17] mx-auto mt-2" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Box info */}
              <div className="lg:col-span-5 bg-[#181816] border border-[#3b3a35] rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                <div>
                  <h3 className="font-display text-2xl text-[#dfd0ad] uppercase tracking-wide mb-4">
                    Kommen Sie vorbei!
                  </h3>
                  <p className="text-base text-[#c7bda2] leading-relaxed mb-6">
                    Sie finden unsere freie Meisterwerkstatt direkt in der Hundsburgallee 14 in Rostock-Evershagen. Wir freuen uns auf Ihren Anruf, Ihre E-Mail oder über Besuch direkt vor Ort!
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Lucide.MapPin className="w-5 h-5 text-[#8f1f17] mt-1 shrink-0" />
                      <div>
                        <p className="font-bold text-[#dfd0ad]">Werkstatt-Anschrift</p>
                        <p className="text-sm text-[#c7bda2]">
                          Neumann & Bobsin GbR<br />
                          Hundsburgallee 14<br />
                          18069 Rostock
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Lucide.Phone className="w-5 h-5 text-[#8f1f17] mt-1 shrink-0" />
                      <div>
                        <p className="font-bold text-[#dfd0ad]">Kundenservice & Werkstattruf</p>
                        <p className="text-sm text-[#c7bda2] font-semibold">
                          Telefon: 0381-809080
                        </p>
                        <p className="text-xs text-[#8d897e]">
                          Fax: 0381-809088
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Lucide.Mail className="w-5 h-5 text-[#8f1f17] mt-1 shrink-0" />
                      <div>
                        <p className="font-bold text-[#dfd0ad]">Elektronische Post</p>
                        <p className="text-sm text-[#c7bda2] font-semibold">
                          E-Mail: info@classiccarsrostock.de
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#3b3a35]/60">
                  <h4 className="font-oswald text-xs font-bold text-[#c79a45] uppercase tracking-wider mb-2">
                    ANREISE-KOORDINATEN (ROSTOCK):
                  </h4>
                  <div className="p-3 bg-[#0d0d0c] rounded border border-[#b46a2c]/20 text-xs font-mono text-[#8d897e] flex items-center justify-between">
                    <span>LAT: 54.120531° N</span>
                    <span>LON: 12.072895° E</span>
                  </div>
                </div>
              </div>

              {/* General Inquiry form */}
              <div className="lg:col-span-7 bg-gradient-to-b from-[#1c1c1a] to-[#0c0c0b] border border-[#8f1f17] rounded-lg p-6 sm:p-8 shadow-2xl relative">
                
                <div className="text-center mb-6">
                  <h3 className="font-display text-[#dfd0ad] text-2xl uppercase tracking-wider">
                    Senden Sie uns eine Anfrage
                  </h3>
                  <p className="text-xs text-[#3a9fa3] uppercase tracking-widest font-mono mt-1">
                    Ihr direkter Draht in das Meister-Büro
                  </p>
                  <div className="w-12 h-1 bg-[#8f1f17] mx-auto mt-2" />
                </div>

                {contactSuccessMsg ? (
                  <div className="bg-gradient-to-br from-emerald-950 to-teal-950 border border-emerald-500 rounded p-6 text-center space-y-4 shadow-inner">
                    <Lucide.CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" strokeWidth={1.5} />
                    <h4 className="font-display text-xl text-emerald-400 uppercase tracking-widest leading-tight">
                      NACHRICHT ERFOLGREICH ÜBERMITTELT!
                    </h4>
                    <p className="text-sm text-emerald-100 leading-relaxed">
                      Vielen Dank für Ihren Kontakt. Wir haben Ihre Nachricht erhalten und rufen Sie schnellstmöglich zurück oder senden Ihnen eine E-Mail-Bestätigung.
                    </p>
                    <button 
                      onClick={() => setContactSuccessMsg(false)}
                      className="btn-mechanical-dark px-4 py-2 text-xs uppercase cursor-pointer"
                    >
                      Weitere Nachricht senden
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    
                    <div>
                      <label className="block text-xs uppercase text-[#c79a45] font-mono mb-1 font-bold">
                        Ihr Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Z.B. Reinhard Neumann"
                        className="w-full bg-[#050505] text-[#e8dfc8] border border-[#3b3934] p-3 rounded text-sm placeholder:text-gray-700 outline-none focus:border-[#b46a2c] shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-[#c79a45] font-mono mb-1 font-bold">
                        Ihre E-Mail-Adresse *
                      </label>
                      <input 
                        type="email" 
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="Z.B. info@ classiccars.de"
                        className="w-full bg-[#050505] text-[#e8dfc8] border border-[#3b3934] p-3 rounded text-sm placeholder:text-gray-700 outline-none focus:border-[#b46a2c] shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-[#c79a45] font-mono mb-1 font-bold">
                        Ihre Nachricht / Anliegen *
                      </label>
                      <textarea 
                        rows={5}
                        required
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        placeholder="Z.B. Ich würde gerne eine Inspektion für meinen Chevrolet Corvette vereinbaren..."
                        className="w-full bg-[#050505] text-[#e8dfc8] border border-[#3b3934] p-3 rounded text-sm placeholder:text-gray-700 outline-none focus:border-[#b46a2c] shadow-inner"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn-mechanical-red w-full py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                      <Lucide.Wrench className="w-5 h-5" />
                      <span>NACHRICHT ABSENDEN</span>
                    </button>

                  </form>
                )}

              </div>

            </div>

          </div>
        )}


        {/* 7. IMPRESSUM VIEW */}
        {activeTab === "impressum" && (
          <div className="vintage-enamel p-6 sm:p-10 rounded-lg space-y-6 max-w-4xl mx-auto shadow-2xl relative">
            <div className="text-center md:text-left">
              <span className="px-2.5 py-1 bg-[#8f1f17] text-[#f1e7cf] text-xs font-mono font-bold tracking-widest rounded shadow">
                RECHTLICHE ANGABEN
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[#8f1f17] uppercase tracking-wide mt-2">
                {IMPRESSUM_CONTENT.title}
              </h2>
              <p className="text-sm font-bold text-gray-800 uppercase tracking-widest">{IMPRESSUM_CONTENT.subtitle}</p>
              <div className="w-16 h-1 bg-[#8f1f17] mt-2 mb-6" />
            </div>

            <div className="space-y-6 text-gray-950 font-medium text-base leading-relaxed">
              <div>
                <h3 className="font-bold text-lg text-black uppercase font-oswald tracking-wider">Betreiber der Website:</h3>
                <p className="mt-1">{IMPRESSUM_CONTENT.company}</p>
                <p>{IMPRESSUM_CONTENT.address.street}</p>
                <p>{IMPRESSUM_CONTENT.address.cityZip}, {IMPRESSUM_CONTENT.address.country}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-black uppercase font-oswald tracking-wider">Vertretungsberechtigte Gesellschafter:</h3>
                <p className="mt-1">{IMPRESSUM_CONTENT.representation}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-black uppercase font-oswald tracking-wider">Kontaktmöglichkeiten:</h3>
                <p className="mt-1">Telefon: {IMPRESSUM_CONTENT.contact.phone}</p>
                <p>Telefax: {IMPRESSUM_CONTENT.contact.fax}</p>
                <p>E-Mail: {IMPRESSUM_CONTENT.contact.email}</p>
                <p>Webadresse: {IMPRESSUM_CONTENT.contact.website}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-black uppercase font-oswald tracking-wider">Zuständige Kammer und Zulassung:</h3>
                <p className="mt-1">{IMPRESSUM_CONTENT.registry}</p>
                <p className="mt-1">Name der Kammer: <strong>{IMPRESSUM_CONTENT.chamber.name}</strong></p>
                <p>Anschrift: {IMPRESSUM_CONTENT.chamber.address}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-black uppercase font-oswald tracking-wider">{IMPRESSUM_CONTENT.professionalRules.title}</h3>
                <p className="mt-1">{IMPRESSUM_CONTENT.professionalRules.text}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-black uppercase font-oswald tracking-wider">Umsatzsteuer-Identifikationsnummer (USt-ID):</h3>
                <p className="mt-1">{IMPRESSUM_CONTENT.tax.id}</p>
              </div>

              <div className="p-4 bg-yellow-100/40 rounded border border-yellow-800/25 text-sm font-medium text-gray-800">
                <h4 className="font-bold text-black uppercase">Verbraucherstreitbeilegung:</h4>
                <p className="mt-1 whitespace-pre-wrap">{IMPRESSUM_CONTENT.disclaimer.dispute}</p>
              </div>
            </div>
          </div>
        )}


        {/* 8. DATENSCHUTZENERKLÄRUNG VIEW */}
        {activeTab === "datenschutz" && (
          <div className="vintage-enamel p-6 sm:p-10 rounded-lg space-y-6 max-w-4xl mx-auto shadow-2xl">
            <div className="text-center md:text-left">
              <span className="px-2.5 py-1 bg-[#8f1f17] text-[#f1e7cf] text-xs font-mono font-bold tracking-widest rounded shadow">
                INFORMATIONS-PFLICHT DSGVO
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[#8f1f17] uppercase tracking-wide mt-2">
                {DATENSCHUTZ_CONTENT.title}
              </h2>
              <div className="w-16 h-1 bg-[#8f1f17] mt-2 mb-6" />
            </div>

            <div className="space-y-6 text-gray-950 font-medium text-base leading-relaxed">
              {DATENSCHUTZ_CONTENT.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-bold text-lg text-black uppercase font-oswald tracking-wider border-b border-[#8f1f17]/20 pb-1">
                    {sec.heading}
                  </h3>
                  <p className="whitespace-pre-wrap leading-relaxed text-gray-900">{sec.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* 9. AGBS VIEW */}
        {activeTab === "agb" && (
          <div className="vintage-enamel p-6 sm:p-10 rounded-lg space-y-6 max-w-4xl mx-auto shadow-2xl">
            <div className="text-center md:text-left">
              <span className="px-2.5 py-1 bg-[#8f1f17] text-[#f1e7cf] text-xs font-mono font-bold tracking-widest rounded shadow">
                GESCHÄFTSBEDINGUNGEN
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[#8f1f17] uppercase tracking-wide mt-2 border-b-2 border-transparent pb-1">
                Allgemeine Geschäftsbedingungen
              </h2>
              <p className="text-sm font-bold text-gray-800 uppercase tracking-widest leading-relaxed mt-1">{AGB_CONTENT.subtitle}</p>
              <div className="w-16 h-1 bg-[#8f1f17] mt-2 mb-6" />
            </div>

            <p className="text-gray-950 font-medium italic mb-4">{AGB_CONTENT.introduction}</p>

            <div className="space-y-6 text-gray-950 font-medium text-base leading-relaxed">
              {AGB_CONTENT.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="font-bold text-lg text-black uppercase font-oswald tracking-wider border-b border-[#8f1f17]/20 pb-1">
                    {sec.heading}
                  </h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    {sec.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-gray-900 pl-1">
                        {pt}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8 border-t border-[#3b3a35] pt-8" id="site-footer">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          <div className="space-y-3">
            <h4 className="font-display text-lg text-[#dfd0ad] uppercase tracking-wider">
              Classic Cars Rostock
            </h4>
            <p className="text-sm text-[#c7bda2] leading-relaxed">
              Seit 1997 sind wir die erste Adresse für verlässliches Handwerk, Pkw-Reparaturen aller Marken und meisterhafte Oldtimer-Restaurationen in Rostock Evershagen. Honorig, kompetent und fair.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-lg text-[#dfd0ad] uppercase tracking-wider">
              Werkstatt & Büro
            </h4>
            <div className="text-sm text-[#c7bda2] space-y-1">
              <p>Hundsburgallee 14, 18069 Rostock</p>
              <p>Telefon: 0381-809080</p>
              <p>E-Mail: info@classiccarsrostock.de</p>
              <p>USt-ID: DE183492041</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-lg text-[#dfd0ad] uppercase tracking-wider">
              Rechtliche Links
            </h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#c79a45] font-semibold">
              <button onClick={() => navigateTo("impressum")} className="hover:text-[#e8dfc8] cursor-pointer">
                Impressum
              </button>
              <span>|</span>
              <button onClick={() => navigateTo("datenschutz")} className="hover:text-[#e8dfc8] cursor-pointer">
                Datenschutzerklärung
              </button>
              <span>|</span>
              <button onClick={() => navigateTo("agb")} className="hover:text-[#e8dfc8] cursor-pointer">
                AGB
              </button>
            </div>
            <p className="text-[10px] text-[#8d897e] uppercase tracking-widest font-mono">
              © {new Date().getFullYear()} CLASSIC CARS NEUMANN & BOBSIN GBR
            </p>
          </div>

        </div>

        <div className="text-center text-[10px] text-[#8d897e] tracking-widest font-mono uppercase border-t border-[#3b3a35]/40 pt-6">
          ⚙️ MEISTERWERKSTATT HUNDSBURGALLEE 14 | ROSTOCK ⚙️
        </div>
      </footer>

      {/* RE-DESIGN ALIGNED COOKIE BANNER */}
      {cookieAccepted === null && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-50 bg-[#101010] border-2 border-[#8f1f17] p-5 sm:p-6 rounded-lg shadow-[0_16px_40px_rgba(0,0,0,0.95)]" id="cookie-consent-banner">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg text-[#dfd0ad] font-display uppercase tracking-wider">
              <Lucide.ShieldAlert className="w-5 h-5 text-[#8f1f17]" />
              <span>Cookie-Zustimmung</span>
            </div>
            <p className="text-xs text-[#c7bda2] leading-relaxed">
              Wir verwenden Cookies, um die Nutzerfreundlichkeit unserer Website zu optimieren. Einige Cookies sind technisch notwendig (wie die Speicherung Ihrer HU-Vormerkungen), während andere uns helfen, unser Web-Erlebnis zu verbessern.
            </p>
            <div className="flex gap-2 justify-end">
              <button 
                onClick={() => handleAcceptCookies(false)}
                className="btn-mechanical-dark px-3 py-1.5 text-xs font-semibold tracking-wider uppercase cursor-pointer"
              >
                Ablehnen
              </button>
              <button 
                onClick={() => handleAcceptCookies(true)}
                className="btn-mechanical-red px-4 py-2 text-xs font-bold tracking-wider uppercase cursor-pointer"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
