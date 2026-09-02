/**
 * EXPAND ALL CATEGORIES DEEP SEEDER
 * Adds a high-volume batch of authentic, unique, educational questions
 * for each of the 28 categories across Easy, Medium, and Hard tiers.
 */

const fs = require("fs");
const path = require("path");

const qbDir = path.join(__dirname, "..", "..", "question-bank");

function createQ(id, category, subcategory, difficulty, question, options, answerIndex, explanation, tags = []) {
  return {
    id,
    category,
    subcategory,
    difficulty: difficulty.toLowerCase(),
    question,
    options,
    answer: answerIndex,
    explanation,
    tags: [category.toLowerCase(), ...tags],
    status: "active"
  };
}

const prefixes = {
  "nclex": "NCLEX", "nursing": "NURS", "medical": "MED", "medical-terminology": "MEDTERM",
  "diseases": "DIS", "anatomy": "ANAT", "pharmacology": "PHARM", "hvac": "HVAC",
  "electrical": "ELEC", "electrical-symbols": "ELECSYM", "electronics": "ELX", "engineering": "ENG",
  "technology": "TECH", "computers": "COMP", "automotive": "AUTO", "iq-logic": "IQLOGIC",
  "mathematics": "MATH", "science": "SCI", "history": "HIST", "geography": "GEO",
  "english": "ENGL", "general-knowledge": "GENKNOW", "entertainment": "ENT", "movies": "MOV",
  "tv-shows": "TVSHOW", "drama": "DRAMA", "celebrity": "CELEB", "music": "MUSIC"
};

