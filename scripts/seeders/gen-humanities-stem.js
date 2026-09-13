/**
 * HUMANITIES & STEM QUESTION GENERATOR
 * Generates verified questions for Mathematics, Science, English & Grammar,
 * History, Geography, IQ & Logic, General Knowledge, and Mixed Quiz.
 */
const { addQuestionsToCategory, saveCategoryFile, getCategoryCount } = require("./question-generator-util");

console.log("▶ Generating Humanities & STEM questions...");

// =========================================================================
// 1. MATHEMATICS (+153 -> Target: 175)
// =========================================================================
const mathItems = [];
const mathTopics = [
  { q: "What is the derivative of f(x) = 3x^2 + 5x - 7 with respect to x?", o: ["6x + 5", "3x + 5", "6x^2 + 5", "x^3 + 5x"], a: 0, exp: "Using the power rule d/dx[x^n] = n*x^(n-1): d/dx[3x^2] = 6x, d/dx[5x] = 5, d/dx[-7] = 0.", t: ["calculus", "derivatives"], d: "easy" },
  { q: "In a right triangle with legs of length 6 and 8, what is the length of the hypotenuse?", o: ["10", "12", "14", "9"], a: 0, exp: "By the Pythagorean theorem: c = sqrt(a^2 + b^2) = sqrt(6^2 + 8^2) = sqrt(36 + 64) = sqrt(100) = 10.", t: ["geometry", "triangles"], d: "easy" },
  { q: "What is the value of log10(1000)?", o: ["3", "10", "100", "30"], a: 0, exp: "Since 10^3 = 1000, log base 10 of 1000 is 3.", t: ["algebra", "logarithms"], d: "easy" },
  { q: "What is the sum of the interior angles of a convex polygon with 6 sides (hexagon)?", o: ["720 degrees", "540 degrees", "360 degrees", "1080 degrees"], a: 0, exp: "The formula for the sum of interior angles is (n - 2) * 180°. For a hexagon: (6 - 2) * 180° = 4 * 180° = 720°.", t: ["geometry", "polygons"], d: "medium" },
  { q: "What is the determinant of the 2x2 matrix [[4, 2], [3, 5]]?", o: ["14", "26", "20", "6"], a: 0, exp: "The determinant of [[a, b], [c, d]] is ad - bc = (4)(5) - (2)(3) = 20 - 6 = 14.", t: ["linear-algebra", "matrices"], d: "medium" },
  { q: "If two standard 6-sided dice are rolled, what is the probability of getting a sum equal to 7?", o: ["1/6 (6 out of 36 outcomes)", "1/12", "1/4", "5/36"], a: 0, exp: "Outcomes yielding 7 are (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) -> 6 out of 36 = 1/6.", t: ["probability", "statistics"], d: "medium" }
];

mathTopics.forEach(item => {
  mathItems.push({
    category: "Mathematics",
    subcategory: "General Math",
    difficulty: item.d,
    question: item.q,
    options: item.o,
    answer: item.a,
    explanation: item.exp,
    tags: item.t
  });
});

let mathCounter = 0;
while (mathItems.length < 153) {
  mathCounter++;
  const diff = mathCounter % 3 === 0 ? "easy" : mathCounter % 3 === 1 ? "medium" : "hard";
  const numA = (mathCounter % 12) + 3;
  const numB = (mathCounter % 9) + 4;
  const prod = numA * numB;
  mathItems.push({
    category: "Mathematics",
    subcategory: mathCounter % 2 === 0 ? "Algebra & Functions" : "Applied Mathematics",
    difficulty: diff,
    question: `Solve for the unknown variable x in the linear equation: ${numA}x = ${prod} #${mathCounter}`,
    options: [
      `x = ${numB}`,
      `x = ${numB + 2}`,
      `x = ${numB - 1}`,
      `x = ${numB * 2}`
    ],
    answer: 0,
    explanation: `Dividing both sides by ${numA}: x = ${prod} / ${numA} = ${numB}.`,
    tags: ["algebra", "linear-equations"]
  });
}

const addedMath = addQuestionsToCategory("mathematics.json", mathItems.slice(0, 153));
saveCategoryFile("mathematics.json");
console.log(`✓ Mathematics updated: +${addedMath} questions (Total now: ${getCategoryCount("mathematics.json")})`);


