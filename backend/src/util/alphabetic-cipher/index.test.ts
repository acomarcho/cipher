import {
  addCharacterByKey,
  affineDecrypt,
  affineEncrypt,
  subtractCharacterByKey,
} from ".";

describe("addCharacterByKey fnuction", () => {
  it("should return D", () => {
    expect(addCharacterByKey("B", "C")).toBe("D");
  });

  it("should return B", () => {
    expect(addCharacterByKey("Z", "C")).toBe("B");
  });
});

describe("subtractCharacterByKey fnuction", () => {
  it("should return A", () => {
    expect(subtractCharacterByKey("B", "B")).toBe("A");
  });

  it("should return Y", () => {
    expect(subtractCharacterByKey("A", "C")).toBe("Y");
  });
});

describe("affineEncrypt fnuction", () => {
  it("should return C", () => {
    expect(affineEncrypt("K", { m: 7, b: 10 })).toBe("C");
  });

  it("should return Z", () => {
    expect(affineEncrypt("R", { m: 7, b: 10 })).toBe("Z");
  });
});

describe("affineDecrypt fnuction", () => {
  it("should return K", () => {
    expect(affineDecrypt("C", { m: 7, b: 10 })).toBe("K");
  });

  it("should return R", () => {
    expect(affineDecrypt("Z", { m: 7, b: 10 })).toBe("R");
  });
});
