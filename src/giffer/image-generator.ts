import sharp from "sharp"

export interface ImageGeneratorConfig {
  width: number
  height: number
}

export class ImageGenerator {
  private config: ImageGeneratorConfig

  constructor(config: ImageGeneratorConfig) {
    this.config = config
  }

  async generate(imageUrl: string, outputPath: string): Promise<void> {
    let buffer: ArrayBuffer

    if (imageUrl.startsWith("data:")) {
      const base64Data = imageUrl.split(",")[1]
      buffer = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0)).buffer
    } else {
      const response = await fetch(imageUrl)
      if (!response.ok) {
        throw new Error(`Failed to download image: ${imageUrl}`)
      }
      buffer = await response.arrayBuffer()
    }

    const resized = await sharp(Buffer.from(buffer))
      .resize(this.config.width, this.config.height, { fit: "cover" })
      .png()
      .toBuffer()

    await Bun.write(outputPath, resized)
  }
}
