export const MAP_WIDTH = 60
export const MAP_HEIGHT = 40

class Player {
	#x: number = $state(0)
	#y: number = $state(0)

	get x() {
		return this.#x
	}

	get y() {
		return this.#y
	}

	set x(value) {
		this.#x = Math.max(0, Math.min(MAP_WIDTH - 1, value))
	}

	set y(value) {
		this.#y = Math.max(0, Math.min(MAP_HEIGHT - 1, value))
	}

	reset() {
		this.#x = 0
		this.#y = 0
	}
}

export const player = new Player()
