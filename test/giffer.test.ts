import { describe, it, expect, beforeAll } from "bun:test";
import { Giffer } from "../src/giffer/giffer";

describe("Giffer", () => {
  let giffer: Giffer;

  beforeAll(() => {
    giffer = new Giffer({
      width: 400,
      height: 300,
    });
  });

  describe("keyword extraction", () => {
    it("should extract keywords from description", async () => {
      const keywords = await giffer.extractKeywords(
        "a beautiful sunset over the ocean",
      );
      expect(keywords).toBeArray();
      expect(keywords.length).toBeGreaterThan(0);
      expect(keywords).toContain("beauti");
      expect(keywords).toContain("sunset");
    });
  });

  describe("source management", () => {
    it("should return all available sources", () => {
      const sources = giffer.getSources();
      expect(sources).toBeArray();
      expect(sources.length).toBe(8);
      expect(sources.map((s) => s.name)).toEqual([
        "lorem-picsum",
        "placeholder",
        "emoji",
        "canvas",
        "pattern",
        "abstract-art",
        "gradient",
        "icon",
      ]);
    });

    it("should generate image from specific source", async () => {
      const keywords = ["sunset", "ocean"];
      const imageUrls = await giffer.generateFromSource(
        "placeholder",
        keywords,
      );
      expect(imageUrls).toBeArray();
      expect(imageUrls.length).toBeGreaterThan(0);
      expect(imageUrls[0]).toBeString();
      expect(imageUrls[0].length).toBeGreaterThan(0);
    });
  });
});
