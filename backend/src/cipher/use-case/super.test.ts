import { SuperUseCase } from "./super";

describe("SuperUseCase class", () => {
  const superUseCase = new SuperUseCase();

  describe("encrypt method", () => {
    it("should return the correct encryption", () => {
      expect(
        superUseCase.encrypt({
          plainText: "HALOHALOBANDUNG",
          key: {
            vigenere: "ABCD",
            transposition: 4,
          },
        }).base64
      ).toBe("iYmDloODg5CPj5GKk5OIWA==");
    });
  });

  describe("decrypt method", () => {
    it("should return the correct decryption", () => {
      expect(
        superUseCase.decrypt({
          cipherText: atob("iYmDloODg5CPj5GKk5OIWA=="),
          key: {
            vigenere: "ABCD",
            transposition: 4,
          },
        }).text
      ).toContain("HALOHALOBANDUNG");
    });
  });
});
