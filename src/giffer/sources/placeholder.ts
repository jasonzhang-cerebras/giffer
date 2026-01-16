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
      const text = keywords.slice(0, 3).join("+")
      images.push(`https://placehold.co/600x400/${bgColor}/${textColor}?text=${text}`)
    }

    return images
  }
}
