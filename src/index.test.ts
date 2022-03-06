import { getTrue } from './index'

describe('some-test', () => {
  let foo: boolean

  beforeEach(() => {
    foo = getTrue()
  })

  test('it should work', () => {
    expect(foo).toBeTruthy()
  })
})
