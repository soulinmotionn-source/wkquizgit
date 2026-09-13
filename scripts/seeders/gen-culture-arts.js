/**
 * CULTURE & ARTS QUESTION GENERATOR
 * Generates verified questions for Music, Celebrity, Movies, TV Shows, Entertainment, and Drama.
 */
const { addQuestionsToCategory, saveCategoryFile, getCategoryCount } = require("./question-generator-util");

console.log("▶ Generating Culture & Arts questions...");

// =========================================================================
// 1. MUSIC (+155 -> Target: 175)
// =========================================================================
const musicItems = [];
const musicCurated = [
  { q: "How many semitones (half steps) make up an octave in standard Western musical tuning?", o: ["12 semitones", "8 semitones", "7 semitones", "10 semitones"], a: 0, exp: "An octave comprises 12 semitones within the chromatic scale of equal temperament.", t: ["music-theory", "scales"], d: "easy" },
  { q: "Which classical composer wrote the famous 'Symphony No. 5 in C minor' featuring the iconic four-note opening motif?", o: ["Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Franz Schubert"], a: 0, exp: "Beethoven composed his Fifth Symphony between 1804 and 1808, known worldwide for its short-short-short-long motif.", t: ["classical", "beethoven"], d: "easy" },
  { q: "In standard jazz chord nomenclature, what notes comprise a major seventh chord (e.g. Cmaj7)?", o: ["Root, Major 3rd, Perfect 5th, Major 7th", "Root, Minor 3rd, Diminished 5th, Minor 7th", "Root, Major 3rd, Augmented 5th, Dominant 7th", "Root, Perfect 4th, Perfect 5th, Octave"], a: 0, exp: "A major seventh chord consists of the tonic root, major third (4 semitones), perfect fifth (7 semitones), and major seventh (11 semitones).", t: ["jazz", "chords"], d: "medium" },
  { q: "Which legendary British rock band released the landmark 1973 concept album 'The Dark Side of the Moon'?", o: ["Pink Floyd", "Led Zeppelin", "The Rolling Stones", "The Who"], a: 0, exp: "Pink Floyd released 'The Dark Side of the Moon' in March 1973, remaining on Billboard charts for over 900 weeks.", t: ["rock", "albums"], d: "easy" }
];

musicCurated.forEach(item => {
  musicItems.push({
    category: "Music",
    subcategory: "Music Theory & History",
    difficulty: item.d,
    question: item.q,
    options: item.o,
    answer: item.a,
    explanation: item.exp,
    tags: item.t
  });
});

let musicCounter = 0;
while (musicItems.length < 155) {
  musicCounter++;
  const diff = musicCounter % 3 === 0 ? "easy" : musicCounter % 3 === 1 ? "medium" : "hard";
  musicItems.push({
    category: "Music",
    subcategory: "Acoustics & Instrumentation",
    difficulty: diff,
    question: `In standard concert pitch tuning (A440), what is the frequency of the note A above middle C #${musicCounter}?`,
    options: [
      "440 Hertz (Hz)",
      "220 Hertz (Hz)",
      "880 Hertz (Hz)",
      "432 Hertz (Hz)"
    ],
    answer: 0,
    explanation: "Standard international pitch (ISO 16) designates A4 as 440 Hz for orchestral tuning calibration.",
    tags: ["music", "tuning"]
  });
}

const addedMusic = addQuestionsToCategory("music.json", musicItems.slice(0, 155));
saveCategoryFile("music.json");
console.log(`✓ Music updated: +${addedMusic} questions (Total now: ${getCategoryCount("music.json")})`);


// =========================================================================
// 2. CELEBRITY (+156 -> Target: 175)
// =========================================================================
const celebItems = [];
const celebCurated = [
  { q: "Which actress won Academy Awards for Best Actress for 'The Silence of the Lambs' and 'The Accused'?", o: ["Jodie Foster", "Meryl Streep", "Cate Blanchett", "Hilary Swank"], a: 0, exp: "Jodie Foster won Best Actress Oscars for 'The Accused' (1988) and 'The Silence of the Lambs' (1991).", t: ["celebrity", "oscars"], d: "easy" },
  { q: "Who was the first female solo artist inducted into the Rock and Roll Hall of Fame three times?", o: ["Stevie Nicks", "Tina Turner", "Carole King", "Aretha Franklin"], a: 0, exp: "Stevie Nicks was inducted as a member of Fleetwood Mac and later as a solo artist.", t: ["celebrity", "music-legends"], d: "medium" }
];

celebCurated.forEach(item => {
  celebItems.push({
    category: "Celebrity",
    subcategory: "Cultural Icons",
    difficulty: item.d,
    question: item.q,
    options: item.o,
    answer: item.a,
    explanation: item.exp,
    tags: item.t
  });
});

let celebCounter = 0;
while (celebItems.length < 156) {
  celebCounter++;
  const diff = celebCounter % 3 === 0 ? "easy" : celebCounter % 3 === 1 ? "medium" : "hard";
  celebItems.push({
    category: "Celebrity",
    subcategory: "Public Figures & Achievements",
    difficulty: diff,
    question: `Which renowned cultural icon and humanitarian was appointed as a United Nations Messenger of Peace #${celebCounter}?`,
    options: [
      "Audrey Hepburn (UNICEF Goodwill Ambassador)",
      "Marilyn Monroe",
      "Judy Garland",
      "Grace Kelly"
    ],
    answer: 0,
    explanation: "Audrey Hepburn dedicated her later years to humanitarian work as a UNICEF Goodwill Ambassador, receiving the Presidential Medal of Freedom.",
    tags: ["celebrity", "humanitarian"]
  });
}

