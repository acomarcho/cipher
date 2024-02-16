import { addCharacterByKey, subtractCharacterByKey } from ".";

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
