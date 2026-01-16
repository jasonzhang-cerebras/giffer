import { describe, it, expect, beforeAll } from "bun:test"
import { Giffer } from "../src/giffer/giffer"

describe("Giffer", () => {
  let giffer: Giffer

  beforeAll(() => {
    giffer = new Giffer({
      frames: 3,
      duration: 500,
      width: 400,
      height: 300,
    })
  })

  describe("keyword extraction", () => {
    it("should extract keywords from description", async () => {
      const keywords = await giffer.extractKeywords("a beautiful sunset over the ocean")
      expect(keywords).toBeArray()
      expect(keywords.length).toBeGreaterThan(0)
      expect(keywords).toContain("beautiful")
      expect(keywords).toContain("sunset")
    })

    it("should handle non-English descriptions", async () => {
      const keywords = await giffer.extractKeywords("un gato durmiendo")
      expect(keywords).toBeArray()
      expect(keywords.length).toBeGreaterThan(0)
    })
  })

  describe("source management", () => {
    it("should return all available sources", () => {
      const sources = giffer.getSources()
      expect(sources).toBeArray()
      expect(sources.length).toBe(4)
      expect(sources.map((s) => s.name)).toEqual(["lorem-picsum", "placeholder", "emoji", "canvas"])
    })

    it("should generate images from specific source", async () => {
      const keywords = ["sunset", "ocean"]
      const images = await giffer.generateFromSource("placeholder", keywords)
      expect(images).toBeArray()
      expect(images.length).toBeGreaterThan(0)
    })
  })
})
