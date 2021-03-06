import React, { forwardRef, useState, useEffect, useRef } from 'react'
import './styles.css'
import {
	Dialog,
	Divider,
	DialogContent,
	DialogActions,
} from '@material-ui/core'
import TransitionSlide from '../../../../components/slide_transition'
import NoteColumnDialogProps from './props'
import NoteColumnDialogHeader from './header'
import NoteColumnDialogContent from './content'
import NoteColumnConstants from '../../../../constants/note/NoteColumnConstants'
import Button from '../../../../components/button/text_button'
import NoteColumnEntity from '../../../../types/note/database/NoteColumnEntity'
import { useLanguage } from '../../../../context/language'

const NoteColumnDialog = forwardRef(
	(props: NoteColumnDialogProps, ref: React.Ref<JSX.Element>): JSX.Element => {
		const language = useLanguage()

		const inputRef = useRef<HTMLInputElement>(null)

		const [newTitle, setNewTitle] = useState<string>(
			props.column ? props.column.title : '',
		)
		const [invalidTitle, setInvalidTitle] = useState<boolean>(false)
		const [invalidMessage, setInvalidMessage] = useState<string>('')

		useEffect(() => {
			setNewTitle(props.column ? props.column.title : '')
			setInvalidTitle(false)
		}, [props.open, props.column])

		const handleSave = async () => {
			const invalidTitle = !(await isTitleValid(newTitle))
			setInvalidTitle(invalidTitle)

			if (invalidTitle) {
				return
			}

			if (props.column) {
				if (props.column.title !== newTitle) {
					const oldTitle = props.column.title
					props.column.title = newTitle
					props.onSave(props.column, oldTitle)
				} else {
					props.onClose()
				}
			} else if (props.order !== undefined) {
				const newColumn: NoteColumnEntity = {
					title: newTitle,
					order: props.order,
				}
				props.onSave(newColumn)
			}
		}

		const handleTitleChange = (newTitle: string) => {
			setNewTitle(newTitle.substring(0, NoteColumnConstants.TITLE_MAX))
		}

		const isTitleValid = (title: string): boolean => {
			const unchangedTitle = props.column && props.column.title === title
			if (unchangedTitle) {
				return true
			}

			const minLengthError = title.length < NoteColumnConstants.TITLE_MIN
			if (minLengthError) {
				setInvalidMessage(language.data.COLUMN_MIN_LENGTH_ERROR)
				return false
			}

			const titleConflict = props.titleAlreadyExists(title)
			if (titleConflict) {
				setInvalidMessage(language.data.COLUMN_TITLE_ALREADY_EXISTS_ERROR)
				return false
			}

			setInvalidMessage('')
			return true
		}

		return (
			<Dialog
				ref={ref}
				open={props.open}
				fullWidth
				onClose={props.onClose}
				TransitionComponent={TransitionSlide}
				className='note__column_dialog'
			>
				<NoteColumnDialogHeader editing={Boolean(props.column)} />
				<Divider />
				<DialogContent>
					<NoteColumnDialogContent
						title={newTitle}
						onTitleChange={handleTitleChange}
						invalidTitle={invalidTitle}
						invalidMessage={invalidMessage}
						inputRef={inputRef}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.onClose}>
						{language.data.DIALOG_CANCEL_BUTTON_TEXT}
					</Button>
					<Button onClick={handleSave} inputRef={inputRef}>
						{language.data.DIALOG_SAVE_BUTTON_TEXT}
					</Button>
				</DialogActions>
			</Dialog>
		)
	},
)

export default NoteColumnDialog
