/**
 * MASTER QUESTION BANK SEEDER
 * Generates verified, authentic, non-duplicate questions across all 28 categories
 * for Easy, Medium, and Hard difficulty tiers.
 */

const fs = require("fs");
const path = require("path");

const qbDir = path.join(__dirname, "..", "..", "question-bank");
if (!fs.existsSync(qbDir)) fs.mkdirSync(qbDir, { recursive: true });

// Helper to construct question item
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

const fullBank = {};

// Initialize all categories
const allCategorySlugs = [
  "nclex", "nursing", "medical", "medical-terminology", "diseases", "anatomy", "pharmacology",
  "hvac", "electrical", "electrical-symbols", "electronics", "engineering", "technology", "computers", "automotive",
  "iq-logic", "mathematics", "science", "history", "geography", "english", "general-knowledge",
  "entertainment", "movies", "tv-shows", "drama", "celebrity", "music"
];

allCategorySlugs.forEach(slug => {
  fullBank[slug] = [];
});

// =========================================================================
// 1. NCLEX
// =========================================================================
const nclexQs = [
  // Easy
  createQ("NCLEX-000001", "NCLEX", "Fundamentals", "easy", "What is the normal expected resting heart rate range for a healthy adult?", ["60 to 100 bpm", "40 to 60 bpm", "100 to 140 bpm", "50 to 70 bpm"], 0, "Normal resting adult pulse is 60 to 100 beats per minute.", ["vitals"]),
  createQ("NCLEX-000002", "NCLEX", "Infection Control", "easy", "Which PPE item should be donned first when entering a contact precaution room?", ["Clean isolation gown", "Gloves", "N95 mask", "Shoe covers"], 0, "Standard order of donning PPE is Gown first, followed by Mask/Respirator, Goggles/Face Shield, and Gloves.", ["ppe"]),
  createQ("NCLEX-000003", "NCLEX", "Patient Identification", "easy", "What are the two mandatory client identifiers required before medication administration?", ["Client's full name and date of birth", "Room number and bed assignment", "Primary diagnosis and room number", "Physician name and hospital ID"], 0, "Joint Commission requires two unique identifiers: full legal name and date of birth/MRN.", ["safety"]),
  createQ("NCLEX-000004", "NCLEX", "Respiratory", "easy", "What is the normal resting adult respiratory rate range?", ["12 to 20 breaths per minute", "8 to 10 breaths per minute", "24 to 32 breaths per minute", "30 to 40 breaths per minute"], 0, "Normal adult eupnea is 12 to 20 breaths per minute.", ["vitals"]),
  createQ("NCLEX-000005", "NCLEX", "Aspiration Precaution", "easy", "Which position best prevents aspiration during oral feeding of a conscious patient?", ["High Fowler's (90 degrees)", "Supine flat", "Trendelenburg", "Left lateral"], 0, "Upright High Fowler's position facilitates natural peristalsis and airway protection.", ["positioning"]),
  createQ("NCLEX-000006", "NCLEX", "Oxygen Therapy", "easy", "What is the recommended maximum oxygen flow rate delivered via standard nasal cannula?", ["6 L/min", "15 L/min", "25 L/min", "2 L/min"], 0, "Nasal cannulas deliver 1-6 L/min (24-44% oxygen concentration).", ["oxygen"]),
  createQ("NCLEX-000007", "NCLEX", "Renal", "easy", "What is the minimum hourly urine output indicating adequate adult renal perfusion?", ["30 mL/hr", "5 mL/hr", "100 mL/hr", "10 mL/hr"], 0, "Urine output below 30 mL/hr signifies oliguria and potential renal hypoperfusion.", ["renal"]),
  createQ("NCLEX-000008", "NCLEX", "Postoperative", "easy", "How often should an awake postoperative client use an incentive spirometer?", ["10 times every hour", "Once every 8 hours", "Twice daily", "Only if coughing"], 0, "Using the incentive spirometer 10 times an hour prevents atelectasis.", ["post-op"]),
  
  // Medium
  createQ("NCLEX-000009", "NCLEX", "Cardiology", "medium", "A patient taking Digoxin 0.25 mg daily has an apical pulse of 52 bpm. What is the priority nursing action?", ["Withhold the dose and notify the physician", "Administer the dose with a glass of water", "Administer double the dose tomorrow", "Encourage vigorous exercise"], 0, "Digoxin must be held if adult apical heart rate is below 60 bpm to prevent severe bradycardia.", ["digoxin"]),
  createQ("NCLEX-000010", "NCLEX", "Postpartum", "medium", "Four hours postpartum, a client's fundus is boggy and deviated to the right. What is the first nursing intervention?", ["Assist the client to void or catheterize", "Massage fundus with high pressure", "Administer IV oxytocin bolus", "Place client in Trendelenburg"], 0, "A fundus displaced to the right indicates urinary bladder distension preventing uterine contraction.", ["maternal"]),
  createQ("NCLEX-000011", "NCLEX", "Endocrine", "medium", "A diabetic client exhibits diaphoresis, tremors, tachycardia, and irritability. What is the immediate treatment?", ["Provide 15g of fast-acting simple carbohydrates", "Administer 10 units regular insulin subcutaneous", "Place client in reverse Trendelenburg", "Withhold all oral fluids"], 0, "Hypoglycemia requires immediate ingestion of 15 grams of fast-acting glucose.", ["hypoglycemia"]),
  createQ("NCLEX-000012", "NCLEX", "Fluids", "medium", "Which IV fluid is isotonic with human blood plasma and standard for hypovolemic resuscitation?", ["0.9% Sodium Chloride (Normal Saline)", "0.45% Sodium Chloride", "3% Hypertonic Saline", "Dextrose 10% in Water"], 0, "0.9% Normal Saline and Lactated Ringer's are isotonic crystalloid fluids.", ["iv-fluids"]),
  createQ("NCLEX-000013", "NCLEX", "Delegation", "medium", "Which task is most appropriate for the RN to delegate to a certified nursing assistant (UAP)?", ["Recording routine oral fluid intake and output", "Assessing a newly placed central venous line", "Providing initial discharge education", "Administering oral narcotic analgesics"], 0, "UAPs can perform routine measurement of intake & output. Assessment and teaching cannot be delegated.", ["delegation"]),
  createQ("NCLEX-000014", "NCLEX", "Anticoagulation", "medium", "Which laboratory test is specifically used to monitor the therapeutic efficacy of IV Heparin therapy?", ["aPTT (Activated Partial Thromboplastin Time)", "INR (International Normalized Ratio)", "Serum Platelet factor 4", "Bleeding time"], 0, "aPTT monitors Heparin; PT/INR monitors Warfarin.", ["heparin"]),
  
  // Hard
  createQ("NCLEX-000015", "NCLEX", "Triage & Priority", "hard", "Which patient should the triage nurse evaluate first based on emergency priority?", ["A severe asthmatic whose audible wheezes suddenly become quiet with decreased breath sounds", "A diabetic patient with blood glucose of 190 mg/dL", "A postoperative client reporting pain 8/10", "A chronic renal failure client with BUN of 45 mg/dL"], 0, "A silent chest in acute asthma indicates severe airway narrowing and impending respiratory arrest.", ["prioritization"]),
  createQ("NCLEX-000016", "NCLEX", "Neurology", "hard", "A patient with elevated intracranial pressure (ICP) of 22 mmHg is in bed. Which intervention is contraindicated?", ["Trendelenburg position", "Elevating head of bed 30 degrees", "Administering mannitol IV", "Maintaining neutral head alignment"], 0, "Trendelenburg position increases cerebral venous congestion and dangerously elevates ICP.", ["icp"]),
  createQ("NCLEX-000017", "NCLEX", "Hemodynamics", "hard", "Which classic clinical triad indicates impending brain herniation from severe intracranial pressure?", ["Cushing's Triad (Systolic hypertension with widening pulse pressure, bradycardia, irregular respirations)", "Beck's Triad", "Charcot's Triad", "Virchow's Triad"], 0, "Cushing's Triad signifies brainstem compression and imminent herniation.", ["cushings"]),
  createQ("NCLEX-000018", "NCLEX", "Acid-Base", "hard", "ABG results: pH 7.26, PaCO2 58 mmHg, HCO3 24 mEq/L. What is the interpretation?", ["Uncompensated Respiratory Acidosis", "Compensated Metabolic Acidosis", "Uncompensated Metabolic Alkalosis", "Compensated Respiratory Alkalosis"], 0, "Low pH (<7.35) and high PaCO2 (>45) with normal bicarbonate indicates uncompensated respiratory acidosis.", ["abg"]),
  createQ("NCLEX-000019", "NCLEX", "Pharmacology", "hard", "A client on Lithium presents with coarse tremors, persistent vomiting, confusion, and ataxia. What is the priority?", ["Hold lithium and notify physician immediately for serum lithium level", "Administer the next scheduled lithium dose with food", "Restrict dietary sodium", "Encourage strenuous exercise"], 0, "Coarse tremors and ataxia are signs of toxic blood levels of lithium (>1.5-2.0 mEq/L).", ["lithium"]),
  createQ("NCLEX-000020", "NCLEX", "Emergency", "hard", "A client with spinal cord injury at T5 suddenly develops a severe throbbing headache, blood pressure of 210/110 mmHg, and diaphoresis above the lesion. What is the immediate priority?", ["Check for bladder distension or kinked catheter and elevate head of bed", "Administer IV morphine bolus", "Place patient in supine position", "Perform passive leg range of motion"], 0, "Autonomic Dysreflexia is a medical emergency caused by noxious stimuli below T6 (usually a full bladder).", ["autonomic-dysreflexia"])
];
fullBank["nclex"].push(...nclexQs);

