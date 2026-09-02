/**
 * STEM, GENERAL KNOWLEDGE & ENTERTAINMENT QUESTION BANK SEEDER
 * Populates authentic questions for:
 * IQ & Logic, Mathematics, Science, History, Geography, English, General Knowledge,
 * Entertainment, Movies, TV Shows, Drama, Celebrity, Music
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

const stemPool = {};
function addStem(catKey, catName, subcat, diff, qText, options, ansIdx, explanation, tags = []) {
  if (!stemPool[catKey]) stemPool[catKey] = [];
  const idx = stemPool[catKey].length + 1;
  const prefix = prefixes[catKey] || catKey.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 6);
  const id = `${prefix}-${String(idx).padStart(6, "0")}`;
  stemPool[catKey].push(createQ(id, catName, subcat, diff, qText, options, ansIdx, explanation, tags));
}

// -----------------------------------------------------------------------------
// 1. IQ & LOGIC
// -----------------------------------------------------------------------------
// Easy
addStem("iq-logic", "IQ & Logic", "Series", "easy", "Look at this sequence: 5, 10, 15, 20, ___ . What comes next?", ["25", "30", "22", "35"], 0, "Pattern adds 5 each step: 20 + 5 = 25.");
addStem("iq-logic", "IQ & Logic", "Riddles", "easy", "A farmer has 15 sheep and all but 8 die. How many sheep are still alive?", ["8", "7", "0", "15"], 0, "All but 8 die means 8 survive.");
addStem("iq-logic", "IQ & Logic", "Analogies", "easy", "Puppy is to Dog as Kitten is to ___ ?", ["Cat", "Tiger", "Mouse", "Hamster"], 0, "A kitten is a young cat.");
// Medium
addStem("iq-logic", "IQ & Logic", "Patterns", "medium", "What number comes next: 2, 6, 12, 20, 30, ___ ?", ["42", "40", "38", "48"], 0, "Differences increase by 2: +4, +6, +8, +10, +12 -> 30 + 12 = 42.");
addStem("iq-logic", "IQ & Logic", "Logic", "medium", "If yesterday was Tuesday, what day will it be 3 days after tomorrow?", ["Sunday", "Monday", "Saturday", "Friday"], 0, "Yesterday = Tue, Today = Wed, Tomorrow = Thu, +3 days = Sunday.");
addStem("iq-logic", "IQ & Logic", "Math Logic", "medium", "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?", ["$0.05 (5 cents)", "$0.10", "$0.15", "$0.01"], 0, "Ball = x; Bat = x + 1.00; 2x + 1.00 = 1.10; 2x = 0.10; x = $0.05.");
// Hard
addStem("iq-logic", "IQ & Logic", "Syllogisms", "hard", "If all Bloops are Razzies, and all Razzies are Lizzies, which statement is guaranteed true?", ["All Bloops are Lizzies", "All Lizzies are Bloops", "No Bloops are Lizzies", "Some Bloops are not Lizzies"], 0, "By transitive logic, all Bloops are Lizzies.");
addStem("iq-logic", "IQ & Logic", "Deduction", "hard", "Four people (A, B, C, D) are in a race. A finishes ahead of B but behind C. D finishes ahead of C. Who won the race?", ["D", "C", "A", "B"], 0, "Order from first to last: D > C > A > B. D won the race.");

// -----------------------------------------------------------------------------
// 2. MATHEMATICS
// -----------------------------------------------------------------------------
// Easy
addStem("mathematics", "Mathematics", "Geometry", "easy", "What is the formula for the area of a rectangle?", ["Area = Length × Width", "Area = 2L + 2W", "Area = L² × W²", "Area = (L+W)/2"], 0, "Area = Length × Width.");
addStem("mathematics", "Mathematics", "Arithmetic", "easy", "What is the square root of 144?", ["12", "14", "11", "16"], 0, "12 × 12 = 144.");
addStem("mathematics", "Mathematics", "Fractions", "easy", "What is 3/4 expressed as a percentage?", ["75%", "50%", "80%", "65%"], 0, "3 divided by 4 = 0.75 = 75%.");
// Medium
addStem("mathematics", "Mathematics", "Algebra", "medium", "Solve for x: 3x + 15 = 36", ["x = 7", "x = 9", "x = 6", "x = 12"], 0, "3x = 21; x = 7.");
addStem("mathematics", "Mathematics", "Statistics", "medium", "What is the arithmetic mean (average) of 10, 20, 30, 40, and 50?", ["30", "25", "35", "40"], 0, "Sum = 150 / 5 = 30.");
addStem("mathematics", "Mathematics", "Pythagoras", "medium", "In a right triangle with legs of length 6 and 8, what is the length of the hypotenuse?", ["10", "14", "12", "9"], 0, "6² + 8² = 36 + 64 = 100; √100 = 10.");
// Hard
addStem("mathematics", "Mathematics", "Calculus", "hard", "What is the derivative with respect to x of f(x) = 4x³ - 5x + 9?", ["f'(x) = 12x² - 5", "f'(x) = 12x² - 5x", "f'(x) = 4x² - 5", "f'(x) = 12x³ - 5"], 0, "d/dx[4x³ - 5x + 9] = 12x² - 5.");
addStem("mathematics", "Mathematics", "Probability", "hard", "What is the probability of rolling a total sum of 7 when rolling two standard 6-sided dice?", ["1/6 (6 out of 36 outcomes)", "1/12", "1/4", "1/8"], 0, "Combinations yielding 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6/36 = 1/6.");

// -----------------------------------------------------------------------------
// 3. SCIENCE
// -----------------------------------------------------------------------------
// Easy
addStem("science", "Science", "Chemistry", "easy", "What is the chemical formula for pure water?", ["H2O", "CO2", "NaCl", "O2"], 0, "Water is H2O.");
addStem("science", "Science", "Physics", "easy", "What force pulls objects toward the center of the Earth?", ["Gravity", "Magnetism", "Friction", "Centrifugal force"], 0, "Gravity attracts mass.");
addStem("science", "Science", "Biology", "easy", "What green pigment in plants is responsible for absorbing sunlight in photosynthesis?", ["Chlorophyll", "Hemoglobin", "Melanin", "Carotene"], 0, "Chlorophyll absorbs light energy in chloroplasts.");
// Medium
addStem("science", "Science", "Physics", "medium", "What is the speed of light in a vacuum?", ["Approx 300,000 km/s (3 × 10^8 m/s)", "150,000 km/s", "343 m/s", "1,000 km/s"], 0, "Speed of light c ≈ 3 × 10^8 m/s.");
addStem("science", "Science", "Chemistry", "medium", "What is the pH value of pure neutral distilled water at 25°C?", ["7.0", "0.0", "14.0", "5.5"], 0, "Neutral pH is exactly 7.0.");
addStem("science", "Science", "Astronomy", "medium", "What is the largest planet in our solar system by mass and volume?", ["Jupiter", "Saturn", "Neptune", "Uranus"], 0, "Jupiter is the largest planet.");
// Hard
addStem("science", "Science", "Biology", "hard", "Which organelle is the site of cellular respiration and ATP synthesis in eukaryotes?", ["Mitochondria", "Ribosome", "Endoplasmic Reticulum", "Golgi apparatus"], 0, "Mitochondria produce ATP.");
addStem("science", "Science", "Genetics", "hard", "In DNA replication, which enzyme unwinds the double helix at the replication fork?", ["DNA Helicase", "DNA Polymerase", "DNA Ligase", "Topoisomerase"], 0, "Helicase breaks hydrogen bonds to unwind DNA.");

// -----------------------------------------------------------------------------
// 4. HISTORY
// -----------------------------------------------------------------------------
// Easy
addStem("history", "History", "Space", "easy", "In which year did the Apollo 11 Moon landing occur?", ["1969", "1965", "1972", "1959"], 0, "Apollo 11 landed on July 20, 1969.");
addStem("history", "History", "Ancient", "easy", "Which ancient civilization built the Great Pyramids of Giza?", ["Ancient Egyptians", "Romans", "Greeks", "Babylonians"], 0, "Egyptians built the Pyramids of Giza.");
addStem("history", "History", "US History", "easy", "Who was the first President of the United States?", ["George Washington", "Thomas Jefferson", "John Adams", "Benjamin Franklin"], 0, "George Washington served from 1789 to 1797.");
// Medium
addStem("history", "History", "World Wars", "medium", "In which year did World War II end?", ["1945", "1944", "1939", "1950"], 0, "WWII ended in 1945.");
addStem("history", "History", "Renaissance", "medium", "Which Italian polymath painted the Mona Lisa and The Last Supper?", ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"], 0, "Leonardo da Vinci painted the Mona Lisa.");
addStem("history", "History", "French Revolution", "medium", "What fortress prison was stormed in Paris on July 14, 1789, marking the French Revolution?", ["The Bastille", "Versailles", "The Conciergerie", "The Louvre"], 0, "Storming of the Bastille ignited the French Revolution.");
// Hard
addStem("history", "History", "Treaties", "hard", "Which 1648 peace treaties ended the Thirty Years' War and established European state sovereignty?", ["Peace of Westphalia", "Treaty of Versailles", "Treaty of Utrecht", "Congress of Vienna"], 0, "Peace of Westphalia established modern state sovereignty.");
addStem("history", "History", "Ancient Empires", "hard", "In which year did the Western Roman Empire traditionally fall with the deposition of Romulus Augustulus?", ["476 AD", "312 AD", "1066 AD", "1453 AD"], 0, "The Western Roman Empire fell in 476 AD.");

// -----------------------------------------------------------------------------
// 5. GEOGRAPHY
// -----------------------------------------------------------------------------
// Easy
addStem("geography", "Geography", "Capitals", "easy", "What is the capital city of France?", ["Paris", "Lyon", "Marseille", "Bordeaux"], 0, "Paris is France's capital.");
addStem("geography", "Geography", "Rivers", "easy", "Which river is recognized as the longest in the world?", ["The Nile River", "The Amazon River", "The Yangtze River", "The Mississippi"], 0, "The Nile is approx 6,650 km long.");
addStem("geography", "Geography", "Continents", "easy", "Which is the largest continent on Earth by both land area and population?", ["Asia", "Africa", "North America", "Europe"], 0, "Asia is the largest continent.");
// Medium
addStem("geography", "Geography", "Capitals", "medium", "What is the capital city of Australia?", ["Canberra", "Sydney", "Melbourne", "Brisbane"], 0, "Canberra is Australia's capital.");
addStem("geography", "Geography", "Mountains", "medium", "What is the highest mountain peak in the world above sea level?", ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"], 0, "Mount Everest stands at 8,848 meters.");
addStem("geography", "Geography", "Lakes", "medium", "Which lake is the largest freshwater lake in the world by surface area?", ["Lake Superior", "Lake Victoria", "Lake Baikal", "Caspian Sea"], 0, "Lake Superior has the largest freshwater surface area.");
// Hard
addStem("geography", "Geography", "Oceans", "hard", "Which ocean trench contains Challenger Deep, the lowest point on Earth?", ["Mariana Trench", "Puerto Rico Trench", "Java Trench", "Tonga Trench"], 0, "Mariana Trench holds Challenger Deep (11,000m).");
addStem("geography", "Geography", "Geopolitics", "hard", "Which country in the world is completely surrounded as an enclave within South Africa?", ["Lesotho", "Eswatini", "Botswana", "Namibia"], 0, "Lesotho is a landlocked enclave inside South Africa.");

// -----------------------------------------------------------------------------
// 6. ENGLISH & GRAMMAR
// -----------------------------------------------------------------------------
// Easy
addStem("english", "English & Grammar", "Grammar", "easy", "Which part of speech modifies or describes a noun?", ["Adjective", "Verb", "Preposition", "Adverb"], 0, "Adjectives modify nouns.");
addStem("english", "English & Grammar", "Punctuation", "easy", "Which punctuation mark is used to indicate a direct question?", ["Question mark (?)", "Exclamation mark (!)", "Comma (,)", "Semicolon (;)"], 0, "A question mark ends interrogative sentences.");
// Medium
addStem("english", "English & Grammar", "Grammar", "medium", "Which sentence exhibits correct subject-verb agreement?", ["Neither the doctor nor the nurses were available", "Neither the doctor nor the nurses was available", "Each of the boys are here", "The list of items are lost"], 0, "Verb agrees with closer subject ('nurses were').");
addStem("english", "English & Grammar", "Vocabulary", "medium", "What is the antonym of 'Ephemeral'?", ["Permanent", "Fleeting", "Transient", "Short-lived"], 0, "Permanent is the opposite of ephemeral.");
// Hard
addStem("english", "English & Grammar", "Rhetoric", "hard", "What rhetorical figure uses understatement by denying the contrary (e.g. 'not bad')?", ["Litotes", "Chiasmus", "Synecdoche", "Metonymy"], 0, "Litotes expresses an affirmative by negating its opposite.");
addStem("english", "English & Grammar", "Syntax", "hard", "What is the term for a clause that cannot stand alone as a complete sentence and starts with a subordinating conjunction?", ["Subordinate (Dependent) Clause", "Independent Clause", "Absolute Phrase", "Appositive"], 0, "A dependent clause cannot stand alone as a complete thought.");

// -----------------------------------------------------------------------------
// 7. GENERAL KNOWLEDGE
// -----------------------------------------------------------------------------
// Easy
addStem("general-knowledge", "General Knowledge", "Earth", "easy", "What is the hardest naturally occurring mineral on Earth?", ["Diamond", "Corundum", "Quartz", "Topaz"], 0, "Diamond is 10 on the Mohs hardness scale.");
addStem("general-knowledge", "General Knowledge", "Time", "easy", "How many days are in a standard leap year?", ["366 days", "365 days", "364 days", "360 days"], 0, "A leap year adds February 29th for 366 days.");
// Medium
addStem("general-knowledge", "General Knowledge", "Landmarks", "medium", "In which country is the ancient citadel of Machu Picchu located?", ["Peru", "Chile", "Bolivia", "Ecuador"], 0, "Machu Picchu is in Peru.");
addStem("general-knowledge", "General Knowledge", "Inventions", "medium", "Who is credited with inventing the modern telephone in 1876?", ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"], 0, "Alexander Graham Bell patented the telephone.");
// Hard
addStem("general-knowledge", "General Knowledge", "Oceans", "hard", "What is the only sea on Earth without land boundaries, defined by North Atlantic currents?", ["Sargasso Sea", "Coral Sea", "Baltic Sea", "Tasman Sea"], 0, "Sargasso Sea is bounded by ocean currents.");

// -----------------------------------------------------------------------------
// 8. ENTERTAINMENT
// -----------------------------------------------------------------------------
// Easy
addStem("entertainment", "Entertainment", "Comics", "easy", "Which superhero is known as the 'Dark Knight' of Gotham City?", ["Batman", "Superman", "Spider-Man", "Iron Man"], 0, "Batman is the Dark Knight.");
addStem("entertainment", "Entertainment", "Animation", "easy", "What is the name of Mickey Mouse's pet dog?", ["Pluto", "Goofy", "Donald", "Bolt"], 0, "Pluto is Mickey's loyal pet dog.");
// Medium
addStem("entertainment", "Entertainment", "Oscars", "medium", "Which 1997 James Cameron film won 11 Academy Awards?", ["Titanic", "Avatar", "Gladiator", "Braveheart"], 0, "Titanic tied the record with 11 Oscars.");
addStem("entertainment", "Entertainment", "Gaming", "medium", "Which gaming franchise features the characters Master Chief and Cortana?", ["Halo", "Gears of War", "Call of Duty", "Destiny"], 0, "Master Chief stars in the Halo series.");
// Hard
addStem("entertainment", "Entertainment", "Cinema", "hard", "Who directed the 1927 silent dystopian masterpiece 'Metropolis'?", ["Fritz Lang", "F.W. Murnau", "Robert Wiene", "Billy Wilder"], 0, "Fritz Lang directed Metropolis in 1927.");

// -----------------------------------------------------------------------------
// 9. MOVIES
// -----------------------------------------------------------------------------
// Easy
addStem("movies", "Movies", "Sci-Fi", "easy", "Who is Luke Skywalker's father in Star Wars?", ["Darth Vader (Anakin Skywalker)", "Obi-Wan Kenobi", "Palpatine", "Yoda"], 0, "Darth Vader is Luke's father.");
addStem("movies", "Movies", "Animation", "easy", "In 'The Lion King', what is the name of Simba's father?", ["Mufasa", "Scar", "Rafiki", "Zazu"], 0, "Mufasa is Simba's father.");
// Medium
addStem("movies", "Movies", "Box Office", "medium", "Which 2009 film is the highest-grossing movie of all time worldwide?", ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"], 0, "Avatar grossed over $2.9 billion.");
addStem("movies", "Movies", "Classics", "medium", "In 'The Wizard of Oz' (1939), what color are Dorothy's magical slippers?", ["Ruby Red", "Emerald Green", "Silver", "Golden Yellow"], 0, "Dorothy wore ruby red slippers in the 1939 film.");
// Hard
addStem("movies", "Movies", "Directing", "hard", "Which director won Best Director Oscars for both 'Brokeback Mountain' and 'Life of Pi'?", ["Ang Lee", "Bong Joon-ho", "Guillermo del Toro", "Alfonso Cuaron"], 0, "Ang Lee won two Best Director Oscars.");

// -----------------------------------------------------------------------------
// 10. TV SHOWS
// -----------------------------------------------------------------------------
// Easy
addStem("tv-shows", "TV Shows", "Streaming", "easy", "In 'Stranger Things', what is the name of the dark alternate dimension?", ["The Upside Down", "The Netherworld", "The Twilight Zone", "The Abyss"], 0, "The Upside Down is the alternate dimension in Stranger Things.");
addStem("tv-shows", "TV Shows", "Animation", "easy", "In 'The Simpsons', what is the name of the nuclear power plant owner in Springfield?", ["Mr. Burns", "Ned Flanders", "Homer Simpson", "Waylon Smithers"], 0, "Mr. Montgomery Burns owns the nuclear plant.");
// Medium
addStem("tv-shows", "TV Shows", "Sitcoms", "medium", "In 'Friends', what is the name of the coffee shop where the gang meets?", ["Central Perk", "Monk's Diner", "The Daily Grind", "Cafe Nervosa"], 0, "Central Perk is the coffee shop in Friends.");
addStem("tv-shows", "TV Shows", "Fantasy", "medium", "In HBO's 'Game of Thrones', what is the ancestral castle home of House Stark?", ["Winterfell", "King's Landing", "Dragonstone", "Highgarden"], 0, "Winterfell is the home of House Stark.");
// Hard
addStem("tv-shows", "TV Shows", "Drama", "hard", "In 'Breaking Bad', what pseudonym did Walter White adopt in the meth trade?", ["Heisenberg", "Oppenheimer", "Schrodinger", "Fermi"], 0, "Walter White used the pseudonym Heisenberg.");

// -----------------------------------------------------------------------------
// 11. DRAMA
// -----------------------------------------------------------------------------
// Easy
addStem("drama", "Drama", "K-Drama", "easy", "Which 2021 survival drama series became Netflix's most-watched series worldwide?", ["Squid Game", "Crash Landing on You", "All of Us Are Dead", "The Glory"], 0, "Squid Game had 1.65B viewing hours.");
addStem("drama", "Drama", "Theater", "easy", "Who wrote the tragic play 'Romeo and Juliet'?", ["William Shakespeare", "Christopher Marlowe", "Arthur Miller", "Tennessee Williams"], 0, "Shakespeare wrote Romeo and Juliet.");
// Medium
addStem("drama", "Drama", "HBO", "medium", "Which acclaimed series followed New Jersey mobster Tony Soprano?", ["The Sopranos", "The Wire", "Boardwalk Empire", "Peaky Blinders"], 0, "The Sopranos starred James Gandolfini.");
addStem("drama", "Drama", "Royalty", "medium", "Which Netflix drama series chronicles the reign and life of Queen Elizabeth II?", ["The Crown", "Downton Abbey", "Victoria", "The Tudors"], 0, "The Crown follows Queen Elizabeth II.");
// Hard
addStem("drama", "Drama", "Period", "hard", "In 'Mad Men', what Madison Avenue agency does Don Draper work for in early seasons?", ["Sterling Cooper", "McCann Erickson", "Ogilvy & Mather", "BBDO"], 0, "Don Draper worked at Sterling Cooper.");

// -----------------------------------------------------------------------------
// 12. CELEBRITY
// -----------------------------------------------------------------------------
// Easy
addStem("celebrity", "Celebrity", "Music", "easy", "Which artist launched the record-breaking global Eras Tour in 2023?", ["Taylor Swift", "Beyonce", "Rihanna", "Adele"], 0, "Taylor Swift's Eras Tour broke all concert tour records.");
addStem("celebrity", "Celebrity", "Athletes", "easy", "Which Argentine soccer icon led his country to victory in the 2022 FIFA World Cup in Qatar?", ["Lionel Messi", "Cristiano Ronaldo", "Kylian Mbappe", "Neymar Jr."], 0, "Lionel Messi captained Argentina to the 2022 World Cup.");
// Medium
addStem("celebrity", "Celebrity", "Actors", "medium", "Which actor won the Best Actor Oscar in 2024 for his role in 'Oppenheimer'?", ["Cillian Murphy", "Bradley Cooper", "Paul Giamatti", "Robert Downey Jr."], 0, "Cillian Murphy won the 2024 Best Actor Academy Award.");
addStem("celebrity", "Celebrity", "Tech", "medium", "Who founded Apple alongside Steve Wozniak in 1976?", ["Steve Jobs", "Bill Gates", "Elon Musk", "Jeff Bezos"], 0, "Steve Jobs co-founded Apple.");
// Hard
addStem("celebrity", "Celebrity", "EGOT", "hard", "Who was the first Black woman in entertainment history to achieve EGOT status?", ["Whoopi Goldberg", "Viola Davis", "Jennifer Hudson", "Audra McDonald"], 0, "Whoopi Goldberg achieved EGOT status in 2002.");

// -----------------------------------------------------------------------------
// 13. MUSIC
// -----------------------------------------------------------------------------
// Easy
addStem("music", "Music", "Rock", "easy", "Which legendary British band featured John, Paul, George, and Ringo?", ["The Beatles", "The Rolling Stones", "The Who", "Led Zeppelin"], 0, "The Beatles were from Liverpool.");
addStem("music", "Music", "Pop", "easy", "Who was famously crowned the 'King of Pop'?", ["Michael Jackson", "Prince", "Elvis Presley", "Stevie Wonder"], 0, "Michael Jackson is the King of Pop.");
// Medium
addStem("music", "Music", "Pop", "medium", "Which 1982 album by Michael Jackson is the best-selling album of all time worldwide?", ["Thriller", "Bad", "Off the Wall", "Dangerous"], 0, "Thriller sold over 70 million copies.");
addStem("music", "Music", "Rock", "medium", "Which British band recorded the legendary 1973 concept album 'The Dark Side of the Moon'?", ["Pink Floyd", "Led Zeppelin", "Queen", "The Doors"], 0, "Pink Floyd released Dark Side of the Moon.");
// Hard
addStem("music", "Music", "Classical", "hard", "Which composer composed his Ninth Symphony (including Ode to Joy) while completely deaf?", ["Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Johannes Brahms"], 0, "Beethoven composed his Ninth Symphony in near-total deafness.");
addStem("music", "Music", "Theory", "hard", "What interval in music theory consists of three whole tones (e.g. C to F#) and was historically termed 'Diabolus in Musica'?", ["The Tritone (Augmented 4th / Diminished 5th)", "Perfect Fifth", "Major Third", "Minor Seventh"], 0, "The Tritone spans 3 whole tones and creates severe harmonic dissonance.");

// Write all generated files to question-bank/
let stemTotal = 0;
for (const [slug, qList] of Object.entries(stemPool)) {
  const filePath = path.join(qbDir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(qList, null, 2), "utf8");
  stemTotal += qList.length;
  console.log(`✓ Seeded ${qList.length} questions to question-bank/${slug}.json`);
}

console.log(`\n🎉 Populated ${stemTotal} verified questions across STEM, General Knowledge & Entertainment!`);
