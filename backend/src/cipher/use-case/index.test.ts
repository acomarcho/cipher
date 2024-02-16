import { AutoKeyVigenereUseCase, StandardVigenereUseCase } from ".";

describe("Standard Vigenere Use Case", () => {
  const standardVigenereUseCase = new StandardVigenereUseCase();

  describe("encrypt method", () => {
    it("should return LVVQHZNGFHRVL", () => {
      expect(
        standardVigenereUseCase.encrypt({
          plainText: "thisplaintext",
          key: "sony",
        })
      ).toBe("LVVQHZNGFHRVL");
    });
  });

  describe("decrypt method", () => {
    it("should return THISPLAINTEXT", () => {
      expect(
        standardVigenereUseCase.decrypt({
          cipherText: "LVVQHZNGFHRVL",
          key: "sony",
        })
      ).toBe("THISPLAINTEXT");
    });
  });
});

describe("Auto Key Vigenere Use Case", () => {
  const autoKeyVigenereUseCase = new AutoKeyVigenereUseCase();

  describe("generateAutoKeyForEncryption method", () => {
    it("should return INDONEGARAPENGHASILMINYAKMENTAHDID", () => {
      expect(
        autoKeyVigenereUseCase.generateAutoKeyForEncryption(
          "negarapenghasilminyakmentahdidunia",
          "INDO"
        )
      ).toBe("INDONEGARAPENGHASILMINYAKMENTAHDID");
    });
  });

  describe("generateAutoKeyForDecryption method", () => {
    it("should return INDONEGARAPENGHASILMINYAKMENTAHDID", () => {
      expect(
        autoKeyVigenereUseCase.generateAutoKeyForDecryption(
          "VRJOEEVEEGWEFOSMAVJMSZCNDMLQBDBQQD",
          "INDO"
        )
      ).toBe("INDONEGARAPENGHASILMINYAKMENTAHDID");
    });
  });

  describe("encrypt method", () => {
    it("should return VRJOEEVEEGWEFOSMAVJMSZCNDMLQBDBQQD", () => {
      expect(
        autoKeyVigenereUseCase.encrypt({
          plainText: "negarapenghasilminyakmentahdidunia",
          key: "INDO",
        })
      ).toBe("VRJOEEVEEGWEFOSMAVJMSZCNDMLQBDBQQD");
    });
  });

  describe("decrypt method", () => {
    it("should return NEGARAPENGHASILMINYAKMENTAHDIDUNIA", () => {
      expect(
        autoKeyVigenereUseCase.decrypt({
          cipherText: "VRJOEEVEEGWEFOSMAVJMSZCNDMLQBDBQQD",
          key: "INDO",
        })
      ).toBe("NEGARAPENGHASILMINYAKMENTAHDIDUNIA");
    });
  });
});
