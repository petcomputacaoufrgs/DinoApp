import BaseLocalStorage from '../BaseLocalStorage'
import LS_Constants from '../../constants/LocalStorageKeysConstants'

class NoteColumnSyncLocalStorage extends BaseLocalStorage {
  getShouldSync = (): boolean => {
    const should = this.get(LS_Constants.NOTE_COLUMN_SHOULD_SYNC)

    if (should) {
      return JSON.parse(should)
    }

    return false
  }

  setShouldSync = (should: boolean) => {
    this.set(LS_Constants.NOTE_COLUMN_SHOULD_SYNC, JSON.stringify(should))
  }

  removeShouldSync = () => {
    this.remove(LS_Constants.NOTE_COLUMN_SHOULD_SYNC)
  }

  removeUserData = () => {
    this.removeShouldSync()
  }
}

export default new NoteColumnSyncLocalStorage()
