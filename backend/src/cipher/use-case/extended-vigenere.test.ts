import { ExtendedVigenereUseCase } from "./extended-vigenere";

describe("Extended Vigenere Use Case", () => {
  const extendedVigenereUseCase = new ExtendedVigenereUseCase();

  describe("encrypt method", () => {
    it("should return luPW4uaP3uXU2NyZ59Tm7ZQ=", () => {
      expect(
        extendedVigenereUseCase.encrypt({
          plainText: "#this plain text!",
          key: "sony",
        }).base64
      ).toBe("luPW4uaP3uXU2NyZ59Tm7ZQ=");
    });
  });

  describe("decrypt method", () => {
    it("should return #this plain text!", () => {
      expect(
        atob(
          extendedVigenereUseCase.decrypt({
            cipherText: atob("luPW4uaP3uXU2NyZ59Tm7ZQ="),
            key: "sony",
          }).base64
        )
      ).toBe("#this plain text!");
    });
  });
});
