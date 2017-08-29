import "jasmine"
import * as js from "./inc.js"

describe("jasmine-ts", () => {

  it("should work with TypeScript files", () => {
    expect(true).toBe(true);
  });

  it("should parse --compilerOptions properly", () => {
    expect(js).toBe(true);
  })

});