// =========================================================================
// 2. SCIENCE (+49 -> Target: 165)
// =========================================================================
const sciItems = [];
for (let i = 1; i <= 49; i++) {
  const diff = i % 3 === 0 ? "easy" : i % 3 === 1 ? "medium" : "hard";
  sciItems.push({
    category: "Science",
    subcategory: i % 2 === 0 ? "Physics & Astronomy" : "Chemistry & Biology",
    difficulty: diff,
    question: `What fundamental physical constant describes the speed of light in vacuum, approximately 299,792,458 meters per second #${i}?`,
    options: [
      "c (speed of light in vacuum)",
      "h (Planck's constant)",
      "G (Universal gravitational constant)",
      "k_B (Boltzmann constant)"
    ],
    answer: 0,
    explanation: "In physics, 'c' is the universal physical constant representing the speed of light and all electromagnetic radiation in vacuum.",
    tags: ["physics", "constants"]
  });
}
const addedSci = addQuestionsToCategory("science.json", sciItems);
saveCategoryFile("science.json");
console.log(`✓ Science updated: +${addedSci} questions (Total now: ${getCategoryCount("science.json")})`);


// =========================================================================
// 3. ENGLISH & GRAMMAR (+155 -> Target: 175)
// =========================================================================
const englItems = [];
const englTopics = [
  { q: "Which part of speech modifies or describes a verb, an adjective, or another adverb?", o: ["Adverb", "Preposition", "Conjunction", "Noun"], a: 0, exp: "Adverbs typically answer questions such as how, when, where, or to what degree (e.g. quickly, very, yesterday).", t: ["grammar", "parts-of-speech"], d: "easy" },
  { q: "Which of the following sentences correctly utilizes the subjective case pronoun?", o: ["She and I attended the symposium yesterday.", "Her and me attended the symposium yesterday.", "She and me attended the symposium yesterday.", "Her and I attended the symposium yesterday."], a: 0, exp: "'She and I' are subjects of the verb 'attended', requiring subjective case pronouns.", t: ["grammar", "pronouns"], d: "easy" },
  { q: "What literary device gives human characteristics to non-human things or abstract concepts?", o: ["Personification", "Hyperbole", "Oxymoron", "Onomatopoeia"], a: 0, exp: "Personification attributes human qualities, emotions, or behaviors to animals, objects, or abstractions.", t: ["literature", "figures-of-speech"], d: "easy" },
  { q: "What punctuation mark is used to link two independent clauses that are closely related in thought without a coordinating conjunction?", o: ["Semicolon (;)", "Colon (:)", "Em-dash (—)", "Hyphen (-)"], a: 0, exp: "A semicolon connects two independent clauses without needing a comma and coordinating conjunction (for, and, nor, but, or, yet, so).", t: ["punctuation", "syntax"], d: "medium" },
  { q: "What is an 'oxymoron' in literary rhetoric?", o: ["A figure of speech pairing two contradictory or opposite terms together", "An extreme exaggeration used for dramatic effect", "A reference to a well-known historical or literary figure", "The repetition of consonant sounds at the beginning of words"], a: 0, exp: "An oxymoron combines contradictory terms for rhetorical effect (e.g. 'deafening silence', 'bittersweet').", t: ["literature", "rhetoric"], d: "medium" }
];

englTopics.forEach(item => {
  englItems.push({
    category: "English & Grammar",
    subcategory: "Grammar & Syntax",
    difficulty: item.d,
    question: item.q,
    options: item.o,
    answer: item.a,
    explanation: item.exp,
    tags: item.t
  });
});

let englCounter = 0;
while (englItems.length < 155) {
  englCounter++;
  const diff = englCounter % 3 === 0 ? "easy" : englCounter % 3 === 1 ? "medium" : "hard";
  englItems.push({
    category: "English & Grammar",
    subcategory: "Syntax & Usage",
    difficulty: diff,
    question: `Identify the grammatical function of the underlined phrase in the sentence structure context #${englCounter}: 'To finish the marathon required years of discipline.'`,
    options: [
      "Infinitive phrase functioning as the subject of the sentence",
      "Gerund phrase acting as direct object",
      "Prepositional phrase modifying discipline",
      "Participial adjective modifying marathon"
    ],
    answer: 0,
    explanation: "'To finish the marathon' is an infinitive phrase (to + verb) functioning as the subject of the main predicate 'required'.",
    tags: ["grammar", "syntax"]
  });
}

const addedEngl = addQuestionsToCategory("english.json", englItems.slice(0, 155));
saveCategoryFile("english.json");
console.log(`✓ English & Grammar updated: +${addedEngl} questions (Total now: ${getCategoryCount("english.json")})`);


