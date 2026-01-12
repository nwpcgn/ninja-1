import alerts from './alerts.json'
const uuidv4 = function (length = 6) {
	return Math.random()
		.toString(36)
		.substring(2, length + 2)
}
interface Note {
	id: string
	type: string
	message: string
	dismissible: boolean
	timeout: number
}
export class MsgLogger {
	messages: Note[] = $state([])
	list: Note[] = $state([])
	currentIndex: number = $state(0)
	timeId: number = $state(0)
	notificationWindow: HTMLElement | null = $state(null)
	#busy: boolean = $state(false)

	get busy() {
		return this.#busy
	}

	set busy(value) {
		this.#busy = value
	}

	init(notificationWindow: HTMLElement) {
		this.notificationWindow = notificationWindow
	}

	addMessage(message: Note) {
		const id = uuidv4()
		const defaults = {
			id,
			type: 'info',
			dismissible: true,
			timeout: 10000
		}
		const mObj = { ...defaults, ...message }
		this.messages.push(mObj)

		if (this.messages.length === 1) {
			this.showNextMessage()
		}
	}
	dismissMessage(id: string) {
		this.list = this.list.filter((t) => t.id !== id)
	}

	async showNextMessage() {
		if (this.#busy) return
		if (!this.messages.length) {
			clearTimeout(this.timeId)
			this.#busy = false

			return
		}

		this.#busy = true
		const speed = 4
		const msg = this.messages.shift()
		const text = msg?.message
		const duration = text.length / (speed * 0.01)
		this.list.push(msg)
		this.timeId = setTimeout(() => {
			if (msg.timeout)
				setTimeout(() => this.dismissMessage(msg.id), msg.timeout)
			this.#busy = false
			this.showNextMessage()
		}, duration)
	}

	remove(id: string) {
		this.list = this.list.filter((t) => t.id !== id)
	}

	empty() {
		if (this.#busy) return
		// this.scrollDown()
		if (!this.list.length) {
			clearTimeout(this.timeId)
			this.#busy = false

			return
		}

		this.#busy = true
		this.list.shift()
		this.timeId = setTimeout(() => {
			this.#busy = false
			this.empty()
		}, 400)
	}

	clear() {
		clearTimeout(this.timeId)
		this.messages = []
		this.list = []
		this.#busy = false
	}
}

export const log = new MsgLogger()

export function getNote(): Note {
	const i = Math.floor(Math.random() * alerts.length)
	const obj = alerts[i]
	const { type, message, dismissible, timeout } = obj
	return { type, message, dismissible, timeout }
}

export default log