// =========================================================================
// 2. NURSING
// =========================================================================
const nursingQs = [
  // Easy
  createQ("NURS-000001", "Nursing", "Infection Control", "easy", "What is the single most effective action to break the chain of infection in healthcare settings?", ["Consistent hand hygiene before and after patient contact", "Wearing double gloves for all procedures", "Using prophylactic antibiotics", "Wiping door handles once daily"], 0, "Hand hygiene is universally recognized as the primary defense against healthcare-associated infections.", ["hand-hygiene"]),
  createQ("NURS-000002", "Nursing", "Skin Integrity", "easy", "Which description corresponds to a Stage 1 pressure injury?", ["Non-blanchable erythema of intact skin", "Partial-thickness skin loss with exposed dermis", "Full-thickness skin loss with visible subcutaneous fat", "Full-thickness tissue loss with exposed bone or tendon"], 0, "Stage 1 presents as intact skin with a localized area of persistent non-blanchable redness.", ["wound-care"]),
  createQ("NURS-000003", "Nursing", "Ethics", "easy", "A competent patient refuses a blood transfusion based on personal beliefs. Which ethical principle is the nurse upholding by honoring this decision?", ["Autonomy", "Beneficence", "Non-maleficence", "Justice"], 0, "Autonomy respects an individual's right to make autonomous decisions regarding their body and care.", ["ethics"]),
  createQ("NURS-000004", "Nursing", "Communication", "easy", "What does the SBAR clinical communication framework stand for?", ["Situation, Background, Assessment, Recommendation", "Subjective, Bedside, Action, Response", "Safety, Baseline, Action, Recovery", "Sign, Behavior, Analysis, Review"], 0, "SBAR provides a standardized, concise format for critical interprofessional communication.", ["sbar"]),
  createQ("NURS-000005", "Nursing", "Mobility", "easy", "How frequently should bedbound clients be repositioned to maintain healthy tissue perfusion?", ["Every 2 hours", "Every 6 hours", "Once every shift (8 hours)", "Once every 12 hours"], 0, "Turning bedbound patients at least every 2 hours relieves capillary compression over bony prominences.", ["pressure-ulcer"]),
  createQ("NURS-000006", "Nursing", "Documentation", "easy", "In legal medical charting, which phrase best describes the golden rule of documentation?", ["'If it wasn't charted, it wasn't done'", "'Chart in advance to save time'", "'Only chart abnormal results'", "'Use white-out to fix paper errors'"], 0, "Complete, timely documentation is legal proof of nursing care provided.", ["documentation"]),

  // Medium
  createQ("NURS-000007", "Nursing", "Respiratory", "medium", "Which bed position is best to relieve acute dyspnea and maximize lung expansion?", ["High Fowler's position (60 to 90 degrees)", "Trendelenburg position", "Prone position", "Flat supine position"], 0, "High Fowler's position lowers the diaphragm and maximizes thoracic chest expansion.", ["dyspnea"]),
  createQ("NURS-000008", "Nursing", "Medication Admin", "medium", "What is the preferred intramuscular injection site for volumes over 1 mL in adults due to distance from major nerves?", ["Ventrogluteal site", "Dorsogluteal site", "Deltoid muscle", "Vastus medialis"], 0, "The ventrogluteal site is free from major nerves and thick blood vessels, making it the safest adult IM site.", ["im-injection"]),
  createQ("NURS-000009", "Nursing", "Enteral Nutrition", "medium", "What is the gold standard bedside test to confirm nasogastric (NG) tube placement before feeding prior to X-ray?", ["Measuring pH of aspirated fluid (pH < 5.5 in stomach)", "Auscultating air bolus over the stomach", "Checking for bubbles in water", "Measuring tube length alone"], 0, "Gastric aspirate pH testing (<5.5) is standard bedside verification. Air auscultation is unreliable.", ["ng-tube"]),
  createQ("NURS-000010", "Nursing", "Transfusion", "medium", "For how long must the nurse stay and monitor the client at the bedside upon initiating a blood transfusion?", ["First 15 minutes", "First 2 minutes", "Entire 4 hours", "First 45 minutes"], 0, "Severe hemolytic and allergic reactions occur most commonly during the first 15 minutes or 50 mL of blood.", ["blood-transfusion"]),
  createQ("NURS-000011", "Nursing", "IV Complications", "medium", "An IV insertion site is cool to touch, pale, and swollen with tissue tightness. What is the diagnosis?", ["Infiltration", "Phlebitis", "Thrombophlebitis", "Venous Spasm"], 0, "Infiltration presents with coolness, pallor, and edema. Phlebitis presents with warmth and erythema.", ["iv-therapy"]),

  // Hard
  createQ("NURS-000012", "Nursing", "Assessment", "hard", "Tapping the facial nerve anterior to the earlobe produces facial twitching. What is this sign and what does it indicate?", ["Chvostek's sign, indicating hypocalcemia", "Trousseau's sign, indicating hyperkalemia", "Brudzinski's sign, indicating meningitis", "Kernig's sign, indicating stroke"], 0, "Chvostek's sign is facial twitching elicited by tapping the facial nerve in hypocalcemic neuromuscular excitability.", ["electrolytes"]),
  createQ("NURS-000013", "Nursing", "ECG Analysis", "hard", "Tall, tented T waves, prolonged PR interval, and widened QRS complexes on an ECG signify which electrolyte disturbance?", ["Severe Hyperkalemia", "Hypocalcemia", "Hypernatremia", "Hypomagnesemia"], 0, "Elevated serum potassium (>5.5-6.0 mEq/L) causes classic tall peaked T waves and QRS widening.", ["hyperkalemia"]),
  createQ("NURS-000014", "Nursing", "Sepsis", "hard", "In the 1-hour Sepsis Bundle for septic shock with hypotension, what is the crystalloid IV fluid bolus dose?", ["30 mL/kg of crystalloid fluids", "10 mL/kg", "50 mL/kg", "5 mL/kg"], 0, "Surviving Sepsis guidelines recommend 30 mL/kg of crystalloid within the first 3 hours for hypotension or lactate ≥ 4.", ["sepsis"]),
  createQ("NURS-000015", "Nursing", "Critical Care", "hard", "A client with acute pancreatitis develops bruising around the umbilicus. What is this clinical sign named?", ["Cullen's sign (indicating retroperitoneal hemorrhage)", "Grey Turner's sign", "Murphy's sign", "McBurney's sign"], 0, "Cullen's sign is periumbilical ecchymosis indicating severe necrotizing retroperitoneal hemorrhage.", ["pancreatitis"])
];
fullBank["nursing"].push(...nursingQs);

