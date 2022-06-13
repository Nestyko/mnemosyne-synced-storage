# mnemosyne-synced-storage

This library helps storing data in between different providers and keeping them in sync. For example: you can keep data in sync between the url parameters, localStorage, and browser cache.

### Instalation

```bash
npm i --save mnemosyne-synced-storage
```

```bash
yarn add mnemosyne-synced-storage
```


## Getting Started

### React

```tsx
// App.tsx
import {MultiStorageAdapter} from 'mnemosyne-synced-storage'
import {urlParamsAdapter, chromeStorageAdapter, localStorageAdapter} from 'mnemosyne-synced-storage/adapters'
import {MnemosyneProvider} from 'mnemosyne-synced-storage/react'

const App = () => {
  const storageAdapter = new MultiStorageAdapter([
    urlParamsAdapter(),
    chromeStorageAdapter(),
    localStorageAdapter(),
  ])
  
  return (
   <MnemosyneProvider adapter={storageAdapter}>
    <MyComponent />
   </MnemosyneProvider> 
  )
}
```

```tsx
// MyComponent.tsx
import {useSyncedStorage} from 'mnemosyne-synced-storage/react'

const MyComponent = () => {
    // use it just like "useState"
    const [userId, setUserId] = useSyncedStorage<string>({key: 'user-id', defaultValue: null})
    const handleUserIdChange = (e) => setUserId(e.target.value)
    return (
        <input onChange={handleUserIdChange} name="user-id" />
    )
}
```

### Vanilla

```ts
import {MultiStorageAdapter} from 'mnemosyne-synced-storage'
import {urlParamsAdapter, chromeStorageAdapter, localStorageAdapter} from 'mnemosyne-synced-storage/adapters'

const storageAdapter = new MultiStorageAdapter([
    urlParamsAdapter(),
    chromeStorageAdapter(),
    localStorageAdapter(),
  ])
  
storageAdapter.set('user-id', '123')

const userId = storageAdapter.get('user-id')

```


### Order of storage

For the MultistorageAdapter: 

* it will first try to get data from the first adapter and then the next one, if none of it has data then it will return null.
* If one of the storage types has data then it will return the first one it encounters, in the example above it will try to get first data from the url and then from chrome cache and then from localStorage.

