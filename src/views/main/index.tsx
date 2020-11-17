import React, { useState } from 'react'
import { Switch } from 'react-router'
import { useCurrentLanguage } from '../../context_provider/app_settings'
import { ReactComponent as GlossarySVG } from '../../assets/icons/menu_icons/glossary.svg'
import { ReactComponent as ContactsSVG } from '../../assets/icons/menu_icons/phone.svg'
import { ReactComponent as HomeSVG } from '../../assets/icons/menu_icons/home.svg'
import { ReactComponent as NotesSVG } from '../../assets/icons/menu_icons/note.svg'
import { ReactComponent as FaqSVG } from '../../assets/icons/menu_icons/faq.svg'
import { ReactComponent as SettingsSVG } from '../../assets/icons/menu_icons/settings.svg'
import { ReactComponent as LogoutSVG } from '../../assets/icons/menu_icons/logout.svg'
import PathConstants from '../../constants/app/PathConstants'
import DrawerNavigation from '../../components/drawer_navigation'
import PrivateRoute from '../../components/private_route'
import GlossaryItem from './glossary/glossary_item'
import Glossary from './glossary'
import Contacts from './contacts'
import HistoryService from '../../services/history/HistoryService'
import Home from './home'
import Settings from './settings'
import LogoutDialog from '../../components/logout_dialog'
import Notes from './notes'
import NotFound from '../not_found/index'
import NoteContextProvider from '../../context_provider/note'
import FaqContextProvider from '../../context_provider/faq'
import GlossaryContextProvider from '../../context_provider/glossary'
import ContactsContextProvider from '../../context_provider/contact'
import Faq from './faq'
import MenuItemViewModel from '../../types/menu/MenuItemViewModel'
import Calendar from './calendar'
import AboutUs from './about'
import NoteColumnContextProvider from '../../context_provider/note_column'
import AuthService from '../../services/auth/AuthService'

const Main = (): JSX.Element => {
  const language = useCurrentLanguage()

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false)

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true)
  }

  const handleLogoutAgree = () => {
    AuthService.googleLogout()
  }

  const handleLogoutDisagree = () => {
    setOpenLogoutDialog(false)
  }

  const groupedItems: MenuItemViewModel[][] = [
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
        image: NotesSVG,
        name: language.MENU_ABOUT_US,
        onClick: () => HistoryService.push(PathConstants.ABOUT_US),
      },
    ],
    [
      {
        image: LogoutSVG,
        name: language.MENU_LOGOUT,
        onClick: handleLogoutClick,
      },
    ],
  ]

  const renderMainContent = (): JSX.Element => {
    return (
      <Switch>
        <PrivateRoute exact path={PathConstants.HOME} component={Home} />
        <PrivateRoute
          exact
          path={PathConstants.GAMES}
          component={() => <></>}
        />
        <PrivateRoute
          exact
          path={PathConstants.GLOSSARY}
          component={() => (
            <GlossaryContextProvider>
              <Glossary />
            </GlossaryContextProvider>
          )}
        />
        <PrivateRoute
          exact
          path={PathConstants.CONTACTS}
          component={() => (
            <ContactsContextProvider>
              <Contacts />
            </ContactsContextProvider>
          )}
        />
        <PrivateRoute
          exact
          path={PathConstants.NOTES}
          component={() => (
            <NoteColumnContextProvider>
              <NoteContextProvider>
                <Notes />
              </NoteContextProvider>
            </NoteColumnContextProvider>
          )}
        />
        <PrivateRoute
          exact
          path={PathConstants.SETTINGS}
          component={Settings}
        />
        <PrivateRoute
          path={`${PathConstants.GLOSSARY}/:id`}
          component={() => (
            <GlossaryContextProvider>
              <GlossaryItem />
            </GlossaryContextProvider>
          )}
        />
        <PrivateRoute
          path={PathConstants.FAQ}
          component={() => (
            <FaqContextProvider>
              <Faq />
            </FaqContextProvider>
          )}
        />
        <PrivateRoute
          path={PathConstants.ABOUT_US}
          component={() => (
            <AboutUs />
          )}
        />
        <PrivateRoute path={PathConstants.CALENDAR} component={Calendar} />
        <PrivateRoute path={'/'} component={NotFound} />
      </Switch>
    )
  }

  return (
    <>
      <DrawerNavigation
        groupedItems={groupedItems}
        component={renderMainContent()}
      />
      <LogoutDialog
        onAgree={handleLogoutAgree}
        onDisagree={handleLogoutDisagree}
        open={openLogoutDialog}
      />
    </>
  )
}

export default Main
