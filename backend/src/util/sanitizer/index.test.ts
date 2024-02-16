import { sanitizeInputAsAlphabetOnly } from ".";

describe("sanitizeInputAsAlphabetOnly function", () => {
  it("should return ABCabc", () => {
    expect(sanitizeInputAsAlphabetOnly("A B#!C   a12b34c")).toBe("ABCabc");
  });
});
