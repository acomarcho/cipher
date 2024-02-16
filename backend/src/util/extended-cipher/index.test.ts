import { addCharacterByKey, subtractCharacterByKey } from ".";

describe("addCharacterByKey fnuction", () => {
  it("should return character with ordinal code 240", () => {
    expect(
      addCharacterByKey(String.fromCharCode(230), String.fromCharCode(10))
    ).toBe(String.fromCharCode(240));
  });

  it("should return character with ordinal code 2", () => {
    expect(
      addCharacterByKey(String.fromCharCode(230), String.fromCharCode(28))
    ).toBe(String.fromCharCode(2));
  });
});

describe("subtractCharacterByKey fnuction", () => {
  it("should return character with ordinal code 240", () => {
    expect(
      subtractCharacterByKey(String.fromCharCode(250), String.fromCharCode(10))
    ).toBe(String.fromCharCode(240));
  });

  it("should return character with ordinal code 255", () => {
    expect(
      subtractCharacterByKey(String.fromCharCode(0), String.fromCharCode(1))
    ).toBe(String.fromCharCode(255));
  });
});
