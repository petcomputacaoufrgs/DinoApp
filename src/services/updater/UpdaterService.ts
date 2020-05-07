import LanguageSubProviderValue from '../../provider/app_provider/language_sub_provider/value'
import AuthService from '../auth/AuthService'
import GlossaryUpdater from '../glossary/GlossaryUpdater'
import NoteUpdater from '../note/NoteUpdater'
import AppSettingsUpdater from '../app_settings/AppSettingsUpdater'
import BaseUpdater from '../BaseUpdater'

class UpdaterService implements BaseUpdater {
  checkUpdates = async (languageContext?: LanguageSubProviderValue) => {
    if (AuthService.isAuthenticated()) {
      GlossaryUpdater.checkUpdates()
      NoteUpdater.checkUpdates()
      AppSettingsUpdater.checkUpdates(languageContext)
    }
  }
}

export default new UpdaterService()
