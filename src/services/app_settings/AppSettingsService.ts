import DinoAPIURLConstants from '../../constants/dino_api/DinoAPIURLConstants'
import AppSettingsLocalStorage from './local_storage/AppSettingsLocalStorage'
import AppSettingsModel from '../../types/app_settings/AppSettingsModel'
import DinoAgentService from '../dino_agent/DinoAgentService'
import DinoAgentStatus from '../../types/dino_agent/DinoAgentStatus'
import AppSettingsResponseModel from '../../types/app_settings/AppSettingsResponseModel'
import LanguageSubProviderValue from '../../provider/app_settings_provider/language_provider/value'
import LanguageBase from '../../types/languages/LanguageBase'
import LanguageCodeConstants from '../../constants/LanguageCodeConstants'
import PT_BR from '../../types/languages/PT_BR'
import EN_US from '../../types/languages/EN_US'
import AppSettingsContextUpdater from './AppSettingsContextUpdater'

class AppSettingsService {
  languageContext?: LanguageSubProviderValue

  listenner = {}

  start = (languageContext: LanguageSubProviderValue) => {
    this.languageContext = languageContext
  }

  get = (): AppSettingsModel => {
    const savedVersion = AppSettingsLocalStorage.getAppSettingsVersion()

    const savedAppSettings = AppSettingsLocalStorage.getAppSettings()

    if (savedVersion !== 0) {
      if (savedAppSettings) {
        return savedAppSettings
      }
    }

    return savedAppSettings ? savedAppSettings : this.getDefaultAppSettings()
  }

  set = (appSettings: AppSettingsModel) => {
    this.updateLocalAppSettings(appSettings)

    this.saveOnServer(appSettings)
  }

  update = async (newVersion: number) => {
    const savedVersion = this.getVersion()

    if (newVersion !== savedVersion) {
      const appSettings = await this.getServer()

      if (appSettings) {
        AppSettingsLocalStorage.setAppSettingsVersion(newVersion)
        this.updateLocalAppSettings(appSettings)

        if (this.languageContext) {
          this.languageContext.updateLanguage()
        }
      } else {
        this.setShouldSync(true)
      }
    }
  }

  getVersion = (): number => AppSettingsLocalStorage.getAppSettingsVersion()

  getServerVersion = async (): Promise<number | undefined> => {
    const request = DinoAgentService.get(
      DinoAPIURLConstants.APP_SETTINGS_VERSION
    )

    if (request.status === DinoAgentStatus.OK) {
      try {
        const response = await request.get()
        const version: number = response.body

        return version
      } catch {
        /**TO-DO Fazer log do erro */
      }
    }

    return undefined
  }

  getServer = async (): Promise<AppSettingsResponseModel | undefined> => {
    const request = DinoAgentService.get(DinoAPIURLConstants.APP_SETTINGS_GET)

    if (request.status === DinoAgentStatus.OK) {
      try {
        const response = await request.get()

        const appSettings: AppSettingsResponseModel = response.body

        return appSettings
      } catch {
        /**TO-DO Fazer log do erro */
      }
    }

    return undefined
  }

  removeUserData = () => {
    AppSettingsLocalStorage.removeUserData()
  }

  getDefaultAppSettings = (): AppSettingsModel => {
    const defaultAppSettings: AppSettingsModel = {
      language: navigator.language,
    }

    return defaultAppSettings
  }

  shouldSync = (): boolean => AppSettingsLocalStorage.getShouldSync()

  setShouldSync = (should: boolean) => {
    AppSettingsLocalStorage.setShouldSync(should)
  }

  saveOnServer = async (model: AppSettingsModel): Promise<void> => {
    const request = DinoAgentService.post(DinoAPIURLConstants.APP_SETTINGS_SAVE)

    if (request.status === DinoAgentStatus.OK) {
      try {
        const response = await request.get().send(model)
        const newVersion = response.body

        AppSettingsLocalStorage.setAppSettingsVersion(newVersion)

        return
      } catch {
        /**TO-DO Fazer log do erro */
      }
    }

    AppSettingsLocalStorage.setShouldSync(true)
  }

  getLanguageBase = (): LanguageBase => {
    const language = this.get().language

    return this.getLanguageBaseByCode(language)
  }

  private updateLocalAppSettings = (appSettings: AppSettingsModel) => {
    AppSettingsLocalStorage.setAppSettings(appSettings)
    AppSettingsContextUpdater.update()
  }

  private getLanguageBaseByCode = (languageCode: string): LanguageBase => {
    if (languageCode === LanguageCodeConstants.PORTUGUESE) {
      return new PT_BR()
    } else {
      return new EN_US()
    }
  }
}

export default new AppSettingsService()