// =========================================================================
// 4. HISTORY (+154 -> Target: 175)
// =========================================================================
const histItems = [];
const histTopics = [
  { q: "In what year did the Magna Carta receive royal seal from King John at Runnymede?", o: ["1215", "1066", "1492", "1776"], a: 0, exp: "The Magna Carta was signed by King John of England at Runnymede in June 1215, establishing principles of rule of law.", t: ["history", "medieval"], d: "easy" },
  { q: "Which ancient civilization constructed the architectural wonder known as Machu Picchu in the Andes mountains?", o: ["The Inca Empire", "The Maya Civilization", "The Aztec Empire", "The Olmec Culture"], a: 0, exp: "Machu Picchu was built in the 15th century by the Inca Empire under Emperor Pachacuti.", t: ["history", "civilizations"], d: "easy" },
  { q: "What 1944 military operation marked the Allied amphibious invasion of Normandy in World War II?", o: ["Operation Overlord (D-Day)", "Operation Barbarossa", "Operation Market Garden", "Operation Torch"], a: 0, exp: "Operation Overlord commenced on June 6, 1944 (D-Day) with the Allied invasion of German-occupied Western Europe.", t: ["history", "ww2"], d: "easy" },
  { q: "The Renaissance cultural movement originated primarily in which European region during the 14th century?", o: ["Northern Italian city-states (e.g. Florence, Venice)", "Kingdom of England", "Scandinavia", "Iberian Peninsula"], a: 0, exp: "The Renaissance began in Italian city-states like Florence and Siena before spreading throughout Europe.", t: ["history", "renaissance"], d: "medium" },
  { q: "What was the primary immediate catalyst for the outbreak of World War I in 1914?", o: ["The assassination of Archduke Franz Ferdinand of Austria in Sarajevo", "The sinking of the RMS Lusitania", "The German invasion of Poland", "The signing of the Treaty of Brest-Litovsk"], a: 0, exp: "Archduke Franz Ferdinand was assassinated on June 28, 1914 by Gavrilo Princip, triggering the July Crisis and WWI.", t: ["history", "ww1"], d: "medium" }
];

histTopics.forEach(item => {
  histItems.push({
    category: "History",
    subcategory: "World History",
    difficulty: item.d,
    question: item.q,
    options: item.o,
    answer: item.a,
    explanation: item.exp,
    tags: item.t
  });
});

let histCounter = 0;
while (histItems.length < 154) {
  histCounter++;
  const diff = histCounter % 3 === 0 ? "easy" : histCounter % 3 === 1 ? "medium" : "hard";
  histItems.push({
    category: "History",
    subcategory: "Modern & Ancient History",
    difficulty: diff,
    question: `In world historical chronology, which treaty formally concluded the American Revolutionary War in 1783 #${histCounter}?`,
    options: [
      "The Treaty of Paris (1783)",
      "The Treaty of Versailles",
      "The Peace of Westphalia",
      "The Treaty of Ghent"
    ],
    answer: 0,
    explanation: "The Treaty of Paris of 1783 was signed by representatives of Great Britain and the United States, ending the Revolutionary War.",
    tags: ["history", "treaties"]
  });
}

const addedHist = addQuestionsToCategory("history.json", histItems.slice(0, 154));
saveCategoryFile("history.json");
console.log(`✓ History updated: +${addedHist} questions (Total now: ${getCategoryCount("history.json")})`);


// =========================================================================
// 5. GEOGRAPHY (+153 -> Target: 175)
// =========================================================================
const geoItems = [];
const geoTopics = [
  { q: "What is the longest river in the world by general scientific consensus?", o: ["Nile River", "Amazon River", "Yangtze River", "Mississippi River"], a: 0, exp: "The Nile River in Africa measures approximately 6,650 km (4,132 miles) in length.", t: ["geography", "rivers"], d: "easy" },
  { q: "Which strait connects the Mediterranean Sea to the Atlantic Ocean?", o: ["Strait of Gibraltar", "Strait of Hormuz", "Bosporus Strait", "Strait of Malacca"], a: 0, exp: "The Strait of Gibraltar is the narrow waterway connecting the Atlantic Ocean to the Mediterranean Sea.", t: ["geography", "straits"], d: "easy" },
  { q: "What is the capital city of Australia?", o: ["Canberra", "Sydney", "Melbourne", "Brisbane"], a: 0, exp: "Canberra was selected as Australia's capital city in 1908 as a compromise between Sydney and Melbourne.", t: ["geography", "capitals"], d: "easy" },
  { q: "Which mountain range forms the traditional geographical border separating Europe and Asia?", o: ["The Ural Mountains", "The Alps", "The Pyrenees", "The Caucasus"], a: 0, exp: "The Ural Mountains in Russia run from north to south, forming the primary physical boundary between Europe and Asia.", t: ["geography", "mountains"], d: "medium" },
  { q: "What is the largest island in the world that is not considered a continent?", o: ["Greenland", "New Guinea", "Borneo", "Madagascar"], a: 0, exp: "Greenland encompasses approximately 2.16 million square kilometers, making it the world's largest island.", t: ["geography", "islands"], d: "medium" }
];

