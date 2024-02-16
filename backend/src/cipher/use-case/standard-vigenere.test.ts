import { StandardVigenereUseCase } from "./standard-vigenere";

describe("Standard Vigenere Use Case", () => {
  const standardVigenereUseCase = new StandardVigenereUseCase();

  describe("encrypt method", () => {
    it("should return LVVQHZNGFHRVL", () => {
      expect(
        standardVigenereUseCase.encrypt({
          plainText: "thisplaintext",
          key: "sony",
        }).text
      ).toBe("LVVQHZNGFHRVL");
    });
  });

  describe("decrypt method", () => {
    it("should return THISPLAINTEXT", () => {
      expect(
        standardVigenereUseCase.decrypt({
          cipherText: "LVVQHZNGFHRVL",
          key: "sony",
        }).text
      ).toBe("THISPLAINTEXT");
    });
  });
});
