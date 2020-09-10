import React from 'react'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useLanguage } from '../../../../../context_provider/app_settings'
import HeaderProps from './props'
import './styles.css'

const Header: React.FC<HeaderProps> = ({ onClose }) => {

    const language = useLanguage().current

    return (
      <div className="calendar__edit_event_modal__header">
        <div className="calendar__edit_event_modal__header__left">
          <IconButton aria-label={language.CLOSE_ARIA_LABEL} onClick={onClose}>
            <CloseIcon fontSize="default" />
          </IconButton>
        </div>
      </div>
    )
}

export default Header