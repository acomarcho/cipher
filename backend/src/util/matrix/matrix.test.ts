import { adjoint } from "./matrix";

describe("adjoint function", () => {
  it("should return the correct adjoint matrix", () => {
    expect(
      adjoint([
        [3, 1, -6],
        [5, 2, -1],
        [-4, 3, 0],
      ])
    ).toStrictEqual([
      [3, -18, 11],
      [4, -24, -27],
      [23, -13, 1],
    ]);
  });
});
