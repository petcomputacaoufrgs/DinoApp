import MenuItemViewModel from "../../types/menu/MenuItemViewModel"
import { ReactComponent as GlossarySVG } from '../../assets/icons/menu_icons/glossary.svg'
import { ReactComponent as ContactsSVG } from '../../assets/icons/menu_icons/phone.svg'
import { ReactComponent as HomeSVG } from '../../assets/icons/menu_icons/home.svg'
import { ReactComponent as NotesSVG } from '../../assets/icons/menu_icons/note.svg'
import { ReactComponent as FaqSVG } from '../../assets/icons/menu_icons/faq.svg'
import { ReactComponent as SettingsSVG } from '../../assets/icons/menu_icons/settings.svg'
import { ReactComponent as AboutUsSVG } from '../../assets/icons/menu_icons/about_us.svg'
import { ReactComponent as LogoutSVG } from '../../assets/icons/menu_icons/logout.svg'
import LanguageBase from "../../constants/languages/LanguageBase"
import HistoryService from "../history/HistoryService"
import PathConstants from "../../constants/app/PathConstants"

class MenuService {
    getMainPages = (language: LanguageBase): MenuItemViewModel[] => (
        [
            {
                image: HomeSVG,
                name: language.MENU_HOME,
                onClick: () => HistoryService.push(PathConstants.HOME),
            },
            {
                image: GlossarySVG,
                name: language.MENU_GLOSSARY,
                onClick: () => HistoryService.push(PathConstants.GLOSSARY),
            },
            {
                image: ContactsSVG,
                name: language.MENU_CONTACTS,
                onClick: () => HistoryService.push(PathConstants.CONTACTS),
            },
            {
                image: NotesSVG,
                name: language.MENU_NOTES,
                onClick: () => HistoryService.push(PathConstants.NOTES),
            },
            {
                image: FaqSVG,
                name: language.MENU_FAQ,
                onClick: () => HistoryService.push(PathConstants.FAQ),
            },
            {
                image: SettingsSVG,
                name: language.MENU_SETTINGS,
                onClick: () => HistoryService.push(PathConstants.SETTINGS),
            },
            {
                image: AboutUsSVG,
                name: language.MENU_ABOUT_US,
                onClick: () => HistoryService.push(PathConstants.ABOUT_US),
            },
        ]
    )

    getGroupedMenuItems = (language: LanguageBase, handleLogoutClick: () => void): MenuItemViewModel[][] => (
        [
            this.getMainPages(language),
            [
                {
                    image: LogoutSVG,
                    name: language.MENU_LOGOUT,
                    onClick: handleLogoutClick,
                },
            ],
        ]
    )
}

export default new MenuService()