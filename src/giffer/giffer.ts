import { KeywordExtractor } from "./keyword-extractor"
import { GIFGenerator } from "./gif-generator"
import { MultiSourceGiffer } from "./multi-source-giffer"

export interface GifferConfig {
  frames: number
  duration: number
  width: number
  height: number
}

export class Giffer {
  private keywordExtractor: KeywordExtractor
  private gifGenerator: GIFGenerator
  private multiSourceGiffer: MultiSourceGiffer

  constructor(config: GifferConfig) {
    this.keywordExtractor = new KeywordExtractor()
    this.gifGenerator = new GIFGenerator(config)
    this.multiSourceGiffer = new MultiSourceGiffer()
  }

  async extractKeywords(description: string): Promise<string[]> {
    return this.keywordExtractor.extract(description)
  }

  async generateGIF(imageUrls: string[], outputPath: string): Promise<void> {
    await this.gifGenerator.generate(imageUrls, outputPath)
  }

  async generateFromAllSources(keywords: string[]): Promise<Map<string, string[]>> {
    return this.multiSourceGiffer.generateFromAllSources(keywords, this.gifGenerator["config"].frames)
  }

  async generateFromSource(sourceName: string, keywords: string[]): Promise<string[]> {
    return this.multiSourceGiffer.generateFromSource(sourceName, keywords, this.gifGenerator["config"].frames)
  }

  getSources() {
    return this.multiSourceGiffer.getSources()
  }
}
