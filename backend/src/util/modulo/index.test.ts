import { modulo, moduloInverse } from ".";

describe("modulo function", () => {
  it("should return 1", () => {
    expect(modulo(6, 5)).toBe(1);
  });

  it("should return 2", () => {
    expect(modulo(-3, 5)).toBe(2);
  });
});

describe("moduloInverse function", () => {
  it("should return 7", () => {
    expect(moduloInverse(25, 87)).toBe(7);
  });

  it("should return 62", () => {
    expect(moduloInverse(-7, 87)).toBe(62);
  });
});
