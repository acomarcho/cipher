import { StandardVigenereUseCase } from ".";

describe("Standard Vigenere Use Case", () => {
  const standardVigenereUseCase = new StandardVigenereUseCase();

  describe("isLowercaseAlphabet method", () => {
    it("should return true", () => {
      expect(standardVigenereUseCase.isLowercaseAlphabet("a")).toBe(true);
    });

    it("should return false", () => {
      expect(standardVigenereUseCase.isLowercaseAlphabet("A")).toBe(false);
    });
  });

  describe("isUppercaseAlphabet method", () => {
    it("should return true", () => {
      expect(standardVigenereUseCase.isUppercaseAlphabet("A")).toBe(true);
    });

    it("should return false", () => {
      expect(standardVigenereUseCase.isUppercaseAlphabet("a")).toBe(false);
    });
  });

  describe("addCharacterByKey method", () => {
    it("should return c", () => {
      expect(standardVigenereUseCase.addCharacterByKey("a", "b")).toBe("c");
    });

    it("should return B", () => {
      expect(standardVigenereUseCase.addCharacterByKey("Y", "C")).toBe("B");
    });
  });
});
