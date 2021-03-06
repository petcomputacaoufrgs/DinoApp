import WebSocketSubscriber from '../../types/web_socket/WebSocketSubscriber'
import WebSocketWaitExecutionResolve from '../../types/web_socket/WebSocketWaitExecutionResolve'
import UpdatableService from '../update/UpdatableService'
import WebSocketService from './WebSocketService'

/**
 * @description Base service with WebSocket subscribers functions and queue to receive responses
 */
export default abstract class WebSocketSubscriberableService extends UpdatableService {
	private webSocketResolves: WebSocketWaitExecutionResolve[]
	private isExecutingWSCallback: boolean

	constructor() {
		super()
		this.webSocketResolves = []
		this.isExecutingWSCallback = false
		this.subscribeInWebSocketConnector()
	}

	/**
	 * @description Return a list of websocket subscribers.
	 */
	protected abstract getWebSocketSubscribers(): WebSocketSubscriber<any>[]

	/**
	 * @description Return a list of dependencies for websocket receiving.
	 * A websocket dependencie occurs when any websocket function of another service needs to be completed to call one of this service.
	 * A service can be dependent of itself.
	 */
	protected abstract getWebSocketDependencies(): WebSocketSubscriberableService[]

	private awaitWebSocketExecution = async (): Promise<void> => {
		if (this.isExecutingWSCallback) {
			return new Promise<void>(resolve => {
				this.webSocketResolves.push(resolve)
			})
		}
	}

	private cleanWebSocketResolves = () => {
		this.webSocketResolves = []
	}

	private getSubscribersWithFilter = () => {
		const subscribersWithFilter: WebSocketSubscriber<unknown>[] = []

		this.getWebSocketSubscribers().forEach(subscriber => {
			const subscriberWithFilter: WebSocketSubscriber<unknown> = {
				callback: async (data: unknown) => {
					const dependencies = await this.getDependenciesAndAwaitForItselfIfNecessary()
					this.isExecutingWSCallback = true
					await this.awaitAllWebSocketDependencies(dependencies)
					await subscriber.callback(data)
					this.isExecutingWSCallback = false

					this.webSocketResolves.forEach(resolve => resolve())
					this.cleanWebSocketResolves()
				},
				path: subscriber.path,
			}

			subscribersWithFilter.push(subscriberWithFilter)
		})

		return subscribersWithFilter
	}

	private awaitAllWebSocketDependencies = async (
		dependencies: WebSocketSubscriberableService[],
	): Promise<void> => {
		const resolves = dependencies.map(dependency =>
			dependency.awaitWebSocketExecution(),
		)

		await Promise.all(resolves)
	}

	private getDependenciesAndAwaitForItselfIfNecessary = async (): Promise<
		WebSocketSubscriberableService[]
	> => {
		const dependencies = this.getWebSocketDependencies()
		if (this.shouldAwaitForItSelf(dependencies)) {
			if (this.isExecutingWSCallback) {
				await this.awaitWebSocketExecution()
			}
			return this.removeItSelfFromDependencies(dependencies)
		}

		return dependencies
	}

	private shouldAwaitForItSelf = (
		dependencies: WebSocketSubscriberableService[],
	): boolean => {
		return dependencies.some(depedency => Object.is(depedency, this))
	}

	private removeItSelfFromDependencies = (
		dependencies: WebSocketSubscriberableService[],
	): WebSocketSubscriberableService[] => {
		return dependencies.filter(depedency => {
			if (Object.is(depedency, this)) {
				return false
			}

			return true
		})
	}

	private subscribeInWebSocketConnector = () => {
		window.addEventListener('load', () => {
			const subscribers = this.getSubscribersWithFilter()
			subscribers.forEach(subscriber =>
				WebSocketService.addSubscriber(subscriber),
			)
		})
	}
}
