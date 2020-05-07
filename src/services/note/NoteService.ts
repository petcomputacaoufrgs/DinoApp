import NoteViewModel from '../../views/main/notes/model/NoteViewModel'
import NoteVersionLocalStorage from './local_storage/NoteVersionLocalStorage'
import DinoAPIURLConstants from '../../constants/dino_api/DinoAPIURLConstants'
import HttpStatus from 'http-status-codes'
import NoteSaveAPIModel from './api_model/NoteAPISaveModel'
import NoteSaveResponseAPIModel from './api_model/NoteSaveResponseAPIModel'
import NoteOrderAPIModel from './api_model/NoteOrderAPIModel'
import NoteDeleteAPIModel from './api_model/NoteDeleteAPIModel'
import NoteAPIQuestionModel from './api_model/NoteAPIQuestionModel'
import NoteAPIAnswerModel from './api_model/NoteAnswerModel'
import NoteDoc from './database/docs/NoteDoc'
import NoteDatabase from './database/NoteDatabase'
import DeletedNoteDatabase from './database/DeletedNoteDatabase'
import DinoAgentService from '../dino_agent/DinoAgentService'
import NoteUpdateLocalStorage from './local_storage/NoteUpdateLocalStorage'

class NoteService {
  //#region GET

  getNotes = async (): Promise<NoteViewModel[]> => {
    const noteDocs = await NoteDatabase.getAll()

    const viewModels = noteDocs
      .sort((n1, n2) => n1.order - n2.order)
      .map(
        (note) =>
          ({
            id: note.order,
            answer: note.answer,
            answered: note.answered,
            lastUpdate: note.lastUpdate,
            question: note.question,
            tagNames: note.tagNames,
            savedOnServer: note.savedOnServer,
            showByQuestion: true,
            showByTag: true,
          } as NoteViewModel),
      )

    return viewModels
  }

  getTags = async (): Promise<string[]> => {
    return NoteDatabase.getAllTags()
  }

  //#endregion

  //#region SAVE

  getVersion = (): number => NoteVersionLocalStorage.getVersion()

  setVersion = (version: number) => {
    NoteVersionLocalStorage.setVersion(version)
  }

  setUpdateNotesWithError = () => {
    NoteUpdateLocalStorage.setUpdateNotesWithError(true)
  }

  setUpdateNotesWithoutError = () => {
    NoteUpdateLocalStorage.setUpdateNotesWithError(false)
  }

  setUpdatingNotes = () => {
    NoteUpdateLocalStorage.setUpdatingNotes(true)
  }

  setNotesUpdated = () => {
    NoteUpdateLocalStorage.setUpdatingNotes(false)
  }

  saveNote = async (noteModel: NoteViewModel, updateState: () => void) => {
    const noteDoc: NoteDoc = {
      answer: noteModel.answer,
      answered: noteModel.answered,
      lastUpdate: noteModel.lastUpdate,
      question: noteModel.question,
      savedOnServer: false,
      order: noteModel.id,
      tagNames: noteModel.tagNames,
      _rev: '',
    }

    this.saveNoteOnServer(noteModel)

    await NoteDatabase.put(noteDoc)

    if (updateState) {
      updateState()
    }
  }

  saveNoteOnServer = async (noteModel: NoteViewModel) => {
    const newNote: NoteSaveAPIModel = {
      order: noteModel.id,
      question: noteModel.question,
      lastUpdate: noteModel.lastUpdate,
      tagNames: noteModel.tagNames,
    }

    const response = await DinoAgentService.post(
      DinoAPIURLConstants.NOTE_SAVE,
    ).send(newNote)

    if (response.status === HttpStatus.OK) {
      const body: NoteSaveResponseAPIModel = response.body

      const noteDoc = await NoteDatabase.getByQuestion(noteModel.question)

      if (noteDoc) {
        noteDoc.savedOnServer = true
        noteDoc.external_id = body.noteId

        await NoteDatabase.put(noteDoc)
        NoteVersionLocalStorage.setVersion(body.version)
      }
    }
  }

  //#endregion

  //#region DELETE

  removeUserData = () => {
    NoteVersionLocalStorage.removeUserData()
    NoteDatabase.removeAll()
    DeletedNoteDatabase.removeAll()
  }

  deleteNote = async (noteModel: NoteViewModel, updateState: () => {}) => {
    const noteDoc = await NoteDatabase.getByQuestion(noteModel.question)

    if (noteDoc) {
      console.log(noteDoc)

      await NoteDatabase.deleteByNoteDoc(noteDoc)

      if (noteDoc.external_id) {
        const deletedNote = await DeletedNoteDatabase.getByQuestion(
          noteDoc.question,
        )

        if (!deletedNote) {
          await DeletedNoteDatabase.putNew(noteDoc)

          this.deleteNoteOnServer(noteDoc)
        }
      }

      if (updateState) {
        updateState()
      }
    }
  }

