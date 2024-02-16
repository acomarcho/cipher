import { PlayfairUseCase } from "./playfair";

describe("Playfair Use Case", () => {
  const playfairUseCase = new PlayfairUseCase();

  describe("generateMatrixKey method", () => {
    it("should return the correct matrix", () => {
      expect(
        playfairUseCase.generateKeyMatrix("JALANGANESHASEPULUH").matrix
      ).toStrictEqual([
        ["A", "L", "N", "G", "E"],
        ["S", "H", "P", "U", "B"],
        ["C", "D", "F", "I", "K"],
        ["M", "O", "Q", "R", "T"],
        ["V", "W", "X", "Y", "Z"],
      ]);
    });
  });

  describe("generateBigramsFromText method", () => {
    it("should return the correct bigrams", () => {
      expect(
        playfairUseCase.generateBigramsFromText("TEMUIIBUNANTIMALAM")
      ).toStrictEqual([
        "TE",
        "MU",
        "IX",
        "IB",
        "UN",
        "AN",
        "TI",
        "MA",
        "LA",
        "MX",
      ]);
    });

    describe("encrypt method", () => {
      it("should return the ciphertext", () => {
        expect(
          playfairUseCase.encrypt({
            plainText: "TEMUIIBUNANTIMALAM",
            key: "JALANGANESHASEPULUH",
          }).text
        ).toBe("ZBRSFYKUPGLGRKVSNLQV");
      });
    });
  });
});
