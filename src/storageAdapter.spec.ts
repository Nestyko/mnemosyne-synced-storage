import { MultiStorageAdapter, Adapter } from './storageAdapter'

describe('storageAdapter', () => {
  const failingAdapter: Adapter<string> = {
    get: jest.fn(key => Promise.reject('failing adapter')),
    set: jest.fn(key => Promise.reject('failing adapter')),
    name: 'Failing Adapter',
    isCompatible: () => true,
  }
  const workingAdapter: Adapter<string> = {
    get: jest.fn((key: string) => Promise.resolve('working')),
    set: jest.fn((key: string, value: string) => Promise.resolve(value)),
    name: 'Working Adapter',
    isCompatible: () => true,
  }
  it('should try to set to all adapters', () => {
    expect.assertions(2)
    const driver = new MultiStorageAdapter([failingAdapter, workingAdapter])
    return driver.set('something', 'else').then(() => {
      expect(workingAdapter.set).toHaveBeenCalledWith('something', 'else')
      expect(failingAdapter.set).toHaveBeenCalledWith('something', 'else')
    })
  })
  it('should get from all adapters until it gets from one', () => {
    expect.assertions(3)
    const driver = new MultiStorageAdapter([failingAdapter, workingAdapter])
    return driver.get('something').then(result => {
      expect(workingAdapter.get).toHaveBeenCalledWith('something')
      expect(failingAdapter.get).toHaveBeenCalledWith('something')
      expect(result).toEqual('working')
    })
  })
})
