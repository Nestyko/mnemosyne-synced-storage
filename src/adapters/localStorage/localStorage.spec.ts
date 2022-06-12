import { localStorageAdapter } from './localStorage'

jest.spyOn(Storage.prototype, 'setItem')
jest.spyOn(Storage.prototype, 'getItem')

describe('localStorage Adapter', () => {
  const adapter = localStorageAdapter()

  it('should get the item from localStorage', () => {
    expect.assertions(1)
    return adapter.get('somekey').catch(() => {
      expect(localStorage.getItem).toHaveBeenCalled()
    })
  })
  it('should set the item to localStorage', () => {
    expect.assertions(1)
    return adapter.set('somekey', 'value').then(() => {
      expect(localStorage.setItem).toHaveBeenCalled()
    })
  })
})
