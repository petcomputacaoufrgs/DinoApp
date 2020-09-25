import NoteContextUpdater from '../../context_updater/NoteContextUpdater'
import NoteServerService from './NoteServerService'
import { NoteColumnViewModel } from '../../types/note/view/NoteColumnViewModel'
import NoteConstants from '../../constants/NoteConstants'
import NoteWebSocketOrderUpdateModel from '../../types/note/web_socket/NoteWebSocketOrderUpdateModel'
import NoteWebSocketAlertDeleteModel from '../../types/note/web_socket/NoteWebSocketAlertDeleteModel'
import NoteEntity from '../../types/note/database/NoteEntity'
import NoteDatabaseService from './NoteDatabaseService'
import NoteViewModel from '../../types/note/view/NoteViewModel'
import NoteLocalStorageService from './NoteLocalStorageService'
import DeletedNoteDatabaseService from './DeletedNoteDatabaseService'
import DeletedNoteEntity from '../../types/note/database/DeletedNoteEntity'

class NoteService {
  //#region GET

  getNotes = async (): Promise<NoteEntity[]> => {
    return NoteDatabaseService.getAll()
  }

  getDeletedNotes = async (): Promise<DeletedNoteEntity[]> => {
    return DeletedNoteDatabaseService.getAll()
  }

  getTags = async (): Promise<string[]> => {
    return NoteDatabaseService.getAllTags()
  }

  getVersionFromServer = async (): Promise<number | undefined> => {
    return NoteServerService.getVersion()
  }

  //#endregion

  //#region SYNC

  shouldSync = (): boolean => NoteLocalStorageService.shouldSync()

  setShouldSync = (shouldSync: boolean) => NoteLocalStorageService.setShouldSync(shouldSync)

  //#endregion

  //#region SAVE

  saveNote = async (note: NoteViewModel) => {
    const dbNote = await NoteDatabaseService.getById(note.id)

    if (dbNote) {
      dbNote.answer = note.answer
      dbNote.question = note.question
      dbNote.tagNames = note.tagNames
      dbNote.savedOnServer = false
      dbNote.lastUpdate = new Date().getTime()

      await NoteDatabaseService.put(dbNote)

      this.saveNoteOnServer(dbNote)
    }

    NoteContextUpdater.update()
  }

  createNote = async (
    question: string,
    tagNames: string[],
    colunm: NoteColumnViewModel
  ) => {
    const date = new Date().getTime()

    const note: NoteEntity = {
      answer: '',
      question: question,
      tagNames: tagNames,
      lastUpdate: date,
      lastOrderUpdate: date,
      savedOnServer: false,
      order: colunm.notes.length,
      columnTitle: colunm.title,
    }

    await NoteDatabaseService.put(note)

    NoteContextUpdater.update()

    this.saveNoteOnServer(note)
  }

  saveNoteOnServer = async (note: NoteEntity) => {
    const responseBody = await NoteServerService.save(note)

    if (responseBody) {
      const dbNote = await NoteDatabaseService.getById(note.id!)

      if (dbNote) {
        dbNote.savedOnServer = true
        dbNote.external_id = responseBody.id
      }

      NoteLocalStorageService.setVersion(responseBody.userNoteVersion)
    } else {
      NoteLocalStorageService.setShouldSync(true)
    }
  }

  saveNotesOnServer = async (notes: NoteEntity[]) => {
    const responseBody = await NoteServerService.saveAll(notes)

    if (responseBody) {
      const notesDb = await NoteDatabaseService.getAllById(
        notes.map((note) => note.id!)
      )

      notesDb.forEach((note) => {
        const item = responseBody.items.find(
          (item) => item.question === note.question
        )

        if (item) {
          note.id = item.id
        }
      })

      await NoteDatabaseService.putAll(notesDb)

      NoteLocalStorageService.setVersion(responseBody.newVersion)
    } else {
      NoteLocalStorageService.setShouldSync(true)
    }
  }

