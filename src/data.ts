/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string; // lucide icon identifier
  badge?: string;
}

export interface RestoredCar {
  id: string;
  model: string;
  year: string;
  engine: string;
  task: string;
  description: string;
}

export interface TuningOption {
  id: string;
  title: string;
  description: string;
  features: string[];
  imagePrompt?: string;
}

export const WORKSHOP_DETAILS = {
  name: "Classic Cars Neumann & Bobsin GbR",
  partners: "Reinhard Neumann & Holger Bobsin",
  address: "Hundsburgallee 14",
  zipCity: "18069 Rostock",
  phone: "0381-809080",
  fax: "0381-809088",
  email: "info@classiccarsrostock.de",
  ustId: "DE183492041", // Realistic UST-ID
  founded: "1997",
};

export const SERVICES: ServiceItem[] = [
  {
    id: "wartung",
    title: "Inspektion & Wartung",
    description: "Zuverlässige Wartung nach Herstellervorgaben für alle Marken – damit die Garantie erhalten bleibt.",
    details: [
      "Öl- und Filterwechsel mit Markenölen",
      "Klimaservice inklusive Befüllung und Desinfektion",
      "Bremsflüssigkeiten- und Frostschutz-Check",
      "Zündkerzen-, Luftfilter- und Riemenwechsel",
      "Eintrag ins digitale Serviceheft"
    ],
    icon: "Wrench",
    badge: "HERSTELLER-KONFORM"
  },
  {
    id: "reparatur",
    title: "Kfz-Instandsetzung",
    description: "Fachgerechte Reparatur bei mechanischen oder elektrischen Defekten aller Art.",
    details: [
      "Bremsenservice (Beläge, Scheiben, Sättel & Leitungen)",
      "Kupplungs- und Getriebeinstandsetzung",
      "Fahrwerksarbeiten, Stoßdämpfer und Lenkungsteile",
      "Auspuffanlagen, Katalysatoren und Partikelfilter",
      "Karosseriearbeiten und Unfallschadenabwicklung"
    ],
    icon: "ShieldAlert",
    badge: "FACHBETRIEB"
  },
  {
    id: "diagnose",
    title: "Fehlersuche & Diagnostik",
    description: "Moderne computergestützte Systemdiagnose zur schnellen und präzisen Fehlerlokalisierung.",
    details: [
      "Auslesen des Fehlerspeichers aller Steuergeräte",
      "Fehlersuche bei Bordelektronik- und Sensorikproblemen",
      "Messungen und Prüfung mechanischer Baugruppen",
      "Echtzeit-Datenanalyse während des Motorlaufs",
      "Zurücksetzen von Service-Intervall-Meldungen"
    ],
    icon: "SearchCode"
  },
  {
    id: "reifen",
    title: "Reifen- & Raddienst",
    description: "Komplettservice rund um Ihre Reifen – von Beratung über Montage bis Einlagerung.",
    details: [
      "Reifenmontage und Auswuchten bis 22 Zoll",
      "Fachgerechte Rädereinlagerung pro Saison",
      "Verkauf von Sommer-, Winter- und Ganzjahresreifen",
      "Alufelgen-Aufbereitung und Beratung",
      "RDKS-Programmierung (Reifendruckkontrollsysteme)"
    ],
    icon: "Disc"
  },
  {
    id: "elektrik",
    title: "Auto-Elektrik & Batterie",
    description: "Ihr Experte bei allen elektrischen Angelegenheiten – vom Anlasser bis zum Kabelbaum.",
    details: [
      "Prüfung und Austausch von Starterbatterien",
      "Instandsetzung von Lichtmaschinen und Anlassern",
      "Fehlersuche im Scheinwerfer- und Beleuchtungssystem",
      "Kabelbaum-Reparaturen & Restauration historischer Elektrik",
      "Nachrüstung von Zubehör (Rückfahrkameras, Radios etc.)"
    ],
    icon: "Zap",
    badge: "SPEZIALIST"
  }
];

