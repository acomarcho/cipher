import { HillUseCase } from "./hill";

describe("HillUseCase class", () => {
  const hillUseCase = new HillUseCase();

  describe("generateNGramsFromText method", () => {
    it("should return the correct n-grams", () => {
      expect(
        hillUseCase.generateNGramsFromText("PAYMOREMONEY", 3)
      ).toStrictEqual(["PAY", "MOR", "EMO", "NEY"]);
    });

    it("should return the correct n-grams", () => {
      expect(
        hillUseCase.generateNGramsFromText("PAYMOREMONEYZ", 3)
      ).toStrictEqual(["PAY", "MOR", "EMO", "NEY", "ZXX"]);
    });

    it("should return the correct n-grams", () => {
      expect(
        hillUseCase.generateNGramsFromText("PAYMOREMONEYZZ", 3)
      ).toStrictEqual(["PAY", "MOR", "EMO", "NEY", "ZZX"]);
    });
  });
});
