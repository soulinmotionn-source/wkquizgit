/**
 * WKQUIZ QUESTION BANK
 * Structured question repository with scalable schema and helper query methods.
 * Each question has: id, category, subcategory, difficulty, question, options, answer, explanation, tags.
 */

const WKQUIZ_QUESTIONS = [
  // ==========================================
  // NURSING & NCLEX
  // ==========================================
  {
    id: "nurs_001",
    category: "nursing",
    subcategory: "Fundamentals",
    difficulty: "medium",
    question: "Which position is most appropriate for a patient experiencing acute shortness of breath (dyspnea)?",
    options: [
      "High Fowler's position",
      "Trendelenburg position",
      "Prone position",
      "Supine with legs elevated"
    ],
    answer: 0,
    explanation: "High Fowler's position (sitting upright at 60-90 degrees) maximizes lung expansion and facilitates diaphragm descent, easing respiratory distress.",
    tags: ["nursing", "respiratory", "patient-care", "positioning"]
  },
  {
    id: "nurs_002",
    category: "nursing",
    subcategory: "Infection Control",
    difficulty: "easy",
    question: "What is the single most effective intervention to prevent the spread of healthcare-associated infections (HAIs)?",
    options: [
      "Routine hand hygiene",
      "Wearing double gloves for all procedures",
      "Prophylactic antibiotic administration",
      "Sterilizing room surfaces twice daily"
    ],
    answer: 0,
    explanation: "Proper and consistent hand hygiene before and after patient contact is universally recognized by the WHO and CDC as the primary measure to break the chain of infection.",
    tags: ["nursing", "infection-control", "safety"]
  },
  {
    id: "nurs_003",
    category: "nursing",
    subcategory: "Vitals & Assessment",
    difficulty: "hard",
    question: "When assessing a patient with suspected hypocalcemia, which clinical finding is known as Chvostek's sign?",
    options: [
      "Twitching of facial muscles elicited by tapping the facial nerve",
      "Carpal spasm induced by inflating a blood pressure cuff above systolic pressure",
      "Numbness and tingling around the lips and fingertips",
      "Hyperactive deep tendon reflexes in the lower extremities"
    ],
    answer: 0,
    explanation: "Chvostek's sign is facial muscle twitching when tapping anterior to the ear (facial nerve). Trousseau's sign refers to carpal spasm with cuff inflation.",
    tags: ["nursing", "assessment", "electrolytes", "hypocalcemia"]
  },
  {
    id: "nclex_001",
    category: "nclex",
    subcategory: "NCLEX-RN Prioritization",
    difficulty: "hard",
    question: "A nurse receives change-of-shift report on four patients. Which patient should the nurse assess first?",
    options: [
      "A client with asthma who was wheezing and is now silent with decreased air movement",
      "A client with diabetes whose fasting blood glucose is 185 mg/dL",
      "A client postoperative day 1 after knee replacement reporting 7/10 pain",
      "A client with chronic kidney disease whose serum creatinine is 2.8 mg/dL"
    ],
    answer: 0,
    explanation: "Using the ABC (Airway, Breathing, Circulation) priority framework, a silent chest in acute asthma indicates severe bronchospasm and impending respiratory failure.",
    tags: ["nclex", "prioritization", "triage", "emergency"]
  },
  {
    id: "nclex_002",
    category: "nclex",
    subcategory: "Pharmacology / Safety",
    difficulty: "medium",
    question: "A client with heart failure is taking Digoxin (Lanoxin) 0.25 mg daily. Which assessment finding warrants withholding the medication?",
    options: [
      "Apical heart rate of 52 beats per minute",
      "Blood pressure of 130/84 mmHg",
      "Respiratory rate of 18 breaths per minute",
      "Serum potassium level of 4.2 mEq/L"
    ],
    answer: 0,
    explanation: "Digoxin should be withheld if the apical heart rate is below 60 bpm in an adult to avoid severe bradycardia and heart block.",
    tags: ["nclex", "pharmacology", "cardiac", "digoxin"]
  },
  {
    id: "nclex_003",
    category: "nclex",
    subcategory: "Maternal-Newborn",
    difficulty: "medium",
    question: "Which finding in a postpartum mother 4 hours after an uncomplicated vaginal delivery requires immediate nurse intervention?",
    options: [
      "Fundus boggy and displaced to the right of the midline",
      "Moderate lochia rubra on the perineal pad",
      "Maternal temperature of 37.8°C (100.0°F)",
      "Diaphoresis during sleep"
    ],
    answer: 0,
    explanation: "A boggy fundus displaced to the right indicates urinary bladder distension, preventing uterine contraction and increasing the risk of postpartum hemorrhage.",
    tags: ["nclex", "maternal", "postpartum", "safety"]
  },

  // ==========================================
  // MEDICAL & MEDICAL TERMINOLOGY
  // ==========================================
  {
    id: "med_001",
    category: "medical",
    subcategory: "Emergency Medicine",
    difficulty: "medium",
    question: "What is the recommended compression-to-ventilation ratio for adult single-rescuer CPR?",
    options: [
      "30 compressions to 2 breaths",
      "15 compressions to 2 breaths",
      "20 compressions to 1 breath",
      "50 compressions to 5 breaths"
    ],
    answer: 0,
    explanation: "AHA guidelines recommend a 30:2 compression-to-ventilation ratio for adult cardiac arrest in single-rescuer resuscitation.",
    tags: ["medical", "cpr", "emergency", "cardiology"]
  },
  {
    id: "med_002",
    category: "medical",
    subcategory: "Pathology",
    difficulty: "hard",
    question: "Which biomarker is considered the gold standard for diagnosing acute myocardial infarction (heart attack)?",
    options: [
      "Cardiac Troponin I or T",
      "Creatine Kinase-MB (CK-MB)",
      "Myoglobin",
      "Lactate Dehydrogenase (LDH)"
    ],
    answer: 0,
    explanation: "Cardiac Troponin (I and T) provides the highest cardiac specificity and sensitivity for detecting myocardial cellular necrosis.",
    tags: ["medical", "cardiology", "lab-values", "diagnostics"]
  },
  {
    id: "medterm_001",
    category: "medical-terminology",
    subcategory: "Prefixes & Suffixes",
    difficulty: "easy",
    question: "What does the medical prefix 'Brady-' mean?",
    options: [
      "Slow",
      "Fast",
      "Difficult or painful",
      "Excessive"
    ],
    answer: 0,
    explanation: "'Brady-' is derived from the Greek 'bradys' meaning slow (e.g., bradycardia = abnormally slow heart rate). 'Tachy-' means fast.",
    tags: ["medical-terminology", "prefixes", "vocabulary"]
  },
  {
    id: "medterm_002",
    category: "medical-terminology",
    subcategory: "Root Words",
    difficulty: "medium",
    question: "The surgical suffix '-ectomy' indicates which procedure?",
    options: [
      "Surgical removal or excision",
      "Creating an artificial opening",
      "Surgical repair or reconstruction",
      "Visual examination with an instrument"
    ],
    answer: 0,
    explanation: "'-ectomy' denotes surgical removal (e.g., appendectomy, mastectomy). '-ostomy' is creating an opening, and '-plasty' is surgical repair.",
    tags: ["medical-terminology", "suffixes", "surgery"]
  },
  {
    id: "medterm_003",
    category: "medical-terminology",
    subcategory: "Clinical Vocab",
    difficulty: "medium",
    question: "What does the medical term 'Hemoptysis' refer to?",
    options: [
      "Coughing up blood or blood-stained mucus",
      "Vomiting blood from the gastrointestinal tract",
      "Blood in the urine",
      "Nosebleed"
    ],
    answer: 0,
    explanation: "Hemoptysis is the coughing up of blood from the respiratory tract. Vomiting blood is hematemesis, blood in urine is hematuria, and nosebleed is epistaxis.",
    tags: ["medical-terminology", "clinical", "pulmonology"]
  },

  // ==========================================
  // DISEASES, ANATOMY, PHARMACOLOGY
  // ==========================================
  {
    id: "dis_001",
    category: "diseases",
    subcategory: "Endocrinology",
    difficulty: "medium",
    question: "Type 1 Diabetes Mellitus is characterized primarily by which underlying mechanism?",
    options: [
      "Autoimmune destruction of pancreatic beta cells producing absolute insulin deficiency",
      "Insulin resistance in peripheral tissues with relative insulin deficiency",
      "Impaired hepatic glucose storage due to enzyme mutations",
      "Excessive secretion of glucagon by alpha cells"
    ],
    answer: 0,
    explanation: "Type 1 Diabetes is an autoimmune disorder where T-cells attack and destroy pancreatic beta cells in the islets of Langerhans, leading to zero or negligible insulin synthesis.",
    tags: ["diseases", "diabetes", "endocrinology"]
  },
  {
    id: "dis_002",
    category: "diseases",
    subcategory: "Infectious Disease",
    difficulty: "easy",
    question: "Which causative organism is responsible for Tuberculosis (TB)?",
    options: [
      "Mycobacterium tuberculosis",
      "Streptococcus pneumoniae",
      "Staphylococcus aureus",
      "Haemophilus influenzae"
    ],
    answer: 0,
    explanation: "Tuberculosis is caused by Mycobacterium tuberculosis, an acid-fast aerobic rod-shaped bacterium primarily affecting the lungs.",
    tags: ["diseases", "tuberculosis", "microbiology"]
  },
  {
    id: "anat_001",
    category: "anatomy",
    subcategory: "Cardiovascular",
    difficulty: "easy",
    question: "Which chamber of the human heart pumps oxygen-rich blood into the aorta to supply the entire body?",
    options: [
      "Left Ventricle",
      "Right Ventricle",
      "Left Atrium",
      "Right Atrium"
    ],
    answer: 0,
    explanation: "The Left Ventricle has the thickest muscular wall and pumps oxygenated blood under high pressure through the aortic valve into the systemic circulation.",
    tags: ["anatomy", "heart", "cardiovascular"]
  },
  {
    id: "anat_002",
    category: "anatomy",
    subcategory: "Neuroanatomy",
    difficulty: "medium",
    question: "Which part of the brain is primarily responsible for motor coordination, balance, and fine motor skills?",
    options: [
      "Cerebellum",
      "Cerebrum",
      "Hypothalamus",
      "Medulla oblongata"
    ],
    answer: 0,
    explanation: "The cerebellum (located at the back of the brain) coordinates voluntary muscle movements, posture, and balance.",
    tags: ["anatomy", "neuroscience", "brain"]
  },
  {
    id: "anat_003",
    category: "anatomy",
    subcategory: "Skeletal System",
    difficulty: "easy",
    question: "What is the longest and strongest bone in the human skeleton?",
    options: [
      "Femur (thigh bone)",
      "Tibia (shin bone)",
      "Humerus (upper arm bone)",
      "Fibula"
    ],
    answer: 0,
    explanation: "The femur (thigh bone) is the longest, heaviest, and strongest bone in the human body, supporting body weight during standing, running, and jumping.",
    tags: ["anatomy", "skeletal", "bones"]
  },
  {
    id: "pharm_001",
    category: "pharmacology",
    subcategory: "Cardiovascular Drugs",
    difficulty: "medium",
    question: "Which class of antihypertensive medications commonly causes a dry, persistent cough due to bradykinin accumulation?",
    options: [
      "ACE Inhibitors (e.g., Lisinopril)",
      "Beta Blockers (e.g., Metoprolol)",
      "Calcium Channel Blockers (e.g., Amlodipine)",
      "Thiazide Diuretics (e.g., Hydrochlorothiazide)"
    ],
    answer: 0,
    explanation: "ACE (Angiotensin-Converting Enzyme) inhibitors inhibit the breakdown of bradykinin and substance P in the respiratory tract, provoking an intractable dry cough.",
    tags: ["pharmacology", "hypertension", "ace-inhibitors"]
  },
  {
    id: "pharm_002",
    category: "pharmacology",
    subcategory: "Antibiotics & Antidotes",
    difficulty: "hard",
    question: "What is the specific reversal agent (antidote) for heparin-induced anticoagulation?",
    options: [
      "Protamine Sulfate",
      "Vitamin K (Phytonadione)",
      "Naloxone (Narcan)",
      "Flumazenil"
    ],
    answer: 0,
    explanation: "Protamine sulfate binds strongly to heparin to form an inactive, stable salt complex, reversing its anticoagulant effect. Vitamin K reverses Warfarin.",
    tags: ["pharmacology", "antidotes", "hematology", "heparin"]
  },

  // ==========================================
  // ENTERTAINMENT, MOVIES, TV SHOWS, DRAMA, CELEBRITY, MUSIC
  // ==========================================
  {
    id: "ent_001",
    category: "entertainment",
    subcategory: "Pop Culture",
    difficulty: "easy",
    question: "Which comic book character is famously known as the 'Dark Knight' of Gotham City?",
    options: [
      "Batman",
      "Superman",
      "Iron Man",
      "Spider-Man"
    ],
    answer: 0,
    explanation: "Batman (Bruce Wayne), created by Bob Kane and Bill Finger for DC Comics, is widely known as the Dark Knight and the Caped Crusader.",
    tags: ["entertainment", "superheroes", "comics", "batman"]
  },
  {
    id: "mov_001",
    category: "movies",
    subcategory: "Oscar Winners",
    difficulty: "medium",
    question: "Which 1997 James Cameron epic romance and disaster film won 11 Academy Awards, tied for the most in history?",
    options: [
      "Titanic",
      "Avatar",
      "Gladiator",
      "Braveheart"
    ],
    answer: 0,
    explanation: "Titanic (1997), starring Leonardo DiCaprio and Kate Winslet, tied Ben-Hur and The Lord of the Rings: The Return of the King with 11 Academy Awards.",
    tags: ["movies", "cinema", "oscars", "titanic"]
  },
  {
    id: "mov_002",
    category: "movies",
    subcategory: "Sci-Fi Classics",
    difficulty: "easy",
    question: "In the Star Wars franchise, which iconic villain declares: 'No, I am your father' to Luke Skywalker?",
    options: [
      "Darth Vader",
      "Emperor Palpatine",
      "Grand Moff Tarkin",
      "Darth Maul"
    ],
    answer: 0,
    explanation: "In The Empire Strikes Back (1980), Darth Vader reveals this shocking truth during their duel in Cloud City.",
    tags: ["movies", "star-wars", "sci-fi"]
  },
  {
    id: "tv_001",
    category: "tv-shows",
    subcategory: "Streaming Drama",
    difficulty: "easy",
    question: "In the Netflix series 'Stranger Things', what is the name of the alternate dimension beneath the town of Hawkins?",
    options: [
      "The Upside Down",
      "The Twilight Zone",
      "The Netherworld",
      "The Dark Realm"
    ],
    answer: 0,
    explanation: "The Upside Down is a dark, decaying alternate dimension mirroring Hawkins, inhabited by predatory creatures like the Demogorgon and Mind Flayer.",
    tags: ["tv-shows", "stranger-things", "netflix"]
  },
  {
    id: "tv_002",
    category: "tv-shows",
    subcategory: "Sitcoms",
    difficulty: "medium",
    question: "In the sitcom 'Friends', what is the name of the coffee house where the gang spends most of their time?",
    options: [
      "Central Perk",
      "Monk's Diner",
      "The Roasted Bean",
      "Cafe Nervosa"
    ],
    answer: 0,
    explanation: "Central Perk in Greenwich Village, New York City, is the famous hangout where Rachel Green worked as a waitress and Gunther managed the counter.",
    tags: ["tv-shows", "friends", "sitcom"]
  },
  {
    id: "drama_001",
    category: "drama",
    subcategory: "Global Drama",
    difficulty: "medium",
    question: "Which critically acclaimed HBO drama series created by David Chase revolved around New Jersey mobster Tony and his psychiatric therapy?",
    options: [
      "The Sopranos",
      "The Wire",
      "Boardwalk Empire",
      "Peaky Blinders"
    ],
    answer: 0,
    explanation: "The Sopranos (1999-2007) starring James Gandolfini is heralded as one of the greatest television dramas in television history.",
    tags: ["drama", "the-sopranos", "hbo"]
  },
  {
    id: "celeb_001",
    category: "celebrity",
    subcategory: "Pop Icons",
    difficulty: "easy",
    question: "Which global music superstar became the first artist in history to achieve billionaire status solely from songwriting and performing in 2023 with the Eras Tour?",
    options: [
      "Taylor Swift",
      "Beyoncé",
      "Rihanna",
      "Adele"
    ],
    answer: 0,
    explanation: "Taylor Swift's record-smashing Eras Tour grossed over $1 billion, catapulting her net worth past the billionaire mark solely through music and touring revenue.",
    tags: ["celebrity", "music", "taylor-swift"]
  },
  {
    id: "mus_001",
    category: "music",
    subcategory: "Rock & Pop Legends",
    difficulty: "easy",
    question: "Which legendary British band featured John Lennon, Paul McCartney, George Harrison, and Ringo Starr?",
    options: [
      "The Beatles",
      "The Rolling Stones",
      "The Who",
      "Led Zeppelin"
    ],
    answer: 0,
    explanation: "The Beatles, formed in Liverpool in 1960, are the best-selling music band in history with over 600 million records sold worldwide.",
    tags: ["music", "rock", "the-beatles"]
  },

  // ==========================================
  // GENERAL KNOWLEDGE, HISTORY, GEOGRAPHY, SCIENCE
  // ==========================================
  {
    id: "gk_001",
    category: "general-knowledge",
    subcategory: "World Trivia",
    difficulty: "easy",
    question: "What is the hardest naturally occurring mineral substance on planet Earth?",
    options: [
      "Diamond",
      "Corundum",
      "Topaz",
      "Quartz"
    ],
    answer: 0,
    explanation: "Diamond rates 10 (maximum) on Mohs hardness scale, consisting of carbon atoms arranged in a rigid diamond cubic crystal lattice.",
    tags: ["general-knowledge", "minerals", "science"]
  },
  {
    id: "gk_002",
    category: "general-knowledge",
    subcategory: "Global Landmarks",
    difficulty: "medium",
    question: "In which country can you find the ancient pre-Columbian city ruins of Machu Picchu?",
    options: [
      "Peru",
      "Bolivia",
      "Chile",
      "Mexico"
    ],
    answer: 0,
    explanation: "Machu Picchu is a 15th-century Inca citadel situated on a mountain ridge 2,430 metres above sea level in the Cusco Region of Peru.",
    tags: ["general-knowledge", "geography", "history", "landmarks"]
  },
  {
    id: "hist_001",
    category: "history",
    subcategory: "20th Century",
    difficulty: "easy",
    question: "In which year did the historic Apollo 11 mission successfully land the first humans on the Moon?",
    options: [
      "1969",
      "1965",
      "1972",
      "1959"
    ],
    answer: 0,
    explanation: "On July 20, 1969, American astronauts Neil Armstrong and Buzz Aldrin landed the Apollo Lunar Module Eagle on the Moon.",
    tags: ["history", "space", "apollo", "moon-landing"]
  },
  {
    id: "hist_002",
    category: "history",
    subcategory: "Ancient Civilizations",
    difficulty: "medium",
    question: "Who was the first Emperor of a unified China, known for commissioning the Terracotta Army?",
    options: [
      "Qin Shi Huang",
      "Han Wudi",
      "Kublai Khan",
      "Sun Yat-sen"
    ],
    answer: 0,
    explanation: "Qin Shi Huang conquered all Warring States in 221 BC to unify China, founding the Qin dynasty and creating the Terracotta Army for his mausoleum.",
    tags: ["history", "ancient-china", "emperors"]
  },
  {
    id: "geo_001",
    category: "geography",
    subcategory: "Rivers & Oceans",
    difficulty: "easy",
    question: "Which is the longest river in the world according to Guinness World Records and international geographical authorities?",
    options: [
      "The Nile River",
      "The Amazon River",
      "The Yangtze River",
      "The Mississippi River"
    ],
    answer: 0,
    explanation: "The Nile River in northeastern Africa flows approximately 6,650 km (4,132 miles), making it traditionally recognized as the longest river.",
    tags: ["geography", "rivers", "nature"]
  },
  {
    id: "geo_002",
    category: "geography",
    subcategory: "Capitals",
    difficulty: "medium",
    question: "What is the capital city of Australia?",
    options: [
      "Canberra",
      "Sydney",
      "Melbourne",
      "Brisbane"
    ],
    answer: 0,
    explanation: "Canberra was chosen as the compromise capital of Australia in 1908 to resolve the rivalry between Sydney and Melbourne.",
    tags: ["geography", "capitals", "australia"]
  },
  {
    id: "sci_001",
    category: "science",
    subcategory: "Physics",
    difficulty: "medium",
    question: "What is the approximate speed of light in a vacuum (c)?",
    options: [
      "299,792 km/s (approx 300,000 km/s)",
      "150,000 km/s",
      "500,000 km/s",
      "343 m/s"
    ],
    answer: 0,
    explanation: "The speed of light in vacuum is exactly 299,792,458 metres per second (approx 3 × 10^8 m/s or 186,282 miles/s). 343 m/s is the speed of sound in air.",
    tags: ["science", "physics", "light"]
  },
  {
    id: "sci_002",
    category: "science",
    subcategory: "Chemistry",
    difficulty: "easy",
    question: "What is the chemical symbol for the element Gold on the periodic table?",
    options: [
      "Au",
      "Ag",
      "Fe",
      "Gd"
    ],
    answer: 0,
    explanation: "'Au' comes from the Latin name for gold, 'Aurum' (shining dawn). 'Ag' is silver, 'Fe' is iron.",
    tags: ["science", "chemistry", "periodic-table"]
  },

  // ==========================================
  // ENGINEERING, ELECTRICAL, ELECTRICAL SYMBOLS, ELECTRONICS, HVAC
  // ==========================================
  {
    id: "eng_001",
    category: "engineering",
    subcategory: "Mechanics",
    difficulty: "medium",
    question: "According to Hooke's Law in mechanical engineering, stress is directly proportional to what within the elastic limit?",
    options: [
      "Strain",
      "Temperature",
      "Volume",
      "Viscosity"
    ],
    answer: 0,
    explanation: "Hooke's Law states that within the elastic limit of a material, stress is directly proportional to strain (σ = E · ε, where E is Young's Modulus).",
    tags: ["engineering", "mechanics", "materials"]
  },
  {
    id: "elec_001",
    category: "electrical",
    subcategory: "Circuit Laws",
    difficulty: "easy",
    question: "According to Ohm's Law, which formula correctly calculates Electric Voltage (V)?",
    options: [
      "V = I × R (Current × Resistance)",
      "V = I / R",
      "V = R / I",
      "V = I + R"
    ],
    answer: 0,
    explanation: "Ohm's Law expresses the direct relationship: Voltage (V in Volts) = Current (I in Amperes) multiplied by Resistance (R in Ohms).",
    tags: ["electrical", "circuits", "ohms-law"]
  },
  {
    id: "elec_002",
    category: "electrical",
    subcategory: "Power Calculation",
    difficulty: "medium",
    question: "If a 120V circuit draws a current of 5 Amperes, what is the electric power consumed by the load?",
    options: [
      "600 Watts",
      "24 Watts",
      "125 Watts",
      "60 Watts"
    ],
    answer: 0,
    explanation: "Electrical power P = V × I = 120 Volts × 5 Amperes = 600 Watts (W).",
    tags: ["electrical", "power", "calculations"]
  },
  {
    id: "elecsym_001",
    category: "electrical-symbols",
    subcategory: "Schematic Symbols",
    difficulty: "easy",
    question: "In electrical circuit schematics, what does a symbol composed of alternating long and short parallel lines represent?",
    options: [
      "DC Voltage Source / Battery",
      "Capacitor",
      "Ground connection",
      "Transformer"
    ],
    answer: 0,
    explanation: "A series of alternating long (positive terminal) and short thicker (negative terminal) parallel lines represents a DC cell or multi-cell battery.",
    tags: ["electrical-symbols", "schematics", "circuits"]
  },
  {
    id: "elecsym_002",
    category: "electrical-symbols",
    subcategory: "Passive Components",
    difficulty: "medium",
    question: "On an electronic blueprint, what component is depicted by a zigzag line in US standards or a plain rectangle in IEC European standards?",
    options: [
      "Resistor",
      "Inductor",
      "Diode",
      "Fuse"
    ],
    answer: 0,
    explanation: "In ANSI/IEEE US schematics, a zigzag line designates a fixed resistor. In IEC/European schematics, a simple rectangle represents a resistor.",
    tags: ["electrical-symbols", "resistors", "blueprints"]
  },
  {
    id: "elx_001",
    category: "electronics",
    subcategory: "Semiconductors",
    difficulty: "medium",
    question: "What semiconductor component allows electrical current to flow predominantly in only one direction (forward biased)?",
    options: [
      "Diode",
      "Capacitor",
      "Transformer",
      "Potentiometer"
    ],
    answer: 0,
    explanation: "A diode (such as a p-n junction diode) has low resistance to current in forward bias and very high resistance in reverse bias, serving as an electronic one-way valve.",
    tags: ["electronics", "diodes", "semiconductors"]
  },
  {
    id: "elx_002",
    category: "electronics",
    subcategory: "Digital Logic",
    difficulty: "easy",
    question: "Which digital logic gate produces a HIGH (1) output ONLY when both of its inputs are HIGH (1)?",
    options: [
      "AND Gate",
      "OR Gate",
      "XOR Gate",
      "NOR Gate"
    ],
    answer: 0,
    explanation: "An AND gate strictly requires all input conditions to be TRUE (1) to produce a TRUE (1) output.",
    tags: ["electronics", "digital-logic", "gates"]
  },
  {
    id: "hvac_001",
    category: "hvac",
    subcategory: "Refrigeration Cycle",
    difficulty: "medium",
    question: "In standard vapor-compression refrigeration, what is the primary function of the Expansion Valve (Metering Device)?",
    options: [
      "Drop the refrigerant pressure and temperature before entering the evaporator",
      "Compress low-pressure vapor into high-pressure vapor",
      "Condense high-pressure hot gas into liquid",
      "Absorb room heat directly into the atmosphere"
    ],
    answer: 0,
    explanation: "The expansion valve meters the flow of high-pressure liquid refrigerant and creates a sudden pressure drop, causing it to flash into a low-pressure, low-temperature liquid/vapor mix.",
    tags: ["hvac", "refrigeration", "thermodynamics"]
  },
  {
    id: "hvac_002",
    category: "hvac",
    subcategory: "Thermodynamics & Psychrometrics",
    difficulty: "hard",
    question: "What is the term for the heat added to a substance that results in a measurable temperature change without changing its state of matter?",
    options: [
      "Sensible Heat",
      "Latent Heat",
      "Specific Heat Ratio",
      "Superheat Subcooling"
    ],
    answer: 0,
    explanation: "Sensible heat is heat that causes a change in temperature that can be sensed by a thermometer. Latent heat causes a change of phase at constant temperature.",
    tags: ["hvac", "thermodynamics", "psychrometrics"]
  },

  // ==========================================
  // TECHNOLOGY, COMPUTERS, AUTOMOTIVE
  // ==========================================
  {
    id: "tech_001",
    category: "technology",
    subcategory: "Internet & Networking",
    difficulty: "easy",
    question: "What does the abbreviation 'URL' stand for in web browsing and networking?",
    options: [
      "Uniform Resource Locator",
      "Universal Remote Link",
      "Unified Routing Language",
      "User Resource Lookup"
    ],
    answer: 0,
    explanation: "A URL (Uniform Resource Locator) is the unique address used to identify and locate a specific resource (such as a webpage or file) on the World Wide Web.",
    tags: ["technology", "internet", "networking"]
  },
  {
    id: "tech_002",
    category: "technology",
    subcategory: "Artificial Intelligence",
    difficulty: "medium",
    question: "In Machine Learning, what does 'LLM' stand for?",
    options: [
      "Large Language Model",
      "Linear Logic Matrix",
      "Layered Learning Module",
      "Logical Link Mechanism"
    ],
    answer: 0,
    explanation: "Large Language Models (LLMs) are deep learning transformer models trained on massive corpora of text data capable of generating and understanding natural human language.",
    tags: ["technology", "ai", "machine-learning"]
  },
  {
    id: "comp_001",
    category: "computers",
    subcategory: "Hardware & Memory",
    difficulty: "easy",
    question: "Which computer hardware component is considered volatile temporary memory, losing its stored data when the system is powered off?",
    options: [
      "RAM (Random Access Memory)",
      "SSD (Solid State Drive)",
      "ROM (Read-Only Memory)",
      "NVMe Flash Drive"
    ],
    answer: 0,
    explanation: "RAM is high-speed volatile memory that holds actively working code and data for the CPU; without continuous power, its capacitor-held states clear.",
    tags: ["computers", "hardware", "ram"]
  },
  {
    id: "comp_002",
    category: "computers",
    subcategory: "Operating Systems & Binary",
    difficulty: "medium",
    question: "How many bits are contained within exactly one standard Byte of digital data?",
    options: [
      "8 bits",
      "4 bits",
      "16 bits",
      "32 bits"
    ],
    answer: 0,
    explanation: "One byte consists of exactly 8 bits (binary digits). A 4-bit group is known as a nibble.",
    tags: ["computers", "binary", "data-structures"]
  },
  {
    id: "auto_001",
    category: "automotive",
    subcategory: "Engine Mechanics",
    difficulty: "easy",
    question: "In a four-stroke internal combustion engine, what is the correct chronological sequence of the cycles?",
    options: [
      "Intake, Compression, Power (Combustion), Exhaust",
      "Compression, Intake, Power, Exhaust",
      "Power, Intake, Compression, Exhaust",
      "Intake, Power, Compression, Exhaust"
    ],
    answer: 0,
    explanation: "The 4-stroke cycle follows: 1. Intake stroke (air/fuel enters), 2. Compression stroke, 3. Power stroke (spark ignited), 4. Exhaust stroke (spent gases exit).",
    tags: ["automotive", "engines", "mechanics"]
  },
  {
    id: "auto_002",
    category: "automotive",
    subcategory: "Braking & Safety",
    difficulty: "medium",
    question: "What is the primary function of an Automotive Anti-lock Braking System (ABS)?",
    options: [
      "Prevent wheels from locking up during hard braking to maintain steering control",
      "Stop the vehicle in half the standard physical distance",
      "Automatically apply the emergency parking brake",
      "Cool the brake pads with electric fans"
    ],
    answer: 0,
    explanation: "ABS pulses brake pressure rapidly to prevent tire skidding/wheel lockup under aggressive braking, allowing the driver to steer and avoid obstacles.",
    tags: ["automotive", "safety", "brakes"]
  },

  // ==========================================
  // IQ & LOGIC, MATHEMATICS, ENGLISH
  // ==========================================
  {
    id: "iq_001",
    category: "iq-logic",
    subcategory: "Number Series",
    difficulty: "medium",
    question: "Look at this sequence: 2, 6, 12, 20, 30, ___ . What number comes next in the pattern?",
    options: [
      "42",
      "40",
      "38",
      "48"
    ],
    answer: 0,
    explanation: "The differences between consecutive terms increase by 2: +4 (2 to 6), +6 (6 to 12), +8 (12 to 20), +10 (20 to 30), so the next step is +12: 30 + 12 = 42.",
    tags: ["iq-logic", "patterns", "series", "deduction"]
  },
  {
    id: "iq_002",
    category: "iq-logic",
    subcategory: "Deductive Reasoning",
    difficulty: "hard",
    question: "If all Zips are Zaps, and some Zaps are Zops, which of the following statements is DEFINITIVELY true?",
    options: [
      "Some Zaps are Zips",
      "All Zips are Zops",
      "No Zips are Zops",
      "All Zops are Zips"
    ],
    answer: 0,
    explanation: "If all Zips are inside the set of Zaps (assuming at least one Zip exists), then necessarily some elements of the Zap set are Zips.",
    tags: ["iq-logic", "logic", "syllogisms"]
  },
  {
    id: "math_001",
    category: "mathematics",
    subcategory: "Geometry & Algebra",
    difficulty: "easy",
    question: "What is the Pythagorean theorem formula for a right-angled triangle with hypotenuse c and sides a and b?",
    options: [
      "a² + b² = c²",
      "a + b = c",
      "a² × b² = c²",
      "2a + 2b = c²"
    ],
    answer: 0,
    explanation: "The Pythagorean theorem states that in any right triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides: a² + b² = c².",
    tags: ["mathematics", "geometry", "pythagoras"]
  },
  {
    id: "math_002",
    category: "mathematics",
    subcategory: "Arithmetic & Statistics",
    difficulty: "medium",
    question: "What is the arithmetic Mean (average) of the numbers: 12, 18, 24, 30, and 36?",
    options: [
      "24",
      "22",
      "26",
      "28"
    ],
    answer: 0,
    explanation: "Sum = 12 + 18 + 24 + 30 + 36 = 120. Divide by 5 values: 120 / 5 = 24.",
    tags: ["mathematics", "statistics", "mean"]
  },
  {
    id: "eng_lang_001",
    category: "english",
    subcategory: "Grammar & Syntax",
    difficulty: "easy",
    question: "Identify the sentence that uses correct subject-verb agreement:",
    options: [
      "Neither the doctor nor the nurses were available.",
      "Neither the doctor nor the nurses was available.",
      "Every one of the candidates have submitted their papers.",
      "The list of items are on the desk."
    ],
    answer: 0,
    explanation: "With 'neither... nor...', the verb agrees with the subject closer to it ('the nurses' is plural, so 'were' is correct).",
    tags: ["english", "grammar", "agreement"]
  },
  {
    id: "eng_lang_002",
    category: "english",
    subcategory: "Vocabulary & Antonyms",
    difficulty: "medium",
    question: "What is the direct antonym (opposite meaning) of the word 'Ephemeral'?",
    options: [
      "Permanent",
      "Fleeting",
      "Transient",
      "Brief"
    ],
    answer: 0,
    explanation: "'Ephemeral' means lasting for a very short time. Its antonym is 'permanent' or 'enduring'.",
    tags: ["english", "vocabulary", "antonyms"]
  }
];

