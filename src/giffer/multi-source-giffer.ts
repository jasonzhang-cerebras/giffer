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

  async generateFromAllSources(keywords: string[], count: number): Promise<Map<string, string[]>> {
    const results = new Map<string, string[]>()

    for (const source of this.sources) {
      try {
        const images = await source.generateImages(keywords, count)
        results.set(source.name, images)
      } catch (error) {
        console.warn(`Failed to generate images from ${source.name}:`, error)
      }
    }

    return results
  }

  async generateFromSource(sourceName: string, keywords: string[], count: number): Promise<string[]> {
    const source = this.getSourceByName(sourceName)
    if (!source) {
      throw new Error(`Unknown source: ${sourceName}`)
    }
    return source.generateImages(keywords, count)
  }
}