// Load existing files or initialize
const existingData = {};
Object.keys(prefixes).forEach(slug => {
  const filePath = path.join(qbDir, `${slug}.json`);
  if (fs.existsSync(filePath)) {
    try {
      existingData[slug] = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (e) {
      existingData[slug] = [];
    }
  } else {
    existingData[slug] = [];
  }
});

function appendQ(slug, catName, subcat, diff, qText, options, ansIdx, expl, tags = []) {
  const list = existingData[slug] || [];
  const idx = list.length + 1;
  const prefix = prefixes[slug];
  const id = `${prefix}-${String(idx).padStart(6, "0")}`;
  // Ensure no duplicate question text in same category
  const existingMatch = list.find(q => q.question.trim().toLowerCase() === qText.trim().toLowerCase());
  if (!existingMatch) {
    list.push(createQ(id, catName, subcat, diff, qText, options, ansIdx, expl, tags));
    existingData[slug] = list;
  }
}

// =========================================================================
// EXPANSION QUESTIONS ACROSS CATEGORIES
// =========================================================================

// --- NURSING ---
appendQ("nursing", "Nursing", "Vital Signs", "easy", "Which pulse site is located in the groove along the thumb side of the inner wrist?", ["Radial pulse", "Carotid pulse", "Brachial pulse", "Femoral pulse"], 0, "The radial artery runs along the radial bone on the thumb side.");
appendQ("nursing", "Nursing", "Thermoregulation", "easy", "What is the medical term for an abnormally elevated body temperature or fever?", ["Pyrexia / Hyperthermia", "Hypothermia", "Eupnea", "Bradypnea"], 0, "Pyrexia refers to elevated body temperature / fever.");
appendQ("nursing", "Nursing", "Infection Control", "medium", "When caring for a client with active Pulmonary Tuberculosis, what type of transmission precaution is required?", ["Airborne Precautions (with negative pressure room & N95)", "Contact Precautions", "Droplet Precautions", "Standard Precautions only"], 0, "Mycobacterium tuberculosis particles remain suspended in air, requiring airborne isolation.");
appendQ("nursing", "Nursing", "Fluids", "medium", "Which laboratory finding is the most sensitive indicator of acute changes in nutritional protein status?", ["Prealbumin level", "Serum Albumin", "Total Protein", "Hemoglobin A1c"], 0, "Prealbumin has a short half-life of 2 days, reflecting acute nutritional status.");
appendQ("nursing", "Nursing", "Emergency", "hard", "A client with a tracheostomy suddenly experiences acute respiratory distress. The nurse cannot pass a suction catheter. What is the immediate action?", ["Remove the inner cannula and reattempt suctioning or change the tube", "Deflate the tracheostomy cuff immediately", "Administer 100% O2 via nasal cannula", "Call for a STAT chest X-ray"], 0, "An obstructed inner cannula must be removed immediately to clear the airway.");

// --- NCLEX ---
appendQ("nclex", "NCLEX", "Pediatrics", "easy", "At what age does the anterior fontanelle typically close in a healthy infant?", ["12 to 18 months", "2 to 3 months", "6 to 8 months", "24 to 36 months"], 0, "The anterior fontanelle closes between 12-18 months; posterior fontanelle closes at 2-3 months.");
appendQ("nclex", "NCLEX", "Medication Admin", "medium", "When administering ear drops (otic solution) to a 2-year-old child, in which direction should the pinna be pulled?", ["Down and back", "Up and back", "Straight forward", "Directly inward"], 0, "For children under 3 years, pull pinna down and back. For older children and adults, pull up and back.");
appendQ("nclex", "NCLEX", "Critical Care", "hard", "A client with acute myocardial infarction develops sudden pulmonary edema and a new holosystolic apical murmur. What mechanical complication is suspected?", ["Acute Mitral Valve Papillary Muscle Rupture", "Ventricular Septal Aneurysm", "Cardiac Tamponade", "Aortic Dissection"], 0, "Papillary muscle rupture post-MI causes acute severe mitral regurgitation and flash pulmonary edema.");

// --- MEDICAL ---
appendQ("medical", "Medical", "Cardiology", "easy", "What is the normal pacemaker of the human heart?", ["Sinoatrial (SA) node", "Atrioventricular (AV) node", "Bundle of His", "Purkinje fibers"], 0, "The SA node initiates electrical impulses in normal sinus rhythm.");
appendQ("medical", "Medical", "Gastroenterology", "medium", "What is the most common cause of acute upper gastrointestinal bleeding?", ["Peptic Ulcer Disease", "Esophageal Varices", "Mallory-Weiss tear", "Gastric Cancer"], 0, "Peptic ulcers cause over 50% of upper GI bleeds.");
appendQ("medical", "Medical", "Neurology", "hard", "In an acute ischemic stroke within the therapeutic window (<4.5 hours), what thrombolytic agent is indicated if no contraindications exist?", ["Intravenous Alteplase (tPA) or Tenecteplase", "Heparin bolus", "Warfarin", "Clopidogrel"], 0, "IV Alteplase/Tenecteplase restores cerebral perfusion in eligible acute ischemic stroke.");

// --- MEDICAL TERMINOLOGY ---
appendQ("medical-terminology", "Medical Terminology", "Roots", "easy", "What organ does the medical root 'Hepat/o' refer to?", ["Liver", "Stomach", "Heart", "Brain"], 0, "'Hepato' refers to the liver (e.g. hepatitis).");
appendQ("medical-terminology", "Medical Terminology", "Suffixes", "medium", "What does the suffix '-megaly' mean in medical conditions?", ["Abnormal enlargement", "Inflammation", "Surgical repair", "Deficiency"], 0, "'-megaly' denotes enlargement (e.g. cardiomegaly, hepatomegaly).");
appendQ("medical-terminology", "Medical Terminology", "Prefixes", "hard", "What does the term 'Dysphagia' specifically denote?", ["Difficulty swallowing", "Difficulty speaking", "Difficulty breathing", "Painful urination"], 0, "Dysphagia is difficulty swallowing; Dysphasia is difficulty speaking.");

// --- DISEASES & DISORDERS ---
appendQ("diseases", "Diseases & Disorders", "Infectious", "easy", "What organism causes Lyme disease, transmitted via black-legged tick bites?", ["Borrelia burgdorferi", "Treponema pallidum", "Rickettsia rickettsii", "Plasmodium falciparum"], 0, "Borrelia burgdorferi is the spirochete responsible for Lyme disease.");
appendQ("diseases", "Diseases & Disorders", "Cardiology", "medium", "Which infectious condition involves inflammation of the inner lining and valves of the heart chambers?", ["Infective Endocarditis", "Pericarditis", "Myocarditis", "Atherosclerosis"], 0, "Endocarditis is infection of the endocardium and heart valves.");
appendQ("diseases", "Diseases & Disorders", "Immunology", "hard", "What systemic autoimmune disease is characterized by anti-double-stranded DNA (anti-dsDNA) antibodies and butterfly rash?", ["Systemic Lupus Erythematosus (SLE)", "Sjogren's Syndrome", "Systemic Sclerosis", "Polymyositis"], 0, "Anti-dsDNA antibodies and malar butterfly rash are hallmarks of SLE.");

// --- ANATOMY & PHYSIOLOGY ---
appendQ("anatomy", "Anatomy & Physiology", "Skeletal", "easy", "How many total bones make up the adult human skeleton?", ["206 bones", "300 bones", "180 bones", "250 bones"], 0, "An adult human skeleton consists of 206 bones.");
appendQ("anatomy", "Anatomy & Physiology", "Endocrine", "medium", "Which endocrine gland is located at the base of the brain and often termed the 'Master Gland'?", ["Pituitary gland", "Thyroid gland", "Adrenal gland", "Pineal gland"], 0, "The pituitary gland regulates multiple hormone axes under hypothalamic control.");
appendQ("anatomy", "Anatomy & Physiology", "Renal", "hard", "Which segment of the nephron is the primary site of action for Loop Diuretics such as Furosemide?", ["Thick ascending limb of the Loop of Henle", "Proximal convoluted tubule", "Distal convoluted tubule", "Cortical collecting duct"], 0, "Loop diuretics inhibit the Na+/K+/2Cl- cotransporter in the thick ascending limb of Henle.");

// --- PHARMACOLOGY ---
appendQ("pharmacology", "Pharmacology", "Cardiovascular", "easy", "What class of medication is Metoprolol (Lopressor)?", ["Beta-blocker (beta-1 selective antagonist)", "ACE inhibitor", "Calcium channel blocker", "Alpha agonist"], 0, "Metoprolol is a cardioselective beta-1 adrenergic antagonist.");
appendQ("pharmacology", "Pharmacology", "Endocrine", "medium", "What is the rapid-acting insulin analog that has an onset of action in 10-15 minutes?", ["Insulin Lispro (Humalog) / Aspart", "Regular Insulin (Humulin R)", "NPH Insulin", "Insulin Glargine (Lantus)"], 0, "Lispro/Aspart are rapid-acting insulins with 10-15 min onset.");
appendQ("pharmacology", "Pharmacology", "Toxicology", "hard", "What is the specific antidote for Acetaminophen (Tylenol) overdose toxicity?", ["N-acetylcysteine (NAC)", "Deferoxamine", "Dimercaprol", "Pralidoxime"], 0, "N-acetylcysteine replenishes hepatic glutathione reserves to detoxify NAPQI.");

// --- HVAC ---
appendQ("hvac", "HVAC", "Safety", "easy", "What device shuts off power to a gas furnace if flames roll out of the combustion chamber?", ["Flame Rollout Switch", "Blower door switch", "Thermostat", "Contactor"], 0, "The flame rollout thermal limit switch trips if flames spill outward.");
appendQ("hvac", "HVAC", "Air Quality", "medium", "What is the primary function of an Economizer in commercial rooftop HVAC units?", ["Use cool outdoor ambient air for free cooling when conditions are favorable", "Heat intake air with gas", "Filter ultra-fine carbon soot", "Compress liquid refrigerant"], 0, "Economizers draw in cool outside air to reduce compressor run-time.");
appendQ("hvac", "HVAC", "Psychrometrics", "hard", "On a psychrometric chart, what property remains constant along horizontal straight lines?", ["Humidity Ratio (Specific Humidity / Dew Point)", "Dry-Bulb Temperature", "Enthalpy", "Relative Humidity"], 0, "Horizontal lines represent constant moisture content and dew point.");

// --- ELECTRICAL ---
appendQ("electrical", "Electrical", "Safety", "easy", "What standard color insulation denotes the equipment grounding conductor in US branch circuits?", ["Green or Bare Copper", "Black", "White", "Red"], 0, "Ground wires are green or bare copper; white/gray is neutral; black/red are hot.");
appendQ("electrical", "Electrical", "Motors", "medium", "What device is connected in series with the start winding of a single-phase AC induction motor to create phase shift?", ["Start Capacitor", "Step-up transformer", "Bridge rectifier", "Zener diode"], 0, "Start capacitors create a phase angle shift between start and run windings to generate starting torque.");
appendQ("electrical", "Electrical", "Calculations", "hard", "What is the total power (P) in a balanced 3-phase circuit with line voltage V_L, line current I_L, and power factor PF?", ["P = √3 × V_L × I_L × PF", "P = 3 × V_L × I_L × PF", "P = V_L × I_L × PF", "P = V_L / (I_L × PF)"], 0, "Three-phase power: P = √3 · V_L · I_L · PF.");

// --- ELECTRICAL SYMBOLS ---
appendQ("electrical-symbols", "Electrical Symbols", "Capacitors", "easy", "What does a symbol of two parallel straight lines perpendicular to a wire represent?", ["Fixed Capacitor", "Battery", "Inductor", "Fuse"], 0, "Two parallel straight lines depict a fixed capacitor.");
appendQ("electrical-symbols", "Electrical Symbols", "Switches", "medium", "What does the schematic symbol 'NO' stand for in relay contacts?", ["Normally Open", "Neutral Output", "Non-Operational", "Negative Offset"], 0, "'NO' denotes Normally Open contact pairs.");
appendQ("electrical-symbols", "Electrical Symbols", "Transistors", "hard", "In a BJT transistor schematic symbol, which terminal has an arrow pointing outward for NPN?", ["Emitter", "Collector", "Base", "Gate"], 0, "NPN transistors have the arrow pointing outward on the Emitter (Not Pointing iN).");

// --- ELECTRONICS ---
appendQ("electronics", "Electronics", "Components", "easy", "What passive electronic component stores energy in an electrostatic field?", ["Capacitor", "Inductor", "Resistor", "Diode"], 0, "Capacitors store charge and electrostatic energy.");
appendQ("electronics", "Electronics", "Digital", "medium", "Which digital logic gate produces a LOW (0) output only when both inputs are HIGH (1)?", ["NAND Gate", "NOR Gate", "AND Gate", "XOR Gate"], 0, "NAND gate is the inverse of an AND gate.");
appendQ("electronics", "Electronics", "Oscillators", "hard", "What type of multivibrator circuit has no stable states and continuously oscillates generating a square wave?", ["Astable Multivibrator", "Monostable Multivibrator", "Bistable Flip-Flop", "Schmitt Trigger"], 0, "Astable multivibrators oscillate freely without external triggers.");

// --- ENGINEERING ---
appendQ("engineering", "Engineering", "Dynamics", "easy", "What is Newton's Second Law of Motion?", ["Force = Mass × Acceleration (F = ma)", "For every action there is equal and opposite reaction", "Inertia maintains constant velocity", "Energy cannot be destroyed"], 0, "F = m · a is Newton's second law.");
appendQ("engineering", "Engineering", "Materials", "medium", "What is the point on a stress-strain curve where plastic (permanent) deformation begins?", ["Yield Point (Yield Strength)", "Ultimate Tensile Strength", "Fracture Point", "Elastic Limit"], 0, "The yield point marks the boundary between elastic and permanent plastic deformation.");
appendQ("engineering", "Engineering", "Thermodynamics", "hard", "What is the theoretical maximum thermodynamic efficiency of any heat engine operating between temperatures T_hot and T_cold?", ["Carnot Efficiency = 1 - (T_cold / T_hot)", "Rankine Efficiency", "Otto Efficiency = 1 - (1 / r^(γ-1))", "Diesel Efficiency"], 0, "The Carnot cycle defines the absolute upper efficiency limit: η = 1 - T_C/T_H.");

// --- COMPUTERS ---
appendQ("computers", "Computers", "OS", "easy", "What core component of an Operating System manages hardware resources, memory, and CPU processes?", ["Kernel", "GUI Shell", "File Browser", "Compiler"], 0, "The Kernel is the central core of an operating system.");
appendQ("computers", "Computers", "Networking", "medium", "What port number is standard for unencrypted HTTP web traffic?", ["Port 80", "Port 443", "Port 22", "Port 21"], 0, "Port 80 is HTTP; Port 443 is HTTPS; Port 22 is SSH.");
appendQ("computers", "Computers", "Architecture", "hard", "What pipelining hazard occurs when an instruction depends on the result of a previous instruction that has not yet completed?", ["Data Hazard", "Structural Hazard", "Control (Branch) Hazard", "Interrupt Hazard"], 0, "Data hazards (e.g. Read-After-Write) occur when operands are not yet available.");

// --- TECHNOLOGY ---
appendQ("technology", "Technology", "Cloud", "easy", "What does 'SaaS' stand for in cloud computing?", ["Software as a Service", "System and Application Software", "Storage as a Server", "Secure Application Socket"], 0, "SaaS delivers software applications over the internet.");
appendQ("technology", "Technology", "Web", "medium", "What does 'DNS' stand for and do on the Internet?", ["Domain Name System (translates human-readable domain names to IP addresses)", "Digital Network Server", "Dynamic Node Service", "Data Node Security"], 0, "DNS resolves domain names into numerical IP addresses.");
appendQ("technology", "Technology", "Database", "hard", "In database transactions, what does the 'ACID' acronym stand for?", ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Concurrency, Indexing, Delivery", "Authentication, Compression, Integrity, Deletion", "Asynchronous, Connected, Integrated, Distributed"], 0, "ACID guarantees transactional database reliability.");

// --- AUTOMOTIVE ---
appendQ("automotive", "Automotive", "Cooling", "easy", "What automotive component regulates engine coolant flow to maintain optimal operating temperature?", ["Thermostat", "Radiator Cap", "Water Pump", "Heater Core"], 0, "The thermostat opens when coolant reaches operating temperature.");
appendQ("automotive", "Automotive", "Transmission", "medium", "What component in a torque converter uses fluid dynamics to multiply engine torque at low speeds?", ["Stator", "Impeller", "Turbine", "Lockup Clutch"], 0, "The stator redirects fluid between impeller and turbine to multiply torque.");
appendQ("automotive", "Automotive", "Ignition", "hard", "In gasoline direct injection (GDI) engines, what pressure range does the high-pressure fuel rail typically operate at?", ["500 to 2,900+ PSI (35 to 200 bar)", "40 to 60 PSI", "10 to 15 PSI", "10,000 to 20,000 PSI"], 0, "GDI systems operate at high pressures (up to 200+ bar) to atomize fuel directly into cylinders.");

// --- IQ & LOGIC ---
appendQ("iq-logic", "IQ & Logic", "Math Logic", "easy", "If 3 cats can catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes?", ["3 cats", "100 cats", "33 cats", "30 cats"], 0, "1 cat catches 1 mouse in 3 minutes. In 100 minutes, 1 cat catches 33.3 mice; 3 cats catch 100 mice.");
appendQ("iq-logic", "IQ & Logic", "Patterns", "medium", "What comes next in the letter sequence: J, F, M, A, M, J, ___ ?", ["J (July)", "A", "S", "O"], 0, "First letters of the months: January, February, March, April, May, June, July (J).");
appendQ("iq-logic", "IQ & Logic", "Probability", "hard", "In the Monty Hall problem with 3 doors (1 car, 2 goats), what is your winning probability if you switch doors after a goat is revealed?", ["2/3 (approx 66.7%)", "1/2 (50%)", "1/3 (33.3%)", "3/4 (75%)"], 0, "Switching captures the initial 2/3 probability of picking a goat.");

// --- MATHEMATICS ---
appendQ("mathematics", "Mathematics", "Trigonometry", "easy", "In a right triangle, what is the trigonometric ratio of Sine of an acute angle?", ["Opposite / Hypotenuse", "Adjacent / Hypotenuse", "Opposite / Adjacent", "Hypotenuse / Opposite"], 0, "Sin = Opposite / Hypotenuse (SOH).");
appendQ("mathematics", "Mathematics", "Exponents", "medium", "What is the value of 2^8?", ["256", "128", "512", "64"], 0, "2^8 = 256.");
appendQ("mathematics", "Mathematics", "Matrices", "hard", "What is the determinant of a 2x2 matrix [[a, b], [c, d]]?", ["ad - bc", "ab - cd", "ac + bd", "ad + bc"], 0, "det(A) = ad - bc.");

// --- SCIENCE ---
appendQ("science", "Science", "Periodic Table", "easy", "What is the atomic number of Carbon, which has 6 protons?", ["6", "12", "14", "8"], 0, "Carbon has atomic number 6.");
appendQ("science", "Science", "Physics", "medium", "What is the unit of electrical power named after Scottish inventor James Watt?", ["Watt (W)", "Joule (J)", "Volt (V)", "Newton (N)"], 0, "Power is measured in Watts (1 Joule/second).");
appendQ("science", "Science", "Chemistry", "hard", "According to Le Chatelier's Principle, what happens to an exothermic equilibrium reaction when temperature is increased?", ["The equilibrium shifts toward reactants (left) to absorb added heat", "The equilibrium shifts toward products (right)", "No shift occurs", "The reaction stops completely"], 0, "Increasing temperature favors the endothermic reverse reaction.");

// --- HISTORY ---
appendQ("history", "History", "Renaissance", "easy", "Which German blacksmith invented the movable type printing press around 1440?", ["Johannes Gutenberg", "Martin Luther", "Albrecht Durer", "Nicolaus Copernicus"], 0, "Gutenberg's printing press revolutionized information distribution.");
appendQ("history", "History", "World History", "medium", "What famous wall built in 1961 divided East and West Berlin during the Cold War before falling in 1989?", ["The Berlin Wall", "Hadrian's Wall", "The Great Wall", "The Antonine Wall"], 0, "The Berlin Wall separated East and West Berlin from 1961 to 1989.");
appendQ("history", "History", "Ancient Rome", "hard", "On what date in 44 BC was Julius Caesar assassinated on the Ides of March?", ["March 15, 44 BC", "March 1, 44 BC", "July 4, 44 BC", "December 25, 44 BC"], 0, "The Ides of March corresponds to March 15.");

// --- GEOGRAPHY ---
appendQ("geography", "Geography", "Capitals", "easy", "What is the capital city of Japan?", ["Tokyo", "Kyoto", "Osaka", "Hiroshima"], 0, "Tokyo is the capital of Japan.");
appendQ("geography", "Geography", "Deserts", "medium", "Which is the largest hot desert in the world?", ["The Sahara Desert", "The Arabian Desert", "The Gobi Desert", "The Kalahari Desert"], 0, "The Sahara is the largest subtropical hot desert.");
appendQ("geography", "Geography", "Straits", "hard", "Which narrow maritime strait connects the Persian Gulf with the Gulf of Oman and Arabian Sea?", ["Strait of Hormuz", "Strait of Malacca", "Strait of Gibraltar", "Bosphorus Strait"], 0, "The Strait of Hormuz is a vital global oil transit chokepoint.");

// --- ENGLISH ---
appendQ("english", "English & Grammar", "Punctuation", "easy", "Which punctuation mark is used to show possession (e.g. 'Sarah's book') or contraction ('don't')?", ["Apostrophe (')", "Hyphen (-)", "Colon (:)", "Semicolon (;)"], 0, "Apostrophes denote possession and contractions.");
appendQ("english", "English & Grammar", "Vocabulary", "medium", "What word describes an exaggeration used for rhetorical emphasis, such as 'I have a million things to do'?", ["Hyperbole", "Metaphor", "Simile", "Oxymoron"], 0, "Hyperbole is intentional rhetorical exaggeration.");
appendQ("english", "English & Grammar", "Grammar", "hard", "Which verbal form ends in '-ing' and functions as a noun in a sentence (e.g. 'Swimming is great exercise')?", ["Gerund", "Participle", "Infinitive", "Preposition"], 0, "A gerund is a verb form ending in -ing that functions as a noun.");

// --- GENERAL KNOWLEDGE ---
appendQ("general-knowledge", "General Knowledge", "Atmosphere", "easy", "Which gas makes up approximately 78% of Earth's atmosphere by volume?", ["Nitrogen (N2)", "Oxygen (O2)", "Carbon Dioxide", "Argon"], 0, "Nitrogen constitutes ~78% of Earth's air.");
appendQ("general-knowledge", "General Knowledge", "Anatomy", "medium", "What is the largest organ of the human body by surface area and weight?", ["Skin (Integumentary system)", "Liver", "Brain", "Lungs"], 0, "The skin is the largest human organ.");
appendQ("general-knowledge", "General Knowledge", "Astronomy", "hard", "What type of astronomical star explosion marks the explosive gravitational collapse of a massive star?", ["Supernova", "Nebula", "Pulsar", "White Dwarf"], 0, "A supernova is the catastrophic explosion of a massive star.");

// --- ENTERTAINMENT ---
appendQ("entertainment", "Entertainment", "Animation", "easy", "What is the name of the green ogre character voiced by Mike Myers in the DreamWorks franchise?", ["Shrek", "Fiona", "Donkey", "Lord Farquaad"], 0, "Shrek is DreamWorks' iconic ogre.");
appendQ("entertainment", "Entertainment", "Video Games", "medium", "Which Nintendo video game character travels through the Mushroom Kingdom to rescue Princess Peach?", ["Mario", "Link", "Donkey Kong", "Kirby"], 0, "Mario rescues Princess Peach in the Super Mario series.");
appendQ("entertainment", "Entertainment", "Comics", "hard", "What fictional metal alloy is bonded to Wolverine's skeleton and claws in Marvel Comics?", ["Adamantium", "Vibranium", "Mithril", "Uru"], 0, "Wolverine's skeleton is bonded with indestructible Adamantium.");

// --- MOVIES ---
appendQ("movies", "Movies", "Classics", "easy", "Which 1972 Francis Ford Coppola masterpiece chronicles the Italian-American Corleone mafia family?", ["The Godfather", "Goodfellas", "Scarface", "Casino"], 0, "The Godfather stars Marlon Brando and Al Pacino.");
appendQ("movies", "Movies", "Oscars", "medium", "Which 1994 film won Best Picture over 'Pulp Fiction' and 'The Shawshank Redemption'?", ["Forrest Gump", "Braveheart", "Apollo 13", "Schindler's List"], 0, "Forrest Gump won Best Picture at the 1995 Academy Awards.");
appendQ("movies", "Movies", "Cinematography", "hard", "Who directed the landmark 1968 science fiction film '2001: A Space Odyssey'?", ["Stanley Kubrick", "Ridley Scott", "Steven Spielberg", "George Lucas"], 0, "Stanley Kubrick directed 2001: A Space Odyssey.");

// --- TV SHOWS ---
appendQ("tv-shows", "TV Shows", "Animation", "easy", "Which animated show features Peter Griffin, Lois, Meg, Chris, Stewie, and Brian the dog?", ["Family Guy", "The Simpsons", "South Park", "Bob's Burgers"], 0, "Family Guy was created by Seth MacFarlane.");
appendQ("tv-shows", "TV Shows", "Comedy", "medium", "In 'The Office' (US), who is the eccentric Assistant to the Regional Manager at Dunder Mifflin Scranton?", ["Dwight Schrute", "Jim Halpert", "Andy Bernard", "Michael Scott"], 0, "Dwight Schrute is the Assistant to the Regional Manager.");
appendQ("tv-shows", "TV Shows", "Sci-Fi", "hard", "In 'The X-Files', what are the first names of FBI Special Agents Fox Mulder and Dana Scully?", ["Fox and Dana", "John and Mary", "William and Samantha", "Walter and Monica"], 0, "Fox Mulder and Dana Scully investigate paranormal phenomena.");

// --- DRAMA ---
appendQ("drama", "Drama", "Streaming", "easy", "Which Netflix regency-era romance drama series features the anonymous gossip writer Lady Whistledown?", ["Bridgerton", "Downton Abbey", "Outlander", "The Buccaneers"], 0, "Bridgerton follows high-society London gossip.");
appendQ("drama", "Drama", "Crime", "medium", "Which BBC crime drama series stars Cillian Murphy as Birmingham gang leader Thomas Shelby?", ["Peaky Blinders", "Line of Duty", "Broadchurch", "Luther"], 0, "Peaky Blinders chronicles the Shelby crime family.");
appendQ("drama", "Drama", "HBO", "hard", "In HBO's 'Succession', what is the name of the global media conglomerate run by patriarch Logan Roy?", ["Waystar Royco", "Pierce Media", "GoJo", "Vanderbilt Corp"], 0, "Waystar Royco is the media empire in Succession.");

// --- CELEBRITY ---
appendQ("celebrity", "Celebrity", "Music", "easy", "Who was crowned the 'Queen of Pop' with hits like 'Like a Virgin' and 'Vogue'?", ["Madonna", "Britney Spears", "Whitney Houston", "Cher"], 0, "Madonna is widely recognized as the Queen of Pop.");
appendQ("celebrity", "Celebrity", "Hollywood", "medium", "Which Hollywood actor starred as Jack Dawson in 'Titanic' and won Best Actor for 'The Revenant'?", ["Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Matt Damon"], 0, "Leonardo DiCaprio won his first Oscar for The Revenant in 2016.");
appendQ("celebrity", "Celebrity", "Royalty", "hard", "In which year did Princess Diana of Wales pass away in Paris?", ["1997", "1995", "1999", "2001"], 0, "Princess Diana died on August 31, 1997.");

// --- MUSIC ---
appendQ("music", "Music", "Rock", "easy", "Who was the legendary lead guitarist of Queen known for playing the 'Red Special' guitar?", ["Brian May", "Jimmy Page", "Eric Clapton", "Slash"], 0, "Brian May is the guitarist of Queen.");
appendQ("music", "Music", "Hip Hop", "medium", "Which rapper released the critically acclaimed 1994 debut album 'Illmatic'?", ["Nas", "Jay-Z", "The Notorious B.I.G.", "Tupac Shakur"], 0, "Nas released Illmatic in 1994.");
appendQ("music", "Music", "Classical", "hard", "In what musical form is a multi-movement orchestral composition typically structured in 4 movements?", ["Symphony", "Concerto", "Sonata", "Fugue"], 0, "Classical symphonies typically have four movements.");

// Write all expanded files back to disk
let totalGrandCount = 0;
for (const [slug, qList] of Object.entries(existingData)) {
  const filePath = path.join(qbDir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(qList, null, 2), "utf8");
  totalGrandCount += qList.length;
  console.log(`✓ Updated question-bank/${slug}.json (${qList.length} questions)`);
}

console.log(`\n🎉 Deep Question Bank Expansion complete! Total active questions: ${totalGrandCount}`);
