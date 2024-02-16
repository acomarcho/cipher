import { PlayfairUseCase } from "./playfair";

describe("Playfair Use Case", () => {
  const playfairUseCase = new PlayfairUseCase();

  describe("generateMatrixKey method", () => {
    it("should return the correct matrix", () => {
      expect(
        playfairUseCase.generateKeyMatrix("JALANGANESHASEPULUH")
      ).toStrictEqual([
        ["A", "L", "N", "G", "E"],
        ["S", "H", "P", "U", "B"],
        ["C", "D", "F", "I", "K"],
        ["M", "O", "Q", "R", "T"],
        ["V", "W", "X", "Y", "Z"],
      ]);
    });
  });
});
