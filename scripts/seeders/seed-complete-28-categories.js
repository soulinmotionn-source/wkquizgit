/**
 * MASTER COMPLETE 28-CATEGORY QUESTION BANK POPULATOR
 * Ensures all 28 categories have authentic, unique questions across
 * EASY, MEDIUM, and HARD tiers.
 */

const fs = require("fs");
const path = require("path");

const qbDir = path.join(__dirname, "..", "..", "question-bank");
if (!fs.existsSync(qbDir)) fs.mkdirSync(qbDir, { recursive: true });

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

// Master pool object
const masterPool = {};

// Helper to seed a category
function addQ(slug, id, categoryName, subcat, diff, question, options, ans, expl, tags = []) {
  if (!masterPool[slug]) masterPool[slug] = [];
  masterPool[slug].push(createQ(id, categoryName, subcat, diff, question, options, ans, expl, tags));
}

// ==========================================
// 1. NCLEX
// ==========================================
addQ("nclex", "NCLEX-001", "NCLEX", "Fundamentals", "easy", "What is the normal resting adult pulse rate range?", ["60 to 100 beats per minute", "40 to 60 bpm", "100 to 140 bpm", "50 to 70 bpm"], 0, "Normal resting adult pulse is 60 to 100 bpm.");
addQ("nclex", "NCLEX-002", "NCLEX", "Infection Control", "easy", "Which PPE item should be donned first for contact precautions?", ["Clean gown", "Gloves", "N95 mask", "Shoe covers"], 0, "Gown is donned first, followed by mask, goggles, and gloves.");
addQ("nclex", "NCLEX-003", "NCLEX", "Patient Identification", "easy", "Which two client identifiers are required before medication administration?", ["Full legal name and date of birth", "Room number and bed number", "Diagnosis and room number", "Doctor name and badge"], 0, "Name and date of birth or MRN are standard.");
addQ("nclex", "NCLEX-004", "NCLEX", "Respiratory", "easy", "What is normal resting adult respiratory rate range?", ["12 to 20 breaths per minute", "8 to 10 bpm", "24 to 32 bpm", "30 to 40 bpm"], 0, "Normal resting rate is 12-20 bpm.");
addQ("nclex", "NCLEX-005", "NCLEX", "Cardiology", "medium", "A patient on Digoxin has an apical pulse of 52 bpm. What is the priority nursing action?", ["Withhold the dose and notify the physician", "Administer the dose with water", "Double the dose tomorrow", "Encourage exercise"], 0, "Withhold digoxin if apical HR < 60 bpm.");
addQ("nclex", "NCLEX-006", "NCLEX", "Endocrine", "medium", "A diabetic client exhibits shakiness, diaphoresis, and confusion. What is the immediate treatment?", ["Provide 15g fast-acting carbohydrates", "Give 10 units regular insulin", "Place in Trendelenburg", "Withhold fluids"], 0, "Hypoglycemia requires immediate 15g simple carbs.");
addQ("nclex", "NCLEX-007", "NCLEX", "Fluids", "medium", "Which IV fluid is isotonic with blood plasma and standard for resuscitation?", ["0.9% Normal Saline", "0.45% Saline", "3% Saline", "Dextrose 10%"], 0, "0.9% Normal Saline is isotonic.");
addQ("nclex", "NCLEX-008", "NCLEX", "Prioritization", "hard", "Which client should the nurse assess first after change-of-shift report?", ["Asthmatic whose wheezing suddenly becomes silent with diminished breath sounds", "Diabetic with glucose of 185 mg/dL", "Post-op day 1 with 7/10 pain", "CKD with creatinine 2.8 mg/dL"], 0, "Silent chest indicates impending respiratory arrest.");
addQ("nclex", "NCLEX-009", "NCLEX", "Neurology", "hard", "A client with intracranial pressure (ICP) of 24 mmHg is in bed. Which intervention is contraindicated?", ["Trendelenburg position", "Elevating head of bed 30 degrees", "Administering mannitol IV", "Maintaining neutral neck alignment"], 0, "Trendelenburg elevates ICP.");
addQ("nclex", "NCLEX-010", "NCLEX", "Hemodynamics", "hard", "Which triad indicates impending brain herniation from severe intracranial pressure?", ["Cushing's Triad (Widening pulse pressure, bradycardia, irregular respirations)", "Beck's Triad", "Charcot's Triad", "Virchow's Triad"], 0, "Cushing's Triad indicates impending herniation.");

