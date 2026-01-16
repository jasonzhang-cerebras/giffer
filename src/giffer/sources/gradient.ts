import type { ImageSource } from "./image-source"

export class GradientSource implements ImageSource {
  name = "gradient"
  description = "Beautiful color gradients with keyword-based schemes"

  private gradientColors: Record<string, string[]> = {
    nature: ["2D6A4F", "40916C", "52B788", "74C69D", "95D5B2"],
    ocean: ["0077B6", "00B4D8", "90E0EF", "CAF0F8", "ADE8F4"],
    sunset: ["FF6B6B", "FF8E53", "FFA07A", "FFD700", "FFB347"],
    forest: ["1B4332", "2D6A4F", "40916C", "52B788", "74C69D"],
    flower: ["FF6B6B", "FF8E53", "FFA07A", "FFB347", "FFCC5C"],
    mountain: ["6C757D", "495057", "343A40", "212529", "ADB5BD"],
    night: ["0D1B2A", "1B263B", "415A77", "778DA9", "E0E1DD"],
    day: ["FFB703", "FB8500", "FFB703", "FFD166", "FFE8D6"],
    love: ["FF6B6B", "FF8E53", "FFA07A", "FFB347", "FFCC5C"],
    technology: ["003566", "006494", "0582CA", "00A6FB", "48CAE4"],
    art: ["FF6B6B", "4ECDC4", "45B7D1", "96CEB4", "FFEAA7"],
    default: ["FF6B6B", "4ECDC4", "45B7D1", "96CEB4", "FFEAA7"],
  }

  async generateImages(keywords: string[], count: number): Promise<string[]> {
    const images: string[] = []
    const palette = this.getPalette(keywords)

    for (let i = 0; i < count; i++) {
      const gradientType = i % 4
      const svg = this.generateGradientSVG(palette, gradientType, i)
      const base64 = Buffer.from(svg).toString("base64")
      images.push(`data:image/svg+xml;base64,${base64}`)
    }

    return images
  }

  private getPalette(keywords: string[]): string[] {
    for (const keyword of keywords) {
      const lowerKeyword = keyword.toLowerCase()
      if (this.gradientColors[lowerKeyword]) {
        return this.gradientColors[lowerKeyword]
      }
    }
    return this.gradientColors.default
  }

  private generateGradientSVG(palette: string[], gradientType: number, index: number): string {
    const width = 600
    const height = 400

    let defs = ""
    let rect = ""

    switch (gradientType) {
      case 0:
        defs = this.generateLinearGradient(palette, index, "horizontal")
        rect = `<rect width="${width}" height="${height}" fill="url(#grad${index})" />`
        break
      case 1:
        defs = this.generateLinearGradient(palette, index, "vertical")
        rect = `<rect width="${width}" height="${height}" fill="url(#grad${index})" />`
        break
      case 2:
        defs = this.generateRadialGradient(palette, index)
        rect = `<rect width="${width}" height="${height}" fill="url(#grad${index})" />`
        break
      case 3:
        defs = this.generateConicGradient(palette, index)
        rect = `<rect width="${width}" height="${height}" fill="url(#grad${index})" />`
        break
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>${defs}</defs>
      ${rect}
    </svg>`
  }

  private generateLinearGradient(palette: string[], index: number, direction: string): string {
    const stops = this.generateStops(palette)
    let x1 = "0%",
      y1 = "0%",
      x2 = "100%",
      y2 = "0%"

    if (direction === "vertical") {
      ;((x1 = "0%"), (y1 = "0%"), (x2 = "0%"), (y2 = "100%"))
    } else if (direction === "diagonal") {
      ;((x1 = "0%"), (y1 = "0%"), (x2 = "100%"), (y2 = "100%"))
    }

    return `<linearGradient id="grad${index}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops}</linearGradient>`
  }

  private generateRadialGradient(palette: string[], index: number): string {
    const stops = this.generateStops(palette)
    return `<radialGradient id="grad${index}" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">${stops}</radialGradient>`
  }

  private generateConicGradient(palette: string[], index: number): string {
    const stops = this.generateStops(palette)
    return `<linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(45 300 200)">${stops}</linearGradient>`
  }

  private generateStops(palette: string[]): string {
    let stops = ""
    const numStops = Math.min(palette.length, 5)

    for (let i = 0; i < numStops; i++) {
      const offset = (i / (numStops - 1)) * 100
      stops += `<stop offset="${offset}%" style="stop-color:#${palette[i]};stop-opacity:1" />`
    }

    return stops
  }
}
