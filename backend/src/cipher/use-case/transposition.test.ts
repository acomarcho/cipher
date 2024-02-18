import { TranspositionUseCase } from "./transposition";

describe("TranspositionUseCase class", () => {
  const transpositionUseCase = new TranspositionUseCase();

  describe("divideStringByN method", () => {
    it("should return the correct array", () => {
      expect(
        transpositionUseCase.divideStringByN(
          "DEPARTEMENTEKNIKINFORMATIKAITB",
          6
        )
      ).toStrictEqual(["DEPART", "EMENTE", "KNIKIN", "FORMAT", "IKAITB"]);
    });
  });

  describe("transposeDividedStrings method", () => {
    it("should return the correct array", () => {
      expect(
        transpositionUseCase.transposeDividedStrings(["DEP", "EME", "ABC"])
      ).toStrictEqual([
        ["D", "E", "A"],
        ["E", "M", "B"],
        ["P", "E", "C"],
      ]);
    });
  });

  describe("encrypt method", () => {
    it("should return the DEKFIEMNOKPEIRAANKMIRTIATTENTB", () => {
      expect(
        transpositionUseCase.encrypt({
          plainText: "DEPARTEMENTEKNIKINFORMATIKAITB",
          key: 6,
        }).text
      ).toBe("DEKFIEMNOKPEIRAANKMIRTIATTENTB");
    });
  });

  describe("decrypt method", () => {
    it("should return the DEPARTEMENTEKNIKINFORMATIKAITB", () => {
      expect(
        transpositionUseCase.decrypt({
          cipherText: "DEKFIEMNOKPEIRAANKMIRTIATTENTB",
          key: 6,
        }).text
      ).toBe("DEPARTEMENTEKNIKINFORMATIKAITB");
    });
  });
});