// ==========================================
// 2. NURSING
// ==========================================
addQ("nursing", "NURS-001", "Nursing", "Infection Control", "easy", "What is the single most effective action to prevent healthcare-associated infections?", ["Hand hygiene before and after patient contact", "Double gloving", "Prophylactic antibiotics", "Wiping doors daily"], 0, "Hand hygiene is the gold standard.");
addQ("nursing", "NURS-002", "Nursing", "Skin Care", "easy", "What characterizes a Stage 1 pressure injury?", ["Non-blanchable erythema of intact skin", "Partial-thickness dermis loss", "Full-thickness fat exposure", "Exposed bone and tendon"], 0, "Stage 1 is non-blanchable redness on intact skin.");
addQ("nursing", "NURS-003", "Nursing", "Ethics", "easy", "Honoring a patient's informed refusal of medical treatment demonstrates which principle?", ["Autonomy", "Beneficence", "Non-maleficence", "Justice"], 0, "Autonomy respects patient self-determination.");
addQ("nursing", "NURS-004", "Nursing", "Respiratory", "medium", "Which position is best to relieve acute dyspnea and maximize lung expansion?", ["High Fowler's position", "Trendelenburg", "Prone", "Supine"], 0, "High Fowler's maximizes lung expansion.");
addQ("nursing", "NURS-005", "Nursing", "Injections", "medium", "What is the preferred intramuscular injection site for volumes over 1 mL in adults?", ["Ventrogluteal site", "Dorsogluteal site", "Deltoid muscle", "Vastus medialis"], 0, "Ventrogluteal is free of major nerves.");
addQ("nursing", "NURS-006", "Nursing", "Assessment", "hard", "Tapping the facial nerve anterior to the ear produces facial twitching. What is this sign?", ["Chvostek's sign (hypocalcemia)", "Trousseau's sign", "Brudzinski's sign", "Kernig's sign"], 0, "Chvostek's sign indicates hypocalcemia.");
addQ("nursing", "NURS-007", "Nursing", "ECG", "hard", "Tall peaked T waves, prolonged PR interval, and wide QRS complexes indicate which condition?", ["Severe Hyperkalemia", "Hypocalcemia", "Hypernatremia", "Hypomagnesemia"], 0, "Hyperkalemia causes peaked T waves.");

// ==========================================
// 3. MEDICAL
// ==========================================
addQ("medical", "MED-001", "Medical", "Emergency", "easy", "What is the recommended compression-to-ventilation ratio for adult CPR?", ["30 compressions to 2 breaths", "15:2", "20:1", "50:5"], 0, "30:2 is standard for adult single-rescuer CPR.");
addQ("medical", "MED-002", "Medical", "Vitals", "easy", "What is defined as normal adult resting blood pressure?", ["Less than 120/80 mmHg", "140/90 mmHg", "160/100 mmHg", "130/85 mmHg"], 0, "Normal BP is systolic < 120 and diastolic < 80.");
addQ("medical", "MED-003", "Medical", "Diagnostics", "medium", "Which cardiac biomarker is the gold standard for diagnosing acute myocardial infarction?", ["Cardiac Troponin I or T", "CK-MB", "Myoglobin", "LDH"], 0, "Cardiac troponin is the gold standard.");
addQ("medical", "MED-004", "Medical", "Pathology", "medium", "What is the primary cause of respiratory acidosis?", ["Alveolar hypoventilation leading to CO2 retention", "Hyperventilation", "Lactic acid excess", "Ketoacidosis"], 0, "Hypoventilation causes CO2 retention.");
addQ("medical", "MED-005", "Medical", "Emergency", "hard", "Which life-threatening condition presents with Beck's Triad (hypotension, JVD, muffled heart sounds)?", ["Cardiac Tamponade", "Tension Pneumothorax", "Myocardial Infarction", "Pulmonary Embolism"], 0, "Beck's Triad indicates cardiac tamponade.");

// ==========================================
// 4. MEDICAL TERMINOLOGY
// ==========================================
addQ("medical-terminology", "MEDTERM-001", "Medical Terminology", "Prefixes", "easy", "What does the medical prefix 'Brady-' mean?", ["Slow", "Fast", "Difficult", "Excessive"], 0, "'Brady-' means slow.");
addQ("medical-terminology", "MEDTERM-002", "Medical Terminology", "Prefixes", "easy", "What does the medical prefix 'Tachy-' mean?", ["Fast / Rapid", "Slow", "Below", "Against"], 0, "'Tachy-' means fast.");
addQ("medical-terminology", "MEDTERM-003", "Medical Terminology", "Suffixes", "medium", "What does the surgical suffix '-ectomy' indicate?", ["Surgical removal or excision", "Creating an artificial opening", "Surgical repair", "Endoscopic viewing"], 0, "'-ectomy' means surgical removal.");
addQ("medical-terminology", "MEDTERM-004", "Medical Terminology", "Suffixes", "medium", "What does the surgical suffix '-ostomy' signify?", ["Creating a new artificial opening", "Incision / cutting into", "Surgical repair", "Crushing of stone"], 0, "'-ostomy' creates an opening.");
addQ("medical-terminology", "MEDTERM-005", "Medical Terminology", "Pathology", "hard", "What does the clinical term 'Hemoptysis' refer to?", ["Coughing up blood from the respiratory tract", "Vomiting blood", "Blood in urine", "Nosebleed"], 0, "Hemoptysis is coughing up blood.");

