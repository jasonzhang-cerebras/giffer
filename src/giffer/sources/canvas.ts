import type { ImageSource } from "./image-source"

export class CanvasSource implements ImageSource {
  name = "canvas"
  description = "Programmatic graphics with shapes and gradients"

  private colorPalettes: Record<string, string[]> = {
    sunset: ["FF6B6B", "FF8E53", "FFA07A", "FFD700"],
    ocean: ["0077B6", "00B4D8", "90E0EF", "CAF0F8"],
    forest: ["2D6A4F", "40916C", "52B788", "74C69D"],
    flower: ["FF6B6B", "FF8E53", "FFA07A", "FFB347"],
    mountain: ["6C757D", "495057", "343A40", "212529"],
    night: ["0D1B2A", "1B263B", "415A77", "778DA9"],
    day: ["FFB703", "FB8500", "FFB703", "FFD166"],
    love: ["FF6B6B", "FF8E53", "FFA07A", "FFB347"],
    nature: ["2D6A4F", "40916C", "52B788", "74C69D"],
    technology: ["003566", "006494", "0582CA", "00A6FB"],
    art: ["FF6B6B", "4ECDC4", "45B7D1", "96CEB4"],
    default: ["FF6B6B", "4ECDC4", "45B7D1", "96CEB4"],
  }

  async generateImages(keywords: string[], count: number): Promise<string[]> {
    const images: string[] = []
    const palette = this.getPalette(keywords)

    for (let i = 0; i < count; i++) {
      const svg = this.generateSVG(palette, i, keywords)
      const base64 = Buffer.from(svg).toString("base64")
      images.push(`data:image/svg+xml;base64,${base64}`)
    }

    return images
  }

  private getPalette(keywords: string[]): string[] {
    for (const keyword of keywords) {
      const lowerKeyword = keyword.toLowerCase()
      if (this.colorPalettes[lowerKeyword]) {
        return this.colorPalettes[lowerKeyword]
      }
    }
    return this.colorPalettes.default
  }

  private generateSVG(palette: string[], index: number, keywords: string[]): string {
    const width = 600
    const height = 400
    const color1 = palette[index % palette.length]
    const color2 = palette[(index + 1) % palette.length]
    const color3 = palette[(index + 2) % palette.length]

    const shapes = [
      this.generateGradientRect(width, height, color1, color2),
      this.generateCircle(width, height, color3),
      this.generateText(width, height, keywords),
    ]

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#${color1};stop-opacity:1" /><stop offset="100%" style="stop-color:#${color2};stop-opacity:1" /></linearGradient></defs>${shapes.join("")}</svg>`
  }

  private generateGradientRect(width: number, height: number, color1: string, color2: string): string {
    return `<rect width="${width}" height="${height}" fill="url(#grad0)" />`
  }

  private generateCircle(width: number, height: number, color: string): string {
    const cx = Math.random() * width
    const cy = Math.random() * height
    const r = 50 + Math.random() * 100
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#${color}" opacity="0.6" />`
  }

  private generateText(width: number, height: number, keywords: string[]): string {
    const text = keywords
      .slice(0, 2)
      .join(" ")
      .replace(/[^a-zA-Z0-9\s]/g, "")
    return `<text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF" text-anchor="middle" dy=".3em" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">${text}</text>`
  }
}
