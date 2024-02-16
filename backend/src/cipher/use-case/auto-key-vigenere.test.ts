import { AutoKeyVigenereUseCase } from "./auto-key-vigenere";

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
        }).text
      ).toBe("VRJOEEVEEGWEFOSMAVJMSZCNDMLQBDBQQD");
    });
  });

  describe("decrypt method", () => {
    it("should return NEGARAPENGHASILMINYAKMENTAHDIDUNIA", () => {
      expect(
        autoKeyVigenereUseCase.decrypt({
          cipherText: "VRJOEEVEEGWEFOSMAVJMSZCNDMLQBDBQQD",
          key: "INDO",
        }).text
      ).toBe("NEGARAPENGHASILMINYAKMENTAHDIDUNIA");
    });
  });
});