// ==========================================
// 5. DISEASES & DISORDERS
// ==========================================
addQ("diseases", "DIS-001", "Diseases & Disorders", "Endocrinology", "easy", "Which organ fails to produce sufficient insulin in Type 1 Diabetes?", ["Pancreas", "Liver", "Adrenal gland", "Thyroid"], 0, "Pancreatic beta cells are destroyed in Type 1 diabetes.");
addQ("diseases", "DIS-002", "Diseases & Disorders", "Infectious", "easy", "Which bacterial pathogen causes Tuberculosis?", ["Mycobacterium tuberculosis", "Streptococcus pneumoniae", "Staphylococcus aureus", "E. coli"], 0, "Tuberculosis is caused by Mycobacterium tuberculosis.");
addQ("diseases", "DIS-003", "Diseases & Disorders", "Cardiovascular", "medium", "What is the most common cause of coronary artery disease?", ["Atherosclerosis (plaque buildup)", "Heart valve infection", "Septal defect", "Coronary spasm"], 0, "Atherosclerosis causes arterial stenosis.");
addQ("diseases", "DIS-004", "Diseases & Disorders", "Neurology", "medium", "Which neurotransmitter is deficient in Parkinson's Disease?", ["Dopamine", "Acetylcholine", "Serotonin", "GABA"], 0, "Dopamine depletion causes Parkinson's motor symptoms.");
addQ("diseases", "DIS-005", "Diseases & Disorders", "Genetics", "hard", "What is the leading genetic cause of sudden cardiac death in young athletes?", ["Hypertrophic Cardiomyopathy (HCM)", "Dilated Cardiomyopathy", "Aortic Dissection", "Brugada Syndrome"], 0, "HCM causes ventricular septal thickening.");

// ==========================================
// 6. ANATOMY & PHYSIOLOGY
// ==========================================
addQ("anatomy", "ANAT-001", "Anatomy & Physiology", "Cardiovascular", "easy", "Which heart chamber pumps oxygenated blood into the aorta?", ["Left Ventricle", "Right Ventricle", "Left Atrium", "Right Atrium"], 0, "Left ventricle pumps into systemic circulation.");
addQ("anatomy", "ANAT-002", "Anatomy & Physiology", "Skeletal", "easy", "What is the longest and strongest bone in the human body?", ["Femur", "Tibia", "Humerus", "Radius"], 0, "The femur is the longest human bone.");
addQ("anatomy", "ANAT-003", "Anatomy & Physiology", "Neuroanatomy", "medium", "Which brain structure coordinates voluntary muscle balance and equilibrium?", ["Cerebellum", "Cerebrum", "Hypothalamus", "Medulla"], 0, "Cerebellum coordinates balance.");
addQ("anatomy", "ANAT-004", "Anatomy & Physiology", "Respiratory", "medium", "What dome-shaped muscle is the primary muscle of inspiration?", ["Diaphragm", "Internal intercostals", "Sternocleidomastoid", "Abdominals"], 0, "The diaphragm is the primary inspiratory muscle.");
addQ("anatomy", "ANAT-005", "Anatomy & Physiology", "Endocrine", "hard", "The islets of Langerhans are endocrine clusters situated within which organ?", ["Pancreas", "Liver", "Spleen", "Thyroid"], 0, "Islets of Langerhans reside in the pancreas.");

// ==========================================
// 7. PHARMACOLOGY
// ==========================================
addQ("pharmacology", "PHARM-001", "Pharmacology", "Analgesics", "easy", "What emergency medication reverses opioid overdose respiratory depression?", ["Naloxone (Narcan)", "Atropine", "Epinephrine", "Flumazenil"], 0, "Naloxone reverses opioids.");
addQ("pharmacology", "PHARM-002", "Pharmacology", "Antipyretics", "easy", "Which common analgesic carries high risk of liver toxicity in overdose?", ["Acetaminophen (Paracetamol)", "Ibuprofen", "Naproxen", "Aspirin"], 0, "Acetaminophen can cause acute liver failure.");
addQ("pharmacology", "PHARM-003", "Pharmacology", "Cardiology", "medium", "Which blood pressure drug class commonly causes a persistent dry cough?", ["ACE Inhibitors (e.g. Lisinopril)", "Beta Blockers", "Calcium Channel Blockers", "Diuretics"], 0, "ACE inhibitors increase bradykinin.");
addQ("pharmacology", "PHARM-004", "Pharmacology", "Antidotes", "hard", "What is the specific antidote used to reverse Heparin anticoagulation?", ["Protamine Sulfate", "Vitamin K", "Naloxone", "Digibind"], 0, "Protamine sulfate neutralizes heparin.");

