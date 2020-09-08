import NoteViewModel from "../../../../types/note/view/NoteViewModel"

export default interface NoteDialogProps {
  open: boolean
  tagOptions: string[]
  onSave: (note: NoteViewModel) => void
  onSaveNew: (question: string, tagList: string[], answer: string) => void
  onClose: () => void
  note?: NoteViewModel
}
