import { describe, it, expect } from "bun:test"
import { LoremPicsumSource } from "../src/giffer/sources/lorem-picsum"
import { PlaceholderSource } from "../src/giffer/sources/placeholder"
import { EmojiSource } from "../src/giffer/sources/emoji"
import { CanvasSource } from "../src/giffer/sources/canvas"

describe("Image Sources", () => {
  describe("LoremPicsumSource", () => {
    it("should generate seeded image URLs", async () => {
      const source = new LoremPicsumSource()
      const images = await source.generateImages(["sunset", "ocean"], 3)
      expect(images).toBeArray()
      expect(images.length).toBe(3)
      expect(images[0]).toContain("picsum.photos")
      expect(images[0]).toContain("seed")
    })
  })

  describe("PlaceholderSource", () => {
    it("should generate placeholder URLs", async () => {
      const source = new PlaceholderSource()
      const images = await source.generateImages(["sunset", "ocean"], 3)
      expect(images).toBeArray()
      expect(images.length).toBe(3)
      expect(images[0]).toContain("placehold.co")
    })
  })

  describe("EmojiSource", () => {
    it("should generate emoji URLs", async () => {
      const source = new EmojiSource()
      const images = await source.generateImages(["sunset", "ocean"], 3)
      expect(images).toBeArray()
      expect(images.length).toBe(3)
      expect(images[0]).toContain("placehold.co")
    })
  })

  describe("CanvasSource", () => {
    it("should generate SVG data URIs", async () => {
      const source = new CanvasSource()
      const images = await source.generateImages(["sunset", "ocean"], 3)
      expect(images).toBeArray()
      expect(images.length).toBe(3)
      expect(images[0]).toContain("data:image/svg+xml")
    })
  })
})
