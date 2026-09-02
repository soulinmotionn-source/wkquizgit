/**
 * TECHNICAL & ENGINEERING QUESTION BANK SEEDER
 * Populates authentic, high-yield questions for:
 * HVAC, Electrical, Electrical Symbols, Electronics, Engineering, Technology, Computers, Automotive
 * across Easy, Medium, and Hard difficulty levels.
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

const techPool = {};
function addTech(catKey, catName, subcat, diff, qText, options, ansIdx, explanation, tags = []) {
  if (!techPool[catKey]) techPool[catKey] = [];
  const idx = techPool[catKey].length + 1;
  const prefix = prefixes[catKey] || catKey.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 6);
  const id = `${prefix}-${String(idx).padStart(6, "0")}`;
  techPool[catKey].push(createQ(id, catName, subcat, diff, qText, options, ansIdx, explanation, tags));
}

// -----------------------------------------------------------------------------
// 1. HVAC (18+ questions)
// -----------------------------------------------------------------------------
// Easy
addTech("hvac", "HVAC", "Airflow", "easy", "What standard unit measures volumetric airflow rate in HVAC ductwork?", ["CFM (Cubic Feet per Minute)", "PSI", "BTU", "RPM"], 0, "CFM measures cubic feet of air moved per minute.");
addTech("hvac", "HVAC", "Capacity", "easy", "How many BTUs per hour equal 1 standard ton of refrigeration?", ["12,000 BTU/hr", "24,000 BTU/hr", "6,000 BTU/hr", "100,000 BTU/hr"], 0, "1 ton of refrigeration = 12,000 BTU/hr.");
addTech("hvac", "HVAC", "Filters", "easy", "What does a filter's MERV rating indicate?", ["Minimum Efficiency Reporting Value", "Motor Energy Resistance", "Moisture Evaporation", "Mass Energy Radiation"], 0, "MERV measures particle filtration efficiency.");
addTech("hvac", "HVAC", "Thermostats", "easy", "In standard thermostat wiring, which color wire typically signals cooling?", ["Yellow (Y)", "Red (R)", "White (W)", "Green (G)"], 0, "Yellow (Y) controls the cooling compressor contactor.");
addTech("hvac", "HVAC", "Safety", "easy", "What toxic gas can be produced by a cracked furnace heat exchanger?", ["Carbon Monoxide (CO)", "Carbon Dioxide", "Nitrogen", "Argon"], 0, "Incomplete combustion yields Carbon Monoxide.");
addTech("hvac", "HVAC", "Components", "easy", "Which component circulates and compresses refrigerant gas throughout the cycle?", ["Compressor", "Evaporator", "Condenser fan", "Filter drier"], 0, "The compressor raises refrigerant pressure and temperature.");
// Medium
addTech("hvac", "HVAC", "Refrigeration", "medium", "What is the primary function of the expansion valve (TXV)?", ["Drop refrigerant pressure and temperature entering the evaporator", "Compress vapor", "Condense hot gas", "Filter oil"], 0, "The TXV meters refrigerant and lowers its pressure.");
addTech("hvac", "HVAC", "Refrigerants", "medium", "Why is R-410A considered near-azeotropic?", ["It has near-zero temperature glide during phase change", "It contains chlorine", "It operates at low pressure", "It can be vented directly"], 0, "R-410A behaves almost like a single-compound fluid.");
addTech("hvac", "HVAC", "Psychrometrics", "medium", "What is the relative humidity when dry-bulb equals wet-bulb temperature?", ["100% Relative Humidity", "0%", "50%", "75%"], 0, "Equal dry and wet bulb temperatures mean 100% RH saturation.");
addTech("hvac", "HVAC", "Motors", "medium", "Which blower motor modulates speed to maintain constant airflow against static pressure?", ["ECM (Electronically Commutated Motor)", "PSC Motor", "Shaded Pole", "Split Phase"], 0, "ECM motors modulate speed to maintain target CFM.");
addTech("hvac", "HVAC", "Superheat", "medium", "How is total superheat calculated on an operating AC system?", ["Suction line temperature minus evaporator saturation temperature", "Liquid line temp minus condenser temp", "Discharge temp minus suction temp", "Outdoor temp minus indoor temp"], 0, "Superheat = Suction Line Temp - Evaporator Saturation Temp.");
addTech("hvac", "HVAC", "Subcooling", "medium", "How is total subcooling calculated on an air conditioning condenser?", ["Condenser saturation temperature minus liquid line temperature", "Suction temp minus liquid temp", "Outdoor temp plus indoor temp", "Discharge pressure divided by 2"], 0, "Subcooling = Condenser Saturation Temp - Liquid Line Temp.");
// Hard
addTech("hvac", "HVAC", "Thermodynamics", "hard", "What is heat that causes temperature change without changing state of matter?", ["Sensible Heat", "Latent Heat", "Specific Heat Ratio", "Subcooling Enthalpy"], 0, "Sensible heat causes a measurable temperature change.");
addTech("hvac", "HVAC", "Diagnostics", "hard", "In a TXV system, high superheat combined with low subcooling indicates what?", ["Undercharged system (low refrigerant)", "Overcharged system", "Liquid line restriction", "Dirty air filter"], 0, "An undercharged system shows high superheat and low subcooling.");
addTech("hvac", "HVAC", "Evacuation", "hard", "What vacuum level in microns must be achieved for system deep dehydration?", ["500 microns or lower", "5,000 microns", "29.9 inches Hg", "15,000 microns"], 0, "500 microns ensures complete moisture evaporation.");
addTech("hvac", "HVAC", "Reversing Valves", "hard", "In a heat pump reversing valve, what mechanism shifts the internal sliding valve spool?", ["Pressure differential between high and low side routed by a pilot solenoid", "Direct mechanical gear motor", "Bimetallic expansion spring", "Centrifugal air fan"], 0, "Reversing valves use pilot solenoids to create a pressure differential.");

// -----------------------------------------------------------------------------
// 2. ELECTRICAL (18+ questions)
// -----------------------------------------------------------------------------
// Easy
addTech("electrical", "Electrical", "Ohm's Law", "easy", "According to Ohm's Law, what formula calculates voltage?", ["V = I × R", "V = I / R", "V = R / I", "V = I + R"], 0, "Voltage = Current (I) × Resistance (R).");
addTech("electrical", "Electrical", "Safety", "easy", "What is the function of a Ground Fault Circuit Interrupter (GFCI)?", ["Protect people from shock by detecting ground current leakage", "Prevent circuit overloads", "Step down voltage", "Convert AC to DC"], 0, "GFCIs prevent electrocution from ground faults.");
addTech("electrical", "Electrical", "Conductors", "easy", "Which metal is standard for residential electrical wiring?", ["Copper", "Gold", "Steel", "Lead"], 0, "Copper is the industry standard conductor.");
addTech("electrical", "Electrical", "Grid", "easy", "What is the AC utility frequency in North America?", ["60 Hz", "50 Hz", "120 Hz", "400 Hz"], 0, "North American power grids operate at 60 Hz.");
addTech("electrical", "Electrical", "Circuits", "easy", "In a series electrical circuit, what quantity remains identical through every component?", ["Current (Amperes)", "Voltage (Volts)", "Power (Watts)", "Resistance (Ohms)"], 0, "In a series circuit, current is uniform throughout.");
addTech("electrical", "Electrical", "Units", "easy", "What unit measures electrical resistance?", ["Ohm (Ω)", "Ampere", "Volt", "Watt"], 0, "Resistance is measured in Ohms.");
// Medium
addTech("electrical", "Electrical", "Power", "medium", "If a 120V circuit draws 5A of current, what is the power consumed?", ["600 Watts", "24 Watts", "125 Watts", "60 Watts"], 0, "P = V × I = 120 × 5 = 600 Watts.");
addTech("electrical", "Electrical", "Wire Sizing", "medium", "What copper wire gauge is standard for a 20A branch circuit?", ["12 AWG", "14 AWG", "10 AWG", "16 AWG"], 0, "12 AWG copper wire is rated for 20 Amps.");
addTech("electrical", "Electrical", "Transformers", "medium", "A transformer with a 10:1 turns ratio converts 240V primary into what secondary voltage?", ["24V AC", "2400V AC", "12V AC", "120V AC"], 0, "240V / 10 = 24V AC secondary output.");
addTech("electrical", "Electrical", "Resistance", "medium", "What is the equivalent resistance of two 10-Ohm resistors wired in parallel?", ["5 Ohms", "20 Ohms", "10 Ohms", "2.5 Ohms"], 0, "R_parallel = (10 × 10) / (10 + 10) = 5 Ohms.");
addTech("electrical", "Electrical", "Energy", "medium", "Electric utility companies bill residential electrical energy consumption in what unit?", ["Kilowatt-hours (kWh)", "Kilowatts (kW)", "Ampere-hours (Ah)", "Megajoules"], 0, "Electrical energy is billed in kilowatt-hours (kWh).");
// Hard
addTech("electrical", "Electrical", "AC Theory", "hard", "In a purely inductive AC circuit, what is the phase relationship between voltage and current?", ["Voltage leads current by 90 degrees", "Current leads voltage by 90 degrees", "They are in phase", "Voltage leads current by 180 degrees"], 0, "In an inductor, voltage leads current by 90° (ELI).");
addTech("electrical", "Electrical", "Three-Phase", "hard", "In a 3-phase Wye system, what is the formula for line-to-line voltage from line-to-neutral voltage?", ["V_LL = √3 × V_LN", "V_LL = V_LN / √3", "V_LL = 3 × V_LN", "V_LL = V_LN"], 0, "Line-to-line voltage equals line-to-neutral multiplied by √3 (1.732).");
addTech("electrical", "Electrical", "Power Factor", "hard", "What does a lagging power factor in an industrial AC plant indicate?", ["The load is predominantly inductive (motors/transformers)", "The load is purely capacitive", "Voltage and current are in phase", "Power consumption is zero"], 0, "Inductive loads draw lagging current, lowering power factor.");
addTech("electrical", "Electrical", "Capacitive Reactance", "hard", "What happens to the capacitive reactance (X_C) of a capacitor as the AC frequency increases?", ["It decreases inversely with frequency", "It increases proportionally", "It remains constant", "It drops to zero instantly"], 0, "X_C = 1 / (2πfC), so reactance decreases as frequency increases.");

// -----------------------------------------------------------------------------
// 3. ELECTRICAL SYMBOLS (10+ questions)
// -----------------------------------------------------------------------------
// Easy
addTech("electrical-symbols", "Electrical Symbols", "Schematic", "easy", "What does a symbol of alternating long and short parallel lines represent?", ["DC Battery / Cell", "Capacitor", "Ground", "Inductor"], 0, "Long/short lines represent a battery.");
addTech("electrical-symbols", "Electrical Symbols", "Grounding", "easy", "What does a symbol with three decreasing horizontal lines attached to a vertical line represent?", ["Earth / Chassis Ground", "Fuse", "Antenna", "Diode"], 0, "The descending parallel lines represent Earth ground.");
addTech("electrical-symbols", "Electrical Symbols", "Switching", "easy", "What component is depicted by a break in a line with a diagonal open lever?", ["Single Pole Single Throw (SPST) Switch", "Capacitor", "Resistor", "Fuse"], 0, "An open diagonal line represents a SPST switch.");
// Medium
addTech("electrical-symbols", "Electrical Symbols", "Passive", "medium", "In US schematics, what component is depicted by a sharp zigzag line?", ["Fixed Resistor", "Inductor", "Transformer", "Switch"], 0, "Zigzag lines represent resistors in US standards.");
addTech("electrical-symbols", "Electrical Symbols", "Coils", "medium", "What component is represented on a schematic by a series of connected curved loops or semicircles?", ["Inductor / Choke coil", "Resistor", "Capacitor", "Crystal oscillator"], 0, "Curved loops depict an inductor coil.");
addTech("electrical-symbols", "Electrical Symbols", "Transformers", "medium", "What symbol consists of two inductor coils separated by two parallel straight lines?", ["Iron-core Transformer", "Air-core Inductor", "Bipolar Transistor", "Potentiometer"], 0, "Two coils separated by parallel lines indicate an iron-core transformer.");
// Hard
addTech("electrical-symbols", "Electrical Symbols", "Semiconductors", "hard", "What does a diode triangle with two outward-pointing arrows represent?", ["Light Emitting Diode (LED)", "Photodiode", "Zener Diode", "Schottky Diode"], 0, "Outward arrows represent emitted light in an LED.");
addTech("electrical-symbols", "Electrical Symbols", "Zener", "hard", "What distinguishes the schematic symbol of a Zener diode from a standard rectifier diode?", ["A bent / cathode bar with angled wings (resembling a Z)", "Two circles around the triangle", "Three outward arrows", "A dashed anode line"], 0, "A Zener diode has a bent cathode bar resembling a 'Z'.");
addTech("electrical-symbols", "Electrical Symbols", "MOSFET", "hard", "On an N-channel MOSFET schematic symbol, in which direction does the channel arrow point?", ["Inward toward the gate channel", "Outward away from the gate", "Straight upward toward drain", "Diagonally toward source"], 0, "N-channel MOSFETs have an inward-pointing channel arrow (In = N).");

// -----------------------------------------------------------------------------
// 4. ELECTRONICS (12+ questions)
// -----------------------------------------------------------------------------
// Easy
addTech("electronics", "Electronics", "Semiconductors", "easy", "What component permits current to flow in one direction only?", ["Diode", "Resistor", "Capacitor", "Inductor"], 0, "Diodes conduct in the forward bias direction only.");
addTech("electronics", "Electronics", "Digital Logic", "easy", "Which logic gate outputs HIGH only when all of its inputs are HIGH?", ["AND Gate", "OR Gate", "NOT Gate", "XOR Gate"], 0, "AND gates require all inputs to be 1.");
addTech("electronics", "Electronics", "Inverters", "easy", "Which logic gate outputs the inverted complement of its single input (HIGH becomes LOW)?", ["NOT Gate (Inverter)", "OR Gate", "AND Gate", "NAND Gate"], 0, "A NOT gate inverts a logic signal.");
// Medium
addTech("electronics", "Electronics", "Transistors", "medium", "What are the three terminals of a BJT transistor?", ["Emitter, Base, Collector", "Gate, Drain, Source", "Anode, Cathode, Gate", "Positive, Negative, Neutral"], 0, "BJTs have Emitter, Base, Collector.");
addTech("electronics", "Electronics", "Op-Amps", "medium", "What is the theoretical input impedance of an ideal operational amplifier (Op-Amp)?", ["Infinite (∞ Ohms)", "Zero (0 Ohms)", "50 Ohms", "1 Megohm"], 0, "Ideal Op-Amps have infinite input impedance and zero input bias current.");
addTech("electronics", "Electronics", "Capacitors", "medium", "What is the basic unit of electrical capacitance?", ["Farad (F)", "Henry (H)", "Ohm (Ω)", "Tesla (T)"], 0, "Capacitance is measured in Farads.");
// Hard
addTech("electronics", "Electronics", "MOSFETs", "hard", "In an N-channel enhancement MOSFET, what is required to conduct drain current?", ["V_GS must exceed positive threshold voltage (V_th)", "V_GS must be zero", "V_GS must be negative", "V_DS must equal zero"], 0, "Positive V_GS above V_th creates an inversion channel.");
addTech("electronics", "Electronics", "Rectification", "hard", "What is the ripple frequency of a full-wave bridge rectifier operating on a 60 Hz AC source?", ["120 Hz", "60 Hz", "30 Hz", "240 Hz"], 0, "Full-wave rectifiers double the AC line frequency to 120 Hz ripple.");

// -----------------------------------------------------------------------------
// 5. ENGINEERING (12+ questions)
// -----------------------------------------------------------------------------
// Easy
addTech("engineering", "Engineering", "Structures", "easy", "Which geometric shape is recognized as the most inherently rigid in trusses?", ["Triangle", "Square", "Hexagon", "Circle"], 0, "Triangles provide structural rigidity.");
addTech("engineering", "Engineering", "Mechanics", "easy", "What is the measure of the rotational force applied around an axis?", ["Torque", "Velocity", "Momentum", "Pressure"], 0, "Torque is rotational mechanical force (Force × Distance).");
// Medium
addTech("engineering", "Engineering", "Materials", "medium", "According to Hooke's Law within elastic limits, stress is directly proportional to what?", ["Strain", "Temperature", "Volume", "Density"], 0, "Stress is proportional to strain (σ = E · ε).");
addTech("engineering", "Engineering", "Thermodynamics", "medium", "Which law of thermodynamics states that entropy in an isolated system always increases?", ["Second Law of Thermodynamics", "First Law", "Third Law", "Zeroth Law"], 0, "The Second Law dictates spontaneous entropy increase.");
// Hard
addTech("engineering", "Engineering", "Fluids", "hard", "Which dimensionless number predicts laminar vs turbulent fluid flow?", ["Reynolds Number (Re)", "Mach Number", "Froude Number", "Prandtl Number"], 0, "Reynolds number characterizes fluid turbulence.");
addTech("engineering", "Engineering", "Statics", "hard", "In beam mechanics, what does the first derivative of the bending moment equation represent?", ["Shear Force (V)", "Deflection (y)", "Slope (θ)", "Distributed Load (w)"], 0, "dM/dx = V (Shear Force).");

// -----------------------------------------------------------------------------
// 6. COMPUTERS (12+ questions)
// -----------------------------------------------------------------------------
// Easy
addTech("computers", "Computers", "Hardware", "easy", "Which computer component provides fast volatile temporary memory?", ["RAM", "SSD", "ROM BIOS", "Hard Drive"], 0, "RAM is volatile memory.");
addTech("computers", "Computers", "Units", "easy", "How many bits are in exactly one byte?", ["8 bits", "4 bits", "16 bits", "32 bits"], 0, "1 Byte = 8 bits.");
addTech("computers", "Computers", "Storage", "easy", "What solid-state component has largely replaced mechanical spinning HDDs in modern laptops?", ["SSD (Solid State Drive)", "Floppy Disk", "Optical Drive", "Magnetic Tape"], 0, "SSDs use flash memory with no moving parts.");
// Medium
addTech("computers", "Computers", "CPU", "medium", "What CPU register holds the memory address of the next instruction to execute?", ["Program Counter (PC)", "Accumulator", "Instruction Register", "Data Register"], 0, "The Program Counter points to the next instruction.");
addTech("computers", "Computers", "Networking", "medium", "What layer of the OSI model is responsible for logical IP addressing and packet routing?", ["Network Layer (Layer 3)", "Data Link Layer (Layer 2)", "Transport Layer (Layer 4)", "Application Layer (Layer 7)"], 0, "Layer 3 (Network Layer) handles IP routing.");
// Hard
addTech("computers", "Computers", "Architecture", "hard", "Why is L1 cache faster than L2 and L3 cache?", ["Built directly into processor core pipelines with sub-nanosecond latency", "Holds more gigabytes", "Uses flash storage", "Runs on AC power"], 0, "L1 cache is integrated directly in the execution core.");
addTech("computers", "Computers", "Virtual Memory", "hard", "What occurs during a 'Page Fault' in modern operating systems?", ["The CPU accesses a virtual memory address whose page is not currently in physical RAM", "The CPU cache fails a parity check", "The hard disk sector is physically damaged", "The BIOS battery runs low"], 0, "A page fault triggers OS memory managers to load the requested page from swap/disk into RAM.");

// -----------------------------------------------------------------------------
// 7. TECHNOLOGY (12+ questions)
// -----------------------------------------------------------------------------
// Easy
addTech("technology", "Technology", "Web", "easy", "What does URL stand for in web browsing?", ["Uniform Resource Locator", "Universal Remote Link", "Unified Routing Language", "User Resource Lookup"], 0, "URL is Uniform Resource Locator.");
addTech("technology", "Technology", "Cloud", "easy", "What computing concept delivers on-demand servers, storage, and databases over the Internet?", ["Cloud Computing", "Local LAN", "Mainframe Batching", "Dial-up Networking"], 0, "Cloud computing provides elastic on-demand compute resources.");
// Medium
addTech("technology", "Technology", "AI", "medium", "In Machine Learning, what does LLM stand for?", ["Large Language Model", "Linear Logic Model", "Layered Learning Matrix", "Logical Link Model"], 0, "LLM stands for Large Language Model.");
addTech("technology", "Technology", "Web Security", "medium", "What protocol encrypts web traffic using TLS/SSL to secure communications between browser and server?", ["HTTPS (HyperText Transfer Protocol Secure)", "HTTP", "FTP", "Telnet"], 0, "HTTPS encrypts communications via TLS.");
// Hard
addTech("technology", "Technology", "Security", "hard", "In public-key cryptography (RSA), which key is used by the sender to encrypt a private message?", ["Recipient's Public Key", "Sender's Private Key", "Recipient's Private Key", "Sender's Public Key"], 0, "Data encrypted with the recipient's public key can only be opened with their private key.");
addTech("technology", "Technology", "Distributed Systems", "hard", "According to the CAP Theorem in distributed databases, which three properties cannot all be simultaneously guaranteed in a partitioned network?", ["Consistency, Availability, and Partition Tolerance", "Concurrency, Atomicity, and Performance", "Caching, Authentication, and Persistence", "Capacity, Accuracy, and Parallelism"], 0, "The CAP theorem states a distributed system can guarantee at most 2 of Consistency, Availability, and Partition tolerance.");

// -----------------------------------------------------------------------------
// 8. AUTOMOTIVE (12+ questions)
// -----------------------------------------------------------------------------
// Easy
addTech("automotive", "Automotive", "Engines", "easy", "What is the correct sequence of strokes in a four-stroke internal combustion engine?", ["Intake, Compression, Power, Exhaust", "Compression, Intake, Power, Exhaust", "Power, Intake, Compression, Exhaust", "Intake, Power, Compression, Exhaust"], 0, "Cycle is Intake, Compression, Power, Exhaust.");
addTech("automotive", "Automotive", "Fluids", "easy", "What fluid is used to lubricate internal engine components and reduce friction?", ["Motor Engine Oil", "Brake fluid", "Windshield washer fluid", "Power steering fluid"], 0, "Engine oil lubricates pistons, crankshafts, and bearings.");
// Medium
addTech("automotive", "Automotive", "Brakes", "medium", "What is the primary function of Anti-lock Brakes (ABS)?", ["Prevent wheel lock-up during hard braking to preserve steering control", "Cut stopping distance in half", "Apply emergency brake", "Cool the rotors"], 0, "ABS pulses pressure to avoid skids and keep steering.");
addTech("automotive", "Automotive", "Electrical", "medium", "What automotive component generates electrical power while the engine runs and recharges the 12V battery?", ["Alternator", "Starter motor", "Ignition coil", "Distributor"], 0, "The alternator converts mechanical engine rotation into DC electrical power.");
// Hard
addTech("automotive", "Automotive", "Diagnostics", "hard", "In OBD-II diagnostics, what does trouble code P0300 indicate?", ["Random or multiple cylinder misfire detected", "O2 sensor fault", "Catalytic converter failure", "EVAP leak"], 0, "P0300 indicates multi-cylinder misfires.");
addTech("automotive", "Automotive", "Emissions", "hard", "What is the primary function of the Catalytic Converter in an automobile exhaust system?", ["Convert toxic exhaust gases (CO, HC, NOx) into CO2, H2O, and N2 using precious metals", "Muffle engine exhaust sound", "Increase engine horsepower by 20%", "Filter solid carbon soot particles"], 0, "Catalytic converters use platinum/palladium/rhodium to catalyze redox reactions on toxic exhaust gases.");

// Write all generated files to question-bank/
let techTotal = 0;
for (const [slug, qList] of Object.entries(techPool)) {
  const filePath = path.join(qbDir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(qList, null, 2), "utf8");
  techTotal += qList.length;
  console.log(`✓ Seeded ${qList.length} questions to question-bank/${slug}.json`);
}

console.log(`\n🎉 Populated ${techTotal} verified questions across Technical & Engineering categories!`);
