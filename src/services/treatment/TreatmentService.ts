import APIRequestMappingConstants from '../../constants/api/APIRequestMappingConstants'
import AutoSynchronizableService from '../sync/AutoSynchronizableService'
import APIWebSocketDestConstants from '../../constants/api/APIWebSocketDestConstants'
import TreatmentDataModel from '../../types/treatment/api/TreatmentDataModel'
import TreatmentEntity from '../../types/treatment/database/TreatmentEntity'
import SynchronizableService from '../sync/SynchronizableService'
import WebSocketTopicPathService from '../websocket/path/WebSocketTopicPathService'
import Database from '../../storage/Database'
import FaqView from '../../types/faq/view/FaqView'
import FaqItemService from '../faq/FaqItemService'

class TreatmentServiceImpl extends AutoSynchronizableService<
	number,
	TreatmentDataModel,
	TreatmentEntity
> {
	constructor() {
		super(
			Database.treatment,
			APIRequestMappingConstants.TREATMENT,
			WebSocketTopicPathService,
			APIWebSocketDestConstants.TREATMENT,
		)
	}

	getSyncDependencies(): SynchronizableService[] {
		return []
	}

	async convertModelToEntity(
		model: TreatmentDataModel,
	): Promise<TreatmentEntity> {
		const entity: TreatmentEntity = {
			name: model.name,
		}

		return entity
	}

	async convertEntityToModel(
		entity: TreatmentEntity,
	): Promise<TreatmentDataModel> {
		const model: TreatmentDataModel = {
			name: entity.name,
		}

		return model
	}

	getAllByIds = (ids: number[]): Promise<TreatmentEntity[]> => {
		return this.table.where('id').anyOf(ids).toArray()
	}

	getAllByLocalIds = (localIds: number[]): Promise<TreatmentEntity[]> => {
		return this.table.where('localId').anyOf(localIds).toArray()
	}

	getFaqViewByFilter(
		view: FaqView,
		searchTerm: string,
	): FaqView {
			const newView = {
				...view,
				faqItems: FaqItemService.getFaqItemByFilter(view.treatment, view.faqItems, searchTerm),
			}

			return newView as FaqView
	}
}

export default new TreatmentServiceImpl()
