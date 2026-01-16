import type { ImageSource } from "./image-source"

export class PlaceholderSource implements ImageSource {
  name = "placeholder"
  description = "Placeholder graphics with keyword text overlays"

  async generateImages(keywords: string[], count: number): Promise<string[]> {
    const images: string[] = []
    const colors = ["FF6B6B", "4ECDC4", "45B7D1", "96CEB4", "FFEAA7", "DDA0DD", "98D8C8", "F7DC6F"]

    for (let i = 0; i < count; i++) {
      const bgColor = colors[i % colors.length]
      const textColor = "FFFFFF"
      const text = keywords.slice(0, 3).join(" ")
      const svg = this.generateSVG(text, bgColor, textColor, i)
      const base64 = Buffer.from(svg).toString("base64")
      images.push(`data:image/svg+xml;base64,${base64}`)
    }

    return images
  }

  private generateSVG(text: string, bgColor: string, textColor: string, index: number): string {
    const width = 600
    const height = 400
    const color2 = this.getSecondaryColor(bgColor)

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#${bgColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad${index})" />
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#${textColor}" text-anchor="middle" dy=".3em" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">${text}</text>
    </svg>`
  }

  private getSecondaryColor(color: string): string {
    const colorMap: Record<string, string> = {
      FF6B6B: "FF8E53",
      "4ECDC4": "45B7D1",
      "45B7D1": "96CEB4",
      "96CEB4": "FFEAA7",
      FFEAA7: "DDA0DD",
      DDA0DD: "98D8C8",
      "98D8C8": "F7DC6F",
      F7DC6F: "FF6B6B",
    }
    return colorMap[color] || "4ECDC4"
  }
}
