import { resolveFIFOAndBreak } from './resolveUtils'
describe('resolveFIFOAndBreak', () => {
  it('should resolve the first successful', () => {
    const adapters = [
      Promise.reject('awful adapter'),
      Promise.reject('sometimes I fail'),
      Promise.resolve('yay'),
      Promise.resolve('just in case'),
    ]
    expect.assertions(1)
    return resolveFIFOAndBreak(adapters).then(result =>
      expect(result).toEqual('yay')
    )
  })

  it('should reject if all rejected', () => {
    const adapters = [
      Promise.reject('awful adapter'),
      Promise.reject('sometimes I fail'),
      Promise.reject('ouch'),
    ]
    expect.assertions(1)
    return resolveFIFOAndBreak(adapters).catch(error => {
      expect(error).toEqual('ouch')
    })
  })
})
