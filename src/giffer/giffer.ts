import { KeywordExtractor } from "./keyword-extractor";
import { GIFGenerator } from "./gif-generator";
import { Translator } from "./translator";
import { MultiSourceGiffer } from "./multi-source-giffer";
import { ImageGenerator } from "./image-generator";

export interface GifferConfig {
  frames?: number;
  duration?: number;
  width: number;
  height: number;
  language?: string;
}

export class Giffer {
  private keywordExtractor: KeywordExtractor;
  private gifGenerator: GIFGenerator;
  private translator: Translator;
  private multiSourceGiffer: MultiSourceGiffer;
  private imageGenerator: ImageGenerator;
  private frames: number;
  private duration: number;
  public config: GifferConfig;

  constructor(config: GifferConfig) {
    this.frames = config.frames ?? 1;
    this.duration = config.duration ?? 1000;
    this.config = {
      frames: this.frames,
      duration: this.duration,
      width: config.width,
      height: config.height,
      language: config.language,
    };
    this.keywordExtractor = new KeywordExtractor();
    this.gifGenerator = new GIFGenerator({
      frames: this.frames,
      duration: this.duration,
      width: config.width,
      height: config.height,
    });
    this.translator = new Translator();
    this.multiSourceGiffer = new MultiSourceGiffer();
    this.imageGenerator = new ImageGenerator({
      width: config.width,
      height: config.height,
    });
  }

  async extractKeywords(description: string): Promise<string[]> {
    let processedDescription = description;

    if (this.translator.detectLanguage(description) !== "en") {
      processedDescription = await this.translator.translate(description, "en");
    }

    return this.keywordExtractor.extract(processedDescription);
  }

  async generateGIF(imageUrls: string[], outputPath: string): Promise<void> {
    await this.gifGenerator.generate(imageUrls, outputPath);
  }

  async generateFromAllSources(
    keywords: string[],
  ): Promise<Map<string, string[]>> {
    return this.multiSourceGiffer.generateFromAllSources(keywords, this.frames);
  }

  async generateFromSource(
    sourceName: string,
    keywords: string[],
  ): Promise<string[]> {
    return this.multiSourceGiffer.generateFromSource(
      sourceName,
      keywords,
      this.frames,
    );
  }

  async generateImage(imageUrl: string, outputPath: string): Promise<void> {
    await this.imageGenerator.generate(imageUrl, outputPath);
  }

  getSources() {
    return this.multiSourceGiffer.getSources();
  }
}
