import { describe, expect, test } from "bun:test"
import { LoremPicsumSource } from "../../src/giffer/sources/lorem-picsum"
import { PlaceholderSource } from "../../src/giffer/sources/placeholder"
import { EmojiSource } from "../../src/giffer/sources/emoji"
import { CanvasSource } from "../../src/giffer/sources/canvas"
import { PatternSource } from "../../src/giffer/sources/pattern"
import { AbstractArtSource } from "../../src/giffer/sources/abstract-art"
import { GradientSource } from "../../src/giffer/sources/gradient"
import { IconSource } from "../../src/giffer/sources/icon"

describe("Image Sources", () => {
  describe("LoremPicsumSource", () => {
    const source = new LoremPicsumSource()

    test("should have correct name and description", () => {
      expect(source.name).toBe("lorem-picsum")
      expect(source.description).toBeTruthy()
    })

    test("should generate image URLs", async () => {
      const images = await source.generateImages(["cat", "dog"], 3)
      expect(images.length).toBe(3)
      expect(images[0]).toMatch(/^https:\/\/picsum\.photos\/seed\/.+/)
    })

    test("should use keywords as seed", async () => {
      const images1 = await source.generateImages(["cat"], 1)
      const images2 = await source.generateImages(["cat"], 1)
      expect(images1[0]).toBe(images2[0])
    })
  })

  describe("PlaceholderSource", () => {
    const source = new PlaceholderSource()

    test("should have correct name and description", () => {
      expect(source.name).toBe("placeholder")
      expect(source.description).toBeTruthy()
    })

    test("should generate SVG data URIs", async () => {
      const images = await source.generateImages(["cat", "dog"], 3)
      expect(images.length).toBe(3)
      expect(images[0]).toMatch(/^data:image\/svg\+xml;base64,.+/)
    })

    test("should include keywords in SVG", async () => {
      const images = await source.generateImages(["cat", "dog"], 1)
      const svg = Buffer.from(images[0].split(",")[1], "base64").toString()
      expect(svg).toContain("cat")
      expect(svg).toContain("dog")
    })
  })

  describe("EmojiSource", () => {
    const source = new EmojiSource()

    test("should have correct name and description", () => {
      expect(source.name).toBe("emoji")
      expect(source.description).toBeTruthy()
    })

    test("should generate SVG data URIs", async () => {
      const images = await source.generateImages(["cat"], 3)
      expect(images.length).toBe(3)
      expect(images[0]).toMatch(/^data:image\/svg\+xml;base64,.+/)
    })

    test("should include emoji in SVG", async () => {
      const images = await source.generateImages(["cat"], 1)
      const svg = Buffer.from(images[0].split(",")[1], "base64").toString()
      expect(svg).toMatch(/🐱|🐈|😺/)
    })

    test("should use default emojis for unknown keywords", async () => {
      const images = await source.generateImages(["unknown"], 1)
      const svg = Buffer.from(images[0].split(",")[1], "base64").toString()
      expect(svg).toMatch(/✨|🎨|🌟/)
    })
  })

  describe("CanvasSource", () => {
    const source = new CanvasSource()

    test("should have correct name and description", () => {
      expect(source.name).toBe("canvas")
      expect(source.description).toBeTruthy()
    })

    test("should generate SVG data URIs", async () => {
      const images = await source.generateImages(["sunset"], 3)
      expect(images.length).toBe(3)
      expect(images[0]).toMatch(/^data:image\/svg\+xml;base64,.+/)
    })

    test("should include gradient in SVG", async () => {
      const images = await source.generateImages(["sunset"], 1)
      const svg = Buffer.from(images[0].split(",")[1], "base64").toString()
      expect(svg).toContain("linearGradient")
    })

    test("should use keyword-based colors", async () => {
      const images1 = await source.generateImages(["sunset"], 1)
      const images2 = await source.generateImages(["ocean"], 1)
      const svg1 = Buffer.from(images1[0].split(",")[1], "base64").toString()
      const svg2 = Buffer.from(images2[0].split(",")[1], "base64").toString()
      expect(svg1).not.toBe(svg2)
    })
  })

  describe("PatternSource", () => {
    const source = new PatternSource()

    test("should have correct name and description", () => {
      expect(source.name).toBe("pattern")
      expect(source.description).toBeTruthy()
    })

    test("should generate SVG data URIs", async () => {
      const images = await source.generateImages(["nature"], 3)
      expect(images.length).toBe(3)
      expect(images[0]).toMatch(/^data:image\/svg\+xml;base64,.+/)
    })

    test("should generate different pattern types", async () => {
      const images = await source.generateImages(["nature"], 5)
      const svgs = images.map((img) => Buffer.from(img.split(",")[1], "base64").toString())
      const uniquePatterns = new Set(svgs)
      expect(uniquePatterns.size).toBeGreaterThan(1)
    })
  })

  describe("AbstractArtSource", () => {
    const source = new AbstractArtSource()

    test("should have correct name and description", () => {
      expect(source.name).toBe("abstract-art")
      expect(source.description).toBeTruthy()
    })

    test("should generate SVG data URIs", async () => {
      const images = await source.generateImages(["art"], 3)
      expect(images.length).toBe(3)
      expect(images[0]).toMatch(/^data:image\/svg\+xml;base64,.+/)
    })

    test("should generate different art styles", async () => {
      const images = await source.generateImages(["art"], 4)
      const svgs = images.map((img) => Buffer.from(img.split(",")[1], "base64").toString())
      const uniqueStyles = new Set(svgs)
      expect(uniqueStyles.size).toBeGreaterThan(1)
    })
  })

  describe("GradientSource", () => {
    const source = new GradientSource()

    test("should have correct name and description", () => {
      expect(source.name).toBe("gradient")
      expect(source.description).toBeTruthy()
    })

    test("should generate SVG data URIs", async () => {
      const images = await source.generateImages(["sunset"], 3)
      expect(images.length).toBe(3)
      expect(images[0]).toMatch(/^data:image\/svg\+xml;base64,.+/)
    })

    test("should include gradient in SVG", async () => {
      const images = await source.generateImages(["sunset"], 1)
      const svg = Buffer.from(images[0].split(",")[1], "base64").toString()
      expect(svg).toContain("linearGradient")
    })
  })

  describe("IconSource", () => {
    const source = new IconSource()

    test("should have correct name and description", () => {
      expect(source.name).toBe("icon")
      expect(source.description).toBeTruthy()
    })

    test("should generate SVG data URIs", async () => {
      const images = await source.generateImages(["cat"], 3)
      expect(images.length).toBe(3)
      expect(images[0]).toMatch(/^data:image\/svg\+xml;base64,.+/)
    })

    test("should include icon in SVG", async () => {
      const images = await source.generateImages(["cat"], 1)
      const svg = Buffer.from(images[0].split(",")[1], "base64").toString()
      expect(svg).toMatch(/🐱|🐈|😺/)
    })

    test("should generate different icon styles", async () => {
      const images = await source.generateImages(["cat"], 4)
      const svgs = images.map((img) => Buffer.from(img.split(",")[1], "base64").toString())
      const uniqueStyles = new Set(svgs)
      expect(uniqueStyles.size).toBeGreaterThan(1)
    })
  })
})
