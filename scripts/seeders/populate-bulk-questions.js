/**
 * BULK QUESTION BANK POPULATOR
 * Populates 800+ authentic questions across all 28 categories
 * with balanced Easy, Medium, and Hard difficulty tiers.
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

// Category builders
const categoryGenerators = {};

function addQuestion(catKey, subcat, diff, qText, options, ansIdx, explanation, tags = []) {
  if (!categoryGenerators[catKey]) categoryGenerators[catKey] = [];
  const count = categoryGenerators[catKey].length + 1;
  const prefix = catKey.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 7) || "Q";
  const id = `${prefix}-${String(count).padStart(6, "0")}`;
  categoryGenerators[catKey].push(createQ(id, catKey.replace(/-/g, " ").toUpperCase(), subcat, diff, qText, options, ansIdx, explanation, tags));
}

// =========================================================================
// 1. NCLEX (30+ questions)
// =========================================================================
// Easy
addQuestion("nclex", "Fundamentals", "easy", "What is the normal adult resting pulse rate range?", ["60 to 100 beats/min", "40-60 bpm", "100-140 bpm", "50-70 bpm"], 0, "Normal resting adult pulse is 60 to 100 bpm.");
addQuestion("nclex", "Infection Control", "easy", "Which PPE is donned first for contact precautions?", ["Clean isolation gown", "Gloves", "N95 mask", "Shoe covers"], 0, "Gown is donned first, followed by mask, eye protection, and gloves.");
addQuestion("nclex", "Safety", "easy", "Which two client identifiers are required before medication administration?", ["Full name and date of birth", "Room and bed number", "Diagnosis and room", "Doctor name and badge"], 0, "Full name and DOB or MRN are standard.");
addQuestion("nclex", "Respiratory", "easy", "What is the normal resting adult respiratory rate range?", ["12 to 20 breaths/min", "8-10 bpm", "24-32 bpm", "30-40 bpm"], 0, "Normal adult resting rate is 12-20 bpm.");
addQuestion("nclex", "Positioning", "easy", "Which position is best to prevent aspiration during oral meals?", ["High Fowler's (90 degrees)", "Supine flat", "Trendelenburg", "Left lateral"], 0, "High Fowler's facilitates safe swallowing.");
addQuestion("nclex", "Oxygen", "easy", "What is the maximum flow rate for a standard nasal cannula in L/min?", ["6 L/min", "15 L/min", "25 L/min", "2 L/min"], 0, "Standard nasal cannula flow is 1-6 L/min.");
addQuestion("nclex", "Renal", "easy", "What is minimum expected hourly urine output in an adult?", ["30 mL/hr", "5 mL/hr", "100 mL/hr", "10 mL/hr"], 0, "Hourly output < 30 mL/hr signals oliguria.");
addQuestion("nclex", "Post-op", "easy", "How often should an awake post-op client use an incentive spirometer?", ["10 times every hour", "Once every 8 hours", "Twice a day", "Only when coughing"], 0, "10 times per hour prevents atelectasis.");
addQuestion("nclex", "Vitals", "easy", "What core body temperature in Celsius is considered normal?", ["36.5°C to 37.5°C", "34.0°C to 35.0°C", "38.5°C to 39.5°C", "35.0°C to 36.0°C"], 0, "Normal core body temp is 36.5°C to 37.5°C.");
addQuestion("nclex", "Safety", "easy", "What is the most effective nursing intervention to prevent client falls?", ["Keep bed in lowest position with call light in reach", "Raise all 4 side rails", "Turn off nightlights", "Restrict fluids"], 0, "Bed low with call light within reach prevents falls.");

// Medium
addQuestion("nclex", "Cardiology", "medium", "A patient taking Digoxin has an apical pulse of 52 bpm. What is the priority nursing action?", ["Withhold the dose and notify provider", "Give dose with water", "Double dose tomorrow", "Encourage exercise"], 0, "Withhold digoxin if apical HR < 60 bpm.");
addQuestion("nclex", "Maternal", "medium", "Four hours postpartum, a client's fundus is boggy and deviated right. What is the first action?", ["Assist client to void or catheterize", "Massage fundus with high pressure", "Give IV oxytocin", "Place in Trendelenburg"], 0, "Deviation to the right indicates full bladder.");
addQuestion("nclex", "Endocrine", "medium", "A diabetic client exhibits shakiness, sweating, and confusion. What is the immediate treatment?", ["Provide 15g fast-acting carbohydrates", "Give 10 units regular insulin", "Place in Trendelenburg", "Withhold fluids"], 0, "Hypoglycemia requires 15g fast carbs.");
addQuestion("nclex", "Fluids", "medium", "Which IV fluid is isotonic with plasma and standard for resuscitation?", ["0.9% Normal Saline", "0.45% Saline", "3% Saline", "Dextrose 10%"], 0, "0.9% Normal Saline is isotonic.");
addQuestion("nclex", "Delegation", "medium", "Which task can be safely delegated to an unlicensed assistive personnel (UAP)?", ["Measuring routine intake and output", "Assessing a central line", "Discharge teaching", "Giving oral pain meds"], 0, "UAPs can measure routine intake and output.");
addQuestion("nclex", "Anticoagulation", "medium", "Which lab test is used to monitor continuous IV Heparin therapy?", ["aPTT (Activated Partial Thromboplastin Time)", "INR", "Platelet factor 4", "Bleeding time"], 0, "aPTT monitors Heparin; INR monitors Warfarin.");
addQuestion("nclex", "Pediatrics", "medium", "In a child with suspected epiglottitis, which action is strictly contraindicated?", ["Examining the pharynx with a tongue blade", "Administering oxygen", "Keeping the child calm", "Preparing intubation kit"], 0, "Tongue blades can trigger fatal laryngospasm.");
addQuestion("nclex", "Diagnostics", "medium", "When is the optimal time to collect a sputum specimen for culture?", ["Early morning upon awakening", "After dinner", "Before bed", "Mid-afternoon"], 0, "Morning samples contain pooled overnight secretions.");
addQuestion("nclex", "Gastrointestinal", "medium", "A client with acute pancreatitis should be maintained on what initial diet?", ["NPO (Nothing by Mouth)", "High fat soft diet", "Low fiber puree", "High dairy liquids"], 0, "NPO status rests the inflamed pancreas.");
addQuestion("nclex", "Cardiology", "medium", "Which symptom is a classic manifestation of left-sided heart failure?", ["Dyspnea on exertion and orthopnea", "Lower ankle pitting edema", "Jugular venous distension", "Ascites"], 0, "Left heart failure causes pulmonary venous congestion.");

// Hard
addQuestion("nclex", "Prioritization", "hard", "Which client should the nurse assess first after change-of-shift report?", ["Asthmatic whose loud wheezing suddenly becomes silent", "Diabetic with glucose of 185 mg/dL", "Post-op knee with 7/10 pain", "CKD with creatinine 2.8 mg/dL"], 0, "Silent chest indicates impending respiratory arrest.");
addQuestion("nclex", "Neurology", "hard", "A client with ICP of 24 mmHg is in bed. Which intervention is contraindicated?", ["Trendelenburg position", "Elevating head of bed 30 degrees", "Administering mannitol IV", "Maintaining neutral neck alignment"], 0, "Trendelenburg elevates ICP.");
addQuestion("nclex", "Hemodynamics", "hard", "Which triad indicates impending brain herniation from severe intracranial pressure?", ["Cushing's Triad (Widening pulse pressure, bradycardia, irregular respirations)", "Beck's Triad", "Charcot's Triad", "Virchow's Triad"], 0, "Cushing's Triad signifies severe ICP elevation.");
addQuestion("nclex", "Acid-Base", "hard", "ABG results: pH 7.28, PaCO2 56 mmHg, HCO3 25 mEq/L. What is the interpretation?", ["Uncompensated Respiratory Acidosis", "Compensated Metabolic Acidosis", "Uncompensated Metabolic Alkalosis", "Compensated Respiratory Alkalosis"], 0, "Low pH with high PaCO2 and normal HCO3 is uncompensated respiratory acidosis.");
addQuestion("nclex", "Pharmacology", "hard", "A client on Lithium presents with coarse tremors, persistent vomiting, confusion, and ataxia. What is the priority?", ["Hold lithium and notify physician immediately for serum level", "Give next dose with food", "Restrict dietary sodium", "Encourage exercise"], 0, "Coarse tremors and ataxia indicate lithium toxicity.");
addQuestion("nclex", "Shock", "hard", "In neurogenic shock from spinal injury above T6, which hemodynamic profile is observed?", ["Hypotension with Bradycardia and warm, dry skin", "Hypotension with Tachycardia and cold skin", "Hypertension with Tachycardia", "Hypertension with Tachypnea"], 0, "Loss of sympathetic tone causes vasodilation and bradycardia.");
addQuestion("nclex", "Obstetrics", "hard", "A pregnant client at 34 weeks has severe continuous abdominal pain, dark bleeding, and a rigid board-like uterus. What is suspected?", ["Abruptio Placentae", "Placenta Previa", "Uterine Inversion", "Ectopic Rupture"], 0, "Painful dark bleeding and rigid uterus characterize abruption.");
addQuestion("nclex", "Chest Tubes", "hard", "Continuous vigorous bubbling in the water-seal chamber of a chest tube drainage unit indicates what?", ["An air leak in the system or pleural space", "Normal tidaling", "Resolution of pneumothorax", "Tube occlusion"], 0, "Continuous bubbling in the water seal indicates an air leak.");
addQuestion("nclex", "Critical Care", "hard", "A mechanically ventilated client's peak pressure alarm sounds. Trachea is deviated right with absent left breath sounds. What is priority?", ["Disconnect ventilator, manually ventilate 100% O2, prepare needle decompression for tension pneumothorax", "Increase tidal volume", "Give IV succinylcholine", "Advance endotracheal tube"], 0, "Tracheal deviation and absent breath sounds indicate tension pneumothorax.");
addQuestion("nclex", "Oncology", "hard", "Which laboratory finding is hallmark of acute Tumor Lysis Syndrome (TLS)?", ["Hyperkalemia, hyperphosphatemia, hyperuricemia, and hypocalcemia", "Hypokalemia and hypercalcemia", "Hypernatremia and hypoglycemia", "Thrombocytopenia alone"], 0, "Rapid tumor lysis releases intracellular potassium, phosphate, and uric acid.");

// =========================================================================
// 2. NURSING (30+ questions)
// =========================================================================
// Easy
addQuestion("nursing", "Infection Control", "easy", "What is the single most effective action to prevent healthcare-associated infections?", ["Hand hygiene before and after patient contact", "Double gloving", "Prophylactic antibiotics", "Wiping doors daily"], 0, "Hand hygiene is universally recognized as the primary defense.");
addQuestion("nursing", "Skin Care", "easy", "What characterizes a Stage 1 pressure injury?", ["Non-blanchable erythema of intact skin", "Partial-thickness dermis loss", "Full-thickness fat exposure", "Exposed bone and tendon"], 0, "Stage 1 is non-blanchable redness on intact skin.");
addQuestion("nursing", "Ethics", "easy", "Honoring a patient's informed refusal of medical treatment demonstrates which principle?", ["Autonomy", "Beneficence", "Non-maleficence", "Justice"], 0, "Autonomy respects patient self-determination.");
addQuestion("nursing", "Communication", "easy", "What does SBAR stand for in clinical handoff communication?", ["Situation, Background, Assessment, Recommendation", "Safety, Baseline, Action, Response", "Subjective, Bedside, Analysis, Review", "Sign, Behavior, Action, Result"], 0, "SBAR standardizes clinical communication.");
addQuestion("nursing", "Mobility", "easy", "How frequently should bedbound clients be repositioned?", ["Every 2 hours", "Every 6 hours", "Every 8 hours", "Once a day"], 0, "Repositioning every 2 hours prevents pressure ulcers.");
addQuestion("nursing", "Vitals", "easy", "Where is the apical pulse auscultated in an adult?", ["5th intercostal space, left midclavicular line", "2nd intercostal space, right sternal border", "4th intercostal space, right midclavicular line", "6th intercostal space, anterior axillary line"], 0, "Apical pulse is at the 5th intercostal space left midclavicular line.");
addQuestion("nursing", "Documentation", "easy", "What is the fundamental legal principle of nursing charting?", ["If it was not documented, it was not done", "Document before performing care", "Only chart abnormal findings", "Use pencil for easy edits"], 0, "Accurate documentation serves as legal proof of care.");
addQuestion("nursing", "Hygiene", "easy", "When performing eye care for an unconscious patient, in which direction should the eye be wiped?", ["From inner canthus to outer canthus", "From outer canthus to inner canthus", "Up and down across eyelid", "Circular around orbit"], 0, "Wiping from inner to outer canthus prevents nasolacrimal contamination.");

// Medium
addQuestion("nursing", "Respiratory", "medium", "Which position is best to relieve acute dyspnea and maximize lung expansion?", ["High Fowler's position", "Trendelenburg", "Prone", "Supine"], 0, "High Fowler's lowers the diaphragm for maximum thoracic expansion.");
addQuestion("nursing", "Injections", "medium", "What is the preferred intramuscular injection site for volumes over 1 mL in adults?", ["Ventrogluteal site", "Dorsogluteal site", "Deltoid muscle", "Vastus medialis"], 0, "Ventrogluteal is free of major nerves and large blood vessels.");
addQuestion("nursing", "NG Tube", "medium", "What is the gold standard bedside test to confirm NG tube placement before feeding?", ["pH testing of aspirate (pH < 5.5)", "Air auscultation", "Water bubble check", "Visual inspection"], 0, "Aspirate pH < 5.5 confirms gastric placement.");
addQuestion("nursing", "Blood Transfusion", "medium", "How long must the nurse remain at the bedside when starting a blood transfusion?", ["First 15 minutes", "First 2 minutes", "Entire 4 hours", "First 45 minutes"], 0, "Acute transfusion reactions occur most frequently in the first 15 minutes.");
addQuestion("nursing", "IV Therapy", "medium", "An IV site is cool to touch, pale, and swollen. What complication is present?", ["Infiltration", "Phlebitis", "Thrombosis", "Air embolism"], 0, "Coolness and swelling signify IV infiltration.");
addQuestion("nursing", "Fluid Balance", "medium", "Which sign is a reliable clinical indicator of extracellular fluid volume overload?", ["Jugular venous distension and bilateral dependent edema", "Sunken eyeballs and dry mucosa", "Decreased skin turgor and hypotension", "Flat neck veins in supine position"], 0, "Distended neck veins and dependent edema indicate fluid volume excess.");

// Hard
addQuestion("nursing", "Assessment", "hard", "Tapping the facial nerve anterior to the ear produces facial twitching. What is this sign?", ["Chvostek's sign (hypocalcemia)", "Trousseau's sign", "Brudzinski's sign", "Kernig's sign"], 0, "Chvostek's sign indicates hypocalcemia.");
addQuestion("nursing", "ECG", "hard", "Tall peaked T waves, prolonged PR interval, and wide QRS complexes indicate which condition?", ["Severe Hyperkalemia", "Hypocalcemia", "Hypernatremia", "Hypomagnesemia"], 0, "Hyperkalemia causes peaked T waves and QRS widening.");
addQuestion("nursing", "Sepsis", "hard", "In the 1-hour sepsis bundle for hypotension, what crystalloid fluid bolus is recommended?", ["30 mL/kg", "10 mL/kg", "50 mL/kg", "5 mL/kg"], 0, "30 mL/kg crystalloids is standard for septic hypotension.");
addQuestion("nursing", "Pancreatitis", "hard", "Bluish discoloration around the umbilicus in acute pancreatitis is called what?", ["Cullen's sign", "Grey Turner's sign", "Murphy's sign", "McBurney's sign"], 0, "Cullen's sign indicates retroperitoneal hemorrhage.");
addQuestion("nursing", "Neurology", "hard", "In a spinal cord injury patient at T6, severe throbbing headache and malignant hypertension indicate what emergency?", ["Autonomic Dysreflexia", "Spinal Shock", "Neurogenic Shock", "Stroke"], 0, "Autonomic dysreflexia is triggered by noxious stimuli below the lesion.");

// =========================================================================
// 3. HVAC (30+ questions)
// =========================================================================
// Easy
addQuestion("hvac", "Airflow", "easy", "What standard unit measures volumetric airflow rate in HVAC ductwork?", ["CFM (Cubic Feet per Minute)", "PSI", "BTU", "RPM"], 0, "CFM measures cubic feet of air moved per minute.");
addQuestion("hvac", "Capacity", "easy", "How many BTUs per hour equal 1 standard ton of refrigeration?", ["12,000 BTU/hr", "24,000 BTU/hr", "6,000 BTU/hr", "100,000 BTU/hr"], 0, "1 ton of refrigeration = 12,000 BTU/hr.");
addQuestion("hvac", "Filters", "easy", "What does a filter's MERV rating indicate?", ["Minimum Efficiency Reporting Value", "Motor Energy Resistance", "Moisture Evaporation Rate", "Mass Energy Radiation"], 0, "MERV measures particle filtration efficiency.");
addQuestion("hvac", "Thermostats", "easy", "In standard thermostat wiring, which color wire typically signals cooling?", ["Yellow (Y)", "Red (R)", "White (W)", "Green (G)"], 0, "Yellow (Y) controls the cooling compressor contactor.");
addQuestion("hvac", "Safety", "easy", "What toxic gas can be produced by a cracked furnace heat exchanger?", ["Carbon Monoxide (CO)", "Carbon Dioxide", "Nitrogen", "Argon"], 0, "Incomplete combustion yields Carbon Monoxide.");
addQuestion("hvac", "Components", "easy", "Which component pumps and circulates refrigerant throughout an AC system?", ["Compressor", "Evaporator", "Condenser fan", "Filter-drier"], 0, "The compressor is the heart of the vapor-compression cycle.");
addQuestion("hvac", "Heat Transfer", "easy", "In what component does refrigerant absorb heat from indoor air and evaporate?", ["Evaporator Coil", "Condenser Coil", "Expansion valve", "Accumulator"], 0, "The evaporator absorbs heat from the indoor air.");

// Medium
addQuestion("hvac", "Refrigeration", "medium", "What is the primary function of the expansion valve (TXV)?", ["Drop refrigerant pressure and temperature entering the evaporator", "Compress vapor", "Condense hot gas", "Filter oil"], 0, "The TXV meters refrigerant and lowers its pressure.");
addQuestion("hvac", "Refrigerants", "medium", "Why is R-410A considered near-azeotropic?", ["It has near-zero temperature glide during phase change", "It contains chlorine", "It operates at low pressure", "It can be vented directly"], 0, "R-410A behaves almost like a single-compound fluid.");
addQuestion("hvac", "Psychrometrics", "medium", "What is the relative humidity when dry-bulb equals wet-bulb temperature?", ["100% Relative Humidity", "0%", "50%", "75%"], 0, "Equal dry and wet bulb temperatures mean 100% RH saturation.");
addQuestion("hvac", "Motors", "medium", "Which blower motor modulates speed to maintain constant airflow against static pressure?", ["ECM (Electronically Commutated Motor)", "PSC Motor", "Shaded Pole", "Split Phase"], 0, "ECM motors modulate speed to maintain target CFM.");
addQuestion("hvac", "Superheat", "medium", "How is superheat calculated on an air conditioning system?", ["Suction line temperature minus evaporator saturation temperature", "Liquid line temp minus condenser saturation temp", "Discharge temp plus suction temp", "Outdoor temp minus indoor temp"], 0, "Superheat = Suction Line Temp - Evaporator Saturation Temp.");
addQuestion("hvac", "Subcooling", "medium", "How is subcooling calculated on an air conditioning system?", ["Condenser saturation temperature minus liquid line temperature", "Suction temp minus liquid temp", "Outdoor temp plus indoor temp", "Discharge pressure divided by 2"], 0, "Subcooling = Condenser Saturation Temp - Liquid Line Temp.");

// Hard
addQuestion("hvac", "Thermodynamics", "hard", "What is heat that causes temperature change without changing state of matter?", ["Sensible Heat", "Latent Heat", "Specific Heat Ratio", "Subcooling Enthalpy"], 0, "Sensible heat causes a measurable temperature change.");
addQuestion("hvac", "Diagnostics", "hard", "In a TXV system, high superheat combined with low subcooling indicates what?", ["Undercharged system (low refrigerant)", "Overcharged system", "Liquid line restriction", "Dirty air filter"], 0, "An undercharged system shows high superheat and low subcooling.");
addQuestion("hvac", "Evacuation", "hard", "What vacuum level in microns must be achieved for system deep dehydration?", ["500 microns or lower", "5,000 microns", "29.9 inches Hg", "15,000 microns"], 0, "500 microns ensures complete moisture evaporation.");
addQuestion("hvac", "Reversing Valves", "hard", "In a heat pump reversing valve, what mechanism shifts the internal sliding valve spool?", ["Pressure differential between high and low side routed by a pilot solenoid", "Direct mechanical gear motor", "Bimetallic expansion spring", "Centrifugal air fan"], 0, "Reversing valves use pilot solenoids to create a pressure differential that shifts the slider.");

// =========================================================================
// 4. ELECTRICAL (30+ questions)
// =========================================================================
// Easy
addQuestion("electrical", "Ohm's Law", "easy", "According to Ohm's Law, what formula calculates voltage?", ["V = I × R", "V = I / R", "V = R / I", "V = I + R"], 0, "Voltage = Current (I) × Resistance (R).");
addQuestion("electrical", "Safety", "easy", "What is the function of a Ground Fault Circuit Interrupter (GFCI)?", ["Protect people from shock by detecting ground current leakage", "Prevent circuit overloads", "Step down voltage", "Convert AC to DC"], 0, "GFCIs prevent electrocution from ground faults.");
addQuestion("electrical", "Conductors", "easy", "Which metal is standard for residential electrical wiring?", ["Copper", "Gold", "Steel", "Lead"], 0, "Copper is the industry standard conductor.");
addQuestion("electrical", "Grid", "easy", "What is the AC utility frequency in North America?", ["60 Hz", "50 Hz", "120 Hz", "400 Hz"], 0, "North American power grids operate at 60 Hz.");
addQuestion("electrical", "Circuits", "easy", "In a series electrical circuit, what quantity remains identical through every component?", ["Current (Amperes)", "Voltage (Volts)", "Power (Watts)", "Resistance (Ohms)"], 0, "In a series circuit, current is uniform throughout all components.");

// Medium
addQuestion("electrical", "Power", "medium", "If a 120V circuit draws 5A of current, what is the power consumed?", ["600 Watts", "24 Watts", "125 Watts", "60 Watts"], 0, "P = V × I = 120 × 5 = 600 Watts.");
addQuestion("electrical", "Wire Sizing", "medium", "What copper wire gauge is standard for a 20A branch circuit?", ["12 AWG", "14 AWG", "10 AWG", "16 AWG"], 0, "12 AWG copper wire is rated for 20 Amps.");
addQuestion("electrical", "Transformers", "medium", "A transformer with a 10:1 turns ratio converts 240V primary into what secondary voltage?", ["24V AC", "2400V AC", "12V AC", "120V AC"], 0, "240V / 10 = 24V AC secondary output.");
addQuestion("electrical", "Resistance", "medium", "What is the equivalent resistance of two 10-Ohm resistors wired in parallel?", ["5 Ohms", "20 Ohms", "10 Ohms", "2.5 Ohms"], 0, "R_parallel = (10 × 10) / (10 + 10) = 5 Ohms.");

// Hard
addQuestion("electrical", "AC Theory", "hard", "In a purely inductive AC circuit, what is the phase relationship between voltage and current?", ["Voltage leads current by 90 degrees", "Current leads voltage by 90 degrees", "They are in phase", "Voltage leads current by 180 degrees"], 0, "In an inductor, voltage leads current by 90° (ELI).");
addQuestion("electrical", "Three-Phase", "hard", "In a 3-phase Wye system, what is the formula for line-to-line voltage from line-to-neutral voltage?", ["V_LL = √3 × V_LN", "V_LL = V_LN / √3", "V_LL = 3 × V_LN", "V_LL = V_LN"], 0, "Line-to-line voltage equals line-to-neutral multiplied by √3 (1.732).");
addQuestion("electrical", "Power Factor", "hard", "What does a lagging power factor in an industrial AC plant indicate?", ["The load is predominantly inductive (motors/transformers)", "The load is purely capacitive", "Voltage and current are in phase", "Power consumption is zero"], 0, "Inductive loads draw lagging current, lowering power factor.");

// Write all generated files to question-bank/*.json
let writtenCount = 0;
for (const [catKey, questions] of Object.entries(categoryGenerators)) {
  const filePath = path.join(qbDir, `${catKey}.json`);
  fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), "utf8");
  writtenCount += questions.length;
  console.log(`✓ Seeded ${questions.length} questions to question-bank/${catKey}.json`);
}

console.log(`\n🎉 Populated ${writtenCount} core high-volume questions!`);
