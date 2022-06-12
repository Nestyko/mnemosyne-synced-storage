import React, { useEffect } from 'react'
import { mount } from 'enzyme'
import { setUseStorage } from './useStorage'
import { MultiStorageAdapter } from './storageAdapters/storageAdapter'

jest.useFakeTimers()

describe('useSync', () => {
  class MockAdapter {
    state: any = {}
    constructor(defaultState: any) {
      this.state = defaultState
    }
    get = (key: string) => Promise.resolve(this.state[key])
    set = (key: string, value: any) => {
      this.state = { ...this.state, [key]: value }
      return Promise.resolve()
    }
    name = 'Mock Adapter'
    isCompatible = () => true
  }

  const ComonentThatTestsSync = () => {
    const mockAdapter = new MultiStorageAdapter([
      new MockAdapter({ myAweomeSyncVar: 'myValue' }),
    ])
    const useSync = setUseStorage(mockAdapter)
    const [storedVar, setVar] = useSync<string>(
      'myAweomeSyncVar',
      'default hook'
    )
    useEffect(() => {
      setTimeout(() => setVar('somethingElse'), 1000)
    }, [setVar])
    return <div>{storedVar}</div>
  }
  it('should call the method get and set', () => {
    const component = mount(<ComonentThatTestsSync />)
    expect(component.text()).toEqual('default hook')
    jest.runAllTimers()
    expect(component.text()).toEqual('somethingElse')
  })
})
