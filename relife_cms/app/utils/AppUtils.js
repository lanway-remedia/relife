import { StorageKeyConstants } from '../constants'

export default class AppUtils {
  static login(history, token, group, store, pathname = '/') {
    localStorage.setItem(StorageKeyConstants.TOKEN, token)
    localStorage.setItem(StorageKeyConstants.GROUP, group)
    localStorage.setItem(StorageKeyConstants.STORE, store)
    history.push(pathname)
  }

  static logout(history) {
    localStorage.removeItem(StorageKeyConstants.TOKEN)
    localStorage.removeItem(StorageKeyConstants.GROUP)
    localStorage.removeItem(StorageKeyConstants.STORE)
    history.push('/login')
  }
}