export const RESTORATIONS: RestoredCar[] = [
  {
    id: "mustang67",
    model: "Ford Mustang Fastback",
    year: "1967",
    engine: "289 Savage V8 (4.7L)",
    task: "Vollrestauration & Lack-Neuaufbau",
    description: "Komplette Frame-off Restauration des legendären Fastbacks. Karosserie-Entrostung, originaltreuer Neuaufbau der Blechteile, V8 Motorüberholung inklusive Vergaserfeineinstellung, sowie Neubezug der Innenausstattung in edlem schwarzen Leder. Verchromung aller Zierleisten nach Originalvorgaben.",
  },
  {
    id: "corvette63",
    model: "Chevrolet Corvette C2 'Split Window'",
    year: "1963",
    engine: "327 Fuel Injection V8",
    task: "Fahrwerksrevision & Motorüberholung",
    description: "Präzisions-Instandsetzung des historischen Einspritzermotors. Das seltene Split-Window-Coupe erhielt zudem eine vollständige Überholung des Einzelrad-Fahrwerks im originalen Look, um Fahrverhalten und Wertbeständigkeit auf höchstes Niveau zu heben.",
  },
  {
    id: "pontiac70",
    model: "Pontiac GTO Judge",
    year: "1970",
    engine: "455 Ram Air IV V8 (7.5L)",
    task: "Karosserie & Neuverkabelung",
    description: "Behebung massiver Rostschäden an Schwellern und Radläufen mit handgedengelten Blechen nach historischem Muster. Vollständige Rekonstruktion des komplexen Kabelbaums zur Gewährleistung absoluter Zuverlässigkeit der Instrumente und Scheinwerferklappen.",
  },
  {
    id: "mercedes190sl",
    model: "Mercedes-Benz 190 SL",
    year: "1959",
    engine: "1.9L M121 Inline-4",
    task: "Teilrestauration & Klassiker-Konservierung",
    description: "Sanfte Überholung der anspruchsvollen Solex-Doppelvergaser, Justierung des Verdecks und Versiegelung des Unterbodens zur Erhaltung des traumhaften Originalzustands mit wunderschöner Patina.",
  }
];

export const TUNING_CAPABILITIES: TuningOption[] = [
  {
    id: "carburetor",
    title: "Vergaser-Service & Tuning",
    description: "Einstellung und Wartung historischer Vergaseranlagen (Holley, Edelbrock, Rochester, Solex, Weber).",
    features: [
      "Ultraschallreinigung aller Einzelkomponenten",
      "Austausch von Dichtungen, Düsen und Schwimmern",
      "Feineinstellung über CO2-Messung und Lambdawert",
      "Synchronisation von Mehrvergaser-Anlagen",
      "Leistungsoptimierung für historisches Ansprechverhalten"
    ]
  },
  {
    id: "v8engine",
    title: "V8-Motorenbau & Customizing",
    description: "Umfassende Leistungssteigerung und optischer Neuaufbau von amerikanischen V8 Triebwerken (Chevy Small Blocks, Ford Windsor, Chrysler Mopar).",
    features: [
      "Hubraum-Erweiterung (Stroker-Kits)",
      "Einbau schärferer Nockenwellen und Rollenkipphebel",
      "Zylinderkopf-Bearbeitung & Strömungsoptimierung",
      "Verchromung oder Pulverbeschichtung von Ventildeckeln und Luftfiltern",
      "Zündanlagen-Upgrades auf kontaktlose High-Output-Systeme"
    ]
  },
  {
    id: "suspension",
    title: "Fahrwerk & Auspuff Customizing",
    description: "Individuelle Anpassung von Abgasanlagen und Fahrwerkskomponenten für den perfekten Look und satten Klang.",
    features: [
      "Edelstahl-Fächerkrümmer und Custom-Auspuffführungen",
      "Satter V8 Sound unter Einhaltung gesetzlicher Richtlinien",
      "Verstärkte Blattfedern und einstellbare Gasdruckdämpfer",
      "Bremsen-Upgrades auf innenbelüftete Scheibenanlagen",
      "Zeitgenössische Tieferlegungen für Muscle Cars und Hot Rods"
    ]
  }
];

export const OPENING_HOURS = [
  { day: "Montag", hours: "08:00 - 17:00 Uhr" },
  { day: "Dienstag", hours: "08:00 - 17:00 Uhr" },
  { day: "Mittwoch", hours: "08:00 - 17:00 Uhr" },
  { day: "Donnerstag", hours: "08:00 - 17:00 Uhr" },
  { day: "Freitag", hours: "08:00 - 15:30 Uhr" },
  { day: "Samstag", hours: "Geschlossen", isClosed: true },
  { day: "Sonntag", hours: "Geschlossen", isClosed: true },
];
