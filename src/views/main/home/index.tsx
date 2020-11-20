import React from 'react'
import { useCurrentLanguage } from '../../../context_provider/app_settings'
import { ListItem, Paper } from '@material-ui/core'
import PathConstants from '../../../constants/app/PathConstants'
import HistoryService from '../../../services/history/HistoryService'
import HomeItemProps from './props'
import './styles.css'
import { useGoogleOAuth2 } from '../../../context_provider/google_oauth2'
import GoogleOAuth2Service from '../../../services/auth/google/GoogleOAuth2Service'

const Home = () => {
  const language = useCurrentLanguage()
  const googleOAuth2 = useGoogleOAuth2()

  const items: HomeItemProps[] = [
    { class: '__n', label: language.MENU_NOTES, path: PathConstants.NOTES,},
    { class: '__c', label: language.MENU_CONTACTS, path: PathConstants.CONTACTS, },
    { class: '__g', label: language.MENU_GLOSSARY, path: PathConstants.GLOSSARY, },
    { class: '__f', label: language.MENU_FAQ, path: PathConstants.FAQ, },
    { class: '__s', label: language.MENU_SETTINGS, path: PathConstants.SETTINGS, },
    { class: '__a', label: language.MENU_ABOUT_US, path: PathConstants.ABOUT_US, },
  ]

  const grantDriveAccess = () => {
    GoogleOAuth2Service.requestGrant(
      googleOAuth2, ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/calendar'])
  }

  return (
    <div className="home">
      <div className="home__grid">
        <button onClick={grantDriveAccess}>Teste</button>
        {items.map((item, index) => (
          <ListItem key={index} button className="home__grid__button">
            <Paper
              elevation={2}
              className="home__grid__paper"
              onClick={() => setTimeout(() => HistoryService.push(item.path), 150)}
            >
              <div className={'paper__img ' + item.class}>
                <p className="home__paper__string">{item.label}</p>
              </div>
            </Paper>
          </ListItem>
        ))}
      </div>
    </div>
  )
}

export default Home
