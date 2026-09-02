/**
 * WKQUIZ CONFIGURATION FILE
 * Central configuration object controlling branding, behavior, modes, and features.
 * Easily editable by non-developers.
 */

const WKQUIZ_CONFIG = {
  // Brand & Site Information
  siteName: "WKQuiz",
  tagline: "Play. Learn. Challenge Yourself.",
  logoText: "WKQuiz",
  logoImageUrl: "", // Leave empty to use text logo, or provide an image URL
  faviconUrl: "",
  defaultShareImage: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&auto=format&fit=crop&q=80",
  contactEmail: "support@wkquiz.com",

  // Social Media Channels (Update with real URLs)
  socialLinks: {
    tiktok: "https://www.tiktok.com/@wkquiz",
    instagram: "https://www.instagram.com/wkquiz",
    facebook: "https://www.facebook.com/wkquiz",
    youtube: "https://www.youtube.com/@wkquiz",
    twitter: "https://twitter.com/wkquiz"
  },

  // Quiz Engine Settings
  quiz: {
    defaultLength: 10,
    availableLengths: [5, 10, 20, 50], // Central configurable question counts
    availableDifficulties: ["easy", "medium", "hard"], // Strictly 3 difficulty levels
    defaultDifficulty: "medium",
    defaultMode: "classic",
    timePerQuestionSeconds: 20,
    examTotalMinutes: 30,
    enableTimerByDefault: false,
    enableExplanations: true,
    enableAnswerShuffle: true,
    enableQuestionShuffle: true,
    preventSessionDuplicates: true,
    soundEffectsEnabled: false,
    passingScorePercentage: 70,
    streakBonusPoints: 10,
  },

  // Remote Git Question Bank Configuration
  // Questions are stored in Git and pulled on demand, keeping theme.xml ultra lightweight (<50 KB)
  questionBank: {
    githubRawBaseUrl: "https://raw.githubusercontent.com/wkquiz/question-bank/main/question-bank",
    cdnBaseUrl: "https://cdn.jsdelivr.net/gh/wkquiz/question-bank@main/question-bank",
    localBaseUrl: "question-bank",
    cacheTtlMinutes: 120,
    enableLocalFallback: true
  },

  // Theme & Appearance
  theme: {
    enableDarkMode: true,
    defaultTheme: "light",
    accentColor: "#4f46e5",
    secondaryColor: "#06b6d4",
  },

  // Ad Slots Configuration
  ads: {
    topAd: { enabled: true, label: "Advertisement - Top Banner" },
    beforeContentAd: { enabled: true, label: "Advertisement - Before Quiz" },
    inContentAd: { enabled: true, label: "Advertisement - In-Content" },
    afterQuizAd: { enabled: true, label: "Advertisement - After Quiz Results" },
    sidebarAd: { enabled: true, label: "Advertisement - Sidebar" },
    footerAd: { enabled: true, label: "Advertisement - Footer" }
  },

  // Quiz Categories Registry
  categories: [
    {
      id: "nursing",
      name: "Nursing",
      slug: "nursing",
      icon: "🩺",
      description: "Fundamental and clinical nursing knowledge, nursing process, and patient care.",
      color: "#0284c7"
    },
    {
      id: "nclex",
      name: "NCLEX",
      slug: "nclex",
      icon: "📋",
      description: "NCLEX-RN & NCLEX-PN exam practice questions, triage, prioritization, and safety.",
      color: "#0369a1"
    },
    {
      id: "medical",
      name: "Medical",
      slug: "medical",
      icon: "🏥",
      description: "General medical practice, clinical scenarios, diagnostics, and pathology.",
      color: "#0d9488"
    },
    {
      id: "medical-terminology",
      name: "Medical Terminology",
      slug: "medical-terminology",
      icon: "📖",
      description: "Prefixes, suffixes, root words, and essential healthcare vocabulary.",
      color: "#059669"
    },
    {
      id: "diseases",
      name: "Diseases & Disorders",
      slug: "diseases",
      icon: "🦠",
      description: "Infectious diseases, chronic illnesses, symptoms, and disease pathophysiology.",
      color: "#d97706"
    },
    {
      id: "anatomy",
      name: "Anatomy & Physiology",
      slug: "anatomy",
      icon: "🫀",
      description: "Human body systems, organ functions, skeletal structure, and physiology.",
      color: "#e11d48"
    },
    {
      id: "pharmacology",
      name: "Pharmacology",
      slug: "pharmacology",
      icon: "💊",
      description: "Drug classes, mechanisms of action, adverse effects, and dosage calculations.",
      color: "#7c3aed"
    },
    {
      id: "entertainment",
      name: "Entertainment",
      slug: "entertainment",
      icon: "🎬",
      description: "Pop culture, cinema, blockbusters, and entertainment trivia.",
      color: "#db2777"
    },
    {
      id: "movies",
      name: "Movies",
      slug: "movies",
      icon: "🍿",
      description: "Classic cinema, Oscar winners, movie quotes, and box office hits.",
      color: "#be185d"
    },
    {
      id: "tv-shows",
      name: "TV Shows",
      slug: "tv-shows",
      icon: "📺",
      description: "Hit television series, streaming shows, sitcoms, and Emmy winners.",
      color: "#9333ea"
    },
    {
      id: "drama",
      name: "Drama",
      slug: "drama",
      icon: "🎭",
      description: "Global drama series, plot twists, theatrical arts, and famous storylines.",
      color: "#c026d3"
    },
    {
      id: "celebrity",
      name: "Celebrity",
      slug: "celebrity",
      icon: "⭐",
      description: "Famous personalities, iconic moments, biographies, and stars.",
      color: "#f59e0b"
    },
    {
      id: "music",
      name: "Music",
      slug: "music",
      icon: "🎵",
      description: "Music genres, artists, legendary albums, instruments, and charts.",
      color: "#ec4899"
    },
    {
      id: "general-knowledge",
      name: "General Knowledge",
      slug: "general-knowledge",
      icon: "🌍",
      description: "Trivia from around the world spanning culture, facts, and trivia.",
      color: "#4f46e5"
    },
    {
      id: "history",
      name: "History",
      slug: "history",
      icon: "🏛️",
      description: "World history, ancient civilizations, world wars, and milestones.",
      color: "#b45309"
    },
    {
      id: "geography",
      name: "Geography",
      slug: "geography",
      icon: "🗺️",
      description: "Capitals, world flags, mountain ranges, rivers, and country trivia.",
      color: "#047857"
    },
    {
      id: "science",
      name: "Science",
      slug: "science",
      icon: "🔬",
      description: "Physics, chemistry, biology, astronomy, and scientific principles.",
      color: "#2563eb"
    },
    {
      id: "engineering",
      name: "Engineering",
      slug: "engineering",
      icon: "⚙️",
      description: "Core engineering disciplines, design principles, and problem solving.",
      color: "#475569"
    },
    {
      id: "electrical",
      name: "Electrical",
      slug: "electrical",
      icon: "⚡",
      description: "Ohm's law, circuit analysis, wiring standards, and electrical safety.",
      color: "#eab308"
    },
    {
      id: "electrical-symbols",
      name: "Electrical Symbols",
      slug: "electrical-symbols",
      icon: "🔌",
      description: "Schematic symbols, blueprint reading, and circuit diagram symbols.",
      color: "#ca8a04"
    },
    {
      id: "electronics",
      name: "Electronics",
      slug: "electronics",
      icon: "💡",
      description: "Semiconductors, transistors, microcontrollers, and logic gates.",
      color: "#0891b2"
    },
    {
      id: "hvac",
      name: "HVAC",
      slug: "hvac",
      icon: "❄️",
      description: "Heating, ventilation, air conditioning, refrigeration, and psychrometrics.",
      color: "#06b6d4"
    },
    {
      id: "technology",
      name: "Technology",
      slug: "technology",
      icon: "💻",
      description: "Innovations, internet history, AI, software, and tech gadgets.",
      color: "#3b82f6"
    },
    {
      id: "computers",
      name: "Computers",
      slug: "computers",
      icon: "🖥️",
      description: "Computer hardware, operating systems, networking, and architecture.",
      color: "#6366f1"
    },
    {
      id: "automotive",
      name: "Automotive",
      slug: "automotive",
      icon: "🚗",
      description: "Engine mechanics, vehicle diagnostics, automotive systems, and EV tech.",
      color: "#dc2626"
    },
    {
      id: "iq-logic",
      name: "IQ & Logic",
      slug: "iq-logic",
      icon: "🧩",
      description: "Pattern recognition, logic puzzles, deductive reasoning, and brain teasers.",
      color: "#8b5cf6"
    },
    {
      id: "mathematics",
      name: "Mathematics",
      slug: "mathematics",
      icon: "📐",
      description: "Algebra, geometry, arithmetic, probabilities, and calculus fundamentals.",
      color: "#10b981"
    },
    {
      id: "english",
      name: "English & Grammar",
      slug: "english",
      icon: "✍️",
      description: "Grammar rules, vocabulary, idioms, reading comprehension, and syntax.",
      color: "#f97316"
    },
    {
      id: "mixed-quiz",
      name: "Mixed Quiz",
      slug: "mixed-quiz",
      icon: "🎲",
      description: "A dynamic randomized blend of questions across all knowledge categories.",
      color: "#6b7280"
    }
  ]
};

// CommonJS export for Node.js test runners & browser window exposure
if (typeof module !== "undefined" && module.exports) {
  module.exports = { WKQUIZ_CONFIG };
}
if (typeof window !== "undefined") {
  window.WKQUIZ_CONFIG = WKQUIZ_CONFIG;
}
