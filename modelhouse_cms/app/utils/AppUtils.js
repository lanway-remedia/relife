import { StorageKeyConstants } from '../constants'

export default class AppUtils {
    static login(history, token, pathname='/') {
        localStorage.setItem(StorageKeyConstants.TOKEN, token)
        history.push(pathname)
    }

    static logout(history) {
        localStorage.removeItem(StorageKeyConstants.TOKEN)
        history.push('/login')
    }
}
