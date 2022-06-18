import React from 'react'
import { Adapter } from '../../storageAdapter'
import { MnemosyneContext } from './Context'

export const MnemosyneProvider: React.FC<{
  adapter: Adapter<any>
  children: any
}> = ({ adapter, children }) => {
  const Context = MnemosyneContext
  return <Context.Provider value={adapter}>{children}</Context.Provider>
}
