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
});