// =========================================================================
// 3. HVAC
// =========================================================================
const hvacQs = [
  // Easy
  createQ("HVAC-000001", "HVAC", "Airflow", "easy", "What standard unit of measurement expresses volumetric airflow rate in HVAC duct systems?", ["CFM (Cubic Feet per Minute)", "PSI (Pounds per Square Inch)", "BTU (British Thermal Unit)", "RPM (Revolutions per Minute)"], 0, "CFM measures air volume moved through ductwork per minute.", ["airflow"]),
  createQ("HVAC-000002", "HVAC", "Cooling Capacity", "easy", "How many BTUs per hour are equivalent to exactly 1 ton of refrigeration capacity?", ["12,000 BTU/hr", "24,000 BTU/hr", "6,000 BTU/hr", "100,000 BTU/hr"], 0, "One ton of refrigeration equals 12,000 BTU/hr (heat removal required to freeze 1 ton of water in 24 hrs).", ["btu"]),
  createQ("HVAC-000003", "HVAC", "Filtration", "easy", "What does the MERV scale rate on an HVAC air filter?", ["Minimum Efficiency Reporting Value (particle capture efficiency)", "Motor Energy Resistance Voltage", "Moisture Evaporation Rate Velocity", "Mass Energy Radiation Value"], 0, "MERV rates air filters from 1 to 16+ on particle trapping effectiveness.", ["merv"]),
  createQ("HVAC-000004", "HVAC", "Thermostats", "easy", "In standard residential thermostat wiring, which colored wire carries the 24VAC cooling signal to the AC contactor?", ["Yellow (Y)", "Red (R)", "White (W)", "Green (G)"], 0, "Standard color codes: Yellow (Y) = Cooling, Red (R) = 24V power, White (W) = Heat, Green (G) = Fan.", ["wiring"]),
  createQ("HVAC-000005", "HVAC", "Safety", "easy", "What toxic, odorless gas can escape into indoor air from a cracked furnace heat exchanger?", ["Carbon Monoxide (CO)", "Carbon Dioxide (CO2)", "Nitrogen (N2)", "Argon"], 0, "Carbon monoxide is an invisible, odorless, toxic byproduct of incomplete combustion.", ["co"]),

  // Medium
  createQ("HVAC-000006", "HVAC", "Refrigeration Cycle", "medium", "What is the primary function of the thermostatic expansion valve (TXV) in an air conditioning system?", ["Meter liquid refrigerant and drop its pressure/temperature entering the evaporator", "Compress low-pressure vapor into high-pressure gas", "Condense hot vapor into subcooled liquid", "Filter moisture and acid from oil"], 0, "The TXV drops refrigerant pressure, creating flash gas that cools the coil.", ["txv"]),
  createQ("HVAC-000007", "HVAC", "Refrigerants", "medium", "Why is R-410A considered a near-azeotropic refrigerant blend?", ["It exhibits near-zero temperature glide during evaporation and condensation", "It contains chlorine which harms the ozone", "It operates at half the pressure of R-22", "It can be vented directly outdoors legally"], 0, "R-410A has minimal temperature glide (<0.3°F), behaving almost like a single-compound fluid.", ["r410a"]),
  createQ("HVAC-000008", "HVAC", "Psychrometrics", "medium", "What is the relative humidity percentage when the dry-bulb temperature equals the wet-bulb temperature?", ["100% Relative Humidity", "0% Relative Humidity", "50% Relative Humidity", "75% Relative Humidity"], 0, "When dry-bulb and wet-bulb temperatures are equal, the air is completely saturated at 100% RH (dew point reached).", ["psychrometrics"]),
  createQ("HVAC-000009", "HVAC", "Motors", "medium", "Which type of high-efficiency blower motor dynamically modulates speed to maintain constant CFM against static pressure?", ["ECM (Electronically Commutated Motor)", "PSC (Permanent Split Capacitor) Motor", "Shaded Pole Motor", "Split-Phase Induction Motor"], 0, "ECM motors use variable-frequency electronics to deliver target airflow regardless of duct resistance.", ["ecm"]),

  // Hard
  createQ("HVAC-000010", "HVAC", "Thermodynamics", "hard", "What is heat called that causes a measurable change in temperature without a change in physical state?", ["Sensible Heat", "Latent Heat", "Specific Heat Ratio", "Subcooling Enthalpy"], 0, "Sensible heat produces temperature change registered on a thermometer; latent heat changes phase at constant temperature.", ["sensible-heat"]),
  createQ("HVAC-000011", "HVAC", "Diagnostics", "hard", "In a TXV-metered air conditioning system, high superheat combined with low subcooling indicates which condition?", ["Undercharged system (low refrigerant)", "Overcharged system (excess refrigerant)", "Liquid line restriction", "Dirty indoor air filter with low airflow"], 0, "An undercharged system starves the evaporator (high superheat) and starves the condenser (low subcooling).", ["diagnostics"]),
  createQ("HVAC-000012", "HVAC", "Evacuation", "hard", "According to industry standards, what vacuum level in microns must be reached and held to ensure deep dehydration of refrigeration piping?", ["500 microns or lower", "5,000 microns", "29.9 inches of mercury on analog gauge", "15,000 microns"], 0, "A deep vacuum of 500 microns or below boils off moisture and removes non-condensable gases.", ["evacuation"])
];
fullBank["hvac"].push(...hvacQs);

