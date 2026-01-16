import type { ImageSource } from "./image-source"

export class LoremPicsumSource implements ImageSource {
  name = "lorem-picsum"
  description = "Real photography from Lorem Picsum (random but consistent)"

  async generateImages(keywords: string[], count: number): Promise<string[]> {
    const seed = keywords.join("-")
    const images: string[] = []

    for (let i = 0; i < count; i++) {
      const frameSeed = `${seed}-${i}`
      images.push(`https://picsum.photos/seed/${frameSeed}/800/600`)
    }

    return images
  }
}