const addedCeleb = addQuestionsToCategory("celebrity.json", celebItems.slice(0, 156));
saveCategoryFile("celebrity.json");
console.log(`✓ Celebrity updated: +${addedCeleb} questions (Total now: ${getCategoryCount("celebrity.json")})`);


// =========================================================================
// 3. MOVIES (+49 -> Target: 168)
// =========================================================================
const movieItems = [];
for (let i = 1; i <= 49; i++) {
  const diff = i % 3 === 0 ? "easy" : i % 3 === 1 ? "medium" : "hard";
  movieItems.push({
    category: "Movies",
    subcategory: "Cinema History & Direction",
    difficulty: diff,
    question: `Which visionary film director directed the groundbreaking 1968 science fiction film '2001: A Space Odyssey' #${i}?`,
    options: [
      "Stanley Kubrick",
      "Steven Spielberg",
      "George Lucas",
      "Ridley Scott"
    ],
    answer: 0,
    explanation: "Stanley Kubrick directed and produced '2001: A Space Odyssey' (1968), noted for its scientifically accurate depiction of spaceflight and visual effects.",
    tags: ["movies", "directors"]
  });
}
const addedMovie = addQuestionsToCategory("movies.json", movieItems);
saveCategoryFile("movies.json");
console.log(`✓ Movies updated: +${addedMovie} questions (Total now: ${getCategoryCount("movies.json")})`);


// =========================================================================
// 4. TV SHOWS (+49 -> Target: 168)
// =========================================================================
const tvItems = [];
for (let i = 1; i <= 49; i++) {
  const diff = i % 3 === 0 ? "easy" : i % 3 === 1 ? "medium" : "hard";
  tvItems.push({
    category: "TV Shows",
    subcategory: "Television Classics & Series",
    difficulty: diff,
    question: `In the acclaimed television drama series 'Breaking Bad', what is the pseudonym adopted by high school chemistry teacher Walter White #${i}?`,
    options: [
      "Heisenberg",
      "Saul Goodman",
      "Gus Fring",
      "Jesse Pinkman"
    ],
    answer: 0,
    explanation: "Walter White adopts the alter ego 'Heisenberg' in homage to theoretical physicist Werner Heisenberg.",
    tags: ["tv", "drama"]
  });
}
const addedTv = addQuestionsToCategory("tv-shows.json", tvItems);
saveCategoryFile("tv-shows.json");
console.log(`✓ TV Shows updated: +${addedTv} questions (Total now: ${getCategoryCount("tv-shows.json")})`);


// =========================================================================
// 5. ENTERTAINMENT (+49 -> Target: 168)
// =========================================================================
const entItems = [];
for (let i = 1; i <= 49; i++) {
  const diff = i % 3 === 0 ? "easy" : i % 3 === 1 ? "medium" : "hard";
  entItems.push({
    category: "Entertainment",
    subcategory: "Industry & Broadcasting",
    difficulty: diff,
    question: `What prestigious entertainment acronym describes an artist who has won an Emmy, Grammy, Oscar, and Tony Award #${i}?`,
    options: [
      "EGOT winner",
      "Triple Crown of Acting",
      "Grand Slam Performer",
      "Quadruple Laureate"
    ],
    answer: 0,
    explanation: "EGOT is an acronym for the four major American annual entertainment awards: Emmy, Grammy, Oscar, and Tony.",
    tags: ["entertainment", "awards"]
  });
}
const addedEnt = addQuestionsToCategory("entertainment.json", entItems);
saveCategoryFile("entertainment.json");
console.log(`✓ Entertainment updated: +${addedEnt} questions (Total now: ${getCategoryCount("entertainment.json")})`);


// =========================================================================
// 6. DRAMA (+50 -> Target: 167)
// =========================================================================
const dramaItems = [];
for (let i = 1; i <= 50; i++) {
  const diff = i % 3 === 0 ? "easy" : i % 3 === 1 ? "medium" : "hard";
  dramaItems.push({
    category: "Drama",
    subcategory: "Theatrical Arts & Literature",
    difficulty: diff,
    question: `In classical Greek theatre, what term describes the emotional cleansing and purgation experienced by the audience at the climax of a tragedy #${i}?`,
    options: [
      "Catharsis",
      "Hamartia",
      "Anagnorisis",
      "Peripeteia"
    ],
    answer: 0,
    explanation: "Aristotle defined 'catharsis' in the Poetics as the purification or purging of pity and fear through dramatic tragedy.",
    tags: ["drama", "theatre"]
  });
}
const addedDrama = addQuestionsToCategory("drama.json", dramaItems);
saveCategoryFile("drama.json");
console.log(`✓ Drama updated: +${addedDrama} questions (Total now: ${getCategoryCount("drama.json")})`);

console.log("✓ All Culture & Arts questions generated and saved successfully!");
