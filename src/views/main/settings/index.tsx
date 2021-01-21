import React, { useState, useEffect } from 'react'
import { useAlert } from '../../../context/alert'
import { useLanguage } from '../../../context/language'
import { ReactComponent as SaveSVG } from '../../../assets/icons/save.svg'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import Button from '../../../components/button'
import SelectTreatment from '../../../components/settings/select_treatment'
import GoogleGrantDialog from '../../../components/google_grant_dialog'
import GoogleScope from '../../../types/auth/google/GoogleScope'
import SelectColorTheme from '../../../components/settings/select_color_theme'
import SelectLanguage from '../../../components/settings/select_language'
import DinoSwitch from '../../../components/switch'
import DinoHr from '../../../components/dino_hr'
import SelectFontSize from '../../../components/settings/select_font_size'
import UserSettingsService from '../../../services/user/UserSettingsService'
import UserSettingsEntity from '../../../types/user/database/UserSettingsEntity'
import Loader from '../../../components/loader'
import TreatmentService from '../../../services/treatment/TreatmentService'
import TreatmentEntity from '../../../types/treatment/database/TreatmentEntity'
import GoogleScopeService from '../../../services/auth/google/GoogleScopeService'
import FontSizeEnum from '../../../types/user/view/FontSizeEnum'
import ColorThemeEnum from '../../../types/user/view/ColorThemeEnum'
import EssentialContactService from '../../../services/contact/EssentialContactService'
import ContactService from '../../../services/contact/ContactService'
import GoogleContactService from '../../../services/contact/GoogleContactService'
import './styles.css'

