import type { ImageSource } from "./image-source"

export class IconSource implements ImageSource {
  name = "icon"
  description = "Simple icon-like graphics with keyword mapping"

  private iconMap: Record<string, string[]> = {
    cat: ["🐱", "🐈", "😺"],
    dog: ["🐕", "🐶", "🦮"],
    bird: ["🐦", "🕊️", "🦅"],
    fish: ["🐟", "🐠", "🐡"],
    lion: ["🦁", "🐯"],
    tiger: ["🐯", "🐅"],
    elephant: ["🐘"],
    house: ["🏠", "🏡", "🏚️"],
    building: ["🏢", "🏬", "🏭"],
    city: ["🏙️", "🌆", "🏢"],
    tree: ["🌲", "🌳", "🌴"],
    flower: ["🌸", "🌺", "🌻", "🌷"],
    mountain: ["🏔️", "⛰️", "🗻"],
    ocean: ["🌊", "🏖️", "🚢"],
    sun: ["☀️", "🌞", "🌤️"],
    moon: ["🌙", "🌛", "🌜"],
    star: ["⭐", "🌟", "✨"],
    cloud: ["☁️", "⛅", "🌥️"],
    rain: ["🌧️", "☔", "⛈️"],
    snow: ["❄️", "⛄", "☃️"],
    fire: ["🔥", "🌋", "🎆"],
    water: ["💧", "🌊", "💦"],
    heart: ["❤️", "💕", "💖"],
    music: ["🎵", "🎶", "🎸"],
    book: ["📚", "📖", "📕"],
    camera: ["📷", "📸", "🎥"],
    phone: ["📱", "☎️", "📞"],
    computer: ["💻", "🖥️", "🖱️"],
    car: ["🚗", "🚙", "🚕"],
    airplane: ["✈️", "🛫", "🛬"],
    train: ["🚂", "🚆", "🚇"],
    boat: ["🚢", "⛵", "🛥️"],
    bicycle: ["🚲", "🚴"],
    food: ["🍕", "🍔", "🍟"],
    drink: ["☕", "🍺", "🥤"],
    fruit: ["🍎", "🍌", "🍇"],
    vegetable: ["🥕", "🥦", "🍅"],
    cake: ["🎂", "🍰", "🧁"],
    gift: ["🎁", "🎀", "🎉"],
    sports: ["⚽", "🏀", "🎾"],
    game: ["🎮", "🕹️", "🎲"],
    art: ["🎨", "🖼️", "✏️"],
    science: ["🔬", "🧪", "⚗️"],
    math: ["📐", "📏", "🔢"],
    money: ["💰", "💵", "💳"],
    clock: ["⏰", "🕐", "⌚"],
    calendar: ["📅", "📆", "🗓️"],
    map: ["🗺️", "🧭", "📍"],
    key: ["🔑", "🗝️"],
    lock: ["🔒", "🔓"],
    light: ["💡", "🔦", "🕯️"],
    tool: ["🔧", "🔨", "⚙️"],
    medical: ["🏥", "💊", "🩺"],
    school: ["🏫", "🎓", "📝"],
    work: ["💼", "👔", "📊"],
    travel: ["🧳", "🗺️", "✈️"],
    shopping: ["🛒", "🛍️", "🏪"],
    nature: ["🌿", "🍃", "🌱"],
    weather: ["☀️", "🌧️", "❄️", "⛈️"],
    technology: ["💻", "📱", "🖥️"],
    default: ["✨", "🎨", "🌟"],
  }

  async generateImages(keywords: string[], count: number): Promise<string[]> {
    const images: string[] = []
    const icons: string[] = []

    for (const keyword of keywords) {
      const lowerKeyword = keyword.toLowerCase()
      if (this.iconMap[lowerKeyword]) {
        icons.push(...this.iconMap[lowerKeyword])
      }
    }

    if (icons.length === 0) {
      icons.push(...this.iconMap.default)
    }

    for (let i = 0; i < count; i++) {
      const icon = icons[i % icons.length]
      const iconStyle = i % 4
      const svg = this.generateIconSVG(icon, iconStyle, i)
      const base64 = Buffer.from(svg).toString("base64")
      images.push(`data:image/svg+xml;base64,${base64}`)
    }

    return images
  }

  private generateIconSVG(icon: string, iconStyle: number, index: number): string {
    const width = 600
    const height = 400
    const colors = ["FF6B6B", "4ECDC4", "45B7D1", "96CEB4", "FFEAA7", "DDA0DD"]
    const bgColor = colors[index % colors.length]

    let content = ""
    switch (iconStyle) {
      case 0:
        content = this.generateSimpleIcon(icon, bgColor)
        break
      case 1:
        content = this.generateFramedIcon(icon, bgColor)
        break
      case 2:
        content = this.generatePatternedIcon(icon, bgColor)
        break
      case 3:
        content = this.generateMultipleIcons(icon, bgColor)
        break
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      ${content}
    </svg>`
  }

  private generateSimpleIcon(icon: string, bgColor: string): string {
    return `
      <rect width="600" height="400" fill="#${bgColor}" />
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="150" text-anchor="middle" dy=".3em">${icon}</text>
    `
  }

  private generateFramedIcon(icon: string, bgColor: string): string {
    const frameColor = "FFFFFF"
    return `
      <rect width="600" height="400" fill="#${bgColor}" />
      <rect x="100" y="50" width="400" height="300" fill="none" stroke="#${frameColor}" stroke-width="8" rx="20" />
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="120" text-anchor="middle" dy=".3em">${icon}</text>
    `
  }

  private generatePatternedIcon(icon: string, bgColor: string): string {
    const patternColor = "FFFFFF"
    let pattern = ""
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 600
      const y = Math.random() * 400
      const size = 10 + Math.random() * 20
      pattern += `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="#${patternColor}" opacity="0.2" />`
    }

    return `
      <rect width="600" height="400" fill="#${bgColor}" />
      ${pattern}
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="120" text-anchor="middle" dy=".3em" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">${icon}</text>
    `
  }

  private generateMultipleIcons(icon: string, bgColor: string): string {
    const positions = [
      { x: 150, y: 100, size: 80 },
      { x: 450, y: 100, size: 80 },
      { x: 300, y: 200, size: 100 },
      { x: 150, y: 300, size: 80 },
      { x: 450, y: 300, size: 80 },
    ]

    let icons = ""
    for (const pos of positions) {
      icons += `<text x="${pos.x}" y="${pos.y}" font-family="Arial, sans-serif" font-size="${pos.size}" text-anchor="middle" dy=".3em" opacity="0.7">${icon}</text>`
    }

    return `
      <rect width="600" height="400" fill="#${bgColor}" />
      ${icons}
    `
  }
}
