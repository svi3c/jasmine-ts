describe('--require with file', () => {
  it('should work', () => {
    expect(process.env.___REQUIRE_FILE_ENV___).toBe('req-value')
  })
})
