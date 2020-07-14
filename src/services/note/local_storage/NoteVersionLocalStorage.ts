import LS_Constants from '../../../constants/LocalStorageKeysConstants'
import BaseLocalStorage from '../../../types/services/BaseLocalStorage'

class NoteVersionLocalStorage extends BaseLocalStorage {
  getVersion = (): number => {
    const version = this.get(LS_Constants.NOTE_VERSION)

    if (version) {
      return JSON.parse(version)
    }

    return -1
  }

  setVersion = (version: number) => {
    this.set(LS_Constants.NOTE_VERSION, JSON.stringify(version))
  }

  removeVersion = () => {
    this.remove(LS_Constants.NOTE_VERSION)
  }
}

export default new NoteVersionLocalStorage()
