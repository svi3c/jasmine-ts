describe('fail-fast', () => {
  it('should fail', () => {
    expect(true).toBeFalse()
  })

  it('should pass', () => {
    expect(true).toBeTrue()
  })
})
