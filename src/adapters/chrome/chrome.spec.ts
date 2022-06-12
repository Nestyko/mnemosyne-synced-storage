import { chromeStorageAdapter } from './chrome'

global.chrome = {
  storage: {
    sync: {
      get: jest.fn((key, callback) => callback(key)),
      set: jest.fn((items, callback) => callback(items)),
    },
  },
}

describe('chrome storage api', () => {
  const adapter = chromeStorageAdapter()
  it('should get the item through the api', () => {
    expect.assertions(1)
    return adapter.get('somekey').catch(() => {
      expect(chrome.storage.sync.get).toHaveBeenCalled()
    })
  })
  it('should set the item through the api', () => {
    expect.assertions(1)
    return adapter.set('somekey', 'value').then(() => {
      expect(chrome.storage.sync.set).toHaveBeenCalled()
    })
  })
})
