export type MessageType = {
	id: string
	type: string
	message: string
}

class MsgLogger {
	messages: MessageType[] = $state([])
	list: MessageType[] = $state([])
	timeId: number = $state(0)
	busy: boolean = $state(false)
	cache: number = $derived(this.messages.length)
	#max: number = $state(6)
	#auto: number = $state(20000)
	get max() {
		return this.#max
	}
	set max(value) {
		this.#max = Math.max(0, Math.min(99, value))
	}
	get auto() {
		return this.#auto
	}
	set auto(value) {
		this.#auto = Math.max(0, Math.min(180000, value))
	}
	add(message: MessageType) {
		const defaults = {
			type: 'danger',
			message: 'Etwas stimmt nicht...',
			timeout: this.#auto
		}
		const mObj = { ...defaults, ...message }
		this.messages = [...this.messages, mObj]

		if (this.messages.length === 1) {
			this.next()
		}
	}

	async next() {
		if (this.busy) return
		if (!this.messages.length) {
			clearTimeout(this.timeId)
			this.busy = false
			return
		}
		if (this.list.length >= this.#max) this.list.shift()
		this.busy = true
		const speed = 4
		const msg = this.messages.shift()
		const text = msg?.message
		const duration = text.length / (speed * 0.01)
		this.list.push(msg)
		this.timeId = setTimeout(() => {
			if (msg.timeout) setTimeout(() => this.remove(msg.id), msg.timeout)
			this.busy = false
			this.next()
		}, duration)
	}

	remove(id: string) {
		this.list = this.list.filter((t) => t.id !== id)
	}

	empty() {
		if (this.busy) return
		if (!this.list.length) {
			clearTimeout(this.timeId)
			this.busy = false
			return
		}
		this.busy = true
		this.list.shift()
		this.timeId = setTimeout(() => {
			this.busy = false
			this.empty()
		}, 400)
	}

	clear() {
		clearTimeout(this.timeId)
		this.messages = []
		this.list = []
		this.busy = false
	}
}

export const log = new MsgLogger()

export default log
