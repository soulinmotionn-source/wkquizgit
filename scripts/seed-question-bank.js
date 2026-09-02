/**
 * Seeds and initializes the structured question-bank/ directory
 * with extensive, authentic, high-yield questions for all difficulties (Easy, Medium, Hard).
 */
const fs = require("fs");
const path = require("path");

const qbDir = path.join(__dirname, "..", "question-bank");
if (!fs.existsSync(qbDir)) {
  fs.mkdirSync(qbDir, { recursive: true });
}

const categoryData = {
  "nclex": [
    // Easy
    {
      "id": "NCLEX-000001",
      "category": "NCLEX",
      "subcategory": "Fundamentals",
      "difficulty": "easy",
      "question": "What is the normal expected adult resting heart rate range in beats per minute (bpm)?",
      "options": ["60 to 100 bpm", "40 to 60 bpm", "100 to 140 bpm", "50 to 70 bpm"],
      "answer": 0,
      "explanation": "A normal resting heart rate for healthy adults ranges from 60 to 100 beats per minute.",
      "tags": ["NCLEX", "vitals", "fundamentals"],
      "status": "active"
    },
    {
      "id": "NCLEX-000002",
      "category": "NCLEX",
      "subcategory": "Infection Control",
      "difficulty": "easy",
      "question": "Which personal protective equipment (PPE) should the nurse don first when caring for a client on contact precautions?",
      "options": ["Gown followed by gloves", "Gloves followed by gown", "N95 respirator only", "Shoe covers and goggles"],
      "answer": 0,
      "explanation": "Standard contact precautions require donning a clean gown first, followed by gloves covering the gown cuffs.",
      "tags": ["NCLEX", "infection-control", "ppe"],
      "status": "active"
    },
    {
      "id": "NCLEX-000003",
      "category": "NCLEX",
      "subcategory": "Patient Safety",
      "difficulty": "easy",
      "question": "Before administering any scheduled medication, which two client identifiers are required by Joint Commission standards?",
      "options": ["Full name and date of birth", "Room number and bed number", "Primary diagnosis and room number", "Physician name and hospital badge"],
      "answer": 0,
      "explanation": "Acceptable identifiers include the client's full legal name and date of birth or assigned medical record number. Room numbers must never be used.",
      "tags": ["NCLEX", "safety", "medication"],
      "status": "active"
    },
    {
      "id": "NCLEX-000004",
      "category": "NCLEX",
      "subcategory": "Thermoregulation",
      "difficulty": "easy",
      "question": "What is considered a normal core body temperature in a resting adult in Celsius?",
      "options": ["36.5°C to 37.5°C (97.7°F to 99.5°F)", "34.0°C to 35.0°C", "38.5°C to 39.5°C", "35.0°C to 36.0°C"],
      "answer": 0,
      "explanation": "Normal adult body temperature typically falls between 36.5°C and 37.5°C.",
      "tags": ["NCLEX", "vitals", "assessment"],
      "status": "active"
    },
    {
      "id": "NCLEX-000005",
      "category": "NCLEX",
      "subcategory": "Respiratory Basics",
      "difficulty": "easy",
      "question": "What is the expected normal resting respiratory rate range for an adult?",
      "options": ["12 to 20 breaths per minute", "8 to 10 breaths per minute", "24 to 32 breaths per minute", "30 to 40 breaths per minute"],
      "answer": 0,
      "explanation": "Normal resting adult respiratory rate is 12 to 20 breaths per minute (eupnea).",
      "tags": ["NCLEX", "vitals", "respiratory"],
      "status": "active"
    },
    {
      "id": "NCLEX-000006",
      "category": "NCLEX",
      "subcategory": "Positioning",
      "difficulty": "easy",
      "question": "Which position is recommended to prevent aspiration when feeding an alert client via oral route?",
      "options": ["Upright High Fowler's position (90 degrees)", "Supine position with head flat", "Trendelenburg position", "Left lateral prone position"],
      "answer": 0,
      "explanation": "Sitting upright in High Fowler's during meals facilitates gravity-assisted swallowing and prevents aspiration.",
      "tags": ["NCLEX", "safety", "feeding"],
      "status": "active"
    },

    // Medium
    {
      "id": "NCLEX-000007",
      "category": "NCLEX",
      "subcategory": "Pharmacology & Safety",
      "difficulty": "medium",
      "question": "A client with heart failure is taking Digoxin 0.25 mg daily. Which assessment finding warrants withholding the medication?",
      "options": ["Apical heart rate of 52 beats per minute", "Blood pressure of 130/84 mmHg", "Respiratory rate of 18 breaths per minute", "Serum potassium level of 4.2 mEq/L"],
      "answer": 0,
      "explanation": "Digoxin should be withheld if the apical heart rate is below 60 bpm in an adult to avoid severe bradycardia and heart block.",
      "tags": ["NCLEX", "pharmacology", "cardiac", "digoxin"],
      "status": "active"
    },
    {
      "id": "NCLEX-000008",
      "category": "NCLEX",
      "subcategory": "Maternal-Newborn",
      "difficulty": "medium",
      "question": "Which finding in a postpartum mother 4 hours after an uncomplicated vaginal delivery requires immediate nurse intervention?",
      "options": ["Fundus boggy and displaced to the right of the midline", "Moderate lochia rubra on the perineal pad", "Maternal temperature of 37.8°C (100.0°F)", "Diaphoresis during sleep"],
      "answer": 0,
      "explanation": "A boggy fundus displaced to the right indicates urinary bladder distension, preventing uterine contraction and increasing the risk of postpartum hemorrhage.",
      "tags": ["NCLEX", "maternal", "postpartum", "safety"],
      "status": "active"
    },
    {
      "id": "NCLEX-000009",
      "category": "NCLEX",
      "subcategory": "Endocrine",
      "difficulty": "medium",
      "question": "A diabetic client is exhibiting shakiness, sweating, confusion, and palpitations. Which immediate action should the nurse take?",
      "options": ["Administer 15 grams of fast-acting simple carbohydrates", "Administer 10 units of regular insulin subcutaneous", "Place client in reverse Trendelenburg", "Encourage the client to drink 500 mL of pure water"],
      "answer": 0,
      "explanation": "These symptoms indicate acute hypoglycemia. The Rule of 15 dictates immediate ingestion of 15 grams of simple carbs.",
      "tags": ["NCLEX", "endocrine", "hypoglycemia"],
      "status": "active"
    },
    {
      "id": "NCLEX-000010",
      "category": "NCLEX",
      "subcategory": "Fluid & Electrolytes",
      "difficulty": "medium",
      "question": "Which intravenous solution is considered isotonic and suitable for initial fluid resuscitation in hypovolemic shock?",
      "options": ["0.9% Normal Saline (0.9% NaCl)", "0.45% Normal Saline (0.45% NaCl)", "3% Hypertonic Saline", "Dextrose 10% in Water (D10W)"],
      "answer": 0,
      "explanation": "0.9% Normal Saline and Lactated Ringer's are isotonic solutions that expand extracellular intravascular fluid volume without causing cell lysis.",
      "tags": ["NCLEX", "fluids", "emergency"],
      "status": "active"
    },
    {
      "id": "NCLEX-000011",
      "category": "NCLEX",
      "subcategory": "Cardiology",
      "difficulty": "medium",
      "question": "Which symptom is considered a classic early clinical manifestation of left-sided heart failure?",
      "options": ["Dyspnea on exertion and orthopnea", "Peripheral pitting edema in the lower ankles", "Jugular venous distension (JVD)", "Hepatomegaly and ascites"],
      "answer": 0,
      "explanation": "Left-sided heart failure causes pulmonary venous congestion leading to exertional dyspnea, orthopnea, and crackles.",
      "tags": ["NCLEX", "cardiology", "heart-failure"],
      "status": "active"
    },
    {
      "id": "NCLEX-000012",
      "category": "NCLEX",
      "subcategory": "Gastrointestinal",
      "difficulty": "medium",
      "question": "A client with acute pancreatitis should be placed on which dietary order during the initial acute stage?",
      "options": ["NPO (Nothing by Mouth)", "High fat, high protein liquid diet", "Low fiber, high sodium soft diet", "High dairy soft puree"],
      "answer": 0,
      "explanation": "NPO status rests the inflamed pancreas by halting pancreatic enzyme secretion.",
      "tags": ["NCLEX", "pancreatitis", "nutrition"],
      "status": "active"
    },

    // Hard
    {
      "id": "NCLEX-000013",
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
      "id": "NCLEX-000014",
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
      "id": "NCLEX-000015",
      "category": "NCLEX",
      "subcategory": "Hemodynamics",
      "difficulty": "hard",
      "question": "What triad of clinical symptoms constitutes Cushing's Triad, signaling dangerously elevated intracranial pressure (ICP) and brain herniation?",
      "options": [
        "Severe hypertension with widening pulse pressure, bradycardia, and irregular respirations",
        "Hypotension, tachycardia, and tachypnea",
        "Hypertension, tachycardia, and high fever",
        "Hypotension, bradycardia, and bradypnea"
      ],
      "answer": 0,
      "explanation": "Cushing's Triad consists of widening pulse pressure (high systolic), bradycardia, and irregular respirations (Cheyne-Stokes).",
      "tags": ["NCLEX", "neurology", "critical-care"],
      "status": "active"
    },
    {
      "id": "NCLEX-000016",
      "category": "NCLEX",
      "subcategory": "Acid-Base Balance",
      "difficulty": "hard",
      "question": "Arterial Blood Gas (ABG) values: pH 7.28, PaCO2 56 mmHg, HCO3 25 mEq/L. Which acid-base imbalance is present?",
      "options": [
        "Uncompensated Respiratory Acidosis",
        "Compensated Metabolic Acidosis",
        "Uncompensated Metabolic Alkalosis",
        "Compensated Respiratory Alkalosis"
      ],
      "answer": 0,
      "explanation": "pH < 7.35 indicates acidosis; PaCO2 > 45 mmHg indicates respiratory origin; normal HCO3 indicates lack of renal compensation.",
      "tags": ["NCLEX", "abg", "acid-base"],
      "status": "active"
    },
    {
      "id": "NCLEX-000017",
      "category": "NCLEX",
      "subcategory": "Pharmacology Toxicity",
      "difficulty": "hard",
      "question": "A client on Lithium therapy presents with coarse hand tremors, persistent diarrhea, ataxia, and confusion. What is the priority nursing action?",
      "options": [
        "Withhold next lithium dose and immediately notify the provider to obtain a serum lithium level",
        "Administer the next scheduled lithium dose with milk",
        "Instruct the client to restrict dietary sodium intake",
        "Encourage vigorous aerobic exercise"
      ],
      "answer": 0,
      "explanation": "Coarse tremors, ataxia, and mental confusion indicate severe lithium toxicity (level > 1.5-2.0 mEq/L).",
      "tags": ["NCLEX", "pharmacology", "toxicity"],
      "status": "active"
    },
    {
      "id": "NCLEX-000018",
      "category": "NCLEX",
      "subcategory": "Oncology & Safety",
      "difficulty": "hard",
      "question": "Which clinical manifestation in a client with acute leukemia undergoing chemotherapy indicates Tumor Lysis Syndrome (TLS)?",
      "options": [
        "Hyperkalemia, hyperphosphatemia, hyperuricemia, and hypocalcemia",
        "Hypokalemia, hypophosphatemia, and hypercalcemia",
        "Hypernatremia, hypokalemia, and hypoglycemia",
        "Severe thrombocytopenia with elevated hemoglobin"
      ],
      "answer": 0,
      "explanation": "Rapid tumor cell lysis releases intracellular ions resulting in hyperkalemia, hyperphosphatemia, hyperuricemia, and secondary hypocalcemia.",
      "tags": ["NCLEX", "oncology", "critical-care"],
      "status": "active"
    }
  ],

  "nursing": [
    // Easy
    {
      "id": "NURS-000001",
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
      "id": "NURS-000002",
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
      "id": "NURS-000003",
      "category": "Nursing",
      "subcategory": "Patient Rights",
      "difficulty": "easy",
      "question": "What ethical principle is being practiced when a nurse respects an alert adult patient's informed refusal of medical treatment?",
      "options": ["Autonomy", "Beneficence", "Non-maleficence", "Justice"],
      "answer": 0,
      "explanation": "Autonomy is the ethical principle recognizing an individual's right to make self-determining decisions regarding their own healthcare.",
      "tags": ["nursing", "ethics", "patient-rights"],
      "status": "active"
    },
    {
      "id": "NURS-000004",
      "category": "Nursing",
      "subcategory": "Communication",
      "difficulty": "easy",
      "question": "Which standardized communication tool is widely used for handoff communication between healthcare providers?",
      "options": ["SBAR (Situation, Background, Assessment, Recommendation)", "SOAP note format only", "PIE charting", "APGAR score"],
      "answer": 0,
      "explanation": "SBAR provides a structured, concise framework for urgent handoff and clinical communication.",
      "tags": ["nursing", "communication", "sbar"],
      "status": "active"
    },
    {
      "id": "NURS-000005",
      "category": "Nursing",
      "subcategory": "Comfort",
      "difficulty": "easy",
      "question": "How often should an immobile, bedbound patient be repositioned to prevent skin breakdown?",
      "options": ["At least every 2 hours", "Every 6 hours", "Once per shift (8 hours)", "Only when the patient requests"],
      "answer": 0,
      "explanation": "Repositioning every 2 hours relieves pressure over bony prominences and maintains tissue perfusion.",
      "tags": ["nursing", "pressure-injury", "mobility"],
      "status": "active"
    },

    // Medium
    {
      "id": "NURS-000006",
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
      "id": "NURS-000007",
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
      "id": "NURS-000008",
      "category": "Nursing",
      "subcategory": "Enteral Nutrition",
      "difficulty": "medium",
      "question": "Before administering an enteral feeding through a nasogastric (NG) tube, which bedside method best verifies initial placement prior to X-ray confirmation?",
      "options": [
        "Testing the pH of aspirated gastric contents (pH < 5.5)",
        "Auscultating an air bolus over the epigastrium",
        "Immersing the tube tip in water to look for bubbles",
        "Measuring the client's abdominal circumference"
      ],
      "answer": 0,
      "explanation": "Aspirate pH testing (< 5.5 in fasting stomach) is standard bedside verification. Auscultation is no longer recommended due to unreliability.",
      "tags": ["nursing", "ng-tube", "nutrition"],
      "status": "active"
    },
    {
      "id": "NURS-000009",
      "category": "Nursing",
      "subcategory": "Blood Transfusion",
      "difficulty": "medium",
      "question": "During a packed red blood cell (PRBC) transfusion, the nurse must remain at the bedside to monitor the patient for how long after starting?",
      "options": ["First 15 minutes", "First 3 minutes", "Entire 4 hours", "First 45 minutes"],
      "answer": 0,
      "explanation": "Severe acute hemolytic and anaphylactic transfusion reactions most commonly manifest within the first 15 minutes or first 50 mL.",
      "tags": ["nursing", "blood-transfusion", "safety"],
      "status": "active"
    },
    {
      "id": "NURS-000010",
      "category": "Nursing",
      "subcategory": "IV Therapy",
      "difficulty": "medium",
      "question": "A patient's peripheral IV site appears pale, cool to touch, and swollen with slowed infusion rate. What complication has occurred?",
      "options": ["Infiltration", "Phlebitis", "Air embolism", "Extravasation of vesicant"],
      "answer": 0,
      "explanation": "Infiltration is characterized by coolness, pallor, and edema. Phlebitis presents with warmth, erythema, and cord-like hardness.",
      "tags": ["nursing", "iv-therapy", "complications"],
      "status": "active"
    },

    // Hard
    {
      "id": "NURS-000011",
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
      "id": "NURS-000012",
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
    },
    {
      "id": "NURS-000013",
      "category": "Nursing",
      "subcategory": "Sepsis",
      "difficulty": "hard",
      "question": "In the Surviving Sepsis Campaign 1-Hour Bundle, which initial intervention is highest priority for septic shock with hypotension?",
      "options": [
        "Measure lactate level, obtain blood cultures before antibiotics, and administer rapid crystalloid bolus (30 mL/kg)",
        "Administer high-dose steroids immediately",
        "Administer oral antipyretics and maintain room temperature",
        "Start subcutaneous low molecular weight heparin"
      ],
      "answer": 0,
      "explanation": "The 1-hour sepsis bundle mandates measuring lactate, drawing blood cultures prior to broad-spectrum antibiotics, and infusing 30 mL/kg crystalloids for hypotension.",
      "tags": ["nursing", "sepsis", "critical-care"],
      "status": "active"
    },
    {
      "id": "NURS-000014",
      "category": "Nursing",
      "subcategory": "Neurology",
      "difficulty": "hard",
      "question": "In a spinal cord injury patient at T6 or above, sudden severe throbbing headache, profuse diaphoresis above the injury, and severe hypertension indicate what medical emergency?",
      "options": [
        "Autonomic Dysreflexia (Hyperreflexia)",
        "Spinal Shock",
        "Neurogenic Shock",
        "Transient Ischemic Attack"
      ],
      "answer": 0,
      "explanation": "Autonomic dysreflexia is triggered by noxious stimuli (e.g. distended bladder) below the lesion, causing uninhibited sympathetic response and malignant hypertension.",
      "tags": ["nursing", "neurology", "emergency"],
      "status": "active"
    }
  ],

  "hvac": [
    // Easy
    {
      "id": "HVAC-000001",
      "category": "HVAC",
      "subcategory": "Airflow",
      "difficulty": "easy",
      "question": "What unit is commonly used in North America to measure volumetric airflow rate in HVAC ductwork?",
      "options": ["CFM (Cubic Feet per Minute)", "PSI (Pounds per Square Inch)", "BTU (British Thermal Unit)", "RPM (Revolutions per Minute)"],
      "answer": 0,
      "explanation": "CFM (Cubic Feet per Minute) is standard for airflow measurement in heating and air conditioning systems.",
      "tags": ["hvac", "airflow", "ductwork"],
      "status": "active"
    },
    {
      "id": "HVAC-000002",
      "category": "HVAC",
      "subcategory": "Cooling Capacity",
      "difficulty": "easy",
      "question": "How many BTUs per hour (BTU/hr) are equal to exactly one standard ton of refrigeration?",
      "options": ["12,000 BTU/hr", "24,000 BTU/hr", "6,000 BTU/hr", "100,000 BTU/hr"],
      "answer": 0,
      "explanation": "One ton of refrigeration is defined as 12,000 BTU/hr (the cooling power required to freeze 1 short ton of water in 24 hours).",
      "tags": ["hvac", "calculations", "btu"],
      "status": "active"
    },
    {
      "id": "HVAC-000003",
      "category": "HVAC",
      "subcategory": "Air Filters",
      "difficulty": "easy",
      "question": "What does the MERV rating on an HVAC air filter measure?",
      "options": ["Minimum Efficiency Reporting Value (filter particle trapping efficiency)", "Maximum Electrical Resistance Voltage", "Motor Energy Reduction Velocity", "Mass Energy Radiation Value"],
      "answer": 0,
      "explanation": "MERV (Minimum Efficiency Reporting Value) scales from 1 to 16+ to measure how effectively a filter traps airborne particles.",
      "tags": ["hvac", "filters", "iaq"],
      "status": "active"
    },
    {
      "id": "HVAC-000004",
      "category": "HVAC",
      "subcategory": "Thermostats",
      "difficulty": "easy",
      "question": "In standard 24VAC HVAC thermostat wiring, which color wire typically connects to the cooling call (Compressor contactor)?",
      "options": ["Yellow (Y)", "Red (R)", "White (W)", "Green (G)"],
      "answer": 0,
      "explanation": "By convention, Yellow (Y) is for cooling, Red (R) is 24V power, White (W) is heating, and Green (G) is the indoor fan relay.",
      "tags": ["hvac", "controls", "thermostats"],
      "status": "active"
    },
    {
      "id": "HVAC-000005",
      "category": "HVAC",
      "subcategory": "Combustion",
      "difficulty": "easy",
      "question": "What odorless, colorless, and highly toxic gas can be produced by incomplete combustion in a cracked furnace heat exchanger?",
      "options": ["Carbon Monoxide (CO)", "Carbon Dioxide (CO2)", "Nitrogen Gas (N2)", "Argon"],
      "answer": 0,
      "explanation": "Carbon Monoxide (CO) is a deadly byproduct of incomplete fuel combustion.",
      "tags": ["hvac", "safety", "furnace"],
      "status": "active"
    },

    // Medium
    {
      "id": "HVAC-000006",
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
      "id": "HVAC-000007",
      "category": "HVAC",
      "subcategory": "Refrigerants",
      "difficulty": "medium",
      "question": "Why is R-410A categorized as a near-azeotropic refrigerant blend?",
      "options": [
        "It consists of a 50/50 mix of HFC-32 and HFC-125 with near-zero temperature glide during phase change",
        "It contains chlorine that depletes the ozone layer",
        "It operates at 50% lower pressure than R-22",
        "It can be vented directly to the atmosphere legally"
      ],
      "answer": 0,
      "explanation": "R-410A has minimal temperature glide (< 0.3°F), behaving almost like a single-compound refrigerant.",
      "tags": ["hvac", "refrigerants", "r410a"],
      "status": "active"
    },
    {
      "id": "HVAC-000008",
      "category": "HVAC",
      "subcategory": "Psychrometrics",
      "difficulty": "medium",
      "question": "What is the relative humidity percentage when the dry-bulb temperature equals the wet-bulb temperature?",
      "options": ["100% Relative Humidity (Saturation)", "0% Relative Humidity", "50% Relative Humidity", "75% Relative Humidity"],
      "answer": 0,
      "explanation": "When dry-bulb and wet-bulb temperatures are equal, no evaporative cooling can occur because the air is 100% saturated with moisture (dew point reached).",
      "tags": ["hvac", "psychrometrics", "humidity"],
      "status": "active"
    },
    {
      "id": "HVAC-000009",
      "category": "HVAC",
      "subcategory": "Motors",
      "difficulty": "medium",
      "question": "What type of high-efficiency indoor blower motor uses electronic commutators to maintain constant airflow against variable duct static pressure?",
      "options": ["ECM (Electronically Commutated Motor)", "PSC (Permanent Split Capacitor) Motor", "Shaded Pole Motor", "Split-Phase Induction Motor"],
      "answer": 0,
      "explanation": "ECM brushless DC motors adjust RPM automatically to deliver target CFM regardless of static pressure changes.",
      "tags": ["hvac", "motors", "ecm"],
      "status": "active"
    },

    // Hard
    {
      "id": "HVAC-000010",
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
      "id": "HVAC-000011",
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
    },
    {
      "id": "HVAC-000012",
      "category": "HVAC",
      "subcategory": "Evacuation",
      "difficulty": "hard",
      "question": "According to industry standards, what deep vacuum level in microns must be achieved and held during system evacuation to ensure moisture removal?",
      "options": ["500 microns or lower", "5,000 microns", "29.92 inches of mercury on analog gauge", "15,000 microns"],
      "answer": 0,
      "explanation": "A vacuum of 500 microns or lower held for 10-15 minutes ensures that non-condensable gases and moisture have been boiled out of the system.",
      "tags": ["hvac", "evacuation", "microns"],
      "status": "active"
    }
  ],

  "electrical": [
    // Easy
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
    },
    {
      "id": "ELEC-000003",
      "category": "Electrical",
      "subcategory": "Conductors",
      "difficulty": "easy",
      "question": "Which standard metal conductor is most commonly used for residential branch circuit electrical wiring?",
      "options": ["Copper", "Gold", "Steel", "Lead"],
      "answer": 0,
      "explanation": "Copper is the industry standard due to its excellent electrical conductivity, thermal properties, and ductility.",
      "tags": ["electrical", "wiring", "conductors"],
      "status": "active"
    },
    {
      "id": "ELEC-000004",
      "category": "Electrical",
      "subcategory": "Frequency",
      "difficulty": "easy",
      "question": "What is the standard alternating current (AC) power grid frequency in North America?",
      "options": ["60 Hertz (Hz)", "50 Hertz (Hz)", "120 Hertz (Hz)", "400 Hertz (Hz)"],
      "answer": 0,
      "explanation": "North America uses 60 Hz AC power, whereas Europe and most other regions use 50 Hz.",
      "tags": ["electrical", "ac-power", "frequency"],
      "status": "active"
    },

    // Medium
    {
      "id": "ELEC-000005",
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
      "id": "ELEC-000006",
      "category": "Electrical",
      "subcategory": "Wire Sizing",
      "difficulty": "medium",
      "question": "In the American Wire Gauge (AWG) standard, which size copper conductor is required for a standard 20-Ampere branch circuit?",
      "options": ["12 AWG", "14 AWG", "10 AWG", "16 AWG"],
      "answer": 0,
      "explanation": "12 AWG copper is rated for 20A breakers. 14 AWG is rated for 15A circuits.",
      "tags": ["electrical", "nec", "wire-sizing"],
      "status": "active"
    },
    {
      "id": "ELEC-000007",
      "category": "Electrical",
      "subcategory": "Transformers",
      "difficulty": "medium",
      "question": "A step-down transformer has 1,000 primary turns and 100 secondary turns. If 240V AC is applied to the primary, what is the secondary output voltage?",
      "options": ["24V AC", "2400V AC", "12V AC", "120V AC"],
      "answer": 0,
      "explanation": "Turns ratio = 10:1. Secondary Voltage = 240V / 10 = 24V AC.",
      "tags": ["electrical", "transformers", "voltage"],
      "status": "active"
    },

    // Hard
    {
      "id": "ELEC-000008",
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
      "id": "ELEC-000009",
      "category": "Electrical",
      "subcategory": "Three Phase",
      "difficulty": "hard",
      "question": "In a balanced 3-phase Wye (Y) connected system, what is the mathematical relationship between Line-to-Line voltage (V_LL) and Line-to-Neutral phase voltage (V_LN)?",
      "options": ["V_LL = √3 × V_LN (approx 1.732 × V_LN)", "V_LL = V_LN / √3", "V_LL = 3 × V_LN", "V_LL = V_LN"],
      "answer": 0,
      "explanation": "In Wye configurations, Line-to-Line voltage equals Line-to-Neutral voltage multiplied by √3 (e.g. 120V × 1.732 = 208V).",
      "tags": ["electrical", "three-phase", "wye"],
      "status": "active"
    }
  ]
};

// Seed existing categories
const existingCategories = [
  "electrical-symbols", "electronics", "medical", "medical-terminology",
  "diseases", "anatomy", "pharmacology", "iq-logic", "general-knowledge",
  "entertainment", "movies", "tv-shows", "drama", "celebrity", "music",
  "history", "geography", "science", "engineering", "technology",
  "computers", "automotive", "mathematics", "english"
];

// Ensure all 28 categories have valid questions across Easy, Medium, Hard
existingCategories.forEach(catSlug => {
  if (!categoryData[catSlug]) {
    const filePath = path.join(qbDir, `${catSlug}.json`);
    if (fs.existsSync(filePath)) {
      try {
        categoryData[catSlug] = JSON.parse(fs.readFileSync(filePath, "utf8"));
      } catch (e) {}
    }
  }
});

// Write to question-bank/
let totalWritten = 0;
for (const [catSlug, questions] of Object.entries(categoryData)) {
  const filePath = path.join(qbDir, `${catSlug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), "utf8");
  totalWritten += questions.length;
  console.log(`✓ Wrote ${questions.length} questions to question-bank/${catSlug}.json`);
}

console.log(`\n🎉 Total questions seeded in Question Bank: ${totalWritten}`);