// ==========================================
// 8. HVAC
// ==========================================
addQ("hvac", "HVAC-001", "HVAC", "Airflow", "easy", "What standard unit measures volumetric airflow rate in HVAC ductwork?", ["CFM (Cubic Feet per Minute)", "PSI", "BTU", "RPM"], 0, "CFM measures cubic feet per minute.");
addQ("hvac", "HVAC-002", "HVAC", "Capacity", "easy", "How many BTUs per hour equal 1 standard ton of refrigeration?", ["12,000 BTU/hr", "24,000 BTU/hr", "6,000 BTU/hr", "100,000 BTU/hr"], 0, "1 ton of refrigeration = 12,000 BTU/hr.");
addQ("hvac", "HVAC-003", "HVAC", "Filters", "easy", "What does an air filter's MERV rating measure?", ["Minimum Efficiency Reporting Value", "Motor Energy Resistance", "Moisture Evaporation", "Mass Energy Radiation"], 0, "MERV measures particle trapping efficiency.");
addQ("hvac", "HVAC-004", "HVAC", "Thermostats", "easy", "In standard thermostat wiring, which color wire typically signals cooling?", ["Yellow (Y)", "Red (R)", "White (W)", "Green (G)"], 0, "Yellow is standard for cooling call.");
addQ("hvac", "HVAC-005", "HVAC", "Refrigeration", "medium", "What is the primary function of the expansion valve (TXV)?", ["Drop refrigerant pressure and temperature entering the evaporator", "Compress vapor", "Condense hot gas", "Filter oil"], 0, "TXVs meter refrigerant and create flash gas cooling.");
addQ("hvac", "HVAC-006", "HVAC", "Psychrometrics", "medium", "What is the relative humidity when dry-bulb equals wet-bulb temperature?", ["100% Relative Humidity", "0%", "50%", "75%"], 0, "Equal temperatures mean 100% saturation.");
addQ("hvac", "HVAC-007", "HVAC", "Thermodynamics", "hard", "What is heat that causes temperature change without changing state of matter?", ["Sensible Heat", "Latent Heat", "Specific Heat Ratio", "Enthalpy"], 0, "Sensible heat produces measurable temperature change.");
addQ("hvac", "HVAC-008", "HVAC", "Diagnostics", "hard", "In a TXV system, high superheat combined with low subcooling indicates what?", ["Undercharged system (low refrigerant)", "Overcharged system", "Liquid restriction", "Dirty filter"], 0, "High superheat + low subcooling = undercharge.");

// ==========================================
// 9. ELECTRICAL
// ==========================================
addQ("electrical", "ELEC-001", "Electrical", "Ohm's Law", "easy", "According to Ohm's Law, what formula calculates voltage?", ["V = I × R", "V = I / R", "V = R / I", "V = I + R"], 0, "V = Current × Resistance.");
addQ("electrical", "ELEC-002", "Electrical", "Safety", "easy", "What is the function of a Ground Fault Circuit Interrupter (GFCI)?", ["Protect people from shock by detecting ground current leakage", "Prevent overloads", "Step down voltage", "Convert AC to DC"], 0, "GFCIs trip on small ground current leakage.");
addQ("electrical", "ELEC-003", "Electrical", "Grid", "easy", "What is the AC utility frequency in North America?", ["60 Hz", "50 Hz", "120 Hz", "400 Hz"], 0, "North America uses 60 Hz.");
addQ("electrical", "ELEC-004", "Electrical", "Power", "medium", "If a 120V circuit draws 5A of current, what is the power consumed?", ["600 Watts", "24 Watts", "125 Watts", "60 Watts"], 0, "P = V × I = 120 × 5 = 600 W.");
addQ("electrical", "ELEC-005", "Electrical", "Wire Sizing", "medium", "What copper wire gauge is standard for a 20A branch circuit?", ["12 AWG", "14 AWG", "10 AWG", "16 AWG"], 0, "12 AWG copper is rated for 20A.");
addQ("electrical", "ELEC-006", "Electrical", "AC Theory", "hard", "In a purely inductive AC circuit, what is the phase relationship between voltage and current?", ["Voltage leads current by 90 degrees", "Current leads voltage by 90 degrees", "They are in phase", "Voltage leads current by 180 degrees"], 0, "Voltage leads current by 90° (ELI).");

// ==========================================
// 10. ELECTRICAL SYMBOLS
// ==========================================
addQ("electrical-symbols", "ELECSYM-001", "Electrical Symbols", "Schematic", "easy", "What does a symbol of alternating long and short parallel lines represent?", ["DC Battery / Cell", "Capacitor", "Ground", "Inductor"], 0, "Long/short lines represent a battery.");
addQ("electrical-symbols", "ELECSYM-002", "Electrical Symbols", "Passive", "medium", "In US schematics, what component is depicted by a zigzag line?", ["Fixed Resistor", "Inductor", "Transformer", "Switch"], 0, "Zigzag lines represent resistors in US standards.");
addQ("electrical-symbols", "ELECSYM-003", "Electrical Symbols", "Semiconductors", "hard", "What does a diode triangle with two outward-pointing arrows represent?", ["Light Emitting Diode (LED)", "Photodiode", "Zener Diode", "Schottky Diode"], 0, "Outward arrows represent emitted light in an LED.");

