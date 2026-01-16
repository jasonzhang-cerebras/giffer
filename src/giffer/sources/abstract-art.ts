import type { ImageSource } from "./image-source"

export class AbstractArtSource implements ImageSource {
  name = "abstract-art"
  description = "Abstract shapes and compositions with keyword colors"

  private artColors: Record<string, string[]> = {
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
      const artStyle = i % 4
      const svg = this.generateAbstractArtSVG(palette, artStyle, i)
      const base64 = Buffer.from(svg).toString("base64")
      images.push(`data:image/svg+xml;base64,${base64}`)
    }

    return images
  }

  private getPalette(keywords: string[]): string[] {
    for (const keyword of keywords) {
      const lowerKeyword = keyword.toLowerCase()
      if (this.artColors[lowerKeyword]) {
        return this.artColors[lowerKeyword]
      }
    }
    return this.artColors.default
  }

  private generateAbstractArtSVG(palette: string[], artStyle: number, index: number): string {
    const width = 600
    const height = 400

    let shapes = ""
    switch (artStyle) {
      case 0:
        shapes = this.generateGeometricArt(width, height, palette, index)
        break
      case 1:
        shapes = this.generateOrganicArt(width, height, palette, index)
        break
      case 2:
        shapes = this.generateMinimalArt(width, height, palette, index)
        break
      case 3:
        shapes = this.generateChaoticArt(width, height, palette, index)
        break
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="#${palette[0]}" />
      ${shapes}
    </svg>`
  }

  private generateGeometricArt(width: number, height: number, palette: string[], index: number): string {
    let shapes = ""
    const numShapes = 8 + (index % 5)

    for (let i = 0; i < numShapes; i++) {
      const color = palette[(i + 1) % palette.length]
      const opacity = 0.3 + Math.random() * 0.5
      const shapeType = i % 3

      const x = Math.random() * width
      const y = Math.random() * height
      const size = 50 + Math.random() * 150

      switch (shapeType) {
        case 0:
          shapes += `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="#${color}" opacity="${opacity}" />`
          break
        case 1:
          shapes += `<rect x="${x - size / 2}" y="${y - size / 2}" width="${size}" height="${size}" fill="#${color}" opacity="${opacity}" />`
          break
        case 2:
          const points = `${x},${y - size / 2} ${x + size / 2},${y + size / 2} ${x - size / 2},${y + size / 2}`
          shapes += `<polygon points="${points}" fill="#${color}" opacity="${opacity}" />`
          break
      }
    }

    return shapes
  }

  private generateOrganicArt(width: number, height: number, palette: string[], index: number): string {
    let shapes = ""
    const numBlobs = 5 + (index % 4)

    for (let i = 0; i < numBlobs; i++) {
      const color = palette[(i + 1) % palette.length]
      const opacity = 0.4 + Math.random() * 0.4
      const cx = Math.random() * width
      const cy = Math.random() * height
      const rx = 60 + Math.random() * 100
      const ry = 40 + Math.random() * 80
      const rotation = Math.random() * 360

      shapes += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#${color}" opacity="${opacity}" transform="rotate(${rotation} ${cx} ${cy})" />`
    }

    for (let i = 0; i < 3; i++) {
      const color = palette[(i + 2) % palette.length]
      const opacity = 0.3 + Math.random() * 0.3
      const startX = Math.random() * width
      const startY = Math.random() * height

      let path = `M ${startX} ${startY} `
      for (let j = 0; j < 5; j++) {
        const cp1x = startX + (Math.random() - 0.5) * 200
        const cp1y = startY + (Math.random() - 0.5) * 200
        const cp2x = startX + (Math.random() - 0.5) * 200
        const cp2y = startY + (Math.random() - 0.5) * 200
        const endX = startX + (Math.random() - 0.5) * 300
        const endY = startY + (Math.random() - 0.5) * 300
        path += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY} `
      }

      shapes += `<path d="${path}" stroke="#${color}" stroke-width="8" fill="none" opacity="${opacity}" stroke-linecap="round" />`
    }

    return shapes
  }

  private generateMinimalArt(width: number, height: number, palette: string[], index: number): string {
    let shapes = ""
    const numShapes = 3 + (index % 3)

    for (let i = 0; i < numShapes; i++) {
      const color = palette[(i + 1) % palette.length]
      const opacity = 0.6 + Math.random() * 0.3
      const shapeType = i % 2

      if (shapeType === 0) {
        const x = Math.random() * width
        const y = Math.random() * height
        const size = 80 + Math.random() * 120
        shapes += `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="#${color}" opacity="${opacity}" />`
      } else {
        const x = Math.random() * (width - 200)
        const y = Math.random() * (height - 200)
        const w = 100 + Math.random() * 150
        const h = 100 + Math.random() * 150
        shapes += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#${color}" opacity="${opacity}" />`
      }
    }

    return shapes
  }

  private generateChaoticArt(width: number, height: number, palette: string[], index: number): string {
    let shapes = ""
    const numShapes = 15 + (index % 10)

    for (let i = 0; i < numShapes; i++) {
      const color = palette[i % palette.length]
      const opacity = 0.2 + Math.random() * 0.6
      const shapeType = i % 4

      const x = Math.random() * width
      const y = Math.random() * height
      const size = 30 + Math.random() * 100

      switch (shapeType) {
        case 0:
          shapes += `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="#${color}" opacity="${opacity}" />`
          break
        case 1:
          shapes += `<rect x="${x - size / 2}" y="${y - size / 2}" width="${size}" height="${size}" fill="#${color}" opacity="${opacity}" />`
          break
        case 2:
          const points = `${x},${y - size / 2} ${x + size / 2},${y + size / 2} ${x - size / 2},${y + size / 2}`
          shapes += `<polygon points="${points}" fill="#${color}" opacity="${opacity}" />`
          break
        case 3:
          const rx = size / 2
          const ry = size / 3
          shapes += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#${color}" opacity="${opacity}" />`
          break
      }
    }

    return shapes
  }
}
