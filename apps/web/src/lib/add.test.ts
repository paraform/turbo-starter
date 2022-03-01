import add from "@/lib/add";

describe("testing web add", () => {
  it("should be 4", () => {
    expect(add(2, 2)).toBe(4);
  });
});
