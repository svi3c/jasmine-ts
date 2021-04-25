interface testInterface {
  prop1: string;
}

describe('simple-ts-file', () => {
  it('should work', () => {
    const testInstance: testInterface = {
      prop1: 1
    }

    expect(testInstance.prop1).toBe(1)
  })
})