  private deleteNoteOnServer = async (noteDoc: NoteDoc) => {
    if (noteDoc.external_id) {
      const model: NoteDeleteAPIModel = { id: noteDoc.external_id }

      const response = await DinoAgentService.delete(
        DinoAPIURLConstants.NOTE_DELETE,
      ).send(model)

      if (response.status === HttpStatus.OK && response.body === 1) {
        const deletedNote = await DeletedNoteDatabase.getByQuestion(
          noteDoc.question,
        )

        if (deletedNote) {
          DeletedNoteDatabase.deleteByNoteDoc(deletedNote)
        }
      }
    }
  }

  //#endregion

  //#region SAVE & UPDATE

  updateNotesOrder = async (viewNotes: NoteViewModel[]) => {
    const noteDocs = await NoteDatabase.getAll()

    noteDocs.forEach((noteDoc) => {
      const newOrder = viewNotes.findIndex(
        (n) => n.question === noteDoc.question,
      )

      noteDoc.order = newOrder
    })

    NoteDatabase.putAll(noteDocs)
    this.updateOrderOnServer(noteDocs)
  }

  private updateOrderOnServer = async (noteDocs: NoteDoc[]): Promise<void> => {
    const model: NoteOrderAPIModel[] = []

    noteDocs.forEach((note) => {
      if (note.external_id) {
        model.push({
          id: note.external_id,
          order: note.order,
        } as NoteOrderAPIModel)
      }
    })

    const response = await DinoAgentService.put(
      DinoAPIURLConstants.NOTE_ORDER,
    ).send(model)

    if (response.status === HttpStatus.OK) {
      NoteVersionLocalStorage.setVersion(response.body)
    }
  }

  updateNoteQuestion = async (
    noteModel: NoteViewModel,
    updateState: () => void,
  ) => {
    const noteDoc = await NoteDatabase.getByQuestion(noteModel.question)

    if (noteDoc) {
      noteDoc.question = noteModel.question
      noteDoc.tagNames = noteModel.tagNames
      noteDoc.lastUpdate = noteModel.lastUpdate
      noteDoc.savedOnServer = false

      this.updateNoteQuestionOnServer(noteDoc)
      await NoteDatabase.put(noteDoc)

      if (updateState) {
        updateState()
      }
    }
  }

  private updateNoteQuestionOnServer = async (noteDoc: NoteDoc) => {
    if (noteDoc.external_id) {
      const model: NoteAPIQuestionModel = {
        id: noteDoc.external_id,
        question: noteDoc.question,
        tagNames: noteDoc.tagNames,
        lastUpdate: noteDoc.lastUpdate,
      }

      const response = await DinoAgentService.put(
        DinoAPIURLConstants.NOTE_UPDATE_QUESTION,
      ).send(model)

      if (response.status === HttpStatus.OK) {
        const savedNoteDoc = await NoteDatabase.getByQuestion(noteDoc.question)

        if (savedNoteDoc) {
          savedNoteDoc.savedOnServer = true

          NoteDatabase.put(savedNoteDoc)

          NoteVersionLocalStorage.setVersion(response.body)
        }
      }
    }
  }

  updateNoteAnswer = async (noteModel: NoteViewModel) => {
    const noteDoc = await NoteDatabase.getByQuestion(noteModel.question)

    if (noteDoc) {
      noteDoc.answer = noteModel.answer
      noteDoc.answered = noteModel.answered
      noteDoc.savedOnServer = false

      NoteDatabase.put(noteDoc)

      this.updateNoteAnswerOnServer(noteDoc)
    }
  }

  updateNoteAnswerOnServer = async (noteDoc: NoteDoc) => {
    if (noteDoc.external_id) {
      const model: NoteAPIAnswerModel = {
        id: noteDoc.external_id,
        answer: noteDoc.answer,
      }

      const response = await DinoAgentService.put(
        DinoAPIURLConstants.NOTE_UPDATE_ANSWER,
      ).send(model)

      if (response.status === HttpStatus.OK) {
        const savedNoteDoc = await NoteDatabase.getByQuestion(noteDoc.question)

        if (savedNoteDoc) {
          savedNoteDoc.savedOnServer = true

          NoteDatabase.put(savedNoteDoc)
          NoteVersionLocalStorage.setVersion(response.body)
        }
      }
    }
  }

  //#endregion

  //#region VALIDATE

  questionAlreadyExists = async (question: string): Promise<boolean> => {
    const note = await NoteDatabase.getByQuestion(question)

    if (note) {
      return true
    }

    return false
  }

  //#endregion
}

export default new NoteService()
