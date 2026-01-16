import { stemmer } from "stemmer"
import stopwordsData from "stopwords-iso"

export class KeywordExtractor {
  private stopWords = new Set([
    ...(stopwordsData.en || []),
    "make",
    "create",
    "generate",
    "show",
    "display",
    "please",
    "want",
    "need",
    "like",
    "love",
    "hate",
  ])

  private synonymMap: Record<string, string[]> = {
    happy: ["joyful", "glad", "cheerful", "delighted", "pleased", "content"],
    cat: ["kitten", "feline", "kitty", "pussycat", "tomcat"],
    dog: ["puppy", "canine", "pup", "hound", "mutt"],
    beautiful: ["pretty", "gorgeous", "lovely", "attractive", "stunning", "elegant"],
    big: ["large", "huge", "enormous", "massive", "giant", "vast"],
    small: ["tiny", "little", "mini", "micro", "petite", "compact"],
    fast: ["quick", "rapid", "swift", "speedy", "hasty", "brisk"],
    slow: ["sluggish", "leisurely", "unhurried", "gradual", "lazy"],
    good: ["great", "excellent", "wonderful", "fantastic", "amazing", "superb"],
    bad: ["terrible", "awful", "horrible", "poor", "dreadful", "lousy"],
    love: ["adore", "cherish", "treasure", "admire", "appreciate"],
    hate: ["dislike", "loathe", "detest", "despise", "abhor"],
    smart: ["intelligent", "clever", "bright", "brilliant", "wise", "sharp"],
    stupid: ["dumb", "foolish", "idiotic", "senseless", "unintelligent"],
    old: ["ancient", "aged", "elderly", "mature", "vintage"],
    new: ["fresh", "modern", "recent", "novel", "latest", "current"],
    hot: ["warm", "scorching", "burning", "sizzling", "heated"],
    cold: ["chilly", "frigid", "freezing", "icy", "cool"],
    bright: ["shiny", "radiant", "luminous", "brilliant", "vivid"],
    dark: ["dim", "gloomy", "shadowy", "murky", "black"],
    clean: ["spotless", "pristine", "tidy", "neat", "immaculate"],
    dirty: ["filthy", "messy", "unclean", "soiled", "grimy"],
    strong: ["powerful", "mighty", "sturdy", "robust", "tough"],
    weak: ["frail", "feeble", "fragile", "delicate", "powerless"],
    rich: ["wealthy", "affluent", "prosperous", "well-off", "fortunate"],
    poor: ["impoverished", "needy", "destitute", "broke", "penniless"],
    sad: ["unhappy", "sorrowful", "miserable", "depressed", "gloomy"],
    angry: ["furious", "mad", "irate", "enraged", "livid"],
    scared: ["afraid", "frightened", "terrified", "petrified", "fearful"],
    tired: ["exhausted", "weary", "fatigued", "drained", "sleepy"],
    hungry: ["starving", "famished", "ravenous", "craving"],
    thirsty: ["parched", "dehydrated", "dry"],
    funny: ["humorous", "amusing", "hilarious", "entertaining", "comical"],
    serious: ["solemn", "grave", "earnest", "sincere", "thoughtful"],
    easy: ["simple", "effortless", "uncomplicated", "straightforward", "painless"],
    hard: ["difficult", "challenging", "tough", "demanding", "arduous"],
    important: ["significant", "crucial", "vital", "essential", "critical"],
    interesting: ["fascinating", "intriguing", "engaging", "compelling", "captivating"],
    boring: ["dull", "tedious", "monotonous", "uninteresting", "lackluster"],
  }