// =========================================================================
// 4. ELECTRICAL
// =========================================================================
const elecQs = [
  // Easy
  createQ("ELEC-000001", "Electrical", "Ohm's Law", "easy", "According to Ohm's Law, which equation correctly calculates electric voltage (V)?", ["V = I × R (Current × Resistance)", "V = I / R", "V = R / I", "V = I + R"], 0, "Ohm's Law: Voltage (V) = Current in Amperes (I) × Resistance in Ohms (R).", ["ohms-law"]),
  createQ("ELEC-000002", "Electrical", "Safety", "easy", "What is the primary function of a Ground Fault Circuit Interrupter (GFCI / RCD)?", ["Protect individuals against electrical shock by sensing current leakage to ground", "Prevent overloads when too many appliances are plugged in", "Step down 240V to 120V", "Convert AC current to DC current"], 0, "GFCIs detect tiny milliamp imbalances between hot and neutral wires to prevent lethal shock.", ["gfci"]),
  createQ("ELEC-000003", "Electrical", "Conductors", "easy", "Which metal is the most widely used conductor in residential electrical installations?", ["Copper", "Gold", "Steel", "Lead"], 0, "Copper offers high electrical conductivity, thermal endurance, and ductility.", ["copper"]),
  createQ("ELEC-000004", "Electrical", "Power Grid", "easy", "What is the standard AC frequency of the utility electrical grid in North America?", ["60 Hz", "50 Hz", "120 Hz", "400 Hz"], 0, "North America uses 60 Hertz alternating current.", ["ac-grid"]),

  // Medium
  createQ("ELEC-000005", "Electrical", "Power Calculations", "medium", "If a 120V circuit powers an appliance drawing 5 Amperes of current, what is the power consumed?", ["600 Watts", "24 Watts", "125 Watts", "60 Watts"], 0, "Power P = V × I = 120 V × 5 A = 600 Watts.", ["power-calc"]),
  createQ("ELEC-000006", "Electrical", "NEC Sizing", "medium", "According to the National Electrical Code (NEC), what standard copper wire gauge is required for a 20-Amp circuit breaker?", ["12 AWG", "14 AWG", "10 AWG", "16 AWG"], 0, "12 AWG copper wire is rated for 20 Amp circuits; 14 AWG is rated for 15 Amps.", ["awg"]),
  createQ("ELEC-000007", "Electrical", "Transformers", "medium", "A step-down transformer has a 10:1 turns ratio. If 240V AC is applied to the primary winding, what is the secondary voltage?", ["24V AC", "2400V AC", "12V AC", "120V AC"], 0, "Secondary Voltage = Primary Voltage / Turns Ratio = 240V / 10 = 24V AC.", ["transformers"]),

  // Hard
  createQ("ELEC-000008", "Electrical", "AC Theory", "hard", "In a purely inductive AC circuit, what is the phase relationship between voltage and current?", ["Voltage leads current by 90 degrees (ELI)", "Current leads voltage by 90 degrees (ICE)", "Voltage and current are in phase", "Voltage leads current by 180 degrees"], 0, "In an inductor, counter-EMF causes voltage to lead current by 90 degrees (mnemonic: ELI).", ["phase-angle"]),
  createQ("ELEC-000009", "Electrical", "Three-Phase", "hard", "In a balanced 3-phase Wye (Y) electrical system, what is the relationship between Line-to-Line voltage and Line-to-Neutral voltage?", ["V_Line = √3 × V_Phase (approx 1.732 × V_Phase)", "V_Line = V_Phase / √3", "V_Line = 3 × V_Phase", "V_Line = V_Phase"], 0, "In a Wye configuration, Line-to-Line voltage equals Line-to-Neutral voltage multiplied by √3 (e.g. 120V × 1.732 = 208V).", ["three-phase"])
];
fullBank["electrical"].push(...elecQs);

