import React from 'react'
import IconButton from '../../../../../components/button/icon_button' 
import { ReactComponent as ChangeColorIconSVG } from '../../../../../assets/icons/color_lens.svg'
import { useCurrentLanguage } from '../../../../../context/provider/app_settings'
import { Avatar, CardHeader } from '@material-ui/core'
import ContactFormDialogHeaderProps from './props'
import Constants from '../../../../../constants/contact/ContactsConstants'
import CloseComponent from '../../../../../components/icon_buttons/close_component'
import '../../styles.css'
import './styles.css'

const AddContactDialogHeader = (
  props: ContactFormDialogHeaderProps
): JSX.Element => {

  const language = useCurrentLanguage()

  return (
    <CardHeader
      avatar={
        <Avatar
          aria-label={language.AVATAR_ALT}
          className={`avatar__color-${props.color}`}
        >
          {props.name ? props.name[0].toUpperCase() : '?'}
        </Avatar>
      }
      action={
        <>
          <IconButton ariaLabel={language.COLOR_THEME_SELECTION_ARIA_LABEL} icon={ChangeColorIconSVG} className='change_color_button' onClick={props.handleChangeColor} />
          <CloseComponent onClose={props.handleCloseDialog} />
        </>
      }
      title={
        props.action === Constants.ACTION_ADD
          ? props.name || language.CONTACTS_ADD_CONTACT
          : props.name
      }
      subheader={language.CONTACT_DIALOG_FORM_SUBTITLE}
      className='contact_dialog_form_header'
    />
  )
}

export default AddContactDialogHeader
