import type { ImageSource } from "./sources/image-source"
import { LoremPicsumSource } from "./sources/lorem-picsum"
import { PlaceholderSource } from "./sources/placeholder"
import { EmojiSource } from "./sources/emoji"
import { CanvasSource } from "./sources/canvas"

export class MultiSourceGiffer {
  private sources: ImageSource[]

  constructor() {
    this.sources = [new LoremPicsumSource(), new PlaceholderSource(), new EmojiSource(), new CanvasSource()]
  }

  getSources(): ImageSource[] {
    return this.sources
  }

  getSourceByName(name: string): ImageSource | undefined {
    return this.sources.find((s) => s.name === name)
  }

  async generateFromAllSources(keywords: string[]): Promise<Map<string, string>> {
    const results = new Map<string, string>()

    for (const source of this.sources) {
      try {
        const images = await source.generateImages(keywords, 1)
        if (images.length > 0 && images[0]) {
          results.set(source.name, images[0])
        }
      } catch (error) {
        console.warn(`Failed to generate images from ${source.name}:`, error)
      }
    }

    return results
  }

  async generateFromSource(sourceName: string, keywords: string[]): Promise<string> {
    const source = this.getSourceByName(sourceName)
    if (!source) {
      throw new Error(`Unknown source: ${sourceName}`)
    }
    const images = await source.generateImages(keywords, 1)
    if (images.length === 0 || !images[0]) {
      throw new Error(`No images generated from ${sourceName}`)
    }
    return images[0]
  }
}