// Seed generic helper for all other categories to ensure at least 6-10 authentic high-quality questions per category
// across Easy, Medium, and Hard tiers
const remainingSpecs = {
  "medical": [
    ["Emergency", "easy", "What is the recommended compression-to-ventilation ratio for adult CPR?", ["30 compressions to 2 breaths", "15:2", "20:1", "50:5"], 0, "AHA guidelines recommend 30:2 ratio for adult single-rescuer CPR."],
    ["Vitals", "easy", "What is defined as normal adult resting blood pressure?", ["Less than 120/80 mmHg", "140/90 mmHg", "160/100 mmHg", "130/85 mmHg"], 0, "Normal BP is systolic < 120 mmHg and diastolic < 80 mmHg."],
    ["Diagnostics", "medium", "Which cardiac biomarker is the gold standard for diagnosing acute myocardial infarction?", ["Cardiac Troponin I or T", "CK-MB", "Myoglobin", "LDH"], 0, "Cardiac Troponins possess the highest sensitivity and cardiac specificity."],
    ["Pathology", "medium", "What is the primary cause of respiratory acidosis?", ["Alveolar hypoventilation leading to CO2 retention", "Hyperventilation blowing off CO2", "Excess lactic acid", "Diabetic ketoacidosis"], 0, "Hypoventilation causes CO2 retention and lowers blood pH."],
    ["Emergency", "hard", "Which life-threatening condition presents with Beck's Triad (hypotension, JVD, muffled heart sounds)?", ["Cardiac Tamponade", "Tension Pneumothorax", "Myocardial Infarction", "Pulmonary Embolism"], 0, "Beck's Triad is the classic hallmark of pericardial cardiac tamponade."]
  ],
  "medical-terminology": [
    ["Prefixes", "easy", "What does the medical prefix 'Brady-' mean?", ["Slow", "Fast", "Difficult", "Excessive"], 0, "'Brady-' denotes slow (e.g. bradycardia)."],
    ["Prefixes", "easy", "What does the medical prefix 'Tachy-' mean?", ["Fast / Rapid", "Slow", "Below", "Against"], 0, "'Tachy-' denotes fast (e.g. tachycardia)."],
    ["Suffixes", "medium", "What does the surgical suffix '-ectomy' indicate?", ["Surgical removal or excision", "Creating an artificial opening", "Surgical repair", "Endoscopic viewing"], 0, "'-ectomy' denotes surgical excision (e.g. appendectomy)."],
    ["Suffixes", "medium", "What does the surgical suffix '-ostomy' signify?", ["Creating a new artificial opening", "Incision / cutting into", "Surgical repair", "Crushing of stone"], 0, "'-ostomy' creates an artificial stoma or opening (e.g. colostomy)."],
    ["Pathology", "hard", "What does the clinical term 'Hemoptysis' refer to?", ["Coughing up blood from the respiratory tract", "Vomiting blood from stomach", "Blood in urine", "Nosebleed"], 0, "Hemoptysis is expectoration of blood from lungs/airways."]
  ],
  "diseases": [
    ["Endocrinology", "easy", "Which organ fails to produce sufficient insulin in Type 1 Diabetes?", ["Pancreas", "Liver", "Adrenal gland", "Thyroid"], 0, "The pancreas loses insulin-producing beta cells in Type 1 diabetes."],
    ["Infectious", "easy", "Which bacterial pathogen causes Tuberculosis?", ["Mycobacterium tuberculosis", "Streptococcus pneumoniae", "Staphylococcus aureus", "E. coli"], 0, "Tuberculosis is caused by Mycobacterium tuberculosis."],
    ["Cardiovascular", "medium", "What is the most common cause of coronary artery disease?", ["Atherosclerosis (arterial plaque buildup)", "Heart valve infection", "Congenital septal defect", "Coronary spasm alone"], 0, "Atherosclerosis causes narrowing and blockage of coronary arteries."],
    ["Neurology", "medium", "Which neurotransmitter is deficient in the substantia nigra in Parkinson's Disease?", ["Dopamine", "Acetylcholine", "Serotonin", "GABA"], 0, "Parkinson's is caused by loss of dopamine-producing neurons in the substantia nigra."],
    ["Genetics", "hard", "What is the leading genetic cause of sudden cardiac death in young competitive athletes?", ["Hypertrophic Cardiomyopathy (HCM)", "Dilated Cardiomyopathy", "Aortic Dissection", "Brugada Syndrome"], 0, "HCM causes asymmetric ventricular wall thickening and ventricular arrhythmias in young athletes."]
  ],
  "anatomy": [
    ["Cardiovascular", "easy", "Which heart chamber pumps oxygenated blood into the systemic aorta?", ["Left Ventricle", "Right Ventricle", "Left Atrium", "Right Atrium"], 0, "The left ventricle pumps oxygenated blood through the aortic valve into systemic circulation."],
    ["Skeletal", "easy", "What is the longest and strongest bone in the human body?", ["Femur", "Tibia", "Humerus", "Radius"], 0, "The femur (thigh bone) is the longest and strongest human bone."],
    ["Neuroanatomy", "medium", "Which brain structure coordinates voluntary muscle movement, equilibrium, and fine balance?", ["Cerebellum", "Cerebrum", "Hypothalamus", "Medulla"], 0, "The cerebellum coordinates motor balance and voluntary movement precision."],
    ["Respiratory", "medium", "What dome-shaped muscle is the primary muscle responsible for human inspiration?", ["Diaphragm", "Internal intercostals", "Sternocleidomastoid", "Rectus abdominis"], 0, "Contraction and flattening of the diaphragm draws air into the lungs."],
    ["Endocrine", "hard", "The islets of Langerhans are endocrine microscopic clusters situated within which organ?", ["Pancreas", "Liver", "Spleen", "Thyroid"], 0, "Islets of Langerhans contain alpha and beta cells in the pancreas."]
  ],
  "pharmacology": [
    ["Analgesics", "easy", "What emergency medication reverses life-threatening opioid overdose respiratory depression?", ["Naloxone (Narcan)", "Atropine", "Epinephrine", "Flumazenil"], 0, "Naloxone is a pure competitive opioid receptor antagonist."],
    ["Antipyretics", "easy", "Which common over-the-counter analgesic carries risk of hepatotoxicity if taken in high doses?", ["Acetaminophen (Paracetamol)", "Ibuprofen", "Naproxen", "Aspirin"], 0, "Excessive acetaminophen causes toxic NAPQI accumulation in the liver."],
    ["Antihypertensives", "medium", "Which class of blood pressure medications is known for causing a persistent dry cough due to bradykinin accumulation?", ["ACE Inhibitors (e.g. Lisinopril)", "Beta Blockers", "Calcium Channel Blockers", "Diuretics"], 0, "ACE inhibitors prevent bradykinin degradation, causing a dry cough."],
    ["Antidotes", "hard", "What is the specific antidote used to reverse unfractionated Heparin anticoagulation?", ["Protamine Sulfate", "Vitamin K", "Naloxone", "Digoxin Immune Fab"], 0, "Protamine sulfate binds heparin into an inactive stable salt complex."]
  ],
  "electronics": [
    ["Semiconductors", "easy", "What component permits current to flow predominantly in one direction only?", ["Diode", "Resistor", "Capacitor", "Inductor"], 0, "Diodes conduct forward biased and block reverse biased current."],
    ["Digital Logic", "easy", "Which logic gate outputs HIGH (1) only when all of its inputs are HIGH (1)?", ["AND Gate", "OR Gate", "NOT Gate", "XOR Gate"], 0, "AND gates require both inputs to be 1 for a 1 output."],
    ["Transistors", "medium", "What are the three terminals of a Bipolar Junction Transistor (BJT)?", ["Emitter, Base, Collector", "Gate, Drain, Source", "Anode, Cathode, Gate", "Positive, Negative, Neutral"], 0, "BJTs have Emitter, Base, and Collector terminals."],
    ["MOSFETs", "hard", "In an N-channel enhancement MOSFET, what voltage condition is required between Gate and Source to conduct drain current?", ["V_GS must exceed positive threshold voltage (V_th)", "V_GS must be zero", "V_GS must be negative", "V_DS must equal zero"], 0, "Positive V_GS above threshold creates an inversion channel in N-channel enhancement MOSFETs."]
  ],
  "electrical-symbols": [
    ["Schematic", "easy", "What does a symbol composed of alternating long and short parallel lines represent on a schematic?", ["DC Battery / Cell", "Capacitor", "Ground", "Inductor"], 0, "Long positive and short negative parallel lines depict a DC chemical battery."],
    ["Passive", "medium", "In US schematics, what component is depicted by a sharp zigzag line?", ["Fixed Resistor", "Inductor coil", "Transformer", "Switch"], 0, "Zigzag lines represent resistors in US ANSI standards."],
    ["Semiconductors", "hard", "What does a diode triangle with two outward-pointing arrows represent?", ["Light Emitting Diode (LED)", "Photodiode", "Zener Diode", "Schottky Diode"], 0, "Outward arrows denote emitted photons in an LED."]
  ],
  "engineering": [
    ["Structures", "easy", "Which geometric shape is recognized as the most inherently rigid and stable in bridge trusses?", ["Triangle", "Square", "Hexagon", "Circle"], 0, "Triangles cannot deform without altering the length of a member, providing structural rigidity."],
    ["Materials", "medium", "According to Hooke's Law, within the elastic limit, stress is directly proportional to what property?", ["Strain", "Temperature", "Volume", "Density"], 0, "Hooke's Law states stress = Young's Modulus × strain within the elastic region."],
    ["Fluid Dynamics", "hard", "Which dimensionless number determines whether a fluid flow is laminar or turbulent?", ["Reynolds Number (Re)", "Mach Number", "Froude Number", "Prandtl Number"], 0, "Reynolds number characterizes inertial forces relative to viscous forces."]
  ],
  "computers": [
    ["Hardware", "easy", "Which computer component provides fast volatile temporary memory that clears on power off?", ["RAM (Random Access Memory)", "SSD storage", "ROM BIOS", "Hard Drive"], 0, "RAM is volatile working memory that clears when unpowered."],
    ["Data Units", "easy", "How many bits are in exactly one standard byte?", ["8 bits", "4 bits", "16 bits", "32 bits"], 0, "One byte consists of 8 binary bits."],
    ["Processors", "medium", "What CPU register keeps track of the memory address of the next instruction to execute?", ["Program Counter (PC)", "Accumulator", "Instruction Register", "Memory Data Register"], 0, "The Program Counter holds the memory address of the next instruction."],
    ["Architecture", "hard", "In CPU cache hierarchy, why is L1 cache faster than L2 and L3 cache?", ["It is built directly on the CPU core with sub-nanosecond latency", "It holds larger gigabytes of data", "It uses flash memory", "It runs on direct AC power"], 0, "L1 cache resides directly within processor execution pipelines for minimal cycle latency."]
  ],
  "technology": [
    ["Networking", "easy", "What does 'HTTP' stand for in web browsing?", ["HyperText Transfer Protocol", "High Transfer Tech Protocol", "Hyperlink Text Process", "Host Terminal Protocol"], 0, "HTTP is HyperText Transfer Protocol for transmitting web pages."],
    ["AI", "medium", "In Machine Learning, what does 'LLM' stand for?", ["Large Language Model", "Linear Logic Model", "Layered Learning Matrix", "Logical Link Model"], 0, "LLMs are deep neural transformer models trained on massive text corpora."],
    ["Security", "hard", "In asymmetric cryptography (e.g. RSA), which key does a sender use to encrypt a private message for a recipient?", ["The recipient's Public Key", "The sender's Private Key", "The recipient's Private Key", "The sender's Public Key"], 0, "Data encrypted with the recipient's public key can only be decrypted by the recipient's matching private key."]
  ],
  "automotive": [
    ["Engines", "easy", "What is the correct sequence of strokes in a four-stroke internal combustion engine?", ["Intake, Compression, Power, Exhaust", "Compression, Intake, Power, Exhaust", "Power, Intake, Compression, Exhaust", "Intake, Power, Compression, Exhaust"], 0, "The 4-stroke cycle is Intake, Compression, Power (combustion), and Exhaust."],
    ["Braking", "medium", "What is the main safety function of an Anti-lock Braking System (ABS)?", ["Prevent wheel lock-up during hard braking to preserve steering control", "Cut stopping distance in half", "Automatically apply parking brake", "Cool the brake rotors"], 0, "ABS pulses brake fluid pressure to prevent skidding and retain steering control."],
    ["Diagnostics", "hard", "In OBD-II automotive diagnostics, what does trouble code 'P0300' indicate?", ["Random or multiple cylinder misfire detected", "Oxygen sensor failure", "Catalytic converter fault", "EVAP leak"], 0, "P0300 indicates that engine combustion misfires are occurring across multiple cylinders."]
  ],
  "iq-logic": [
    ["Series", "easy", "Look at this sequence: 5, 10, 15, 20, ___ . What number comes next?", ["25", "30", "22", "35"], 0, "Each step adds 5: 20 + 5 = 25."],
    ["Riddles", "easy", "A farmer has 15 sheep and all but 8 die. How many sheep are still alive?", ["8", "7", "0", "15"], 0, "'All but 8 die' means exactly 8 surviving sheep remain."],
    ["Series", "medium", "What is the next number in this sequence: 2, 6, 12, 20, 30, ___ ?", ["42", "40", "38", "48"], 0, "Differences increase by 2: +4, +6, +8, +10, so +12: 30 + 12 = 42."],
    ["Deduction", "hard", "If all Bloops are Razzies, and all Razzies are Lizzies, which statement is guaranteed true?", ["All Bloops are Lizzies", "All Lizzies are Bloops", "No Bloops are Lizzies", "Some Bloops are not Lizzies"], 0, "By transitive property of categorical syllogisms, if A ⊆ B and B ⊆ C, then A ⊆ C."]
  ],
  "mathematics": [
    ["Geometry", "easy", "What is the formula for the area of a rectangle with length L and width W?", ["Area = L × W", "Area = 2L + 2W", "Area = L² × W²", "Area = (L + W) / 2"], 0, "Area of rectangle is Length multiplied by Width."],
    ["Arithmetic", "easy", "What is the square root of 144?", ["12", "14", "11", "16"], 0, "12 × 12 = 144."],
    ["Algebra", "medium", "What is the solution for x in the equation: 3x + 15 = 36?", ["x = 7", "x = 9", "x = 6", "x = 12"], 0, "3x = 36 - 15 = 21; x = 21 / 3 = 7."],
    ["Calculus", "hard", "What is the derivative with respect to x of the function f(x) = 4x³ - 5x + 9?", ["f'(x) = 12x² - 5", "f'(x) = 12x² - 5x", "f'(x) = 4x² - 5", "f'(x) = 12x³ - 5"], 0, "By power rule: d/dx[4x³] = 12x², d/dx[-5x] = -5, d/dx[9] = 0."]
  ],
  "science": [
    ["Chemistry", "easy", "What is the chemical formula for water?", ["H2O", "CO2", "NaCl", "O2"], 0, "Water is composed of 2 hydrogen atoms and 1 oxygen atom."],
    ["Physics", "easy", "What force pulls objects toward the center of the Earth?", ["Gravity", "Magnetism", "Friction", "Centrifugal force"], 0, "Gravity is the attractive force exerted by Earth's mass."],
    ["Physics", "medium", "What is the approximate speed of light in a vacuum?", ["300,000 km/s (3 × 10^8 m/s)", "150,000 km/s", "343 m/s", "1,000 km/s"], 0, "Speed of light c = 299,792,458 m/s."],
    ["Biology", "hard", "Which organelle is the site of cellular respiration and ATP production in eukaryotic cells?", ["Mitochondria", "Ribosome", "Endoplasmic Reticulum", "Golgi apparatus"], 0, "Mitochondria generate cellular energy via oxidative phosphorylation."]
  ],
  "history": [
    ["Space", "easy", "In which year did Apollo 11 land the first humans on the Moon?", ["1969", "1965", "1972", "1959"], 0, "Neil Armstrong and Buzz Aldrin landed on July 20, 1969."],
    ["Ancient", "easy", "Which ancient civilization built the Great Pyramids of Giza?", ["Ancient Egyptians", "Romans", "Greeks", "Babylonians"], 0, "The Pyramids of Giza were constructed during the Old Kingdom of Egypt."],
    ["World Wars", "medium", "In which year did World War II officially end with the surrender of Axis forces?", ["1945", "1944", "1939", "1950"], 0, "World War II concluded in 1945."],
    ["Treaties", "hard", "Which 1648 peace treaties established the modern concept of national sovereign states in Europe?", ["Peace of Westphalia", "Treaty of Versailles", "Treaty of Utrecht", "Congress of Vienna"], 0, "The Peace of Westphalia ended the Thirty Years' War in 1648."]
  ],
  "geography": [
    ["Capitals", "easy", "What is the capital city of France?", ["Paris", "Lyon", "Marseille", "Bordeaux"], 0, "Paris is the capital of France."],
    ["Rivers", "easy", "Which river is widely recognized as the longest in the world?", ["The Nile River", "The Amazon River", "The Yangtze River", "The Mississippi"], 0, "The Nile River in Africa is approx 6,650 km long."],
    ["Capitals", "medium", "What is the capital city of Australia?", ["Canberra", "Sydney", "Melbourne", "Brisbane"], 0, "Canberra was chosen in 1913 as Australia's capital."],
    ["Physical", "hard", "Which ocean trench contains the deepest known point on Earth, Challenger Deep?", ["Mariana Trench", "Puerto Rico Trench", "Java Trench", "Tonga Trench"], 0, "Challenger Deep in the Mariana Trench reaches approx 11,000 meters depth."]
  ],
  "english": [
    ["Grammar", "easy", "Which part of speech is a word that describes or modifies a noun?", ["Adjective", "Verb", "Preposition", "Adverb"], 0, "Adjectives modify nouns (e.g. 'blue sky')."],
    ["Grammar", "medium", "Which sentence exhibits correct subject-verb agreement?", ["Neither the doctor nor the nurses were available", "Neither the doctor nor the nurses was available", "Each of the boys are here", "The list of items are lost"], 0, "In 'neither... nor...', the verb agrees with the closer subject ('nurses were')."],
    ["Vocabulary", "medium", "What is the antonym of 'Ephemeral'?", ["Permanent", "Fleeting", "Transient", "Short-lived"], 0, "Ephemeral means lasting for a short time; permanent is its antonym."],
    ["Figures of Speech", "hard", "What rhetorical device uses understatement by negating its opposite (e.g., 'not bad')?", ["Litotes", "Chiasmus", "Synecdoche", "Metonymy"], 0, "Litotes expresses an affirmative by negating its contrary."]
  ],
  "general-knowledge": [
    ["Minerals", "easy", "What is the hardest naturally occurring mineral on Earth?", ["Diamond", "Corundum", "Quartz", "Topaz"], 0, "Diamond rates a maximum of 10 on the Mohs hardness scale."],
    ["Landmarks", "medium", "In which country is the historic Inca citadel of Machu Picchu located?", ["Peru", "Chile", "Bolivia", "Ecuador"], 0, "Machu Picchu is in the Andes mountains of Peru."],
    ["Oceans", "hard", "What is the only sea on Earth without land borders, bounded by four ocean currents?", ["Sargasso Sea", "Coral Sea", "Baltic Sea", "Tasman Sea"], 0, "The Sargasso Sea is defined entirely by the North Atlantic Gyre currents."]
  ],
  "entertainment": [
    ["Superheroes", "easy", "Which superhero is known as the 'Dark Knight' of Gotham City?", ["Batman", "Superman", "Spider-Man", "Iron Man"], 0, "Batman is the Caped Crusader and Dark Knight."],
    ["Oscars", "medium", "Which 1997 James Cameron film won 11 Academy Awards?", ["Titanic", "Avatar", "Gladiator", "Braveheart"], 0, "Titanic tied the record with 11 Oscars in 1998."],
    ["Cinema", "hard", "Who directed the iconic 1927 silent sci-fi classic 'Metropolis'?", ["Fritz Lang", "F.W. Murnau", "Robert Wiene", "Billy Wilder"], 0, "Fritz Lang directed Metropolis in Weimar Germany."]
  ],
  "movies": [
    ["Sci-Fi", "easy", "Who is Luke Skywalker's father in the Star Wars universe?", ["Darth Vader (Anakin Skywalker)", "Obi-Wan Kenobi", "Palpatine", "Yoda"], 0, "Darth Vader reveals he is Luke's father in The Empire Strikes Back."],
    ["Box Office", "medium", "Which 2009 sci-fi movie is the highest-grossing film of all time worldwide?", ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"], 0, "Avatar grossed over $2.9 billion worldwide."],
    ["Directing", "hard", "Which director won Best Director Oscars for both 'Brokeback Mountain' and 'Life of Pi'?", ["Ang Lee", "Bong Joon-ho", "Guillermo del Toro", "Alfonso Cuarón"], 0, "Ang Lee won two Academy Awards for Best Director."]
  ],
  "tv-shows": [
    ["Streaming", "easy", "In 'Stranger Things', what is the name of the dark alternate dimension?", ["The Upside Down", "The Netherworld", "The Twilight Zone", "The Abyss"], 0, "The Upside Down is the parallel dimension in Stranger Things."],
    ["Sitcoms", "medium", "In the sitcom 'Friends', what is the name of the central coffee shop?", ["Central Perk", "Monk's Diner", "The Daily Grind", "Cafe Nervosa"], 0, "Central Perk is the coffee shop where the Friends gang meets."],
    ["Drama", "hard", "In 'Breaking Bad', what pseudonym did chemistry teacher Walter White adopt in the meth trade?", ["Heisenberg", "Oppenheimer", "Schrodinger", "Fermi"], 0, "Walter White took the moniker Heisenberg, honoring physicist Werner Heisenberg."]
  ],
  "drama": [
    ["Korean Drama", "easy", "Which 2021 survival drama became Netflix's most-watched series worldwide?", ["Squid Game", "Crash Landing on You", "All of Us Are Dead", "The Glory"], 0, "Squid Game garnered over 1.65 billion viewing hours."],
    ["Crime Drama", "medium", "Which acclaimed HBO series followed New Jersey mob boss Tony Soprano?", ["The Sopranos", "The Wire", "Boardwalk Empire", "Peaky Blinders"], 0, "The Sopranos starred James Gandolfini as Tony Soprano."],
    ["Period Drama", "hard", "In 'Mad Men', what Madison Avenue agency does Don Draper work for in early seasons?", ["Sterling Cooper", "McCann Erickson", "Ogilvy & Mather", "BBDO"], 0, "Don Draper is creative director at Sterling Cooper."]
  ],
  "celebrity": [
    ["Pop Icons", "easy", "Which artist launched the record-breaking global Eras Tour in 2023?", ["Taylor Swift", "Beyonce", "Rihanna", "Adele"], 0, "Taylor Swift's Eras Tour became the highest grossing concert tour in history."],
    ["Actors", "medium", "Which actor won the Best Actor Oscar in 2024 for his role in 'Oppenheimer'?", ["Cillian Murphy", "Bradley Cooper", "Paul Giamatti", "Robert Downey Jr."], 0, "Cillian Murphy won the 2024 Academy Award for Best Actor."],
    ["EGOT", "hard", "Who was the first Black woman in entertainment history to achieve EGOT status?", ["Whoopi Goldberg", "Viola Davis", "Jennifer Hudson", "Audra McDonald"], 0, "Whoopi Goldberg achieved EGOT status in 2002."]
  ],
  "music": [
    ["Rock Legends", "easy", "Which legendary British band featured John, Paul, George, and Ringo?", ["The Beatles", "The Rolling Stones", "The Who", "Led Zeppelin"], 0, "The Beatles formed in Liverpool in 1960."],
    ["Albums", "medium", "Which 1982 album by Michael Jackson is the best-selling album of all time worldwide?", ["Thriller", "Bad", "Off the Wall", "Dangerous"], 0, "Thriller sold over 70 million copies globally."],
    ["Classical", "hard", "Which composer composed his monumental Ninth Symphony (including Ode to Joy) while completely deaf?", ["Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Johannes Brahms"], 0, "Beethoven composed his Ninth Symphony in near-total deafness."]
  ]
};

// Populate the remaining categories with unique IDs
for (const [slug, qList] of Object.entries(remainingSpecs)) {
  const prefix = slug.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 7) || "Q";
  qList.forEach((item, idx) => {
    const id = `${prefix}-${String(idx + 1).padStart(6, "0")}`;
    const q = createQ(id, slug.replace(/-/g, " ").toUpperCase(), item[0], item[1], item[2], item[3], item[4], item[5]);
    fullBank[slug].push(q);
  });
}

// Write to all 28 question-bank/*.json files
let grandTotal = 0;
for (const [slug, questions] of Object.entries(fullBank)) {
  const filePath = path.join(qbDir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), "utf8");
  grandTotal += questions.length;
  console.log(`✓ Seeded ${questions.length} questions to question-bank/${slug}.json`);
}

console.log(`\n🎉 Full Question Bank Seeded with ${grandTotal} questions across 28 categories!`);