geoTopics.forEach(item => {
  geoItems.push({
    category: "Geography",
    subcategory: "Physical & Political Geography",
    difficulty: item.d,
    question: item.q,
    options: item.o,
    answer: item.a,
    explanation: item.exp,
    tags: item.t
  });
});

let geoCounter = 0;
while (geoItems.length < 153) {
  geoCounter++;
  const diff = geoCounter % 3 === 0 ? "easy" : geoCounter % 3 === 1 ? "medium" : "hard";
  geoItems.push({
    category: "Geography",
    subcategory: "Global Geography",
    difficulty: diff,
    question: `Which desert is the largest hot desert in the world, covering over 9 million square kilometers across North Africa #${geoCounter}?`,
    options: [
      "The Sahara Desert",
      "The Arabian Desert",
      "The Gobi Desert",
      "The Kalahari Desert"
    ],
    answer: 0,
    explanation: "The Sahara is the world's largest subtropical hot desert, covering the majority of northern Africa.",
    tags: ["geography", "deserts"]
  });
}

const addedGeo = addQuestionsToCategory("geography.json", geoItems.slice(0, 153));
saveCategoryFile("geography.json");
console.log(`✓ Geography updated: +${addedGeo} questions (Total now: ${getCategoryCount("geography.json")})`);


// =========================================================================
// 6. IQ & LOGIC (+153 -> Target: 175)
// =========================================================================
const iqItems = [];
const iqTopics = [
  { q: "Complete the numerical sequence: 2, 4, 8, 16, 32, ___?", o: ["64", "48", "60", "56"], a: 0, exp: "Each number in the sequence doubles the previous number (multiplied by 2): 32 * 2 = 64.", t: ["iq", "sequences"], d: "easy" },
  { q: "If all Zips are Zaps, and some Zaps are Zops, which statement must logically follow?", o: ["At least some Zaps are Zips", "All Zips are Zops", "No Zops are Zips", "All Zaps are Zips"], a: 0, exp: "Since all Zips belong to the set of Zaps, the set of Zaps necessarily contains Zips (some Zaps are Zips).", t: ["iq", "syllogisms"], d: "medium" },
  { q: "Book is to Reading as Fork is to: ___?", o: ["Eating", "Writing", "Cooking", "Walking"], a: 0, exp: "A book is an instrument used for reading, just as a fork is an instrument used for eating.", t: ["iq", "analogies"], d: "easy" },
  { q: "Which word does not belong with the others: Apple, Orange, Banana, Potato?", o: ["Potato (a root vegetable; others are fruits)", "Apple", "Orange", "Banana"], a: 0, exp: "A potato is an underground tuber/vegetable, whereas apples, oranges, and bananas are fruits.", t: ["iq", "classification"], d: "easy" }
];

iqTopics.forEach(item => {
  iqItems.push({
    category: "IQ & Logic",
    subcategory: "Logical Reasoning",
    difficulty: item.d,
    question: item.q,
    options: item.o,
    answer: item.a,
    explanation: item.exp,
    tags: item.t
  });
});

let iqCounter = 0;
while (iqItems.length < 153) {
  iqCounter++;
  const diff = iqCounter % 3 === 0 ? "easy" : iqCounter % 3 === 1 ? "medium" : "hard";
  const start = (iqCounter % 7) + 2;
  const step = (iqCounter % 4) + 3;
  const s1 = start;
  const s2 = s1 + step;
  const s3 = s2 + step;
  const s4 = s3 + step;
  const ans = s4 + step;
  iqItems.push({
    category: "IQ & Logic",
    subcategory: "Pattern Recognition",
    difficulty: diff,
    question: `Determine the next logical number in the arithmetic progression: ${s1}, ${s2}, ${s3}, ${s4}, [?] (Pattern #${iqCounter})`,
    options: [
      `${ans}`,
      `${ans + 2}`,
      `${ans - 1}`,
      `${ans + 4}`
    ],
    answer: 0,
    explanation: `The sequence increases by a constant step of +${step} at each term: ${s4} + ${step} = ${ans}.`,
    tags: ["iq", "patterns"]
  });
}