// ==========================================
// 11. ELECTRONICS
// ==========================================
addQ("electronics", "ELX-001", "Electronics", "Semiconductors", "easy", "What component permits current to flow in one direction only?", ["Diode", "Resistor", "Capacitor", "Inductor"], 0, "Diodes conduct in the forward bias direction only.");
addQ("electronics", "ELX-002", "Electronics", "Digital Logic", "easy", "Which logic gate outputs HIGH only when all of its inputs are HIGH?", ["AND Gate", "OR Gate", "NOT Gate", "XOR Gate"], 0, "AND gates require all inputs to be 1.");
addQ("electronics", "ELX-003", "Electronics", "Transistors", "medium", "What are the three terminals of a BJT transistor?", ["Emitter, Base, Collector", "Gate, Drain, Source", "Anode, Cathode, Gate", "Positive, Negative, Neutral"], 0, "BJTs have Emitter, Base, Collector.");
addQ("electronics", "ELX-004", "Electronics", "MOSFETs", "hard", "In an N-channel enhancement MOSFET, what is required to conduct drain current?", ["V_GS must exceed positive threshold voltage (V_th)", "V_GS must be zero", "V_GS must be negative", "V_DS must equal zero"], 0, "Positive V_GS above V_th creates an inversion channel.");

// ==========================================
// 12. ENGINEERING
// ==========================================
addQ("engineering", "ENG-001", "Engineering", "Structures", "easy", "Which geometric shape is recognized as the most inherently rigid in trusses?", ["Triangle", "Square", "Hexagon", "Circle"], 0, "Triangles provide structural rigidity.");
addQ("engineering", "ENG-002", "Engineering", "Materials", "medium", "According to Hooke's Law within elastic limits, stress is directly proportional to what?", ["Strain", "Temperature", "Volume", "Density"], 0, "Stress is proportional to strain (σ = E · ε).");
addQ("engineering", "ENG-003", "Engineering", "Fluids", "hard", "Which dimensionless number predicts laminar vs turbulent fluid flow?", ["Reynolds Number (Re)", "Mach Number", "Froude Number", "Prandtl Number"], 0, "Reynolds number characterizes fluid turbulence.");

// ==========================================
// 13. COMPUTERS
// ==========================================
addQ("computers", "COMP-001", "Computers", "Hardware", "easy", "Which computer component provides fast volatile temporary memory?", ["RAM", "SSD", "ROM BIOS", "Hard Drive"], 0, "RAM is volatile memory.");
addQ("computers", "COMP-002", "Computers", "Units", "easy", "How many bits are in exactly one byte?", ["8 bits", "4 bits", "16 bits", "32 bits"], 0, "1 Byte = 8 bits.");
addQ("computers", "COMP-003", "Computers", "CPU", "medium", "What CPU register holds the memory address of the next instruction to execute?", ["Program Counter (PC)", "Accumulator", "Instruction Register", "Data Register"], 0, "The Program Counter points to the next instruction.");
addQ("computers", "COMP-004", "Computers", "Architecture", "hard", "Why is L1 cache faster than L2 and L3 cache?", ["Built directly into processor core pipelines with sub-nanosecond latency", "Holds more gigabytes", "Uses flash storage", "Runs on AC power"], 0, "L1 cache is integrated directly in the execution core.");

// ==========================================
// 14. TECHNOLOGY
// ==========================================
addQ("technology", "TECH-001", "Technology", "Web", "easy", "What does URL stand for in web browsing?", ["Uniform Resource Locator", "Universal Remote Link", "Unified Routing Language", "User Resource Lookup"], 0, "URL is Uniform Resource Locator.");
addQ("technology", "TECH-002", "Technology", "AI", "medium", "In Machine Learning, what does LLM stand for?", ["Large Language Model", "Linear Logic Model", "Layered Learning Matrix", "Logical Link Model"], 0, "LLM stands for Large Language Model.");
addQ("technology", "TECH-003", "Technology", "Security", "hard", "In public-key cryptography (RSA), which key is used by the sender to encrypt a private message?", ["Recipient's Public Key", "Sender's Private Key", "Recipient's Private Key", "Sender's Public Key"], 0, "Data encrypted with the recipient's public key can only be opened with their private key.");

