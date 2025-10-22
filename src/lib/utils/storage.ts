class StorageClient {
  _storage: Storage

  constructor(type: 'local' | 'session') {
    if (typeof window !== 'undefined') {
      this._storage = type === 'local' ? window.localStorage : window.sessionStorage
    } else {
      // For SSR, use a dummy storage implementation
      this._storage = {
        getItem: () => null,
        setItem: () => {
          return null
        },
        removeItem: () => {
          return null
        },
        clear: () => {
          return null
        },
        key: () => null,
        length: 0
      }
    }
  }

  get(key: string) {
    const data: string | null = this._storage.getItem(key)

    if (data) return JSON.parse(data)

    return null
  }

  set(key: string, obj: any) {
    this._storage.setItem(key, JSON.stringify(obj))
  }

  remove(key: string) {
    this._storage.removeItem(key)
  }

  removeAll() {
    this._storage.clear()
  }
}

export default (type: 'local' | 'session' = 'local') => new StorageClient(type)
