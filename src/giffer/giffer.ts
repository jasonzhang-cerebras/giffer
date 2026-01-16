import { KeywordExtractor } from "./keyword-extractor"
import { GIFGenerator } from "./gif-generator"
import { Translator } from "./translator"
import { MultiSourceGiffer } from "./multi-source-giffer"

export interface GifferConfig {
  frames: number
  duration: number
  width: number
  height: number
  language?: string
}

export class Giffer {
  private keywordExtractor: KeywordExtractor
  private gifGenerator: GIFGenerator
  private translator: Translator
  private multiSourceGiffer: MultiSourceGiffer

  constructor(config: GifferConfig) {
    this.keywordExtractor = new KeywordExtractor()
    this.gifGenerator = new GIFGenerator(config)
    this.translator = new Translator()
    this.multiSourceGiffer = new MultiSourceGiffer()
  }

  async extractKeywords(description: string): Promise<string[]> {
    let processedDescription = description

    if (this.translator.detectLanguage(description) !== "en") {
      processedDescription = await this.translator.translate(description, "en")
    }

    return this.keywordExtractor.extract(processedDescription)
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
