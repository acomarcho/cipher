import { modulo } from ".";

describe("modulo function", () => {
  it("should return 1", () => {
    expect(modulo(6, 5)).toBe(1);
  });

  it("should return 2", () => {
    expect(modulo(-3, 5)).toBe(2);
  });
});
