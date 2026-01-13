import * as ROT from 'rot-js'
import generateMap from './generateMap'
import type { DungeonMap } from './types'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const key = (x, y) => `${x},${y}`
const walkable = ['x', '.', '+', 's', '_', '?', 'M']

class Dungeon {
	config = $state({
		width: 42,
		height: 36,
		type: 'Uniform',
		options: {
			roomWidth: [3, 6] /* room minimum and maximum width */,
			roomHeight: [3, 5] /* room minimum and maximum height */,
			corridorLength: [2, 10] /* corridor minimum and maximum length */,
			dugPercentage: 0.2 /* we stop after this percentage of level area has been dug out */,
			timeLimit: 1000 /* we stop after this much time has passed (msec) */
		}
	})
	map: string[][] = $state()
	rooms: string[][] = $state()
	freeCells: string[] = $state([])
	items: string[] = $state([])
	enemys: string[] = $state([])
	position = $state({ x: 0, y: 0 })
	constructor(config = {}) {
		this.config = { ...this.config, ...config }
		this.create(this.config)
	}
	create(ops = {}) {
		const options = { ...this.config, ...ops }
		const data: DungeonMap = generateMap(
			options.width,
			options.height,
			options.type,
			options.options
		)
		this.map = data.map
		this.freeCells = data.freeCells
		this.rooms = data.rooms
		this.items = data.items
		this.enemys = data.enemys
		this.position = data.position
	}
	info() {
		return {
			map: `${this.map[0].length}x${this.map.length}`,
			hero: `${this.position.x}x${this.position.y}`,
			rooms: this.rooms.length,
			items: this.items.length,
			monster: this.enemys.length
		}
	}

	inRange(x1 = 0, y1 = 0) {
		const d = Math.hypot(this.position.x - x1, this.position.y - y1)
		return d < 6.5
	}

	updateSettings(config = {}) {
		this.config = { ...this.config, ...config }
		this.create(this.config)
	}

	isPassable(x = 0, y = 0) {
		return walkable.includes(this.map[y][x])
	}
	isItem(x = 0, y = 0) {
		return this.items.includes(key(x, y))
	}
	isMonster(x = 0, y = 0) {
		return this.enemys.includes(key(x, y))
	}
	moveHero(dx: number, dy: number) {
		const newX = this.position.x + dx
		const newY = this.position.y + dy

		if (
			newX >= 0 &&
			newX < this.config.width &&
			newY >= 0 &&
			newY < this.config.height
		) {
			const slug = this.map[newY][newX]
			if (!this.isPassable(newX, newY)) return
			if (slug === '+') {
				this.map[newY][newX] = '.'
			}
			if (this.isItem(newX, newY)) {
				this.items = this.items.filter((d) => d !== key(newX, newY))
				console.log('Item', key(newX, newY))
				this.map[newY][newX] = '.'
			}
			if (this.isMonster(newX, newY)) {
				this.enemys = this.enemys.filter((d) => d !== key(newX, newY))
				console.log('Monster', key(newX, newY))
				this.map[newY][newX] = '.'
			}
			this.position.x = newX
			this.position.y = newY
		}
	}
}

export const dungeon = new Dungeon()

const displayOptions = {
	bg: 'white',
	fg: 'dimGrey',
	fontFamily: 'Fira Code',
	width: 35,
	height: 25,
	fontSize: 18,
	forceSquareRatio: true
}

// class Game {
// 	win = $state(false)
// 	display = $state(null)
// 	dungeon = $state(null)

// 	async init(elem) {
// 		await sleep(500)
// 		this.dungeon = new Dungeon()
// 		this.display = new ROT.Display(displayOptions)
// 		elem.appendChild(this.display.getContainer())
// 		this.display.clear()
// 		// this.createLevel();
// 		// this.player.init();
// 		// this.engine();
// 		// this.draw();
// 	}
// }
