import { describe, expect, test } from "bun:test";
import { KeywordExtractor } from "../src/giffer/keyword-extractor";

describe("KeywordExtractor", () => {
  const extractor = new KeywordExtractor();

  test("should extract keywords from simple description", () => {
    const keywords = extractor.extract("a beautiful sunset over the ocean");
    expect(keywords.length).toBeGreaterThan(0);
    expect(keywords).toContain("beauti");
    expect(keywords).toContain("sunset");
    expect(keywords).toContain("ocean");
  });

  test("should stem words correctly", () => {
    const keywords = extractor.extract("cats running in the garden");
    expect(keywords).toContain("cat");
    expect(keywords).toContain("run");
    expect(keywords).toContain("garden");
  });

  test("should expand with synonyms", () => {
    const keywords = extractor.extract("happy cats playing");
    expect(keywords.length).toBeGreaterThan(3);
    expect(keywords).toContain("happi");
    expect(keywords).toContain("cat");
  });

  test("should expand with semantic categories", () => {
    const keywords = extractor.extract("a dog and a cat");
    expect(keywords.length).toBeGreaterThan(2);
    expect(keywords).toContain("dog");
    expect(keywords).toContain("cat");
  });

  test("should remove stop words", () => {
    const keywords = extractor.extract("the cat is on the mat");
    expect(keywords).not.toContain("the");
    expect(keywords).not.toContain("is");
    expect(keywords).not.toContain("on");
    expect(keywords).toContain("cat");
    expect(keywords).toContain("mat");
  });

  test("should handle empty string", () => {
    const keywords = extractor.extract("");
    expect(keywords).toEqual([]);
  });

  test("should handle special characters", () => {
    const keywords = extractor.extract("cats, dogs! and birds?");
    expect(keywords).toContain("cat");
    expect(keywords).toContain("dog");
    expect(keywords).toContain("bird");
  });

  test("should limit to top 10 keywords", () => {
    const keywords = extractor.extract(
      "cat dog bird fish lion tiger elephant horse cow pig sheep goat chicken duck rabbit mouse rat bear wolf fox deer monkey ape whale dolphin shark snake lizard frog turtle crab lobster insect spider butterfly bee ant",
    );
    expect(keywords.length).toBeLessThanOrEqual(10);
  });

  test("should score original words higher", () => {
    const keywords = extractor.extract("happy cats");
    expect(keywords).toContain("happi");
    expect(keywords).toContain("cat");
  });

  test("should handle multi-word descriptions", () => {
    const keywords = extractor.extract(
      "a beautiful sunset over the ocean with birds flying",
    );
    expect(keywords.length).toBeGreaterThan(0);
    expect(keywords).toContain("beauti");
    expect(keywords).toContain("sunset");
    expect(keywords).toContain("ocean");
    expect(keywords).toContain("bird");
  });
});