const Settings: React.FC = () => {
	const alert = useAlert()
	const language = useLanguage()

	const [openGoogleContactDialog, setOpenGoogleContactDialog] = useState(false)

	const [isLoading, setIsLoading] = useState(true)
	const [settings, setSettings] = useState<UserSettingsEntity | undefined>(
		undefined,
	)
	const [treatments, setTreatments] = useState<TreatmentEntity[]>([])
	const [syncGoogleContacts, setSyncGoogleContacts] = useState(false)

	const [selectedLanguage, setSelectedLanguage] = useState(
		language.data.LANGUAGE_CODE,
	)
	const [selectedFontSize, setSelectedFontSize] = useState(FontSizeEnum.DEFAULT)
	const [selectedColorTheme, setSelectedColorTheme] = useState(
		ColorThemeEnum.DEVICE,
	)
	const [
		selectedEssentialContactGrant,
		setSelectedEssentialContactGrant,
	] = useState(false)
	const [selectedTreatment, setSelectedTreatment] = useState<
		TreatmentEntity | undefined
	>(undefined)

	useEffect(() => {
		const loadData = async () => {
			const treatments = await TreatmentService.getAll()
			const settings = await UserSettingsService.getFirst()
			const syncGoogleContacs = await GoogleScopeService.hasContactGrant()

			if (settings) {
				if (treatments) {
					const treatment = treatments.find(
						treatment => treatment.localId === settings.treatmentLocalId,
					)
					if (treatment) {
						updateTreatment(treatment)
					}
					updateTreatments(treatments)
				}
				updateSettings(settings)
			}
			updateSyncGoogleContacts(syncGoogleContacs)

			finishLoading()
		}

		let updateTreatments = (treatments: TreatmentEntity[]) => {
			setTreatments(treatments)
		}

		let updateTreatment = (treatment: TreatmentEntity) => {
			setSelectedTreatment(treatment)
		}

		let updateSettings = (settings: UserSettingsEntity) => {
			const colorThemeCode = UserSettingsService.getColorThemeCode(settings)
			const fontSizeCode = UserSettingsService.getFontSizeCode(settings)
			const essentialContactGrant = UserSettingsService.getEssentialContactGrant(
				settings,
			)
			setSelectedColorTheme(colorThemeCode)
			setSelectedFontSize(fontSizeCode)
			setSelectedEssentialContactGrant(
				essentialContactGrant !== undefined ? essentialContactGrant : false,
			)
			setSettings(settings)
		}

		let updateSyncGoogleContacts = (syncGoogleContacts: boolean) => {
			setSyncGoogleContacts(syncGoogleContacts)
		}

		let finishLoading = () => {
			setIsLoading(false)
		}

		UserSettingsService.addUpdateEventListenner(loadData)
		TreatmentService.addUpdateEventListenner(loadData)
		GoogleScopeService.addUpdateEventListenner(loadData)

		if (isLoading) {
			loadData()
		}

		return () => {
			updateTreatment = () => {}
			updateSettings = () => {}
			updateTreatments = () => {}
			updateSyncGoogleContacts = () => {}
			finishLoading = () => {}
			UserSettingsService.removeUpdateEventListenner(loadData)
			TreatmentService.removeUpdateEventListenner(loadData)
			GoogleScopeService.removeUpdateEventListenner(loadData)
		}
	}, [isLoading])

	useEffect(() => {
		setSelectedLanguage(language.data.LANGUAGE_CODE)
	}, [language])

	const handleOpenGoogleContactDialog = () => {
		if (!syncGoogleContacts) {
			setOpenGoogleContactDialog(true)
		}
	}

	const handleAgreeContactsGrantDialog = async () => {
		setOpenGoogleContactDialog(false)
		if (settings) {
			settings.declineGoogleContacts = false
			await UserSettingsService.save(settings)
			GoogleContactService.activeGoogleContactsGrant()
		}
	}

	const handleDisagreeContactsGrantDialog = () => {
		if (settings) {
			settings.declineGoogleContacts = true
			UserSettingsService.save(settings)
		}
		setOpenGoogleContactDialog(false)
	}

	const handleCloseContactsGrantDialog = () => {
		setOpenGoogleContactDialog(false)
	}

	const handleSave = async () => {
		if (settings) {
			const oldTreatment = settings.treatmentLocalId
			const oldIncludeEssentialContact = settings.includeEssentialContact

			settings.language = selectedLanguage
			settings.fontSize = selectedFontSize
			settings.colorTheme = selectedColorTheme
			settings.includeEssentialContact = selectedEssentialContactGrant

			if (selectedTreatment) {
				settings.treatmentLocalId = selectedTreatment.localId
			}

			alert.showSuccessAlert(language.data.SETTINGS_SAVE_SUCCESS)

			await UserSettingsService.save(settings)

			const treatmentChangedWithEssentialContacts =
				oldTreatment !== settings.treatmentLocalId &&
				settings.includeEssentialContact
			const disabledEssentialContacts =
				oldIncludeEssentialContact !== settings.includeEssentialContact &&
				oldIncludeEssentialContact
			const enabledEssentialContacts =
				oldIncludeEssentialContact !== settings.includeEssentialContact &&
				settings.includeEssentialContact

			if (treatmentChangedWithEssentialContacts || disabledEssentialContacts) {
				await ContactService.deleteUserEssentialContacts()
			}

			if (treatmentChangedWithEssentialContacts || enabledEssentialContacts) {
				EssentialContactService.saveUserEssentialContacts(settings)
			}
		} else {
			alert.showErrorAlert(language.data.SETTINGS_SAVE_ERROR)
		}
	}

	const renderSaveButton = (): JSX.Element => (
		<div className='settings__save_button_container'>
			<Button className='settings__save_button' onClick={handleSave}>
				<SaveSVG className='settings__save_button__icon' />
				{language.data.SETTINGS_SAVE}
			</Button>
		</div>
	)

	const renderDialogs = (): JSX.Element => (
		<GoogleGrantDialog
			onAccept={handleAgreeContactsGrantDialog}
			onDecline={handleDisagreeContactsGrantDialog}
			onClose={handleCloseContactsGrantDialog}
			open={openGoogleContactDialog}
			scopes={[GoogleScope.SCOPE_CONTACT]}
			text={language.data.GOOGLE_CONTACT_GRANT_TEXT}
			title={language.data.GOOGLE_CONTACT_GRANT_TITLE}
		/>
	)

	return (
		<Loader isLoading={isLoading} hideChildren>
			<div className='settings'>
				<Typography
					className='settings__title'
					color='textSecondary'
					gutterBottom
				>
					{language.data.SETTINGS_TITLE}
				</Typography>
				<FormControl className='settings__form'>
					<SelectLanguage
						languageName={selectedLanguage}
						setLanguage={setSelectedLanguage}
					/>
				</FormControl>
				<FormControl className='settings__form'>
					<SelectFontSize
						fontSize={selectedFontSize}
						setFontSize={setSelectedFontSize}
					/>
				</FormControl>
				<FormControl className='settings__form'>
					<SelectColorTheme
						colorTheme={selectedColorTheme}
						setColorTheme={setSelectedColorTheme}
					/>
				</FormControl>
				<FormControl className='settings__form'>
					<SelectTreatment
						availableTreatments={treatments}
						setTreatment={setSelectedTreatment}
						treatment={selectedTreatment}
					/>
				</FormControl>
				<DinoHr invisible />
				<FormControl className='settings__form'>
					<DinoSwitch
						selected={syncGoogleContacts}
						setSelected={handleOpenGoogleContactDialog}
						label={language.data.SAVE_CONTACT_ON_GOOGLE_GRANT}
					/>
				</FormControl>
				<DinoHr />
				<FormControl className='settings__form'>
					<DinoSwitch
						selected={selectedEssentialContactGrant}
						setSelected={setSelectedEssentialContactGrant}
						label={language.data.SELECT_TREATMENT_LOAD_CONTACT_GRANT}
					/>
				</FormControl>
				<DinoHr invisible />
				{renderSaveButton()}
				{renderDialogs()}
			</div>
		</Loader>
	)
}

export default Settings
