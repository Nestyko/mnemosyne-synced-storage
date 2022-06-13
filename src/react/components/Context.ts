import { createContext } from 'react'
import { Adapter } from '../../storageAdapter'

export const MnemosyneContext = /*#__PURE__*/ createContext<Adapter<any>>(
  null as any
)

if (process.env.NODE_ENV !== 'production') {
  MnemosyneContext.displayName = 'MnemosyneContext'
}

export default MnemosyneContext