/**
 * Question Bank Management Layer
 * Provides clean query, filter, and extension capabilities.
 */
class WKQuizQuestionBank {
  constructor(initialQuestions = WKQUIZ_QUESTIONS) {
    this.questions = Array.isArray(initialQuestions) ? [...initialQuestions] : [];
    this._validate();
  }

  _validate() {
    const ids = new Set();
    this.questions.forEach((q, idx) => {
      if (!q.id) {
        q.id = `q_gen_${idx}`;
      }
      if (ids.has(q.id)) {
        console.warn(`[WKQuiz] Duplicate question ID detected: ${q.id}`);
      }
      ids.add(q.id);

      if (!Array.isArray(q.options) || q.options.length < 2) {
        console.error(`[WKQuiz] Invalid options for question ${q.id}`);
      }
      if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= q.options.length) {
        console.error(`[WKQuiz] Invalid answer index for question ${q.id}`);
      }
    });
  }

  /**
   * Get all questions
   */
  getAll() {
    return [...this.questions];
  }

  /**
   * Add a new question to the bank dynamically
   */
  addQuestion(questionObj) {
    if (!questionObj || !questionObj.id || !questionObj.question || !Array.isArray(questionObj.options)) {
      throw new Error("Invalid question format");
    }
    this.questions.push(questionObj);
  }

  /**
   * Add multiple questions
   */
  addQuestions(questionArray) {
    if (Array.isArray(questionArray)) {
      questionArray.forEach(q => this.addQuestion(q));
    }
  }

  /**
   * Get questions by Category ID
   */
  getByCategory(categoryId) {
    if (!categoryId || categoryId === "all" || categoryId === "mixed-quiz") {
      return this.getAll();
    }
    const cat = String(categoryId).toLowerCase().trim();
    return this.questions.filter(q => 
      q.category.toLowerCase() === cat || 
      (q.tags && q.tags.map(t => t.toLowerCase()).includes(cat))
    );
  }

  /**
   * Filter by difficulty and/or category
   */
  filter({ category, difficulty, tag, search }) {
    return this.questions.filter(q => {
      if (category && category !== "all" && category !== "mixed-quiz") {
        const matchesCategory = q.category.toLowerCase() === category.toLowerCase();
        const matchesTags = q.tags && q.tags.map(t => t.toLowerCase()).includes(category.toLowerCase());
        if (!matchesCategory && !matchesTags) return false;
      }
      if (difficulty && difficulty !== "all") {
        if (q.difficulty.toLowerCase() !== difficulty.toLowerCase()) return false;
      }
      if (tag) {
        if (!q.tags || !q.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())) return false;
      }
      if (search) {
        const term = search.toLowerCase().trim();
        const inQuestion = q.question.toLowerCase().includes(term);
        const inOptions = q.options.some(o => o.toLowerCase().includes(term));
        const inTags = q.tags && q.tags.some(t => t.toLowerCase().includes(term));
        const inCategory = q.category.toLowerCase().includes(term);
        if (!inQuestion && !inOptions && !inTags && !inCategory) return false;
      }
      return true;
    });
  }

  /**
   * Get total question count
   */
  count() {
    return this.questions.length;
  }
}

// Instantiate default global instance
const questionBankInstance = new WKQuizQuestionBank(WKQUIZ_QUESTIONS);

// CommonJS and Browser compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    WKQUIZ_QUESTIONS,
    WKQuizQuestionBank,
    questionBankInstance
  };
}
if (typeof window !== "undefined") {
  window.WKQUIZ_QUESTIONS = WKQUIZ_QUESTIONS;
  window.WKQuizQuestionBank = WKQuizQuestionBank;
  window.wkQuizBank = questionBankInstance;
}