  saveNotesOrder = async (notes: NoteEntity[]) => {
    if (notes.length > 0) {
      const databaseNotes = await this.getNotes()

      notes.forEach((note, index) => {
        const savedNote = databaseNotes.find(
          (savedNote) => savedNote.id === note.id
        )

        if (savedNote) {
          savedNote.order = index
          savedNote.lastOrderUpdate = new Date().getTime()
          savedNote.columnTitle = note.columnTitle
        }
      })

      await NoteDatabaseService.putAll(databaseNotes)

      this.saveOrderOnServer(databaseNotes)
    }
  }

  saveOrderOnServer = async (notes?: NoteEntity[]): Promise<void> => {
    if (!notes) {
      notes = await this.getNotes()
    }

    const success = await NoteServerService.saveOrder(notes)

    if (!success) {
      NoteLocalStorageService.setShouldSync(true)
    }
  }

  //#endregion

  //#region DELETE

  removeUserData = () => {
    NoteLocalStorageService.removeUserData()
    NoteDatabaseService.deleteAll()
    DeletedNoteDatabaseService.deleteAll()
  }

  addNotesInDeletedNoteDatabase = async (deletedNotes: NoteEntity[]) => {
    return DeletedNoteDatabaseService.addAll(deletedNotes)
  }

  deleteAllDatabaseNotesByColumnTitle = async (
    columnTitle: string
  ): Promise<NoteEntity[]> => {
    const deletedNotes = await NoteDatabaseService.deleteByColumnTitle(columnTitle)

    NoteContextUpdater.update()

    return deletedNotes
  }

  deleteNote = async (note: NoteViewModel) => {
    const deletedNote = await NoteDatabaseService.deleteById(note.id)

    NoteContextUpdater.update()

    if (deletedNote) {
      this.deleteNoteOnServer(deletedNote)
    }
  }

  deleteNotesOnServer = async () => {
    const deletedNotes = await this.getDeletedNotes()

    if (deletedNotes.length > 0) {
      const newVersion = await NoteServerService.deleteAll(deletedNotes)

      if (newVersion !== null) {
        DeletedNoteDatabaseService.deleteAll()
        NoteLocalStorageService.setVersion(newVersion)
      } else {
        NoteLocalStorageService.setShouldSync(true)
      }
    }
  }

  private deleteNoteOnServer = async (note: NoteEntity) => {
    if (note.external_id) {
      const newVersion = await NoteServerService.delete(note.external_id)

      if (newVersion !== null) {
        NoteLocalStorageService.setVersion(newVersion)
      } else {
        await DeletedNoteDatabaseService.add(note)
        
        NoteLocalStorageService.setShouldSync(true)
      }
    }
  }

  //#endregion

  //#region UPDATE

  updateContext = () => {
    NoteContextUpdater.update()
  }

  updateNoteColumnTitle = async (newColumnTitle: string, oldCclumnTitle: string) => {
    return NoteDatabaseService.updateColumnTitle(newColumnTitle, oldCclumnTitle)
  }

  checkQuestionConflict = (
    localVersion: NoteEntity,
    serverNotesDocs: NoteEntity[]
  ): boolean =>
    serverNotesDocs.some(
      (serverNote) =>
        serverNote.question === localVersion.question &&
        serverNote.lastUpdate !== localVersion.lastUpdate &&
        serverNote.external_id !== localVersion.external_id
    )

