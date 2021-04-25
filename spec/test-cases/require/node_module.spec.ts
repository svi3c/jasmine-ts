describe('--require with node_module', () => {
  it('should work', () => {
    expect(process.env.___DOT_ENV_PARAM___).toBe('true')
  })
})
