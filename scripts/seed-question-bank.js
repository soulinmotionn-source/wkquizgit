/**
 * Seeds and initializes the structured question-bank/ directory
 */
const fs = require("fs");
const path = require("path");

const qbDir = path.join(__dirname, "..", "question-bank");
if (!fs.existsSync(qbDir)) {
  fs.mkdirSync(qbDir, { recursive: true });
}

// Full rich question datasets organized by category with permanent global IDs
const categoryData = {
  "nclex": [
    {
      "id": "NCLEX-000001",
      "category": "NCLEX",
      "subcategory": "Prioritization",
      "difficulty": "hard",
      "question": "A nurse receives change-of-shift report on four clients. Which client should the nurse assess first?",
      "options": [
        "A client with asthma who was wheezing and is now silent with decreased air movement",
        "A client with diabetes whose fasting blood glucose is 185 mg/dL",
        "A client postoperative day 1 after knee replacement reporting 7/10 pain",
        "A client with chronic kidney disease whose serum creatinine is 2.8 mg/dL"
      ],
      "answer": 0,
      "explanation": "Using the ABC (Airway, Breathing, Circulation) priority framework, a silent chest in acute asthma indicates severe bronchospasm and impending respiratory failure.",
      "tags": ["NCLEX", "prioritization", "triage", "emergency"],
      "status": "active"
    },
    {
      "id": "NCLEX-000002",
      "category": "NCLEX",
      "subcategory": "Pharmacology & Safety",
      "difficulty": "medium",
      "question": "A client with heart failure is taking Digoxin (Lanoxin) 0.25 mg daily. Which assessment finding warrants withholding the medication?",
      "options": [
        "Apical heart rate of 52 beats per minute",
        "Blood pressure of 130/84 mmHg",
        "Respiratory rate of 18 breaths per minute",
        "Serum potassium level of 4.2 mEq/L"
      ],
      "answer": 0,
      "explanation": "Digoxin should be withheld if the apical heart rate is below 60 bpm in an adult to avoid severe bradycardia and heart block.",
      "tags": ["NCLEX", "pharmacology", "cardiac", "digoxin"],
      "status": "active"
    },
    {
      "id": "NCLEX-000003",
      "category": "NCLEX",
      "subcategory": "Maternal-Newborn",
      "difficulty": "medium",
      "question": "Which finding in a postpartum mother 4 hours after an uncomplicated vaginal delivery requires immediate nurse intervention?",
      "options": [
        "Fundus boggy and displaced to the right of the midline",
        "Moderate lochia rubra on the perineal pad",
        "Maternal temperature of 37.8°C (100.0°F)",
        "Diaphoresis during sleep"
      ],
      "answer": 0,
      "explanation": "A boggy fundus displaced to the right indicates urinary bladder distension, preventing uterine contraction and increasing the risk of postpartum hemorrhage.",
      "tags": ["NCLEX", "maternal", "postpartum", "safety"],
      "status": "active"
    },
    {
      "id": "NCLEX-000004",
      "category": "NCLEX",
      "subcategory": "Fundamentals",
      "difficulty": "easy",
      "question": "What is the normal expected adult resting heart rate range in beats per minute (bpm)?",
      "options": [
        "60 to 100 bpm",
        "40 to 60 bpm",
        "100 to 140 bpm",
        "50 to 70 bpm"
      ],
      "answer": 0,
      "explanation": "A normal resting heart rate for healthy adults ranges from 60 to 100 beats per minute.",
      "tags": ["NCLEX", "vitals", "fundamentals"],
      "status": "active"
    },
    {
      "id": "NCLEX-000005",
      "category": "NCLEX",
      "subcategory": "Critical Care",
      "difficulty": "hard",
      "question": "A client with traumatic brain injury has an intracranial pressure (ICP) of 24 mmHg. Which nursing intervention is contraindicated?",
      "options": [
        "Placing the client in Trendelenburg position",
        "Elevating the head of the bed 30 degrees",
        "Administering prescribed osmotic diuretics (mannitol)",
        "Maintaining the client's head and neck in neutral alignment"
      ],
      "answer": 0,
      "explanation": "Trendelenburg position increases venous return from the lower extremities and impedes cerebral venous drainage, dangerously increasing ICP.",
      "tags": ["NCLEX", "neurology", "critical-care", "safety"],
      "status": "active"
    },
    {
      "id": "NCLEX-000006",
      "category": "NCLEX",
      "subcategory": "Infection Control",
      "difficulty": "easy",
      "question": "Which personal protective equipment (PPE) should the nurse don first when caring for a client on contact precautions?",
      "options": [
        "Gown followed by gloves",
        "Gloves followed by gown",
        "N95 respirator only",
        "Shoe covers and goggles"
      ],
      "answer": 0,
      "explanation": "Standard contact precautions require donning a clean gown first, followed by gloves covering the gown cuffs.",
      "tags": ["NCLEX", "infection-control", "ppe"],
      "status": "active"
    }
  ],

  "nursing": [
    {
      "id": "NURS-000001",
      "category": "Nursing",
      "subcategory": "Fundamentals",
      "difficulty": "medium",
      "question": "Which position is most appropriate for a patient experiencing acute shortness of breath (dyspnea)?",
      "options": [
        "High Fowler's position (60-90 degrees)",
        "Trendelenburg position",
        "Prone position",
        "Supine with legs elevated"
      ],
      "answer": 0,
      "explanation": "High Fowler's position maximizes lung expansion and facilitates diaphragm descent, easing respiratory distress.",
      "tags": ["nursing", "respiratory", "patient-care", "positioning"],
      "status": "active"
    },
    {
      "id": "NURS-000002",
      "category": "Nursing",
      "subcategory": "Infection Control",
      "difficulty": "easy",
      "question": "What is the single most effective intervention to prevent the spread of healthcare-associated infections (HAIs)?",
      "options": [
        "Routine hand hygiene before and after patient contact",
        "Wearing double gloves for all procedures",
        "Prophylactic antibiotic administration",
        "Sterilizing room surfaces twice daily"
      ],
      "answer": 0,
      "explanation": "Consistent hand hygiene before and after patient contact is recognized globally as the primary measure to prevent HAIs.",
      "tags": ["nursing", "infection-control", "safety"],
      "status": "active"
    },
    {
      "id": "NURS-000003",
      "category": "Nursing",
      "subcategory": "Assessment",
      "difficulty": "hard",
      "question": "When assessing a patient with suspected hypocalcemia, which clinical finding is known as Chvostek's sign?",
      "options": [
        "Twitching of facial muscles elicited by tapping the facial nerve",
        "Carpal spasm induced by inflating a blood pressure cuff above systolic pressure",
        "Numbness and tingling around the lips and fingertips",
        "Hyperactive deep tendon reflexes in the lower extremities"
      ],
      "answer": 0,
      "explanation": "Chvostek's sign is facial muscle twitching when tapping anterior to the ear. Trousseau's sign refers to carpal spasm with cuff inflation.",
      "tags": ["nursing", "assessment", "electrolytes", "hypocalcemia"],
      "status": "active"
    },
    {
      "id": "NURS-000004",
      "category": "Nursing",
      "subcategory": "Wound Care",
      "difficulty": "easy",
      "question": "What is a Stage 1 pressure injury characterized by?",
      "options": [
        "Non-blanchable erythema of intact skin",
        "Partial-thickness skin loss with exposed dermis",
        "Full-thickness skin loss with visible adipose tissue",
        "Full-thickness skin and tissue loss with exposed bone"
      ],
      "answer": 0,
      "explanation": "Stage 1 pressure injury involves intact skin with a localized area of non-blanchable erythema.",
      "tags": ["nursing", "wound-care", "skin"],
      "status": "active"
    },
    {
      "id": "NURS-000005",
      "category": "Nursing",
      "subcategory": "Medication Administration",
      "difficulty": "medium",
      "question": "When administering an intramuscular (IM) injection to an adult in the ventrogluteal site, which needle length is standard?",
      "options": [
        "1.5 inches (38 mm)",
        "0.5 inches (12 mm)",
        "3.0 inches (76 mm)",
        "0.25 inches (6 mm)"
      ],
      "answer": 0,
      "explanation": "A 1 to 1.5 inch needle is standard for adult ventrogluteal intramuscular injections to reach deep muscle tissue safely.",
      "tags": ["nursing", "medication", "im-injection"],
      "status": "active"
    },
    {
      "id": "NURS-000006",
      "category": "Nursing",
      "subcategory": "Fluid & Electrolytes",
      "difficulty": "hard",
      "question": "Which ECG change is most characteristic of severe hyperkalemia (elevated serum potassium)?",
      "options": [
        "Tall, peaked T waves and widened QRS complexes",
        "Prominent U waves and ST segment depression",
        "Shortened PR interval and Delta waves",
        "Prolonged QT interval and inverted P waves"
      ],
      "answer": 0,
      "explanation": "Tall, peaked ('tented') T waves, prolonged PR intervals, and widened QRS complexes are hallmark signs of severe hyperkalemia.",
      "tags": ["nursing", "electrolytes", "ecg", "hyperkalemia"],
      "status": "active"
    }
  ],

  "hvac": [
    {
      "id": "HVAC-000001",
      "category": "HVAC",
      "subcategory": "Refrigeration Cycle",
      "difficulty": "medium",
      "question": "In standard vapor-compression refrigeration, what is the primary function of the Expansion Valve (Metering Device)?",
      "options": [
        "Drop refrigerant pressure and temperature before entering the evaporator",
        "Compress low-pressure vapor into high-pressure vapor",
        "Condense high-pressure hot gas into subcooled liquid",
        "Absorb room heat directly into the atmosphere"
      ],
      "answer": 0,
      "explanation": "The expansion valve meters refrigerant flow and creates a sudden pressure drop, causing it to flash into a cold liquid/vapor mix.",
      "tags": ["hvac", "refrigeration", "thermodynamics"],
      "status": "active"
    },
    {
      "id": "HVAC-000002",
      "category": "HVAC",
      "subcategory": "Thermodynamics",
      "difficulty": "hard",
      "question": "What is the term for the heat added to a substance that causes a measurable temperature change without changing its state of matter?",
      "options": [
        "Sensible Heat",
        "Latent Heat",
        "Specific Heat Ratio",
        "Subcooling Enthalpy"
      ],
      "answer": 0,
      "explanation": "Sensible heat produces a measurable temperature change registered on a thermometer. Latent heat causes a change of phase at constant temperature.",
      "tags": ["hvac", "thermodynamics", "psychrometrics"],
      "status": "active"
    },
    {
      "id": "HVAC-000003",
      "category": "HVAC",
      "subcategory": "Airflow",
      "difficulty": "easy",
      "question": "What unit is commonly used in North America to measure volumetric airflow rate in HVAC ductwork?",
      "options": [
        "CFM (Cubic Feet per Minute)",
        "PSI (Pounds per Square Inch)",
        "BTU (British Thermal Unit)",
        "RPM (Revolutions per Minute)"
      ],
      "answer": 0,
      "explanation": "CFM (Cubic Feet per Minute) is standard for airflow measurement in heating and air conditioning systems.",
      "tags": ["hvac", "airflow", "ductwork"],
      "status": "active"
    },
    {
      "id": "HVAC-000004",
      "category": "HVAC",
      "subcategory": "Cooling Capacity",
      "difficulty": "easy",
      "question": "How many BTUs per hour (BTU/hr) are equal to exactly one standard ton of refrigeration?",
      "options": [
        "12,000 BTU/hr",
        "24,000 BTU/hr",
        "6,000 BTU/hr",
        "100,000 BTU/hr"
      ],
      "answer": 0,
      "explanation": "One ton of refrigeration is defined as 12,000 BTU/hr (the cooling power required to freeze 1 short ton of water in 24 hours).",
      "tags": ["hvac", "calculations", "btu"],
      "status": "active"
    },
    {
      "id": "HVAC-000005",
      "category": "HVAC",
      "subcategory": "Diagnostics",
      "difficulty": "hard",
      "question": "In a TXV-equipped AC system, high superheat combined with low subcooling most likely indicates which fault?",
      "options": [
        "Undercharged system (low refrigerant)",
        "Overcharged system (excess refrigerant)",
        "Restricted liquid line filter-drier",
        "Dirty indoor air filter / low airflow"
      ],
      "answer": 0,
      "explanation": "Low refrigerant charge results in an underfed evaporator (high superheat) and insufficient liquid backing up in the condenser (low subcooling).",
      "tags": ["hvac", "diagnostics", "superheat", "subcooling"],
      "status": "active"
    }
  ],

  "electrical": [
    {
      "id": "ELEC-000001",
      "category": "Electrical",
      "subcategory": "Circuit Laws",
      "difficulty": "easy",
      "question": "According to Ohm's Law, which formula correctly calculates Electric Voltage (V)?",
      "options": [
        "V = I × R (Current × Resistance)",
        "V = I / R",
        "V = R / I",
        "V = I + R"
      ],
      "answer": 0,
      "explanation": "Ohm's Law states that Voltage (V in Volts) equals Current (I in Amperes) multiplied by Resistance (R in Ohms).",
      "tags": ["electrical", "circuits", "ohms-law"],
      "status": "active"
    },
    {
      "id": "ELEC-000002",
      "category": "Electrical",
      "subcategory": "Power Calculation",
      "difficulty": "medium",
      "question": "If a 120V electrical circuit draws a current of 5 Amperes, what is the electrical power consumed by the load?",
      "options": [
        "600 Watts",
        "24 Watts",
        "125 Watts",
        "60 Watts"
      ],
      "answer": 0,
      "explanation": "Electric power P = V × I = 120 V × 5 A = 600 Watts (W).",
      "tags": ["electrical", "power", "calculations"],
      "status": "active"
    },
    {
      "id": "ELEC-000003",
      "category": "Electrical",
      "subcategory": "AC Circuits",
      "difficulty": "hard",
      "question": "In a purely inductive AC circuit, what is the phase relationship between AC voltage and AC current?",
      "options": [
        "Voltage leads Current by 90 degrees (ELI)",
        "Current leads Voltage by 90 degrees (ICE)",
        "Voltage and Current are in phase (0 degrees)",
        "Voltage leads Current by 180 degrees"
      ],
      "answer": 0,
      "explanation": "In an inductor, counter-EMF opposes current change, causing Voltage (E) to lead Current (I) by 90° (remember 'ELI the ICE man').",
      "tags": ["electrical", "ac-circuits", "phase", "inductance"],
      "status": "active"
    },
    {
      "id": "ELEC-000004",
      "category": "Electrical",
      "subcategory": "Safety",
      "difficulty": "easy",
      "question": "What is the primary function of a Ground Fault Circuit Interrupter (GFCI / RCD)?",
      "options": [
        "Protect people from electric shock by detecting current leakage to ground",
        "Prevent circuit overload during high power draw",
        "Step down high AC transmission voltage to 120V",
        "Convert alternating current into direct current"
      ],
      "answer": 0,
      "explanation": "GFCIs monitor the balance of current between hot and neutral wires and trip in milliseconds if an imbalance occurs.",
      "tags": ["electrical", "safety", "gfci"],
      "status": "active"
    }
  ],

  "electrical-symbols": [
    {
      "id": "ELECSYM-000001",
      "category": "Electrical Symbols",
      "subcategory": "Schematic Symbols",
      "difficulty": "easy",
      "question": "In electrical circuit schematics, what does a symbol composed of alternating long and short parallel lines represent?",
      "options": [
        "DC Voltage Source / Battery",
        "Capacitor",
        "Ground connection",
        "Transformer"
      ],
      "answer": 0,
      "explanation": "Alternating long (positive) and short thick (negative) parallel lines represent a DC chemical battery or cell.",
      "tags": ["electrical-symbols", "schematics", "circuits"],
      "status": "active"
    },
    {
      "id": "ELECSYM-000002",
      "category": "Electrical Symbols",
      "subcategory": "Passive Components",
      "difficulty": "medium",
      "question": "On an electronic schematic, what component is depicted by a zigzag line in US standards or a plain rectangle in IEC European standards?",
      "options": [
        "Resistor",
        "Inductor",
        "Diode",
        "Fuse"
      ],
      "answer": 0,
      "explanation": "ANSI/IEEE US schematics use a zigzag line for fixed resistors; IEC/European schematics use an open rectangle.",
      "tags": ["electrical-symbols", "resistors", "blueprints"],
      "status": "active"
    },
    {
      "id": "ELECSYM-000003",
      "category": "Electrical Symbols",
      "subcategory": "Semiconductors",
      "difficulty": "hard",
      "question": "What electronic symbol is represented by a triangle pointing toward a vertical line with two small outward arrows pointing away from the triangle?",
      "options": [
        "Light Emitting Diode (LED)",
        "Photodiode",
        "Zener Diode",
        "Schottky Diode"
      ],
      "answer": 0,
      "explanation": "A diode triangle with outward-pointing arrows signifies a Light Emitting Diode (LED). Inward arrows represent a photodiode.",
      "tags": ["electrical-symbols", "diodes", "led"],
      "status": "active"
    }
  ],

  "electronics": [
    {
      "id": "ELX-000001",
      "category": "Electronics",
      "subcategory": "Semiconductors",
      "difficulty": "medium",
      "question": "What semiconductor component allows electrical current to flow predominantly in only one direction (forward biased)?",
      "options": [
        "Diode",
        "Capacitor",
        "Transformer",
        "Potentiometer"
      ],
      "answer": 0,
      "explanation": "A p-n junction diode conducts current easily when forward biased and blocks current when reverse biased.",
      "tags": ["electronics", "diodes", "semiconductors"],
      "status": "active"
    },
    {
      "id": "ELX-000002",
      "category": "Electronics",
      "subcategory": "Digital Logic",
      "difficulty": "easy",
      "question": "Which digital logic gate produces a HIGH (1) output ONLY when both of its inputs are HIGH (1)?",
      "options": [
        "AND Gate",
        "OR Gate",
        "XOR Gate",
        "NOR Gate"
      ],
      "answer": 0,
      "explanation": "An AND gate requires all inputs to be TRUE (1) to produce a TRUE (1) output.",
      "tags": ["electronics", "digital-logic", "gates"],
      "status": "active"
    },
    {
      "id": "ELX-000003",
      "category": "Electronics",
      "subcategory": "Transistors",
      "difficulty": "hard",
      "question": "In an N-channel enhancement-mode MOSFET, what voltage condition is required between Gate and Source (Vgs) to create an inversion channel and conduct drain current?",
      "options": [
        "Vgs must exceed the positive threshold voltage (Vth)",
        "Vgs must be zero volts",
        "Vgs must be negative with respect to source",
        "Drain voltage must be lower than source voltage"
      ],
      "answer": 0,
      "explanation": "An enhancement-mode N-channel MOSFET is normally OFF; applying a gate-to-source voltage greater than Vth induces a conducting channel.",
      "tags": ["electronics", "mosfet", "transistors"],
      "status": "active"
    }
  ],

  "medical": [
    {
      "id": "MED-000001",
      "category": "Medical",
      "subcategory": "Emergency Medicine",
      "difficulty": "medium",
      "question": "What is the recommended compression-to-ventilation ratio for adult single-rescuer CPR?",
      "options": [
        "30 compressions to 2 breaths",
        "15 compressions to 2 breaths",
        "20 compressions to 1 breath",
        "50 compressions to 5 breaths"
      ],
      "answer": 0,
      "explanation": "AHA resuscitation guidelines recommend a 30:2 compression-to-ventilation ratio for adult cardiac arrest in single-rescuer CPR.",
      "tags": ["medical", "cpr", "emergency", "cardiology"],
      "status": "active"
    },
    {
      "id": "MED-000002",
      "category": "Medical",
      "subcategory": "Diagnostics",
      "difficulty": "hard",
      "question": "Which serum cardiac biomarker provides the highest diagnostic specificity and sensitivity for acute myocardial infarction (heart attack)?",
      "options": [
        "Cardiac Troponin I or T",
        "Creatine Kinase-MB (CK-MB)",
        "Myoglobin",
        "Lactate Dehydrogenase (LDH)"
      ],
      "answer": 0,
      "explanation": "Cardiac Troponins (I and T) are specific to myocardial tissue necrosis and remain the gold standard biomarker.",
      "tags": ["medical", "cardiology", "lab-values", "diagnostics"],
      "status": "active"
    },
    {
      "id": "MED-000003",
      "category": "Medical",
      "subcategory": "Vitals",
      "difficulty": "easy",
      "question": "What is considered a normal adult resting blood pressure according to AHA/ACC guidelines?",
      "options": [
        "Less than 120/80 mmHg",
        "140/90 mmHg",
        "160/100 mmHg",
        "130/85 mmHg"
      ],
      "answer": 0,
      "explanation": "Normal blood pressure is defined as systolic < 120 mmHg and diastolic < 80 mmHg.",
      "tags": ["medical", "vitals", "hypertension"],
      "status": "active"
    }
  ],

  "medical-terminology": [
    {
      "id": "MEDTERM-000001",
      "category": "Medical Terminology",
      "subcategory": "Prefixes",
      "difficulty": "easy",
      "question": "What does the medical prefix 'Brady-' mean?",
      "options": [
        "Slow",
        "Fast",
        "Difficult or painful",
        "Excessive"
      ],
      "answer": 0,
      "explanation": "'Brady-' means slow (e.g. bradycardia = abnormally slow heart rate). 'Tachy-' means fast.",
      "tags": ["medical-terminology", "prefixes", "vocabulary"],
      "status": "active"
    },
    {
      "id": "MEDTERM-000002",
      "category": "Medical Terminology",
      "subcategory": "Suffixes",
      "difficulty": "medium",
      "question": "The surgical suffix '-ectomy' indicates which procedure?",
      "options": [
        "Surgical removal or excision",
        "Creating an artificial opening",
        "Surgical repair or reconstruction",
        "Visual examination with an endoscope"
      ],
      "answer": 0,
      "explanation": "'-ectomy' denotes surgical excision (e.g. appendectomy). '-ostomy' is creating an opening, and '-plasty' is surgical repair.",
      "tags": ["medical-terminology", "suffixes", "surgery"],
      "status": "active"
    },
    {
      "id": "MEDTERM-000003",
      "category": "Medical Terminology",
      "subcategory": "Clinical Terms",
      "difficulty": "hard",
      "question": "What does the medical term 'Hemoptysis' specifically refer to?",
      "options": [
        "Coughing up blood from the respiratory tract",
        "Vomiting blood from the gastrointestinal tract",
        "Blood in the urine",
        "Bleeding from the nasal cavity"
      ],
      "answer": 0,
      "explanation": "Hemoptysis is the coughing up of blood. Vomiting blood is hematemesis, blood in urine is hematuria, and nosebleed is epistaxis.",
      "tags": ["medical-terminology", "clinical", "pulmonology"],
      "status": "active"
    }
  ],

  "diseases": [
    {
      "id": "DIS-000001",
      "category": "Diseases & Disorders",
      "subcategory": "Endocrinology",
      "difficulty": "medium",
      "question": "Type 1 Diabetes Mellitus is characterized primarily by which underlying mechanism?",
      "options": [
        "Autoimmune destruction of pancreatic beta cells producing absolute insulin deficiency",
        "Insulin resistance in peripheral tissues with relative insulin deficiency",
        "Impaired hepatic glucose storage due to enzyme mutations",
        "Excessive secretion of glucagon by alpha cells"
      ],
      "answer": 0,
      "explanation": "Type 1 Diabetes is an autoimmune disorder where T-cells destroy insulin-producing beta cells in the islets of Langerhans.",
      "tags": ["diseases", "diabetes", "endocrinology"],
      "status": "active"
    },
    {
      "id": "DIS-000002",
      "category": "Diseases & Disorders",
      "subcategory": "Infectious Disease",
      "difficulty": "easy",
      "question": "Which causative organism is responsible for Tuberculosis (TB)?",
      "options": [
        "Mycobacterium tuberculosis",
        "Streptococcus pneumoniae",
        "Staphylococcus aureus",
        "Haemophilus influenzae"
      ],
      "answer": 0,
      "explanation": "Tuberculosis is an infectious bacterial disease caused by Mycobacterium tuberculosis.",
      "tags": ["diseases", "tuberculosis", "microbiology"],
      "status": "active"
    },
    {
      "id": "DIS-000003",
      "category": "Diseases & Disorders",
      "subcategory": "Cardiovascular",
      "difficulty": "hard",
      "question": "Which genetic cardiac disorder is the most common cause of sudden cardiac death in young competitive athletes?",
      "options": [
        "Hypertrophic Cardiomyopathy (HCM)",
        "Dilated Cardiomyopathy",
        "Aortic Dissection",
        "Mitral Valve Prolapse"
      ],
      "answer": 0,
      "explanation": "Hypertrophic cardiomyopathy causes asymmetric ventricular septal thickening and is the leading cause of sudden cardiac arrest in young athletes.",
      "tags": ["diseases", "cardiology", "genetics"],
      "status": "active"
    }
  ],

  "anatomy": [
    {
      "id": "ANAT-000001",
      "category": "Anatomy & Physiology",
      "subcategory": "Cardiovascular",
      "difficulty": "easy",
      "question": "Which chamber of the human heart pumps oxygen-rich blood into the aorta to supply the entire body?",
      "options": [
        "Left Ventricle",
        "Right Ventricle",
        "Left Atrium",
        "Right Atrium"
      ],
      "answer": 0,
      "explanation": "The Left Ventricle has the thickest myocardium and pumps oxygenated blood under high pressure through the aortic valve into systemic circulation.",
      "tags": ["anatomy", "heart", "cardiovascular"],
      "status": "active"
    },
    {
      "id": "ANAT-000002",
      "category": "Anatomy & Physiology",
      "subcategory": "Neuroanatomy",
      "difficulty": "medium",
      "question": "Which part of the brain is primarily responsible for motor coordination, balance, and fine motor skills?",
      "options": [
        "Cerebellum",
        "Cerebrum",
        "Hypothalamus",
        "Medulla oblongata"
      ],
      "answer": 0,
      "explanation": "The cerebellum coordinates voluntary muscle movements, equilibrium, and motor posture.",
      "tags": ["anatomy", "neuroscience", "brain"],
      "status": "active"
    },
    {
      "id": "ANAT-000003",
      "category": "Anatomy & Physiology",
      "subcategory": "Skeletal System",
      "difficulty": "easy",
      "question": "What is the longest and strongest bone in the human skeleton?",
      "options": [
        "Femur (thigh bone)",
        "Tibia (shin bone)",
        "Humerus (upper arm bone)",
        "Fibula"
      ],
      "answer": 0,
      "explanation": "The femur is the longest, heaviest, and strongest bone in the human body.",
      "tags": ["anatomy", "skeletal", "bones"],
      "status": "active"
    },
    {
      "id": "ANAT-000004",
      "category": "Anatomy & Physiology",
      "subcategory": "Endocrine System",
      "difficulty": "hard",
      "question": "The islets of Langerhans are microscopic clusters of endocrine cells located in which organ?",
      "options": [
        "Pancreas",
        "Liver",
        "Adrenal gland",
        "Thyroid gland"
      ],
      "answer": 0,
      "explanation": "The islets of Langerhans in the pancreas contain alpha, beta, and delta cells producing glucagon, insulin, and somatostatin.",
      "tags": ["anatomy", "endocrine", "pancreas"],
      "status": "active"
    }
  ],

  "pharmacology": [
    {
      "id": "PHARM-000001",
      "category": "Pharmacology",
      "subcategory": "Antihypertensives",
      "difficulty": "medium",
      "question": "Which class of antihypertensive medications commonly causes a dry, persistent cough due to bradykinin accumulation?",
      "options": [
        "ACE Inhibitors (e.g. Lisinopril)",
        "Beta Blockers (e.g. Metoprolol)",
        "Calcium Channel Blockers (e.g. Amlodipine)",
        "Thiazide Diuretics (e.g. Hydrochlorothiazide)"
      ],
      "answer": 0,
      "explanation": "ACE inhibitors prevent the breakdown of bradykinin and substance P in the respiratory tract, provoking a dry cough.",
      "tags": ["pharmacology", "hypertension", "ace-inhibitors"],
      "status": "active"
    },
    {
      "id": "PHARM-000002",
      "category": "Pharmacology",
      "subcategory": "Antidotes",
      "difficulty": "hard",
      "question": "What is the specific reversal agent (antidote) for heparin-induced anticoagulation?",
      "options": [
        "Protamine Sulfate",
        "Vitamin K (Phytonadione)",
        "Naloxone (Narcan)",
        "Flumazenil"
      ],
      "answer": 0,
      "explanation": "Protamine sulfate binds strongly to heparin to form an inactive salt complex. Vitamin K reverses Warfarin.",
      "tags": ["pharmacology", "antidotes", "hematology", "heparin"],
      "status": "active"
    },
    {
      "id": "PHARM-000003",
      "category": "Pharmacology",
      "subcategory": "Analgesics",
      "difficulty": "easy",
      "question": "What is the specific emergency reversal medication administered for opioid overdose (respiratory depression)?",
      "options": [
        "Naloxone (Narcan)",
        "Atropine",
        "Epinephrine",
        "Glucagon"
      ],
      "answer": 0,
      "explanation": "Naloxone is a pure opioid antagonist that rapidly displaces opioids from mu-receptors, reversing life-threatening respiratory depression.",
      "tags": ["pharmacology", "emergency", "opioids", "naloxone"],
      "status": "active"
    }
  ],

  "iq-logic": [
    {
      "id": "IQ-000001",
      "category": "IQ & Logic",
      "subcategory": "Number Series",
      "difficulty": "medium",
      "question": "Look at this sequence: 2, 6, 12, 20, 30, ___ . What number comes next in the pattern?",
      "options": [
        "42",
        "40",
        "38",
        "48"
      ],
      "answer": 0,
      "explanation": "The differences between consecutive terms increase by 2: +4, +6, +8, +10, so next is +12: 30 + 12 = 42.",
      "tags": ["iq-logic", "patterns", "series", "deduction"],
      "status": "active"
    },
    {
      "id": "IQ-000002",
      "category": "IQ & Logic",
      "subcategory": "Deductive Reasoning",
      "difficulty": "hard",
      "question": "If all Zips are Zaps, and some Zaps are Zops, which of the following statements is DEFINITIVELY true?",
      "options": [
        "Some Zaps are Zips",
        "All Zips are Zops",
        "No Zips are Zops",
        "All Zops are Zips"
      ],
      "answer": 0,
      "explanation": "If all Zips belong to the set of Zaps (assuming at least one Zip exists), then necessarily some elements in the set of Zaps are Zips.",
      "tags": ["iq-logic", "logic", "syllogisms"],
      "status": "active"
    },
    {
      "id": "IQ-000003",
      "category": "IQ & Logic",
      "subcategory": "Logic Riddles",
      "difficulty": "easy",
      "question": "A farmer has 17 sheep and all but 9 die. How many sheep are still alive?",
      "options": [
        "9",
        "8",
        "0",
        "17"
      ],
      "answer": 0,
      "explanation": "'All but 9 die' means exactly 9 sheep survived and are still alive.",
      "tags": ["iq-logic", "riddles", "math"],
      "status": "active"
    }
  ],

  "general-knowledge": [
    {
      "id": "GK-000001",
      "category": "General Knowledge",
      "subcategory": "Earth Science",
      "difficulty": "easy",
      "question": "What is the hardest naturally occurring mineral substance on planet Earth?",
      "options": [
        "Diamond",
        "Corundum",
        "Topaz",
        "Quartz"
      ],
      "answer": 0,
      "explanation": "Diamond rates a maximum of 10 on the Mohs scale of mineral hardness.",
      "tags": ["general-knowledge", "minerals", "science"],
      "status": "active"
    },
    {
      "id": "GK-000002",
      "category": "General Knowledge",
      "subcategory": "World Heritage",
      "difficulty": "medium",
      "question": "In which country is the ancient pre-Columbian Inca citadel of Machu Picchu located?",
      "options": [
        "Peru",
        "Bolivia",
        "Chile",
        "Mexico"
      ],
      "answer": 0,
      "explanation": "Machu Picchu is a 15th-century Inca citadel located in the Cusco Region of Peru.",
      "tags": ["general-knowledge", "geography", "history", "landmarks"],
      "status": "active"
    },
    {
      "id": "GK-000003",
      "category": "General Knowledge",
      "subcategory": "Oceans & Geography",
      "difficulty": "hard",
      "question": "What is the deepest known point in the Earth's oceans, situated in the Western Pacific?",
      "options": [
        "Challenger Deep (Mariana Trench)",
        "Puerto Rico Trench",
        "Java Trench",
        "Tonga Trench"
      ],
      "answer": 0,
      "explanation": "Challenger Deep in the Mariana Trench reaches a depth of approximately 10,928 meters (35,853 feet).",
      "tags": ["general-knowledge", "geography", "oceans"],
      "status": "active"
    }
  ],

  "entertainment": [
    {
      "id": "ENT-000001",
      "category": "Entertainment",
      "subcategory": "Comics & Cinema",
      "difficulty": "easy",
      "question": "Which superhero is famously known as the 'Dark Knight' of Gotham City?",
      "options": [
        "Batman",
        "Superman",
        "Iron Man",
        "Spider-Man"
      ],
      "answer": 0,
      "explanation": "Batman (Bruce Wayne) is widely referred to as the Dark Knight and Caped Crusader of Gotham City.",
      "tags": ["entertainment", "superheroes", "comics", "batman"],
      "status": "active"
    },
    {
      "id": "ENT-000002",
      "category": "Entertainment",
      "subcategory": "Academy Awards",
      "difficulty": "medium",
      "question": "Which movie tied the record with 11 Academy Awards in 1997?",
      "options": [
        "Titanic",
        "Avatar",
        "Gladiator",
        "Braveheart"
      ],
      "answer": 0,
      "explanation": "James Cameron's Titanic won 11 Oscars at the 70th Academy Awards.",
      "tags": ["entertainment", "movies", "oscars"],
      "status": "active"
    },
    {
      "id": "ENT-000003",
      "category": "Entertainment",
      "subcategory": "Film History",
      "difficulty": "hard",
      "question": "Who directed the 1927 groundbreaking German expressionist science-fiction film 'Metropolis'?",
      "options": [
        "Fritz Lang",
        "F. W. Murnau",
        "Robert Wiene",
        "Billy Wilder"
      ],
      "answer": 0,
      "explanation": "Fritz Lang directed the iconic silent dystopian film Metropolis in Weimar Germany in 1927.",
      "tags": ["entertainment", "movies", "film-history"],
      "status": "active"
    }
  ],

  "movies": [
    {
      "id": "MOV-000001",
      "category": "Movies",
      "subcategory": "Sci-Fi Classics",
      "difficulty": "easy",
      "question": "In the Star Wars saga, which character is Luke Skywalker's father?",
      "options": [
        "Darth Vader (Anakin Skywalker)",
        "Obi-Wan Kenobi",
        "Emperor Palpatine",
        "Grand Moff Tarkin"
      ],
      "answer": 0,
      "explanation": "Darth Vader reveals he is Luke's father in The Empire Strikes Back (1980).",
      "tags": ["movies", "star-wars", "sci-fi"],
      "status": "active"
    },
    {
      "id": "MOV-000002",
      "category": "Movies",
      "subcategory": "Box Office",
      "difficulty": "medium",
      "question": "Which 2009 James Cameron sci-fi film is the highest-grossing film of all time worldwide?",
      "options": [
        "Avatar",
        "Avengers: Endgame",
        "Titanic",
        "Star Wars: The Force Awakens"
      ],
      "answer": 0,
      "explanation": "Avatar (2009) grossed over $2.9 billion globally to become the highest-grossing movie in box office history.",
      "tags": ["movies", "box-office", "avatar"],
      "status": "active"
    },
    {
      "id": "MOV-000003",
      "category": "Movies",
      "subcategory": "Directors",
      "difficulty": "hard",
      "question": "Which director won Best Director Oscars for both 'Brokeback Mountain' (2005) and 'Life of Pi' (2012)?",
      "options": [
        "Ang Lee",
        "Bong Joon-ho",
        "Alejandro G. Iñárritu",
        "Guillermo del Toro"
      ],
      "answer": 0,
      "explanation": "Taiwanese-born director Ang Lee won two Academy Awards for Best Director for Brokeback Mountain and Life of Pi.",
      "tags": ["movies", "directors", "oscars"],
      "status": "active"
    }
  ],

  "tv-shows": [
    {
      "id": "TV-000001",
      "category": "TV Shows",
      "subcategory": "Streaming Series",
      "difficulty": "easy",
      "question": "In the Netflix series 'Stranger Things', what is the name of the alternate dimension beneath Hawkins?",
      "options": [
        "The Upside Down",
        "The Twilight Zone",
        "The Netherworld",
        "The Dark Realm"
      ],
      "answer": 0,
      "explanation": "The Upside Down is the dark alternate dimension mirroring Hawkins in Stranger Things.",
      "tags": ["tv-shows", "stranger-things", "netflix"],
      "status": "active"
    },
    {
      "id": "TV-000002",
      "category": "TV Shows",
      "subcategory": "Sitcoms",
      "difficulty": "medium",
      "question": "In the comedy sitcom 'Friends', what is the name of the central coffee shop where the gang meets?",
      "options": [
        "Central Perk",
        "Monk's Diner",
        "The Roasted Bean",
        "Cafe Nervosa"
      ],
      "answer": 0,
      "explanation": "Central Perk in Greenwich Village, NYC, is the iconic coffee house in Friends.",
      "tags": ["tv-shows", "friends", "sitcom"],
      "status": "active"
    },
    {
      "id": "TV-000003",
      "category": "TV Shows",
      "subcategory": "Emmy Winners",
      "difficulty": "hard",
      "question": "In AMC's 'Breaking Bad', what pseudonym did chemistry teacher Walter White adopt in the meth trade?",
      "options": [
        "Heisenberg",
        "Oppenheimer",
        "Schrödinger",
        "Fermi"
      ],
      "answer": 0,
      "explanation": "Walter White took the moniker 'Heisenberg', honoring German theoretical physicist Werner Heisenberg.",
      "tags": ["tv-shows", "breaking-bad", "drama"],
      "status": "active"
    }
  ],

  "drama": [
    {
      "id": "DRAMA-000001",
      "category": "Drama",
      "subcategory": "Crime Drama",
      "difficulty": "medium",
      "question": "Which acclaimed HBO drama series followed New Jersey mobster Tony Soprano balancing family and organized crime?",
      "options": [
        "The Sopranos",
        "The Wire",
        "Boardwalk Empire",
        "Peaky Blinders"
      ],
      "answer": 0,
      "explanation": "The Sopranos (1999-2007) starring James Gandolfini is considered a landmark television drama.",
      "tags": ["drama", "the-sopranos", "hbo"],
      "status": "active"
    },
    {
      "id": "DRAMA-000002",
      "category": "Drama",
      "subcategory": "Korean Drama",
      "difficulty": "easy",
      "question": "Which 2021 South Korean survival drama series became Netflix's most-watched series worldwide?",
      "options": [
        "Squid Game",
        "Crash Landing on You",
        "All of Us Are Dead",
        "The Glory"
      ],
      "answer": 0,
      "explanation": "Hwang Dong-hyuk's 'Squid Game' recorded over 1.65 billion viewing hours in its first 28 days.",
      "tags": ["drama", "squid-game", "k-drama"],
      "status": "active"
    },
    {
      "id": "DRAMA-000003",
      "category": "Drama",
      "subcategory": "Historical Drama",
      "difficulty": "hard",
      "question": "In the period drama 'Mad Men', what Madison Avenue advertising agency does Don Draper initially work for?",
      "options": [
        "Sterling Cooper",
        "McCann Erickson",
        "Cutler Gleason Chaough",
        "Ogilvy & Mather"
      ],
      "answer": 0,
      "explanation": "Don Draper is the creative director at Sterling Cooper Advertising Agency in 1960s New York.",
      "tags": ["drama", "mad-men", "tv"],
      "status": "active"
    }
  ],

  "celebrity": [
    {
      "id": "CELEB-000001",
      "category": "Celebrity",
      "subcategory": "Pop Icons",
      "difficulty": "easy",
      "question": "Which global superstar launched the record-breaking Eras Tour in 2023?",
      "options": [
        "Taylor Swift",
        "Beyoncé",
        "Rihanna",
        "Adele"
      ],
      "answer": 0,
      "explanation": "Taylor Swift's Eras Tour became the highest-grossing concert tour of all time.",
      "tags": ["celebrity", "music", "taylor-swift"],
      "status": "active"
    },
    {
      "id": "CELEB-000002",
      "category": "Celebrity",
      "subcategory": "Actors",
      "difficulty": "medium",
      "question": "Which actor won the Best Actor Oscar in 2024 for his portrayal of J. Robert Oppenheimer?",
      "options": [
        "Cillian Murphy",
        "Bradley Cooper",
        "Paul Giamatti",
        "Robert Downey Jr."
      ],
      "answer": 0,
      "explanation": "Irish actor Cillian Murphy won the 2024 Academy Award for Best Actor for Christopher Nolan's Oppenheimer.",
      "tags": ["celebrity", "oscars", "actors"],
      "status": "active"
    },
    {
      "id": "CELEB-000003",
      "category": "Celebrity",
      "subcategory": "EGOT Winners",
      "difficulty": "hard",
      "question": "Who was the first Black woman in entertainment history to achieve EGOT status (Emmy, Grammy, Oscar, Tony)?",
      "options": [
        "Whoopi Goldberg",
        "Viola Davis",
        "Jennifer Hudson",
        "Audra McDonald"
      ],
      "answer": 0,
      "explanation": "Whoopi Goldberg achieved EGOT status in 2002 after winning a Tony Award for Thoroughly Modern Millie.",
      "tags": ["celebrity", "egot", "history"],
      "status": "active"
    }
  ],

  "music": [
    {
      "id": "MUS-000001",
      "category": "Music",
      "subcategory": "Rock Legends",
      "difficulty": "easy",
      "question": "Which legendary English rock band featured John Lennon, Paul McCartney, George Harrison, and Ringo Starr?",
      "options": [
        "The Beatles",
        "The Rolling Stones",
        "The Who",
        "Led Zeppelin"
      ],
      "answer": 0,
      "explanation": "The Beatles formed in Liverpool in 1960 and are the best-selling band in music history.",
      "tags": ["music", "rock", "the-beatles"],
      "status": "active"
    },
    {
      "id": "MUS-000002",
      "category": "Music",
      "subcategory": "Album Milestones",
      "difficulty": "medium",
      "question": "Which 1982 album by Michael Jackson is the best-selling studio album of all time worldwide?",
      "options": [
        "Thriller",
        "Bad",
        "Off the Wall",
        "Dangerous"
      ],
      "answer": 0,
      "explanation": "Michael Jackson's Thriller (1982) produced by Quincy Jones has sold over 70 million copies worldwide.",
      "tags": ["music", "pop", "michael-jackson"],
      "status": "active"
    },
    {
      "id": "MUS-000003",
      "category": "Music",
      "subcategory": "Classical & Theory",
      "difficulty": "hard",
      "question": "Which famous classical composer composed his monumental Ninth Symphony (including 'Ode to Joy') while completely deaf?",
      "options": [
        "Ludwig van Beethoven",
        "Wolfgang Amadeus Mozart",
        "Johann Sebastian Bach",
        "Johannes Brahms"
      ],
      "answer": 0,
      "explanation": "Beethoven composed his Ninth Symphony (premiered in 1824) after suffering near-total hearing loss.",
      "tags": ["music", "classical", "beethoven"],
      "status": "active"
    }
  ],

  "history": [
    {
      "id": "HIST-000001",
      "category": "History",
      "subcategory": "Space Exploration",
      "difficulty": "easy",
      "question": "In which year did the Apollo 11 mission land the first humans on the Moon?",
      "options": [
        "1969",
        "1965",
        "1972",
        "1959"
      ],
      "answer": 0,
      "explanation": "On July 20, 1969, Neil Armstrong and Buzz Aldrin landed on the Moon aboard the Apollo 11 Lunar Module.",
      "tags": ["history", "space", "apollo"],
      "status": "active"
    },
    {
      "id": "HIST-000002",
      "category": "History",
      "subcategory": "Ancient World",
      "difficulty": "medium",
      "question": "Who was the first Emperor of a unified China, known for the Terracotta Army?",
      "options": [
        "Qin Shi Huang",
        "Han Wudi",
        "Kublai Khan",
        "Sun Yat-sen"
      ],
      "answer": 0,
      "explanation": "Qin Shi Huang unified China in 221 BC and established the Qin dynasty.",
      "tags": ["history", "ancient-china"],
      "status": "active"
    },
    {
      "id": "HIST-000003",
      "category": "History",
      "subcategory": "Treaties & Wars",
      "difficulty": "hard",
      "question": "The Treaty of Westphalia (1648) famously brought an end to which devastating European conflict?",
      "options": [
        "The Thirty Years' War",
        "The Hundred Years' War",
        "The Seven Years' War",
        "The War of the Spanish Succession"
      ],
      "answer": 0,
      "explanation": "The 1648 Peace of Westphalia ended the Thirty Years' War and established the concept of state sovereignty.",
      "tags": ["history", "europe", "treaties"],
      "status": "active"
    }
  ],

  "geography": [
    {
      "id": "GEO-000001",
      "category": "Geography",
      "subcategory": "Rivers",
      "difficulty": "easy",
      "question": "Which is widely recognized as the longest river in the world?",
      "options": [
        "The Nile River",
        "The Amazon River",
        "The Yangtze River",
        "The Mississippi River"
      ],
      "answer": 0,
      "explanation": "The Nile River in northeastern Africa flows approximately 6,650 km (4,132 miles).",
      "tags": ["geography", "rivers"],
      "status": "active"
    },
    {
      "id": "GEO-000002",
      "category": "Geography",
      "subcategory": "Capitals",
      "difficulty": "medium",
      "question": "What is the capital city of Australia?",
      "options": [
        "Canberra",
        "Sydney",
        "Melbourne",
        "Brisbane"
      ],
      "answer": 0,
      "explanation": "Canberra was founded in 1913 as the compromise capital between Sydney and Melbourne.",
      "tags": ["geography", "capitals"],
      "status": "active"
    },
    {
      "id": "GEO-000003",
      "category": "Geography",
      "subcategory": "Physical Geography",
      "difficulty": "hard",
      "question": "What is the only sea on Earth with no land boundaries, bounded entirely by ocean currents in the North Atlantic?",
      "options": [
        "Sargasso Sea",
        "Coral Sea",
        "Baltic Sea",
        "Tasman Sea"
      ],
      "answer": 0,
      "explanation": "The Sargasso Sea is defined entirely by four North Atlantic ocean currents that form an ocean gyre.",
      "tags": ["geography", "oceans"],
      "status": "active"
    }
  ],

  "science": [
    {
      "id": "SCI-000001",
      "category": "Science",
      "subcategory": "Physics",
      "difficulty": "medium",
      "question": "What is the speed of light in a vacuum (c)?",
      "options": [
        "Approximately 300,000 km/s (299,792 km/s)",
        "Approximately 150,000 km/s",
        "Approximately 500,000 km/s",
        "343 m/s"
      ],
      "answer": 0,
      "explanation": "Light in a vacuum travels at 299,792,458 meters per second (approx 3.0 × 10^8 m/s).",
      "tags": ["science", "physics", "light"],
      "status": "active"
    },
    {
      "id": "SCI-000002",
      "category": "Science",
      "subcategory": "Chemistry",
      "difficulty": "easy",
      "question": "What is the chemical symbol for Gold on the periodic table of elements?",
      "options": [
        "Au",
        "Ag",
        "Fe",
        "Gd"
      ],
      "answer": 0,
      "explanation": "'Au' comes from the Latin word for gold, 'Aurum'.",
      "tags": ["science", "chemistry", "periodic-table"],
      "status": "active"
    },
    {
      "id": "SCI-000003",
      "category": "Science",
      "subcategory": "Biology & Genetics",
      "difficulty": "hard",
      "question": "In molecular biology, which enzyme is responsible for synthesizing new DNA strands during replication by adding complementary nucleotides?",
      "options": [
        "DNA Polymerase",
        "RNA Helicase",
        "DNA Ligase",
        "Topoisomerase"
      ],
      "answer": 0,
      "explanation": "DNA Polymerase synthesizes new DNA strands by matching complementary deoxynucleotides to the template strand in the 5' to 3' direction.",
      "tags": ["science", "biology", "dna"],
      "status": "active"
    }
  ],

  "engineering": [
    {
      "id": "ENG-000001",
      "category": "Engineering",
      "subcategory": "Materials",
      "difficulty": "medium",
      "question": "According to Hooke's Law in mechanical engineering, stress is directly proportional to what within the elastic limit?",
      "options": [
        "Strain",
        "Temperature",
        "Volume",
        "Viscosity"
      ],
      "answer": 0,
      "explanation": "Hooke's Law states that within a material's elastic limit, stress is proportional to strain (σ = E · ε).",
      "tags": ["engineering", "mechanics", "materials"],
      "status": "active"
    },
    {
      "id": "ENG-000002",
      "category": "Engineering",
      "subcategory": "Civil & Structural",
      "difficulty": "easy",
      "question": "Which geometric shape is recognized as the most inherently stable and rigid structure used in bridges and roof trusses?",
      "options": [
        "Triangle",
        "Square",
        "Pentagon",
        "Rectangle"
      ],
      "answer": 0,
      "explanation": "Triangles cannot deform without changing the length of one of their sides, making them rigid under load.",
      "tags": ["engineering", "structural", "trusses"],
      "status": "active"
    },
    {
      "id": "ENG-000003",
      "category": "Engineering",
      "subcategory": "Fluid Dynamics",
      "difficulty": "hard",
      "question": "In fluid mechanics, which dimensionless number characterizes the transition between laminar and turbulent fluid flow?",
      "options": [
        "Reynolds Number (Re)",
        "Mach Number (Ma)",
        "Froude Number (Fr)",
        "Prandtl Number (Pr)"
      ],
      "answer": 0,
      "explanation": "The Reynolds number (Re) represents the ratio of inertial forces to viscous forces in a fluid flow.",
      "tags": ["engineering", "fluids", "reynolds"],
      "status": "active"
    }
  ],

  "technology": [
    {
      "id": "TECH-000001",
      "category": "Technology",
      "subcategory": "Internet",
      "difficulty": "easy",
      "question": "What does the abbreviation 'URL' stand for in web computing?",
      "options": [
        "Uniform Resource Locator",
        "Universal Remote Link",
        "Unified Routing Language",
        "User Resource Lookup"
      ],
      "answer": 0,
      "explanation": "A URL (Uniform Resource Locator) specifies the web address of a resource on the internet.",
      "tags": ["technology", "internet", "networking"],
      "status": "active"
    },
    {
      "id": "TECH-000002",
      "category": "Technology",
      "subcategory": "Artificial Intelligence",
      "difficulty": "medium",
      "question": "In Machine Learning, what does 'LLM' stand for?",
      "options": [
        "Large Language Model",
        "Linear Logic Matrix",
        "Layered Learning Module",
        "Logical Link Mechanism"
      ],
      "answer": 0,
      "explanation": "Large Language Models (LLMs) are deep learning transformer models trained on vast text corpora.",
      "tags": ["technology", "ai", "machine-learning"],
      "status": "active"
    },
    {
      "id": "TECH-000003",
      "category": "Technology",
      "subcategory": "Cybersecurity",
      "difficulty": "hard",
      "question": "In asymmetric cryptography, which key is used by a sender to encrypt a message so only the intended recipient can decrypt it?",
      "options": [
        "The recipient's Public Key",
        "The sender's Private Key",
        "The recipient's Private Key",
        "The sender's Public Key"
      ],
      "answer": 0,
      "explanation": "In public-key cryptography (e.g. RSA), data encrypted with a recipient's public key can only be decrypted using the recipient's matching private key.",
      "tags": ["technology", "security", "cryptography"],
      "status": "active"
    }
  ],

  "computers": [
    {
      "id": "COMP-000001",
      "category": "Computers",
      "subcategory": "Hardware",
      "difficulty": "easy",
      "question": "Which computer component is volatile memory that loses all data when the power is turned off?",
      "options": [
        "RAM (Random Access Memory)",
        "SSD (Solid State Drive)",
        "ROM (Read-Only Memory)",
        "NVMe Storage"
      ],
      "answer": 0,
      "explanation": "RAM is high-speed volatile working memory that clears when electrical power is removed.",
      "tags": ["computers", "hardware", "ram"],
      "status": "active"
    },
    {
      "id": "COMP-000002",
      "category": "Computers",
      "subcategory": "Data Units",
      "difficulty": "easy",
      "question": "How many binary bits are contained within exactly one standard Byte?",
      "options": [
        "8 bits",
        "4 bits",
        "16 bits",
        "32 bits"
      ],
      "answer": 0,
      "explanation": "One byte consists of 8 bits. A 4-bit nibble is half a byte.",
      "tags": ["computers", "binary", "data"],
      "status": "active"
    },
    {
      "id": "COMP-000003",
      "category": "Computers",
      "subcategory": "Architecture",
      "difficulty": "hard",
      "question": "In CPU architecture, what does the 'L1 Cache' offer compared to L2, L3, and main RAM?",
      "options": [
        "Smallest capacity but lowest latency and fastest access speed",
        "Largest storage capacity for persistent files",
        "Direct connection to graphics processing cores",
        "Non-volatile storage for BIOS firmware"
      ],
      "answer": 0,
      "explanation": "Level 1 (L1) cache is built directly into the processor core, operating at CPU clock speed with sub-nanosecond latency.",
      "tags": ["computers", "cpu", "cache"],
      "status": "active"
    }
  ],

  "automotive": [
    {
      "id": "AUTO-000001",
      "category": "Automotive",
      "subcategory": "Engines",
      "difficulty": "easy",
      "question": "In a 4-stroke internal combustion engine, what is the correct sequence of strokes?",
      "options": [
        "Intake, Compression, Power (Combustion), Exhaust",
        "Compression, Intake, Power, Exhaust",
        "Power, Intake, Compression, Exhaust",
        "Intake, Power, Compression, Exhaust"
      ],
      "answer": 0,
      "explanation": "The 4-stroke cycle consists of: 1. Intake, 2. Compression, 3. Power, 4. Exhaust.",
      "tags": ["automotive", "engines", "mechanics"],
      "status": "active"
    },
    {
      "id": "AUTO-000002",
      "category": "Automotive",
      "subcategory": "Braking",
      "difficulty": "medium",
      "question": "What is the primary function of an Anti-lock Braking System (ABS)?",
      "options": [
        "Prevent wheels from locking up during hard braking to maintain steering control",
        "Cut braking distance by 80%",
        "Engage the emergency parking brake automatically",
        "Cool the brake pads with fans"
      ],
      "answer": 0,
      "explanation": "ABS pulses brake hydraulic pressure to prevent tire skidding, allowing the driver to steer safely while braking hard.",
      "tags": ["automotive", "safety", "brakes"],
      "status": "active"
    },
    {
      "id": "AUTO-000003",
      "category": "Automotive",
      "subcategory": "Diagnostics",
      "difficulty": "hard",
      "question": "In automotive OBD-II onboard diagnostics, what does a Diagnostic Trouble Code (DTC) starting with 'P0300' indicate?",
      "options": [
        "Random or multiple cylinder engine misfire detected",
        "Oxygen sensor heater circuit malfunction",
        "Catalytic converter efficiency below threshold",
        "Evaporative emission system leak"
      ],
      "answer": 0,
      "explanation": "P0300 indicates that random or multiple cylinders are experiencing combustion misfires.",
      "tags": ["automotive", "obd2", "diagnostics"],
      "status": "active"
    }
  ],

  "mathematics": [
    {
      "id": "MATH-000001",
      "category": "Mathematics",
      "subcategory": "Geometry",
      "difficulty": "easy",
      "question": "What is the Pythagorean theorem for a right triangle with hypotenuse c and sides a and b?",
      "options": [
        "a² + b² = c²",
        "a + b = c",
        "a² × b² = c²",
        "2a + 2b = c²"
      ],
      "answer": 0,
      "explanation": "The Pythagorean theorem states: in a right-angled triangle, a² + b² = c².",
      "tags": ["mathematics", "geometry"],
      "status": "active"
    },
    {
      "id": "MATH-000002",
      "category": "Mathematics",
      "subcategory": "Statistics",
      "difficulty": "medium",
      "question": "What is the arithmetic mean (average) of the numbers: 12, 18, 24, 30, and 36?",
      "options": [
        "24",
        "22",
        "26",
        "28"
      ],
      "answer": 0,
      "explanation": "Sum = 12 + 18 + 24 + 30 + 36 = 120. Divide by 5 = 24.",
      "tags": ["mathematics", "statistics", "mean"],
      "status": "active"
    },
    {
      "id": "MATH-000003",
      "category": "Mathematics",
      "subcategory": "Calculus",
      "difficulty": "hard",
      "question": "What is the first derivative with respect to x of the function f(x) = x³ - 4x² + 7x - 5?",
      "options": [
        "f'(x) = 3x² - 8x + 7",
        "f'(x) = 3x² - 4x + 7",
        "f'(x) = x² - 8x + 7",
        "f'(x) = 3x³ - 8x² + 7"
      ],
      "answer": 0,
      "explanation": "Using the power rule d/dx[x^n] = n*x^(n-1): d/dx[x³] = 3x², d/dx[-4x²] = -8x, d/dx[7x] = 7, d/dx[-5] = 0.",
      "tags": ["mathematics", "calculus", "derivatives"],
      "status": "active"
    }
  ],

  "english": [
    {
      "id": "ENG-LANG-000001",
      "category": "English & Grammar",
      "subcategory": "Grammar",
      "difficulty": "easy",
      "question": "Which sentence demonstrates correct subject-verb agreement?",
      "options": [
        "Neither the doctor nor the nurses were available.",
        "Neither the doctor nor the nurses was available.",
        "Every one of the candidates have submitted papers.",
        "The list of items are on the desk."
      ],
      "answer": 0,
      "explanation": "With 'neither... nor...', the verb agrees with the closer subject ('the nurses' is plural, requiring 'were').",
      "tags": ["english", "grammar"],
      "status": "active"
    },
    {
      "id": "ENG-LANG-000002",
      "category": "English & Grammar",
      "subcategory": "Vocabulary",
      "difficulty": "medium",
      "question": "What is the antonym (opposite meaning) of the word 'Ephemeral'?",
      "options": [
        "Permanent",
        "Fleeting",
        "Transient",
        "Brief"
      ],
      "answer": 0,
      "explanation": "'Ephemeral' means lasting for a very short time; its antonym is 'permanent' or 'enduring'.",
      "tags": ["english", "vocabulary", "antonyms"],
      "status": "active"
    },
    {
      "id": "ENG-LANG-000003",
      "category": "English & Grammar",
      "subcategory": "Figures of Speech",
      "difficulty": "hard",
      "question": "What rhetorical device is used in the phrase 'He is no fool' to affirm a positive by negating its contrary?",
      "options": [
        "Litotes",
        "Chiasmus",
        "Synecdoche",
        "Metonymy"
      ],
      "answer": 0,
      "explanation": "Litotes is an understatement in which an affirmative is expressed by negating its opposite (e.g. 'not bad', 'no fool').",
      "tags": ["english", "rhetoric", "figures-of-speech"],
      "status": "active"
    }
  ]
};

// Write each category to question-bank/<category>.json
let totalWritten = 0;
for (const [catSlug, questions] of Object.entries(categoryData)) {
  const filePath = path.join(qbDir, `${catSlug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), "utf8");
  totalWritten += questions.length;
  console.log(`✓ Wrote ${questions.length} questions to question-bank/${catSlug}.json`);
}

console.log(`\n🎉 Total questions seeded in Question Bank: ${totalWritten}`);
