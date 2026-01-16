import type { ImageSource } from "./image-source"

export class PatternSource implements ImageSource {
  name = "pattern"
  description = "Geometric patterns with keyword-based colors"

  private patternColors: Record<string, string[]> = {
    nature: ["2D6A4F", "40916C", "52B788", "74C69D"],
    ocean: ["0077B6", "00B4D8", "90E0EF", "CAF0F8"],
    sunset: ["FF6B6B", "FF8E53", "FFA07A", "FFD700"],
    forest: ["1B4332", "2D6A4F", "40916C", "52B788"],
    flower: ["FF6B6B", "FF8E53", "FFA07A", "FFB347"],
    mountain: ["6C757D", "495057", "343A40", "212529"],
    night: ["0D1B2A", "1B263B", "415A77", "778DA9"],
    day: ["FFB703", "FB8500", "FFB703", "FFD166"],
    love: ["FF6B6B", "FF8E53", "FFA07A", "FFB347"],
    technology: ["003566", "006494", "0582CA", "00A6FB"],
    art: ["FF6B6B", "4ECDC4", "45B7D1", "96CEB4"],
    default: ["FF6B6B", "4ECDC4", "45B7D1", "96CEB4"],
  }

  async generateImages(keywords: string[], count: number): Promise<string[]> {
    const images: string[] = []
    const palette = this.getPalette(keywords)

    for (let i = 0; i < count; i++) {
      const patternType = i % 5
      const svg = this.generatePatternSVG(palette, patternType, i)
      const base64 = Buffer.from(svg).toString("base64")
      images.push(`data:image/svg+xml;base64,${base64}`)
    }

    return images
  }

  private getPalette(keywords: string[]): string[] {
    for (const keyword of keywords) {
      const lowerKeyword = keyword.toLowerCase()
      if (this.patternColors[lowerKeyword]) {
        return this.patternColors[lowerKeyword]
      }
    }
    return this.patternColors.default
  }

  private generatePatternSVG(palette: string[], patternType: number, index: number): string {
    const width = 600
    const height = 400
    const color1 = palette[index % palette.length]
    const color2 = palette[(index + 1) % palette.length]

    let pattern = ""
    switch (patternType) {
      case 0:
        pattern = this.generateStripes(width, height, color1, color2)
        break
      case 1:
        pattern = this.generateDots(width, height, color1, color2)
        break
      case 2:
        pattern = this.generateGrid(width, height, color1, color2)
        break
      case 3:
        pattern = this.generateWaves(width, height, color1, color2)
        break
      case 4:
        pattern = this.generateTriangles(width, height, color1, color2)
        break
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="#${color2}" />
      ${pattern}
    </svg>`
  }

  private generateStripes(width: number, height: number, color1: string, color2: string): string {
    const stripeWidth = 40
    let stripes = ""
    for (let i = 0; i < width / stripeWidth + 1; i++) {
      const x = i * stripeWidth
      stripes += `<rect x="${x}" y="0" width="${stripeWidth}" height="${height}" fill="#${color1}" opacity="0.7" />`
    }
    return stripes
  }

  private generateDots(width: number, height: number, color1: string, color2: string): string {
    const dotSize = 20
    const spacing = 40
    let dots = ""
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        dots += `<circle cx="${x}" cy="${y}" r="${dotSize / 2}" fill="#${color1}" opacity="0.8" />`
      }
    }
    return dots
  }

  private generateGrid(width: number, height: number, color1: string, color2: string): string {
    const gridSize = 50
    let grid = ""
    for (let x = 0; x < width; x += gridSize) {
      grid += `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="#${color1}" stroke-width="2" opacity="0.6" />`
    }
    for (let y = 0; y < height; y += gridSize) {
      grid += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="#${color1}" stroke-width="2" opacity="0.6" />`
    }
    return grid
  }

  private generateWaves(width: number, height: number, color1: string, color2: string): string {
    const waveHeight = 30
    const waveLength = 100
    let waves = ""
    for (let y = 0; y < height; y += waveHeight) {
      let path = `M 0 ${y} `
      for (let x = 0; x <= width; x += waveLength / 2) {
        path += `Q ${x + waveLength / 4} ${y + waveHeight / 2} ${x + waveLength / 2} ${y} `
      }
      waves += `<path d="${path}" stroke="#${color1}" stroke-width="3" fill="none" opacity="0.7" />`
    }
    return waves
  }

  private generateTriangles(width: number, height: number, color1: string, color2: string): string {
    const size = 60
    let triangles = ""
    for (let x = 0; x < width; x += size) {
      for (let y = 0; y < height; y += size) {
        const points = `${x},${y + size} ${x + size / 2},${y} ${x + size},${y + size}`
        triangles += `<polygon points="${points}" fill="#${color1}" opacity="0.6" />`
      }
    }
    return triangles
  }
}
