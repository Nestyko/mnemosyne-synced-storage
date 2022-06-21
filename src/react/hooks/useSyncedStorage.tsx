import React from 'react'
import { Adapter } from '../../storageAdapter'
import { useEffect, useState, useCallback, useContext } from 'react'
import MnemosyneContext from '../components/Context'

export const createUseSyncedStorageHook: (
  adpter: Adapter<any>
) => <T>(key: string, defaultValue: T) => [T, (value: T) => void] =
  adapter => (key, defaultValue) => {
    const [value, setValue] = useState(defaultValue)
    const customSetValue = useCallback(
      (newValue: any) => {
        setValue(newValue)
        adapter.set(key, newValue).then(() => void 0)
      },
      [key]
    )
    useEffect(() => {
      adapter.get(key).then((savedValue: any) => {
        if (savedValue) {
          customSetValue(savedValue)
        }
      })
    }, [customSetValue, key])

    return [value, customSetValue]
  }

type UseSyncedStorageParams<T> = {
  key: string
  defaultValue: T
}

export const useSyncedStorage = <T,>({
  key,
  defaultValue,
}: UseSyncedStorageParams<T>): [T, (value: T) => void] => {
  const adapter = useContext(MnemosyneContext) as Adapter<T>
  const [value, setValue] = useState<T>(defaultValue)
  const customSetValue = useCallback(
    (newValue: any) => {
      setValue(newValue)
      adapter.set(key, newValue).then(() => void 0)
    },
    [key]
  )
  useEffect(() => {
    adapter.get(key).then((savedValue: any) => {
      if (savedValue) {
        customSetValue(savedValue)
      }
    })
  }, [customSetValue, key])

  return [value, customSetValue]
}
