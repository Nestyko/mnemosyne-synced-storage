import { Adapter } from './storageAdapter'

const name = 'localStorageAdapter'

export const localStorageAdapter: () => Adapter<any> = () => ({
  name,
  isCompatible: () => typeof localStorage !== 'undefined' && !!localStorage,
  get: (key: string) =>
    new Promise((resolve, reject) => {
      const value = localStorage.getItem(key)
      if (value !== undefined && value !== null) {
        let parsedValue = value
        try {
          parsedValue = JSON.parse(value)
        } catch (e) {}
        return resolve(parsedValue)
      }
      return reject(`${name}: cannot find value for key "${key}"`)
    }),
  set: (key: string, value: any) =>
    new Promise(resolve => {
      const stringifiedValue = JSON.stringify(value)
      localStorage.setItem(key, stringifiedValue)
      resolve()
    }),
})
