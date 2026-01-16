import { KeywordExtractor } from "./keyword-extractor"
import { ImageGenerator } from "./image-generator"
import { MultiSourceGiffer } from "./multi-source-giffer"

export interface GifferConfig {
  width: number
  height: number
}

export class Giffer {
  private keywordExtractor: KeywordExtractor
  private imageGenerator: ImageGenerator
  private multiSourceGiffer: MultiSourceGiffer

  constructor(config: GifferConfig) {
    this.keywordExtractor = new KeywordExtractor()
    this.imageGenerator = new ImageGenerator(config)
    this.multiSourceGiffer = new MultiSourceGiffer()
  }

  async extractKeywords(description: string): Promise<string[]> {
    return this.keywordExtractor.extract(description)
  }

  async generateImage(imageUrl: string, outputPath: string): Promise<void> {
    await this.imageGenerator.generate(imageUrl, outputPath)
  }

  async generateFromAllSources(keywords: string[]): Promise<Map<string, string>> {
    return this.multiSourceGiffer.generateFromAllSources(keywords)
  }

  async generateFromSource(sourceName: string, keywords: string[]): Promise<string> {
    return this.multiSourceGiffer.generateFromSource(sourceName, keywords)
  }

  getSources() {
    return this.multiSourceGiffer.getSources()
  }
}
