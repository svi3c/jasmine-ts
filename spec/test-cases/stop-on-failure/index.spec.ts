describe('stop-on-failure', () => {
  let counter = 0;
  beforeEach(() => {
    if(counter === 0) {
      fail('fake-error')
      counter++;
    }
  })

  it('test case 1', () => {
    expect(true).toBeTrue()
  })

  it('test case 2', () => {
    expect(true).toBeTrue()
  })
})
