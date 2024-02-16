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

  describe("subtractCharacterByKey method", () => {
    it("should return y", () => {
      expect(standardVigenereUseCase.subtractCharacterByKey("a", "b")).toBe(
        "y"
      );
    });

    it("should return V", () => {
      expect(standardVigenereUseCase.subtractCharacterByKey("Y", "C")).toBe(
        "V"
      );
    });
  });

  describe("encrypt method", () => {
    it("should return LVVQHZNGFHRVL", () => {
      expect(
        standardVigenereUseCase.encrypt({
          plainText: "thisplaintext",
          key: "sony",
        })
      );
    });
  });

  describe("decrypt method", () => {
    it("should return THISPLAINTEXT", () => {
      expect(
        standardVigenereUseCase.encrypt({
          plainText: "LVVQHZNGFHRVL",
          key: "sony",
        })
      );
    });
  });
});