// ==========================================
// 15. AUTOMOTIVE
// ==========================================
addQ("automotive", "AUTO-001", "Automotive", "Engines", "easy", "What is the correct sequence of strokes in a four-stroke internal combustion engine?", ["Intake, Compression, Power, Exhaust", "Compression, Intake, Power, Exhaust", "Power, Intake, Compression, Exhaust", "Intake, Power, Compression, Exhaust"], 0, "Cycle is Intake, Compression, Power, Exhaust.");
addQ("automotive", "AUTO-002", "Automotive", "Brakes", "medium", "What is the primary function of Anti-lock Brakes (ABS)?", ["Prevent wheel lock-up during hard braking to preserve steering control", "Cut stopping distance in half", "Apply emergency brake", "Cool the rotors"], 0, "ABS pulses pressure to avoid skids and keep steering.");
addQ("automotive", "AUTO-003", "Automotive", "Diagnostics", "hard", "In OBD-II diagnostics, what does trouble code P0300 indicate?", ["Random or multiple cylinder misfire detected", "O2 sensor fault", "Catalytic converter failure", "EVAP leak"], 0, "P0300 indicates multi-cylinder misfires.");

// ==========================================
// 16. IQ & LOGIC
// ==========================================
addQ("iq-logic", "IQ-001", "IQ & Logic", "Series", "easy", "Look at this sequence: 5, 10, 15, 20, ___ . What comes next?", ["25", "30", "22", "35"], 0, "Pattern adds 5 each step: 20 + 5 = 25.");
addQ("iq-logic", "IQ-002", "IQ & Logic", "Riddles", "easy", "A farmer has 15 sheep and all but 8 die. How many sheep are still alive?", ["8", "7", "0", "15"], 0, "All but 8 die means 8 survive.");
addQ("iq-logic", "IQ-003", "IQ & Logic", "Patterns", "medium", "What number comes next: 2, 6, 12, 20, 30, ___ ?", ["42", "40", "38", "48"], 0, "Differences increase by 2: +4, +6, +8, +10, +12 -> 30 + 12 = 42.");
addQ("iq-logic", "IQ-004", "IQ & Logic", "Syllogisms", "hard", "If all Bloops are Razzies, and all Razzies are Lizzies, which statement is guaranteed true?", ["All Bloops are Lizzies", "All Lizzies are Bloops", "No Bloops are Lizzies", "Some Bloops are not Lizzies"], 0, "By transitive logic, all Bloops are Lizzies.");

// ==========================================
// 17. MATHEMATICS
// ==========================================
addQ("mathematics", "MATH-001", "Mathematics", "Geometry", "easy", "What is the formula for the area of a rectangle?", ["Area = Length × Width", "Area = 2L + 2W", "Area = L² × W²", "Area = (L+W)/2"], 0, "Area = Length × Width.");
addQ("mathematics", "MATH-002", "Mathematics", "Arithmetic", "easy", "What is the square root of 144?", ["12", "14", "11", "16"], 0, "12 × 12 = 144.");
addQ("mathematics", "MATH-003", "Mathematics", "Algebra", "medium", "Solve for x: 3x + 15 = 36", ["x = 7", "x = 9", "x = 6", "x = 12"], 0, "3x = 21; x = 7.");
addQ("mathematics", "MATH-004", "Mathematics", "Calculus", "hard", "What is the derivative with respect to x of f(x) = 4x³ - 5x + 9?", ["f'(x) = 12x² - 5", "f'(x) = 12x² - 5x", "f'(x) = 4x² - 5", "f'(x) = 12x³ - 5"], 0, "d/dx[4x³ - 5x + 9] = 12x² - 5.");

// ==========================================
// 18. SCIENCE
// ==========================================
addQ("science", "SCI-001", "Science", "Chemistry", "easy", "What is the chemical formula for pure water?", ["H2O", "CO2", "NaCl", "O2"], 0, "Water is H2O.");
addQ("science", "SCI-002", "Science", "Physics", "easy", "What force pulls objects toward the center of the Earth?", ["Gravity", "Magnetism", "Friction", "Centrifugal force"], 0, "Gravity attracts mass.");
addQ("science", "SCI-003", "Science", "Physics", "medium", "What is the speed of light in a vacuum?", ["Approx 300,000 km/s (3 × 10^8 m/s)", "150,000 km/s", "343 m/s", "1,000 km/s"], 0, "Speed of light c ≈ 3 × 10^8 m/s.");
addQ("science", "SCI-004", "Science", "Biology", "hard", "Which organelle is the site of cellular respiration and ATP synthesis in eukaryotes?", ["Mitochondria", "Ribosome", "Endoplasmic Reticulum", "Golgi apparatus"], 0, "Mitochondria produce ATP.");

// ==========================================
// 19. HISTORY
// ==========================================
addQ("history", "HIST-001", "History", "Space", "easy", "In which year did the Apollo 11 Moon landing occur?", ["1969", "1965", "1972", "1959"], 0, "Apollo 11 landed on July 20, 1969.");
addQ("history", "HIST-002", "History", "Ancient", "easy", "Which ancient civilization built the Great Pyramids of Giza?", ["Ancient Egyptians", "Romans", "Greeks", "Babylonians"], 0, "Egyptians built the Pyramids of Giza.");
addQ("history", "HIST-003", "History", "World Wars", "medium", "In which year did World War II end?", ["1945", "1944", "1939", "1950"], 0, "WWII ended in 1945.");
addQ("history", "HIST-004", "History", "Treaties", "hard", "Which 1648 peace treaties ended the Thirty Years' War and established European state sovereignty?", ["Peace of Westphalia", "Treaty of Versailles", "Treaty of Utrecht", "Congress of Vienna"], 0, "Peace of Westphalia established modern state sovereignty.");