  updateNotesFromServer = async (newVersion: number) => {
    const localVersion = NoteLocalStorageService.getVersion()
    if (newVersion > localVersion) {
      const serverData = await NoteServerService.get()

      if (serverData) {
        let maxOrder = 0
        const deletedNotes = await this.getDeletedNotes()
        const serverNotes: NoteEntity[] = []
        serverData.forEach((serverNote) => {
          if (serverNote.order > maxOrder) {
            maxOrder = serverNote.order
          }
          const localDeleted = deletedNotes.find(
            (deletedNote) => deletedNote.external_id === serverNote.id
          )
          if (localDeleted) {
            if (localDeleted.lastUpdate > serverNote.lastUpdate) {
              return
            } else {
              if (localDeleted.id !== undefined) {
                DeletedNoteDatabaseService.deleteById(localDeleted.id)
              }
            }
          }
          serverNotes.push({
            external_id: serverNote.id,
            order: serverNote.order,
            answer: serverNote.answer,
            lastUpdate: serverNote.lastUpdate,
            lastOrderUpdate: serverNote.lastOrderUpdate,
            question: serverNote.question,
            tagNames: serverNote.tags,
            savedOnServer: true,
            columnTitle: serverNote.columnTitle,
          } as NoteEntity)
        })

        const localNotes: NoteEntity[] = await this.getNotes()

        const mergedNotes: NoteEntity[] = serverNotes

        for (const localVersion of localNotes) {
          let questionConflict = this.checkQuestionConflict(
            localVersion,
            serverNotes
          )

          while (questionConflict) {
            localVersion.question =
              localVersion.question + NoteConstants.SAME_QUESTION_CONFLICT_DIFF

            questionConflict = this.checkQuestionConflict(
              localVersion,
              serverNotes
            )
          }

          const serverVersion = serverNotes.find(
            (serverNote) => serverNote.external_id === localVersion.external_id
          )

          if (serverVersion) {
            const localOrderMoreUpdated =
              localVersion.lastOrderUpdate > serverVersion.lastOrderUpdate

            const localDataMoreUpdated =
              localVersion.lastUpdate > serverVersion.lastUpdate

            serverVersion.id = localVersion.id

            if (localDataMoreUpdated) {
              serverVersion.question = localVersion.question
              serverVersion.lastUpdate = localVersion.lastUpdate
              serverVersion.answer = localVersion.answer
              serverVersion.tagNames = localVersion.tagNames
              serverVersion.savedOnServer = false
            }

            if (localOrderMoreUpdated) {
              serverVersion.lastOrderUpdate = localVersion.lastOrderUpdate
              serverVersion.order = localVersion.order
              serverVersion.columnTitle = localVersion.columnTitle
            }
          } else {
            const isUnsaved = !localVersion.savedOnServer

            if (isUnsaved) {
              maxOrder++

              localVersion.order = maxOrder

              mergedNotes.push(localVersion)
            }
          }
        }

        await NoteDatabaseService.putAll(mergedNotes)
        NoteContextUpdater.update()
        NoteLocalStorageService.setVersion(newVersion)
      } else {
        NoteLocalStorageService.setShouldSync(true)
      }
    }
  }

  updateNotesOrderFromServer = async (model: NoteWebSocketOrderUpdateModel) => {
    const notes = await this.getNotes()
    let updated = false

    notes.forEach((note) => {
      const serverItem = model.items.find((item) => item.id === note.external_id)
      if (serverItem) {
        const serverOrderMoreUpdated =
          serverItem.lastOrderUpdate > note.lastOrderUpdate
        if (serverOrderMoreUpdated) {
          note.order = serverItem.order
          note.lastOrderUpdate = serverItem.lastOrderUpdate
          note.columnTitle = serverItem.columnTitle
          updated = true
        }
      }
    })

    if (updated) {
      await NoteDatabaseService.putAll(notes)

      NoteContextUpdater.update()
    }
  }

  updateDeletedNotesFromServer = async (
    model: NoteWebSocketAlertDeleteModel
  ) => {
    const localVersion = NoteLocalStorageService.getVersion()

    if (model.newVersion > localVersion && model.idList) {
      await NoteDatabaseService.deleteByExternalIds(model.idList)

      NoteLocalStorageService.setVersion(model.newVersion)

      NoteContextUpdater.update()
    }
  }

  //#endregion

  //#region VALIDATE

  questionAlreadyExists = async (question: string): Promise<boolean> => {
    const note = await NoteDatabaseService.getByQuestion(question)

    if (note) {
      return true
    }

    return false
  }

  //#endregion
}

export default new NoteService()
