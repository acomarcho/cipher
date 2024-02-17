import { AffineUseCase } from "./affine";

describe("AffineUseCase class", () => {
  const affineUseCase = new AffineUseCase();

  describe("encrypt method", () => {
    it("should return CZOLNE", () => {
      expect(
        affineUseCase.encrypt({ plainText: "KRIPTO", key: { m: 7, b: 10 } })
          .text
      ).toBe("CZOLNE");
    });
  });

  describe("decrypt method", () => {
    it("should return KRIPTO", () => {
      expect(
        affineUseCase.decrypt({ cipherText: "CZOLNE", key: { m: 7, b: 10 } })
          .text
      ).toBe("KRIPTO");
    });
  });
});
