import { resolveFIFOAndBreak } from './utils/resolveUtils'

export type Adapter<T> = {
  get: (key: string) => Promise<T>
  set: (key: string, value: T) => Promise<T>
  name?: string
  isCompatible: () => boolean
}

export type AdapterOptions = {
  debug?: boolean
  storeType?: 'string' | 'array' | 'obj' | 'boolean'
}

export class MultiStorageAdapter {
  adapters: Adapter<any>[] = []
  constructor(adapters: Adapter<any>[]) {
    this.adapters = adapters.filter(a => a.isCompatible())
    if (process.env.NODE_ENV !== 'production') {
      adapters
        .filter(a => !a.isCompatible())
        .map(({ name }) => {
          console.warn(
            `Adapter "${name}" is not compatible, so it is not being used.`
          )
          return null
        })
    }
  }
  isCompatible = () =>
    !!this.adapters && this.adapters.filter(a => a.isCompatible()).length > 0
  get = (key: string) => resolveFIFOAndBreak(this.adapters.map(a => a.get(key)))
  set = (key: string, value: any) =>
    Promise.allSettled(this.adapters.map(a => a.set(key, value))).then(
      result => {
        result.map(({ status }, i) => {
          if (status === 'rejected') {
            console.warn(
              `Adapter ${this.adapters[i].name}: error on method set()`,
              {
                key,
                value,
                adapter: this.adapters[i],
              }
            )
          }
          return null
        })
        return result
      }
    )
}
