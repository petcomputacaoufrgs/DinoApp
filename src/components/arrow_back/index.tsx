import React from 'react'
import IconButton from '../../components/button/icon_button'
import HistoryService from '../../services/history/HistoryService'
import { ReactComponent as ArrowBackIconSVG } from '../../assets/icons/arrow_back.svg'
import { useLanguage } from '../../context/language'

const ArrowBack = (): JSX.Element => {
	const language = useLanguage()

	return (
		<IconButton
			className='arrow_back'
			ariaLabel={language.data.ARROW_BACK_ARIA_LABEL}
			icon={ArrowBackIconSVG}
			onClick={() => HistoryService.goBack()}
		/>
	)
}

export default ArrowBack
