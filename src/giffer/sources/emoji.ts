import type { ImageSource } from "./image-source"

export class EmojiSource implements ImageSource {
  name = "emoji"
  description = "Emoji-based graphics with keyword representations"

  private emojiMap: Record<string, string[]> = {
    sunset: ["🌅", "🌇", "🌆"],
    ocean: ["🌊", "🏖️", "🚢"],
    mountain: ["🏔️", "⛰️", "🗻"],
    forest: ["🌲", "🌳", "🌴"],
    flower: ["🌸", "🌺", "🌻", "🌷"],
    animal: ["🐾", "🦁", "🐘", "🦊"],
    cat: ["🐱", "🐈", "😺"],
    dog: ["🐕", "🐶", "🦮"],
    bird: ["🐦", "🕊️", "🦅"],
    car: ["🚗", "🚙", "🚕"],
    city: ["🏙️", "🌆", "🏢"],
    house: ["🏠", "🏡", "🏚️"],
    food: ["🍕", "🍔", "🍟"],
    drink: ["☕", "🍺", "🥤"],
    weather: ["☀️", "🌧️", "❄️", "⛈️"],
    love: ["❤️", "💕", "💖"],
    star: ["⭐", "🌟", "✨"],
    moon: ["🌙", "🌛", "🌜"],
    sun: ["☀️", "🌞", "🌤️"],
    fire: ["🔥", "🌋", "🎆"],
    water: ["💧", "🌊", "💦"],
    tree: ["🌲", "🌳", "🌴"],
    book: ["📚", "📖", "📕"],
    music: ["🎵", "🎶", "🎸"],
    sport: ["⚽", "🏀", "🎾"],
    travel: ["✈️", "🚂", "🚗"],
    technology: ["💻", "📱", "🖥️"],
    art: ["🎨", "🖼️", "✏️"],
    nature: ["🌿", "🍃", "🌱"],
    sky: ["🌤️", "🌥️", "🌦️"],
    night: ["🌃", "🌌", "🌑"],
    day: ["🌞", "☀️", "🌤️"],
    happy: ["😊", "😄", "🥰"],
    sad: ["😢", "😭", "😞"],
    angry: ["😠", "😡", "🤬"],
    surprised: ["😮", "😲", "🤯"],
    cool: ["😎", "🕶️", "🤠"],
    funny: ["😂", "🤣", "😆"],
    beautiful: ["✨", "💎", "🌟"],
    cute: ["🥰", "😍", "🤗"],
    scary: ["😱", "👻", "💀"],
    mysterious: ["🔮", "🌙", "🌑"],
    magical: ["✨", "🔮", "🌟"],
    adventure: ["🗺️", "🧭", "🏔️"],
    peaceful: ["🕊️", "🌿", "🌸"],
    energetic: ["⚡", "🔥", "💥"],
    calm: ["🌊", "🌿", "☕"],
    exciting: ["🎉", "🎊", "🎈"],
    romantic: ["❤️", "💕", "🌹"],
    professional: ["💼", "👔", "📊"],
    creative: ["🎨", "✏️", "💡"],
    innovative: ["💡", "🚀", "🔬"],
    modern: ["🏙️", "💻", "📱"],
    classic: ["📚", "🏛️", "🎻"],
    vintage: ["📻", "🎞️", "🕰️"],
    futuristic: ["🚀", "🤖", "🌌"],
    simple: ["⚪", "⬜", "🔲"],
    complex: ["🧩", "🔮", "🌐"],
    colorful: ["🌈", "🎨", "✨"],
    dark: ["🌑", "🖤", "🌑"],
    bright: ["☀️", "💡", "✨"],
    soft: ["☁️", "🌸", "🌿"],
    hard: ["💎", "🔨", "⚙️"],
    smooth: ["🌊", "☁️", "🌿"],
    rough: ["🪨", "🌵", "⚡"],
    hot: ["🔥", "☀️", "🌶️"],
    cold: ["❄️", "🧊", "☃️"],
    wet: ["💧", "🌊", "☔"],
    dry: ["🏜️", "🌵", "☀️"],
    fast: ["⚡", "🚀", "💨"],
    slow: ["🐢", "🐌", "🚶"],
    big: ["🐘", "🏔️", "🌍"],
    small: ["🐜", "🐭", "🌱"],
    tall: ["🌳", "🏢", "🗼"],
    short: ["🐕", "🏠", "🌱"],
    wide: ["🌊", "🏞️", "🌍"],
    narrow: ["📏", "📐", "🔲"],
    deep: ["🌊", "🕳️", "🌑"],
    shallow: ["🏖️", "🌊", "💧"],
    heavy: ["🪨", "🏋️", "🐘"],
    light: ["☁️", "🎈", "💡"],
    strong: ["💪", "🦁", "⚡"],
    weak: ["🥀", "🐭", "🍂"],
    healthy: ["🥗", "🏃", "💪"],
    sick: ["🤒", "🏥", "💊"],
    rich: ["💰", "💎", "🏰"],
    poor: ["🪙", "🏚️", "🥀"],
    young: ["👶", "🌱", "🎈"],
    old: ["👴", "🏛️", "📜"],
    new: ["🆕", "🎉", "✨"],
    ancient: ["🏛️", "📜", "🏺"],
    clean: ["✨", "🧼", "💧"],
    dirty: ["🗑️", "🧹", "💩"],
    fresh: ["🌿", "💧", "🍃"],
    stale: ["🍞", "🥀", "🍂"],
    sweet: ["🍬", "🍭", "🍰"],
    sour: ["🍋", "🍊", "🥝"],
    bitter: ["☕", "🍫", "🍺"],
    salty: ["🧂", "🌊", "🥨"],
    spicy: ["🌶️", "🔥", "🌯"],
    tasty: ["🍕", "🍔", "🍜"],
    delicious: ["🍽️", "👨‍🍳", "🍴"],
    yummy: ["😋", "🍩", "🍪"],
  }

  async generateImages(keywords: string[], count: number): Promise<string[]> {
    const images: string[] = []
    const emojis: string[] = []

    for (const keyword of keywords) {
      const lowerKeyword = keyword.toLowerCase()
      if (this.emojiMap[lowerKeyword]) {
        emojis.push(...this.emojiMap[lowerKeyword])
      }
    }

    if (emojis.length === 0) {
      emojis.push("✨", "🎨", "🌟")
    }

    for (let i = 0; i < count; i++) {
      const emoji = emojis[i % emojis.length]
      const svg = this.generateSVG(emoji, i)
      const base64 = Buffer.from(svg).toString("base64")
      images.push(`data:image/svg+xml;base64,${base64}`)
    }

    return images
  }

  private generateSVG(emoji: string, index: number): string {
    const width = 600
    const height = 400
    const colors = ["FF6B6B", "4ECDC4", "45B7D1", "96CEB4", "FFEAA7", "DDA0DD"]
    const bgColor = colors[index % colors.length]
    const textColor = "FFFFFF"

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="#${bgColor}" />
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="120" text-anchor="middle" dy=".3em">${emoji}</text>
    </svg>`
  }
}