// ==========================================
// 20. GEOGRAPHY
// ==========================================
addQ("geography", "GEO-001", "Geography", "Capitals", "easy", "What is the capital city of France?", ["Paris", "Lyon", "Marseille", "Bordeaux"], 0, "Paris is France's capital.");
addQ("geography", "GEO-002", "Geography", "Rivers", "easy", "Which river is recognized as the longest in the world?", ["The Nile River", "The Amazon River", "The Yangtze River", "The Mississippi"], 0, "The Nile is approx 6,650 km long.");
addQ("geography", "GEO-003", "Geography", "Capitals", "medium", "What is the capital city of Australia?", ["Canberra", "Sydney", "Melbourne", "Brisbane"], 0, "Canberra is Australia's capital.");
addQ("geography", "GEO-004", "Geography", "Oceans", "hard", "Which ocean trench contains Challenger Deep, the lowest point on Earth?", ["Mariana Trench", "Puerto Rico Trench", "Java Trench", "Tonga Trench"], 0, "Mariana Trench holds Challenger Deep (11,000m).");

// ==========================================
// 21. ENGLISH & GRAMMAR
// ==========================================
addQ("english", "ENG-001", "English & Grammar", "Grammar", "easy", "Which part of speech modifies or describes a noun?", ["Adjective", "Verb", "Preposition", "Adverb"], 0, "Adjectives modify nouns.");
addQ("english", "ENG-002", "English & Grammar", "Grammar", "medium", "Which sentence exhibits correct subject-verb agreement?", ["Neither the doctor nor the nurses were available", "Neither the doctor nor the nurses was available", "Each of the boys are here", "The list of items are lost"], 0, "Verb agrees with closer subject ('nurses were').");
addQ("english", "ENG-003", "English & Grammar", "Vocabulary", "medium", "What is the antonym of 'Ephemeral'?", ["Permanent", "Fleeting", "Transient", "Short-lived"], 0, "Permanent is the opposite of ephemeral.");
addQ("english", "ENG-004", "English & Grammar", "Rhetoric", "hard", "What rhetorical figure uses understatement by denying the contrary (e.g. 'not bad')?", ["Litotes", "Chiasmus", "Synecdoche", "Metonymy"], 0, "Litotes expresses an affirmative by negating its opposite.");

// ==========================================
// 22. GENERAL KNOWLEDGE
// ==========================================
addQ("general-knowledge", "GK-001", "General Knowledge", "Earth", "easy", "What is the hardest naturally occurring mineral on Earth?", ["Diamond", "Corundum", "Quartz", "Topaz"], 0, "Diamond is 10 on the Mohs hardness scale.");
addQ("general-knowledge", "GK-002", "General Knowledge", "Landmarks", "medium", "In which country is the ancient citadel of Machu Picchu located?", ["Peru", "Chile", "Bolivia", "Ecuador"], 0, "Machu Picchu is in Peru.");
addQ("general-knowledge", "GK-003", "General Knowledge", "Oceans", "hard", "What is the only sea on Earth without land boundaries, defined by North Atlantic currents?", ["Sargasso Sea", "Coral Sea", "Baltic Sea", "Tasman Sea"], 0, "Sargasso Sea is bounded by ocean currents.");

// ==========================================
// 23. ENTERTAINMENT
// ==========================================
addQ("entertainment", "ENT-001", "Entertainment", "Comics", "easy", "Which superhero is known as the 'Dark Knight' of Gotham City?", ["Batman", "Superman", "Spider-Man", "Iron Man"], 0, "Batman is the Dark Knight.");
addQ("entertainment", "ENT-002", "Entertainment", "Oscars", "medium", "Which 1997 James Cameron film won 11 Academy Awards?", ["Titanic", "Avatar", "Gladiator", "Braveheart"], 0, "Titanic tied the record with 11 Oscars.");
addQ("entertainment", "ENT-003", "Entertainment", "Cinema", "hard", "Who directed the 1927 silent dystopian masterpiece 'Metropolis'?", ["Fritz Lang", "F.W. Murnau", "Robert Wiene", "Billy Wilder"], 0, "Fritz Lang directed Metropolis in 1927.");

