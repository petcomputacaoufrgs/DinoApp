import React, { useContext } from 'react'
import { useLocation, Switch } from 'react-router'
import { LanguageContext } from '../../components/language_provider'
import GlossarySVG from '../../images/glossary.svg'
import ContactsSVG from '../../images/phone.svg'
import GamesSVG from '../../images/games.svg'
import HomeSVG from '../../images/home.svg'
import NotesSVG from '../../images/note.svg'
import SettingsSVG from '../../images/settings.svg'
import LogoutSVG from '../../images/logout.svg'
import AdaptableMenu from '../../components/adaptable_menu'
import PathConstants from '../../constants/PathConstants'
import PrivateRoute from '../../components/private_route'
import GlossaryItem from '../../components/glossary/glossary_item'
import Glossary from '../../components/glossary'
import Contacts from '../../components/contacts'
import TopBar from '../../components/top_bar'
import HistoryService from '../../services/HistoryService'
import Home from './home'
import Settings from './settings'
import LogoutDialog from '../../components/logout_dialog'
import MenuItemViewModel from '../../model/view/MenuItemViewModel'
import Notes from './notes'

/**
 * @description Tela principal da aplicação
 * @returns Elemento JSX com a tela principal do aplicativo
 **/
const Main = (): JSX.Element => {

    const location = useLocation()

    const languageContext = useContext(LanguageContext)

    const language = languageContext.currentLanguage

    /**
     * @description Função chamada quando seu item for selecionado no menu
     */
    const goToHome = () => {
        HistoryService.push(PathConstants.HOME)
    }

    /**
     * @description Função chamada quando seu item for selecionado no menu
     */
    const goToGames = () => {
        HistoryService.push(PathConstants.GAMES)
    }

    /**
     * @description Função chamada quando seu item for selecionado no menu
     */
    const goToGlossary = () => {
        HistoryService.push(PathConstants.GLOSSARY)
    }

    /**
     * @description Função chamada quando seu item for selecionado no menu
     */
    const goToSettings = () => {
        HistoryService.push(PathConstants.SETTINGS)
    }

    const [LogoutDialogElement, showLogoutDialog] = LogoutDialog()

    /** Itens do menu */
    const groupedItems: MenuItemViewModel[][] = [
        [
            {
                'image': HomeSVG,
                'name': language.MENU_HOME,
                'onClick': () =>  HistoryService.push(PathConstants.HOME),
            },
            {
                'image': GamesSVG,
                'name': language.MENU_GAMES,
                'onClick': () => HistoryService.push(PathConstants.GAMES),
            },
            {
                'image': GlossarySVG,
                'name': language.MENU_GLOSSARY,
                'onClick': goToGlossary,
            },
            {
                'image': ContactsSVG,
                'name': language.MENU_CONTACTS,
                'onClick':  () => HistoryService.push(PathConstants.CONTACTS),
            }
        ],
        [
            {
                'image': NotesSVG,
                'name': language.MENU_NOTES,
                'onClick': () => HistoryService.push(PathConstants.NOTES),    
            },
        ],
        [
            {
                'image': SettingsSVG,
                'name': language.MENU_SETTINGS,
                'onClick': () => HistoryService.push(PathConstants.SETTINGS),
            },
        ],
        [
            {
                'image': LogoutSVG,
                'name': language.MENU_LOGOUT,
                'onClick': showLogoutDialog,            
            },
        ]
    ]

    const getSelectedItem = (): number => {
        if (location.pathname === PathConstants.GAMES) {
            return 1
        } else if (location.pathname.includes(PathConstants.GLOSSARY)) {
            return 2
        } else if (location.pathname.includes(PathConstants.CONTACTS)) {
            return 3
        } else if (location.pathname === PathConstants.HOME) {
            return 0
        } else {
            return -1
        }
    }

    const renderMainContent = (): JSX.Element => {
        return (
            <Switch>
                <PrivateRoute exact path={PathConstants.HOME} component={Home} />
                <PrivateRoute exact path={PathConstants.GAMES} component={() => <></>} />
                <PrivateRoute exact path={PathConstants.GLOSSARY} component={Glossary} />
                <PrivateRoute exact path={PathConstants.CONTACTS} component={Contacts} />
                <PrivateRoute exact path={PathConstants.GAMES} component={() => <></>} />
                <PrivateRoute exact path={PathConstants.SETTINGS} component={Settings} />
                <PrivateRoute exact path={PathConstants.NOTES} component={Notes} /> 
                <PrivateRoute path={`${PathConstants.GLOSSARY}/:id`} component={GlossaryItem} />
            </Switch>
        )
    }

    return (
        <>
            <AdaptableMenu
                selectedItem={getSelectedItem()}
                groupedItems={groupedItems}
                component={renderMainContent()}
                topBarComponent={<TopBar />}
            />
            <LogoutDialogElement />
        </>
    )
}

export default Main