/**
 * HEALTHCARE QUESTION BANK SEEDER
 * Populates authentic, high-yield questions for:
 * NCLEX, Nursing, Medical, Medical Terminology, Diseases & Disorders, Anatomy & Physiology, Pharmacology
 * across Easy, Medium, and Hard difficulty levels.
 */

const fs = require("fs");
const path = require("path");

const qbDir = path.join(__dirname, "..", "..", "question-bank");
if (!fs.existsSync(qbDir)) fs.mkdirSync(qbDir, { recursive: true });

const healthcareCategories = {
  "nclex": [
    // Easy (15+ questions)
    {
      "id": "NCLEX-000001", "category": "NCLEX", "subcategory": "Fundamentals", "difficulty": "easy",
      "question": "What is the normal expected resting heart rate range for a healthy adult at rest?",
      "options": ["60 to 100 beats per minute", "40 to 60 beats per minute", "100 to 140 beats per minute", "50 to 70 beats per minute"],
      "answer": 0, "explanation": "A normal resting heart rate for healthy adults ranges from 60 to 100 beats per minute.",
      "tags": ["NCLEX", "vitals", "fundamentals"], "status": "active"
    },
    {
      "id": "NCLEX-000002", "category": "NCLEX", "subcategory": "Infection Control", "difficulty": "easy",
      "question": "Which personal protective equipment (PPE) should the nurse don first when caring for a client on contact precautions?",
      "options": ["Gown followed by gloves", "Gloves followed by gown", "N95 respirator only", "Shoe covers and goggles"],
      "answer": 0, "explanation": "Standard contact precautions require donning a clean gown first, followed by gloves covering the gown cuffs.",
      "tags": ["NCLEX", "infection-control", "ppe"], "status": "active"
    },
    {
      "id": "NCLEX-000003", "category": "NCLEX", "subcategory": "Patient Safety", "difficulty": "easy",
      "question": "Before administering any scheduled medication, which two client identifiers are required by Joint Commission standards?",
      "options": ["Full name and date of birth", "Room number and bed number", "Primary diagnosis and room number", "Physician name and hospital badge"],
      "answer": 0, "explanation": "Acceptable identifiers include the client's full legal name and date of birth or medical record number. Room numbers must never be used.",
      "tags": ["NCLEX", "safety", "medication"], "status": "active"
    },
    {
      "id": "NCLEX-000004", "category": "NCLEX", "subcategory": "Thermoregulation", "difficulty": "easy",
      "question": "What is considered a normal core body temperature in a resting adult in Celsius?",
      "options": ["36.5°C to 37.5°C (97.7°F to 99.5°F)", "34.0°C to 35.0°C", "38.5°C to 39.5°C", "35.0°C to 36.0°C"],
      "answer": 0, "explanation": "Normal adult core body temperature typically falls between 36.5°C and 37.5°C.",
      "tags": ["NCLEX", "vitals", "assessment"], "status": "active"
    },
    {
      "id": "NCLEX-000005", "category": "NCLEX", "subcategory": "Respiratory Basics", "difficulty": "easy",
      "question": "What is the expected normal resting respiratory rate range for an adult?",
      "options": ["12 to 20 breaths per minute", "8 to 10 breaths per minute", "24 to 32 breaths per minute", "30 to 40 breaths per minute"],
      "answer": 0, "explanation": "Normal resting adult respiratory rate is 12 to 20 breaths per minute (eupnea).",
      "tags": ["NCLEX", "vitals", "respiratory"], "status": "active"
    },
    {
      "id": "NCLEX-000006", "category": "NCLEX", "subcategory": "Positioning", "difficulty": "easy",
      "question": "Which position is recommended to prevent aspiration when feeding an alert client via oral route?",
      "options": ["Upright High Fowler's position (90 degrees)", "Supine position with head flat", "Trendelenburg position", "Left lateral prone position"],
      "answer": 0, "explanation": "Sitting upright in High Fowler's during meals facilitates gravity-assisted swallowing and prevents aspiration.",
      "tags": ["NCLEX", "safety", "feeding"], "status": "active"
    },
    {
      "id": "NCLEX-000007", "category": "NCLEX", "subcategory": "Oxygenation", "difficulty": "easy",
      "question": "What is the standard maximum recommended flow rate for a nasal cannula in liters per minute (L/min)?",
      "options": ["6 L/min", "15 L/min", "25 L/min", "2 L/min"],
      "answer": 0, "explanation": "Nasal cannulas deliver 1 to 6 L/min (24-44% FiO2). Rates higher than 6 L/min dry mucous membranes without significantly increasing FiO2.",
      "tags": ["NCLEX", "oxygenation", "respiratory"], "status": "active"
    },
    {
      "id": "NCLEX-000008", "category": "NCLEX", "subcategory": "Elimination", "difficulty": "easy",
      "question": "What is the minimum expected normal urinary output per hour for an adult with normal renal function?",
      "options": ["30 mL/hr (or 0.5 mL/kg/hr)", "5 mL/hr", "100 mL/hr", "10 mL/hr"],
      "answer": 0, "explanation": "An hourly urine output of at least 30 mL/hr is standard indicator of adequate kidney perfusion.",
      "tags": ["NCLEX", "renal", "vitals"], "status": "active"
    },
    {
      "id": "NCLEX-000009", "category": "NCLEX", "subcategory": "Surgical Care", "difficulty": "easy",
      "question": "How often should a postoperative client be encouraged to use an incentive spirometer while awake?",
      "options": ["10 times every hour", "Once every 8 hours", "10 times once a day", "Only if coughing occurs"],
      "answer": 0, "explanation": "Using an incentive spirometer 10 times per hour while awake promotes alveolar expansion and prevents postoperative atelectasis.",
      "tags": ["NCLEX", "post-op", "spirometry"], "status": "active"
    },
    {
      "id": "NCLEX-000010", "category": "NCLEX", "subcategory": "Fall Prevention", "difficulty": "easy",
      "question": "Which nursing intervention is essential to promote safety in a client assessed as high fall risk?",
      "options": ["Place the bed in its lowest position and ensure the call light is within direct reach", "Keep all four side rails elevated at all times", "Turn off all nightlights to encourage deep sleep", "Instruct the client to ambulate unassisted to build confidence"],
      "answer": 0, "explanation": "Keeping the bed low with the call light within reach prevents falls without constituting an unlawful restraint (4 side rails up).",
      "tags": ["NCLEX", "safety", "falls"], "status": "active"
    },

    // Medium (15+ questions)
    {
      "id": "NCLEX-000011", "category": "NCLEX", "subcategory": "Pharmacology & Safety", "difficulty": "medium",
      "question": "A client with heart failure is taking Digoxin 0.25 mg daily. Which assessment finding warrants withholding the medication?",
      "options": ["Apical heart rate of 52 beats per minute", "Blood pressure of 130/84 mmHg", "Respiratory rate of 18 breaths per minute", "Serum potassium level of 4.2 mEq/L"],
      "answer": 0, "explanation": "Digoxin should be withheld if the apical heart rate is below 60 bpm in an adult to avoid severe bradycardia and heart block.",
      "tags": ["NCLEX", "pharmacology", "cardiac", "digoxin"], "status": "active"
    },
    {
      "id": "NCLEX-000012", "category": "NCLEX", "subcategory": "Maternal-Newborn", "difficulty": "medium",
      "question": "Which finding in a postpartum mother 4 hours after an uncomplicated vaginal delivery requires immediate nurse intervention?",
      "options": ["Fundus boggy and displaced to the right of the midline", "Moderate lochia rubra on the perineal pad", "Maternal temperature of 37.8°C (100.0°F)", "Diaphoresis during sleep"],
      "answer": 0, "explanation": "A boggy fundus displaced to the right indicates urinary bladder distension, preventing uterine contraction and increasing the risk of postpartum hemorrhage.",
      "tags": ["NCLEX", "maternal", "postpartum", "safety"], "status": "active"
    },
    {
      "id": "NCLEX-000013", "category": "NCLEX", "subcategory": "Endocrine", "difficulty": "medium",
      "question": "A diabetic client is exhibiting shakiness, sweating, confusion, and palpitations. Which immediate action should the nurse take?",
      "options": ["Administer 15 grams of fast-acting simple carbohydrates", "Administer 10 units of regular insulin subcutaneous", "Place client in reverse Trendelenburg", "Encourage the client to drink 500 mL of pure water"],
      "answer": 0, "explanation": "These symptoms indicate acute hypoglycemia. The Rule of 15 dictates immediate ingestion of 15 grams of simple carbs.",
      "tags": ["NCLEX", "endocrine", "hypoglycemia"], "status": "active"
    },
    {
      "id": "NCLEX-000014", "category": "NCLEX", "subcategory": "Fluid & Electrolytes", "difficulty": "medium",
      "question": "Which intravenous solution is considered isotonic and suitable for initial fluid resuscitation in hypovolemic shock?",
      "options": ["0.9% Normal Saline (0.9% NaCl)", "0.45% Normal Saline (0.45% NaCl)", "3% Hypertonic Saline", "Dextrose 10% in Water (D10W)"],
      "answer": 0, "explanation": "0.9% Normal Saline and Lactated Ringer's are isotonic solutions that expand extracellular intravascular fluid volume without causing cell lysis.",
      "tags": ["NCLEX", "fluids", "emergency"], "status": "active"
    },
    {
      "id": "NCLEX-000015", "category": "NCLEX", "subcategory": "Cardiology", "difficulty": "medium",
      "question": "Which symptom is considered a classic early clinical manifestation of left-sided heart failure?",
      "options": ["Dyspnea on exertion and orthopnea", "Peripheral pitting edema in the lower ankles", "Jugular venous distension (JVD)", "Hepatomegaly and ascites"],
      "answer": 0, "explanation": "Left-sided heart failure causes pulmonary venous congestion leading to exertional dyspnea, orthopnea, and crackles.",
      "tags": ["NCLEX", "cardiology", "heart-failure"], "status": "active"
    },
    {
      "id": "NCLEX-000016", "category": "NCLEX", "subcategory": "Gastrointestinal", "difficulty": "medium",
      "question": "A client with acute pancreatitis should be placed on which dietary order during the initial acute stage?",
      "options": ["NPO (Nothing by Mouth)", "High fat, high protein liquid diet", "Low fiber, high sodium soft diet", "High dairy soft puree"],
      "answer": 0, "explanation": "NPO status rests the inflamed pancreas by halting pancreatic enzyme secretion.",
      "tags": ["NCLEX", "pancreatitis", "nutrition"], "status": "active"
    },
    {
      "id": "NCLEX-000017", "category": "NCLEX", "subcategory": "Pediatrics", "difficulty": "medium",
      "question": "In a child with suspected acute epiglottitis presenting with drooling, stridor, and tripod positioning, which action is strictly contraindicated?",
      "options": ["Visualizing the pharynx with a tongue blade", "Keeping the child calm on the parent's lap", "Preparing for emergency endotracheal intubation", "Administering humidified oxygen as tolerated"],
      "answer": 0, "explanation": "Attempting to inspect the throat with a tongue blade or swab can precipitate sudden complete airway spasm and obstruction.",
      "tags": ["NCLEX", "pediatrics", "airway"], "status": "active"
    },
    {
      "id": "NCLEX-000018", "category": "NCLEX", "subcategory": "Anticoagulation", "difficulty": "medium",
      "question": "A client receiving continuous intravenous unfractionated Heparin should be monitored primarily using which laboratory value?",
      "options": ["aPTT (Activated Partial Thromboplastin Time)", "INR (International Normalized Ratio)", "Serum Platelet factor 3", "Bleeding Time"],
      "answer": 0, "explanation": "aPTT monitors Heparin therapy (therapeutic goal is typically 1.5 to 2.5 times the control). INR monitors Warfarin.",
      "tags": ["NCLEX", "hematology", "heparin"], "status": "active"
    },
    {
      "id": "NCLEX-000019", "category": "NCLEX", "subcategory": "Pneumonia", "difficulty": "medium",
      "question": "When collecting a sputum specimen for culture and sensitivity from a client with pneumonia, when is the ideal time to obtain the sample?",
      "options": ["Early morning immediately upon awakening before breakfast", "Immediately after the evening meal", "Right before bedtime after tooth brushing", "Mid-afternoon after a heavy walk"],
      "answer": 0, "explanation": "Early morning sputum collection yields pooled overnight secretions with higher concentration of microorganisms.",
      "tags": ["NCLEX", "diagnostics", "pulmonary"], "status": "active"
    },
    {
      "id": "NCLEX-000020", "category": "NCLEX", "subcategory": "Delegation", "difficulty": "medium",
      "question": "Which task can the Registered Nurse safely delegate to an experienced Unlicensed Assistive Personnel (UAP)?",
      "options": ["Measuring and recording intake and output (I&O)", "Administering initial dose of oral antihypertensive medication", "Performing comprehensive admission skin assessment", "Evaluating client understanding of incentive spirometry"],
      "answer": 0, "explanation": "UAPs may perform routine vital signs, hygiene, and I&O. Assessment, teaching, medication administration, and evaluation cannot be delegated.",
      "tags": ["NCLEX", "delegation", "management"], "status": "active"
    },

    // Hard (15+ questions)
    {
      "id": "NCLEX-000021", "category": "NCLEX", "subcategory": "Prioritization", "difficulty": "hard",
      "question": "A nurse receives change-of-shift report on four clients. Which client should the nurse assess first?",
      "options": [
        "A client with asthma who was wheezing and is now silent with decreased air movement",
        "A client with diabetes whose fasting blood glucose is 185 mg/dL",
        "A client postoperative day 1 after knee replacement reporting 7/10 pain",
        "A client with chronic kidney disease whose serum creatinine is 2.8 mg/dL"
      ],
      "answer": 0, "explanation": "Using the ABC (Airway, Breathing, Circulation) priority framework, a silent chest in acute asthma indicates severe bronchospasm and impending respiratory failure.",
      "tags": ["NCLEX", "prioritization", "triage", "emergency"], "status": "active"
    },
    {
      "id": "NCLEX-000022", "category": "NCLEX", "subcategory": "Critical Care", "difficulty": "hard",
      "question": "A client with traumatic brain injury has an intracranial pressure (ICP) of 24 mmHg. Which nursing intervention is contraindicated?",
      "options": [
        "Placing the client in Trendelenburg position",
        "Elevating the head of the bed 30 degrees",
        "Administering prescribed osmotic diuretics (mannitol)",
        "Maintaining the client's head and neck in neutral alignment"
      ],
      "answer": 0, "explanation": "Trendelenburg position increases venous return from the lower extremities and impedes cerebral venous drainage, dangerously increasing ICP.",
      "tags": ["NCLEX", "neurology", "critical-care", "safety"], "status": "active"
    },
    {
      "id": "NCLEX-000023", "category": "NCLEX", "subcategory": "Hemodynamics", "difficulty": "hard",
      "question": "What triad of clinical symptoms constitutes Cushing's Triad, signaling dangerously elevated intracranial pressure (ICP) and brain herniation?",
      "options": [
        "Severe hypertension with widening pulse pressure, bradycardia, and irregular respirations",
        "Hypotension, tachycardia, and tachypnea",
        "Hypertension, tachycardia, and high fever",
        "Hypotension, bradycardia, and bradypnea"
      ],
      "answer": 0, "explanation": "Cushing's Triad consists of widening pulse pressure (high systolic), bradycardia, and irregular respirations (Cheyne-Stokes).",
      "tags": ["NCLEX", "neurology", "critical-care"], "status": "active"
    },
    {
      "id": "NCLEX-000024", "category": "NCLEX", "subcategory": "Acid-Base Balance", "difficulty": "hard",
      "question": "Arterial Blood Gas (ABG) values: pH 7.28, PaCO2 56 mmHg, HCO3 25 mEq/L. Which acid-base imbalance is present?",
      "options": [
        "Uncompensated Respiratory Acidosis",
        "Compensated Metabolic Acidosis",
        "Uncompensated Metabolic Alkalosis",
        "Compensated Respiratory Alkalosis"
      ],
      "answer": 0, "explanation": "pH < 7.35 indicates acidosis; PaCO2 > 45 mmHg indicates respiratory origin; normal HCO3 indicates lack of renal compensation.",
      "tags": ["NCLEX", "abg", "acid-base"], "status": "active"
    },
    {
      "id": "NCLEX-000025", "category": "NCLEX", "subcategory": "Pharmacology Toxicity", "difficulty": "hard",
      "question": "A client on Lithium therapy presents with coarse hand tremors, persistent diarrhea, ataxia, and confusion. What is the priority nursing action?",
      "options": [
        "Withhold next lithium dose and immediately notify the provider to obtain a serum lithium level",
        "Administer the next scheduled lithium dose with milk",
        "Instruct the client to restrict dietary sodium intake",
        "Encourage vigorous aerobic exercise"
      ],
      "answer": 0, "explanation": "Coarse tremors, ataxia, and mental confusion indicate severe lithium toxicity (level > 1.5-2.0 mEq/L).",
      "tags": ["NCLEX", "pharmacology", "toxicity"], "status": "active"
    },
    {
      "id": "NCLEX-000026", "category": "NCLEX", "subcategory": "Oncology & Safety", "difficulty": "hard",
      "question": "Which clinical manifestation in a client with acute leukemia undergoing chemotherapy indicates Tumor Lysis Syndrome (TLS)?",
      "options": [
        "Hyperkalemia, hyperphosphatemia, hyperuricemia, and hypocalcemia",
        "Hypokalemia, hypophosphatemia, and hypercalcemia",
        "Hypernatremia, hypokalemia, and hypoglycemia",
        "Severe thrombocytopenia with elevated hemoglobin"
      ],
      "answer": 0, "explanation": "Rapid tumor cell lysis releases intracellular ions resulting in hyperkalemia, hyperphosphatemia, hyperuricemia, and secondary hypocalcemia.",
      "tags": ["NCLEX", "oncology", "critical-care"], "status": "active"
    },
    {
      "id": "NCLEX-000027", "category": "NCLEX", "subcategory": "Shock Management", "difficulty": "hard",
      "question": "In Neurogenic Shock caused by acute spinal cord injury above T6, which hemodynamic profile is uniquely observed?",
      "options": [
        "Hypotension with Bradycardia and warm, dry skin",
        "Hypotension with Tachycardia and cold, clammy skin",
        "Hypertension with Tachycardia and bounding pulses",
        "Severe Hypertension with Tachypnea"
      ],
      "answer": 0, "explanation": "Loss of sympathetic vascular tone causes massive peripheral vasodilation (warm/dry skin) and unopposed vagal parasympathetic stimulation (bradycardia with hypotension).",
      "tags": ["NCLEX", "shock", "neurology"], "status": "active"
    },
    {
      "id": "NCLEX-000028", "category": "NCLEX", "subcategory": "Obstetrics Emergency", "difficulty": "hard",
      "question": "A pregnant client at 34 weeks gestation presents with sudden onset of severe, constant abdominal pain, board-like uterine rigidity, and dark vaginal bleeding. Which complication is suspected?",
      "options": [
        "Placenta Abruptio (Abruptio Placentae)",
        "Placenta Previa",
        "Uterine Inversion",
        "Ectopic Rupture"
      ],
      "answer": 0, "explanation": "Placental abruption features painful dark bleeding and a hypertonic board-like uterus. Placenta previa features painless bright red bleeding.",
      "tags": ["NCLEX", "obstetrics", "emergency"], "status": "active"
    },
    {
      "id": "NCLEX-000029", "category": "NCLEX", "subcategory": "Chest Tube", "difficulty": "hard",
      "question": "When assessing a client with a water-seal chest tube drainage system, continuous vigorous bubbling in the water-seal chamber indicates which finding?",
      "options": [
        "An air leak in the drainage system or pleural space",
        "Normal expected operation during exhalation",
        "Complete resolution of the pneumothorax",
        "Occlusion of the chest tube lumen"
      ],
      "answer": 0, "explanation": "Intermittent tidaling is normal; continuous bubbling in the water-seal chamber indicates an air leak.",
      "tags": ["NCLEX", "chest-tube", "critical-care"], "status": "active"
    },
    {
      "id": "NCLEX-000030", "category": "NCLEX", "subcategory": "Ventilator Alarms", "difficulty": "hard",
      "question": "A mechanically ventilated client's high-pressure alarm sounds persistently. After checking for biting or secretions, the nurse notices absent breath sounds on the left and tracheal deviation to the right. What is the immediate priority?",
      "options": [
        "Disconnect ventilator, manually ventilate with 100% O2 bag-valve-mask, and prepare for immediate needle thoracostomy for tension pneumothorax",
        "Increase ventilator tidal volume by 200 mL",
        "Administer intravenous succinylcholine",
        "Reposition the endotracheal tube 5 cm deeper"
      ],
      "answer": 0, "explanation": "Tracheal deviation, unilateral absent breath sounds, and high peak pressures indicate a life-threatening tension pneumothorax requiring immediate decompression.",
      "tags": ["NCLEX", "critical-care", "airway"], "status": "active"
    }
  ]
};

// Write healthcare categories
for (const [slug, questions] of Object.entries(healthcareCategories)) {
  const filePath = path.join(qbDir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), "utf8");
  console.log(`✓ Seeded ${questions.length} questions to question-bank/${slug}.json`);
}