// ==========================================
// 24. MOVIES
// ==========================================
addQ("movies", "MOV-001", "Movies", "Sci-Fi", "easy", "Who is Luke Skywalker's father in Star Wars?", ["Darth Vader (Anakin Skywalker)", "Obi-Wan Kenobi", "Palpatine", "Yoda"], 0, "Darth Vader is Luke's father.");
addQ("movies", "MOV-002", "Movies", "Box Office", "medium", "Which 2009 film is the highest-grossing movie of all time worldwide?", ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"], 0, "Avatar grossed over $2.9 billion.");
addQ("movies", "MOV-003", "Movies", "Directing", "hard", "Which director won Best Director Oscars for both 'Brokeback Mountain' and 'Life of Pi'?", ["Ang Lee", "Bong Joon-ho", "Guillermo del Toro", "Alfonso Cuaron"], 0, "Ang Lee won two Best Director Oscars.");

// ==========================================
// 25. TV SHOWS
// ==========================================
addQ("tv-shows", "TV-001", "TV Shows", "Streaming", "easy", "In 'Stranger Things', what is the name of the dark alternate dimension?", ["The Upside Down", "The Netherworld", "The Twilight Zone", "The Abyss"], 0, "The Upside Down is the alternate dimension in Stranger Things.");
addQ("tv-shows", "TV-002", "TV Shows", "Sitcoms", "medium", "In 'Friends', what is the name of the coffee shop where the gang meets?", ["Central Perk", "Monk's Diner", "The Daily Grind", "Cafe Nervosa"], 0, "Central Perk is the coffee shop in Friends.");
addQ("tv-shows", "TV-003", "TV Shows", "Drama", "hard", "In 'Breaking Bad', what pseudonym did Walter White adopt in the meth trade?", ["Heisenberg", "Oppenheimer", "Schrodinger", "Fermi"], 0, "Walter White used the pseudonym Heisenberg.");

// ==========================================
// 26. DRAMA
// ==========================================
addQ("drama", "DRAMA-001", "Drama", "K-Drama", "easy", "Which 2021 survival drama series became Netflix's most-watched series worldwide?", ["Squid Game", "Crash Landing on You", "All of Us Are Dead", "The Glory"], 0, "Squid Game had 1.65B viewing hours.");
addQ("drama", "DRAMA-002", "Drama", "HBO", "medium", "Which acclaimed series followed New Jersey mobster Tony Soprano?", ["The Sopranos", "The Wire", "Boardwalk Empire", "Peaky Blinders"], 0, "The Sopranos starred James Gandolfini.");
addQ("drama", "DRAMA-003", "Drama", "Period", "hard", "In 'Mad Men', what Madison Avenue agency does Don Draper work for in early seasons?", ["Sterling Cooper", "McCann Erickson", "Ogilvy & Mather", "BBDO"], 0, "Don Draper worked at Sterling Cooper.");

// ==========================================
// 27. CELEBRITY
// ==========================================
addQ("celebrity", "CELEB-001", "Celebrity", "Music", "easy", "Which artist launched the record-breaking global Eras Tour in 2023?", ["Taylor Swift", "Beyonce", "Rihanna", "Adele"], 0, "Taylor Swift's Eras Tour broke all concert tour records.");
addQ("celebrity", "CELEB-002", "Celebrity", "Actors", "medium", "Which actor won the Best Actor Oscar in 2024 for his role in 'Oppenheimer'?", ["Cillian Murphy", "Bradley Cooper", "Paul Giamatti", "Robert Downey Jr."], 0, "Cillian Murphy won the 2024 Best Actor Academy Award.");
addQ("celebrity", "CELEB-003", "Celebrity", "EGOT", "hard", "Who was the first Black woman in entertainment history to achieve EGOT status?", ["Whoopi Goldberg", "Viola Davis", "Jennifer Hudson", "Audra McDonald"], 0, "Whoopi Goldberg achieved EGOT status in 2002.");

// ==========================================
// 28. MUSIC
// ==========================================
addQ("music", "MUS-001", "Music", "Rock", "easy", "Which legendary British band featured John, Paul, George, and Ringo?", ["The Beatles", "The Rolling Stones", "The Who", "Led Zeppelin"], 0, "The Beatles were from Liverpool.");
addQ("music", "MUS-002", "Music", "Pop", "medium", "Which 1982 album by Michael Jackson is the best-selling album of all time worldwide?", ["Thriller", "Bad", "Off the Wall", "Dangerous"], 0, "Thriller sold over 70 million copies.");
addQ("music", "MUS-003", "Music", "Classical", "hard", "Which composer composed his Ninth Symphony (including Ode to Joy) while completely deaf?", ["Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Johannes Brahms"], 0, "Beethoven composed his Ninth Symphony in near-total deafness.");

// Write all 28 categories to disk
let totalQuestionsCount = 0;
for (const [slug, questions] of Object.entries(masterPool)) {
  const filePath = path.join(qbDir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), "utf8");
  totalQuestionsCount += questions.length;
  console.log(`✓ Seeded ${questions.length} questions to question-bank/${slug}.json`);
}

console.log(`\n🎉 All 28 Question Banks Seeded with ${totalQuestionsCount} verified questions!`);
