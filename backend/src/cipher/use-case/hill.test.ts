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

  describe("convertNGramsToArray method", () => {
    it("should return [15, 0, 24]", () => {
      expect(hillUseCase.convertNGramsToArray("PAY")).toStrictEqual([
        15, 0, 24,
      ]);
    });
  });

  describe("encrypt method", () => {
    it("should return LNSHDLEWMTRW", () => {
      expect(
        hillUseCase.encrypt({
          plainText: "PAYMOREMONEY",
          key: [
            [17, 17, 5],
            [21, 18, 21],
            [2, 2, 19],
          ],
        }).text
      ).toBe("LNSHDLEWMTRW");
    });
  });

  describe("decrypt method", () => {
    it("should return PAYMOREMONEY", () => {
      expect(
        hillUseCase.decrypt({
          cipherText: "LNSHDLEWMTRW",
          key: [
            [17, 17, 5],
            [21, 18, 21],
            [2, 2, 19],
          ],
        }).text
      ).toBe("PAYMOREMONEY");
    });
  });
});