  private semanticCategories: Record<string, string[]> = {
    animals: [
      "cat",
      "dog",
      "bird",
      "fish",
      "lion",
      "tiger",
      "elephant",
      "horse",
      "cow",
      "pig",
      "sheep",
      "goat",
      "chicken",
      "duck",
      "rabbit",
      "mouse",
      "rat",
      "bear",
      "wolf",
      "fox",
      "deer",
      "monkey",
      "ape",
      "whale",
      "dolphin",
      "shark",
      "snake",
      "lizard",
      "frog",
      "turtle",
      "crab",
      "lobster",
      "insect",
      "spider",
      "butterfly",
      "bee",
      "ant",
    ],
    nature: [
      "tree",
      "flower",
      "mountain",
      "ocean",
      "river",
      "forest",
      "lake",
      "sea",
      "beach",
      "desert",
      "jungle",
      "grass",
      "leaf",
      "plant",
      "garden",
      "park",
      "field",
      "meadow",
      "valley",
      "canyon",
      "cave",
      "volcano",
      "island",
      "waterfall",
      "rain",
      "snow",
      "wind",
      "storm",
      "cloud",
      "sky",
      "sun",
      "moon",
      "star",
    ],
    emotions: [
      "happy",
      "sad",
      "angry",
      "love",
      "fear",
      "joy",
      "hope",
      "trust",
      "surprise",
      "disgust",
      "excitement",
      "calm",
      "anxiety",
      "worry",
      "pride",
      "shame",
      "guilt",
      "envy",
      "jealousy",
      "gratitude",
      "relief",
      "disappointment",
      "frustration",
      "confusion",
      "curiosity",
      "boredom",
      "amusement",
      "awe",
      "nostalgia",
      "regret",
    ],
    colors: [
      "red",
      "blue",
      "green",
      "yellow",
      "purple",
      "orange",
      "pink",
      "brown",
      "black",
      "white",
      "gray",
      "grey",
      "gold",
      "silver",
      "bronze",
      "cyan",
      "magenta",
      "violet",
      "indigo",
      "turquoise",
      "beige",
      "cream",
      "ivory",
      "maroon",
      "navy",
      "teal",
      "lavender",
      "lime",
      "olive",
      "coral",
      "salmon",
    ],
    weather: [
      "sunny",
      "rainy",
      "cloudy",
      "windy",
      "stormy",
      "snowy",
      "foggy",
      "misty",
      "humid",
      "dry",
      "hot",
      "cold",
      "warm",
      "cool",
      "freezing",
      "scorching",
      "mild",
      "pleasant",
      "breezy",
      "gusty",
      "thunder",
      "lightning",
      "hail",
      "sleet",
      "blizzard",
      "hurricane",
      "tornado",
      "typhoon",
      "cyclone",
    ],
    technology: [
      "computer",
      "phone",
      "internet",
      "software",
      "hardware",
      "app",
      "website",
      "digital",
      "electronic",
      "robot",
      "ai",
      "artificial",
      "intelligence",
      "machine",
      "learning",
      "data",
      "code",
      "programming",
      "algorithm",
      "network",
      "server",
      "cloud",
      "database",
      "cyber",
      "security",
      "virtual",
      "reality",
      "augmented",
      "blockchain",
      "crypto",
      "bitcoin",
      "smartphone",
      "tablet",
      "laptop",
      "desktop",
    ],
    food: [
      "pizza",
      "burger",
      "sandwich",
      "salad",
      "soup",
      "pasta",
      "rice",
      "bread",
      "meat",
      "fish",
      "chicken",
      "beef",
      "pork",
      "vegetable",
      "fruit",
      "cake",
      "cookie",
      "chocolate",
      "coffee",
      "tea",
      "juice",
      "water",
      "milk",
      "cheese",
      "egg",
      "butter",
      "sugar",
      "salt",
      "pepper",
      "spice",
      "herb",
      "sauce",
      "dressing",
      "snack",
      "meal",
      "breakfast",
      "lunch",
      "dinner",
      "dessert",
    ],
    sports: [
      "football",
      "basketball",
      "soccer",
      "tennis",
      "baseball",
      "golf",
      "swimming",
      "running",
      "cycling",
      "skiing",
      "skating",
      "hockey",
      "rugby",
      "cricket",
      "volleyball",
      "badminton",
      "boxing",
      "wrestling",
      "martial",
      "arts",
      "gymnastics",
      "athletics",
      "track",
      "field",
      "racing",
      "climbing",
      "surfing",
      "diving",
      "rowing",
      "sailing",
      "fishing",
      "hunting",
      "camping",
      "hiking",
    ],
    music: [
      "song",
      "music",
      "melody",
      "rhythm",
      "beat",
      "tune",
      "harmony",
      "sound",
      "voice",
      "singing",
      "guitar",
      "piano",
      "drum",
      "violin",
      "flute",
      "trumpet",
      "saxophone",
      "band",
      "orchestra",
      "choir",
      "concert",
      "performance",
      "album",
      "record",
      "track",
      "genre",
      "rock",
      "pop",
      "jazz",
      "blues",
      "classical",
      "country",
      "hip",
      "hop",
      "rap",
      "electronic",
      "dance",
      "folk",
      "reggae",
      "metal",
      "punk",
      "indie",
    ],
    art: [
      "painting",
      "drawing",
      "sculpture",
      "photography",
      "design",
      "sketch",
      "portrait",
      "landscape",
      "abstract",
      "modern",
      "contemporary",
      "classic",
      "renaissance",
      "impressionist",
      "surrealist",
      "cubist",
      "minimalist",
      "pop",
      "art",
      "artist",
      "gallery",
      "museum",
      "exhibition",
      "collection",
      "masterpiece",
      "canvas",
      "brush",
      "paint",
      "color",
      "palette",
      "composition",
      "style",
      "technique",
      "medium",
      "creative",
      "aesthetic",
      "beauty",
      "expression",
    ],
  }

  extract(description: string): string[] {
    const words = description
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !this.stopWords.has(word))

    const stemmed = words.map((word) => this.stemWord(word))

    const unique = Array.from(new Set(stemmed))

    const withSynonyms = this.expandWithSynonyms(unique)

    const withSemantics = this.expandWithSemantics(withSynonyms)

    const final = Array.from(new Set(withSemantics))

    const scores = this.scoreKeywords(final, words)

    const topKeywords = this.getTopKeywords(scores, 10)

    return topKeywords
  }

  private stemWord(word: string): string {
    return stemmer(word)
  }

  private expandWithSynonyms(words: string[]): string[] {
    const expanded = [...words]
    for (const word of words) {
      const synonyms = this.synonymMap[word]
      if (synonyms) {
        expanded.push(...synonyms)
      }
    }
    return expanded
  }

  private expandWithSemantics(words: string[]): string[] {
    const expanded = [...words]
    for (const word of words) {
      for (const [category, members] of Object.entries(this.semanticCategories)) {
        if (members.includes(word)) {
          expanded.push(...members.filter((m) => m !== word))
        }
      }
    }
    return expanded
  }

  private scoreKeywords(words: string[], originalWords: string[]): Map<string, number> {
    const scores = new Map<string, number>()
    const stemmedOriginal = originalWords.map((w) => this.stemWord(w))

    for (const word of words) {
      let score = 1

      if (stemmedOriginal.includes(word)) {
        score += 100
      }

      for (const [category, members] of Object.entries(this.semanticCategories)) {
        if (members.includes(word)) {
          score += 1
        }
      }

      scores.set(word, score)
    }

    return scores
  }

  private getTopKeywords(scores: Map<string, number>, count: number): string[] {
    return Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([word]) => word)
  }
}
