import LS_Constants from '../../../constants/LocalStorageKeysConstants'
import BaseLocalStorage from '../../../types/services/BaseLocalStorage'
import GlossaryItemModel from '../../../types/glossary/GlossaryItemModel'

class GlossaryLocalStorage extends BaseLocalStorage {
  getItems = (): Array<GlossaryItemModel> => {
    let items = this.get(LS_Constants.GLOSSARY_ITEMS)

    return items ? JSON.parse(items) : new Array<GlossaryItemModel>()
  }

  setItems = (items: GlossaryItemModel[]) => {
    this.set(LS_Constants.GLOSSARY_ITEMS, JSON.stringify(items))
  }

  removeItems = () => {
    this.remove(LS_Constants.GLOSSARY_ITEMS)
  }

  getVersion = (): number => {
    let version = this.get(LS_Constants.GLOSSARY_VERSION)

    return version ? Number(version) : -1
  }

  setVersion = (version: number) => {
    this.set(LS_Constants.GLOSSARY_VERSION, JSON.stringify(version))
  }

  removeVersion = () => {
    this.remove(LS_Constants.GLOSSARY_VERSION)
  }

  removeUserData = () => {
    this.removeItems()
    this.removeVersion()
  }
}

export default new GlossaryLocalStorage()
