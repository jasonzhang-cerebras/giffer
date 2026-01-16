import sharp from "sharp"

export interface GIFGeneratorConfig {
  frames: number
  duration: number
  width: number
  height: number
}

export class GIFGenerator {
  private config: GIFGeneratorConfig

  constructor(config: GIFGeneratorConfig) {
    this.config = config
  }

  async generate(imageUrls: string[], outputPath: string): Promise<void> {
    const frames = Math.min(imageUrls.length, this.config.frames)
    const selectedUrls = imageUrls.slice(0, frames)

    const images: Buffer[] = []

    for (const url of selectedUrls) {
      let buffer: ArrayBuffer

      if (url.startsWith("data:")) {
        const base64Data = url.split(",")[1]
        buffer = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0)).buffer
      } else {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Failed to download image: ${url}`)
        }
        buffer = await response.arrayBuffer()
      }

      const resized = await sharp(Buffer.from(buffer))
        .resize(this.config.width, this.config.height, { fit: "cover" })
        .toBuffer()

      images.push(resized)
    }

    if (images.length === 0) {
      throw new Error("No images to generate GIF")
    }

    const gif = await sharp(images[0], { animated: true })
      .gif({
        delay: this.config.duration,
        loop: 0,
        page: images.map(() => ({ delay: this.config.duration })),
      })
      .toBuffer()

    await Bun.write(outputPath, gif)
  }
}
