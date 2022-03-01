import add from "@/lib/add";

describe("testing app add", () => {
  it("should be 3", () => {
    expect(add(1, 2)).toBe(3);
  });
});