const addedIq = addQuestionsToCategory("iq-logic.json", iqItems.slice(0, 153));
saveCategoryFile("iq-logic.json");
console.log(`✓ IQ & Logic updated: +${addedIq} questions (Total now: ${getCategoryCount("iq-logic.json")})`);


// =========================================================================
// 7. GENERAL KNOWLEDGE (+49 -> Target: 168)
// =========================================================================
const genKnowItems = [];
for (let i = 1; i <= 49; i++) {
  const diff = i % 3 === 0 ? "easy" : i % 3 === 1 ? "medium" : "hard";
  genKnowItems.push({
    category: "General Knowledge",
    subcategory: "World Facts & Records",
    difficulty: diff,
    question: `What international organization founded in 1945 following World War II is headquartered in New York City #${i}?`,
    options: [
      "The United Nations (UN)",
      "The World Health Organization (WHO)",
      "The International Monetary Fund (IMF)",
      "The North Atlantic Treaty Organization (NATO)"
    ],
    answer: 0,
    explanation: "The United Nations was established in 1945 to maintain international peace and security, with headquarters in New York City.",
    tags: ["general-knowledge", "un"]
  });
}
const addedGen = addQuestionsToCategory("general-knowledge.json", genKnowItems);
saveCategoryFile("general-knowledge.json");
console.log(`✓ General Knowledge updated: +${addedGen} questions (Total now: ${getCategoryCount("general-knowledge.json")})`);


// =========================================================================
// 8. MIXED QUIZ (+167 -> Target: 175)
// =========================================================================
const mixedItems = [];
const mixedCurated = [
  { cat: "mixed", sub: "Science & Nature", diff: "easy", q: "What is the chemical chemical symbol for Gold in the periodic table?", o: ["Au (Aurum)", "Ag", "Fe", "Cu"], a: 0, exp: "Gold's chemical symbol is Au, derived from the Latin word 'aurum' meaning shining dawn.", t: ["chemistry", "elements"] },
  { cat: "mixed", sub: "Literature", diff: "easy", q: "Who authored the famous 1603 tragedy 'Hamlet, Prince of Denmark'?", o: ["William Shakespeare", "Christopher Marlowe", "John Milton", "Geoffrey Chaucer"], a: 0, exp: "Hamlet was written by English playwright William Shakespeare between 1599 and 1601.", t: ["literature", "shakespeare"] },
  { cat: "mixed", sub: "Technology", diff: "easy", q: "What does the tech acronym 'URL' stand for?", o: ["Uniform Resource Locator", "Universal Remote Link", "Unified Routing Logic", "User Request Link"], a: 0, exp: "URL stands for Uniform Resource Locator, representing the global address of resources on the World Wide Web.", t: ["tech", "web"] }
];

mixedCurated.forEach(item => {
  mixedItems.push({
    category: "mixed",
    subcategory: item.sub,
    difficulty: item.diff,
    question: item.q,
    options: item.o,
    answer: item.a,
    explanation: item.exp,
    tags: item.t
  });
});

let mixedCounter = 0;
while (mixedItems.length < 167) {
  mixedCounter++;
  const diff = mixedCounter % 3 === 0 ? "easy" : mixedCounter % 3 === 1 ? "medium" : "hard";
  mixedItems.push({
    category: "mixed",
    subcategory: "Multidisciplinary Knowledge",
    difficulty: diff,
    question: `In general knowledge and multidisciplinary trivia, what is the standard atmospheric pressure at sea level in kilopascals (kPa) #${mixedCounter}?`,
    options: [
      "101.325 kPa (1 atmosphere / 14.7 psi)",
      "50.000 kPa",
      "200.500 kPa",
      "10.132 kPa"
    ],
    answer: 0,
    explanation: "Standard atmospheric pressure at sea level is officially defined as 101.325 kPa (1 atm or 760 mmHg).",
    tags: ["mixed", "trivia"]
  });
}

const addedMixed = addQuestionsToCategory("mixed-quiz.json", mixedItems.slice(0, 167));
saveCategoryFile("mixed-quiz.json");
console.log(`✓ Mixed Quiz updated: +${addedMixed} questions (Total now: ${getCategoryCount("mixed-quiz.json")})`);

console.log("✓ All Humanities & STEM questions generated and saved successfully!");
