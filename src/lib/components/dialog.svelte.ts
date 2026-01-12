import type { Snippet } from 'svelte'

class Dialog {
	dialog: HTMLDialogElement = $state(null)
	content: HTMLDivElement = $state(null)
	template: Snippet = $state(null)
	message: string = $state('')
	#isOpen: boolean = $state(false)
	settings = $state({
		accept: 'OK',
		cancel: 'Cancel'
	})

	get isOpen() {
		return this.#isOpen
	}
	set isOpen(value: boolean) {
		this.#isOpen = value
		if (this.dialog) {
			if (value) {
				this.dialog.showModal()
			} else {
				this.dialog.close()
			}
		}
	}
	init(dialog?: HTMLDialogElement) {
		this.dialog = dialog
		this.content = this.dialog?.querySelector('.modal-box') as HTMLDivElement
	}
	close() {
		this.#isOpen = false
	}
	open(msg = '', settings = {}) {
		this.message = msg
		this.settings = { ...this.settings, ...settings }
		this.#isOpen = true
	}
	toggle() {
		if (this.#isOpen) {
			this.close()
		} else {
			this.open()
		}
	}
}
/* FOR DEMO */
const dialog = new Dialog()

export default dialog
