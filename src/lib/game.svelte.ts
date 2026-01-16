import type { FighterType, Move } from './types'
import getFighter from './utils/getFighter'
export const blankFighter = {
	id: '',
	name: ' ',
	info: ' ',
	hp: 0,
	atc: 0,
	def: 0,
	level: 0,
	img: 'https://i.imgur.com/y2HlfrZ.png',
	avatar: 'https://i.imgur.com/by2a1zX.png',
	moves: [{ name: ' ', dice: 0, damage: 0, info: ' ' }]
}
export class Fighter {
	id: string = $state('')
	name: string = $state('')
	info: string = $state('')
	hp: number = $state(0)
	maxHp: number = $state(0)
	atc: number = $state(0)
	def: number = $state(0)
	level: number = $state(0)
	img: string = $state('https://i.imgur.com/rylze1Q.png')
	avatar: string = $state('https://i.imgur.com/msl9MJN.png')
	moves: Move[] = $state([])
	xp: number = $state(0)
	constructor(obj: FighterType) {
		this.id = obj.id
		this.name = obj.name
		this.info = obj.info
		this.maxHp = obj.hp
		this.hp = this.maxHp
		this.atc = obj.atc
		this.def = obj.def
		this.level = obj.level
		this.img = obj.img
		this.avatar = obj.avatar
		this.moves = obj.moves
		this.xp = 0
	}

	takeDamage(damage: number) {
		this.hp = Math.max(0, this.hp - damage)
	}
	isAlive() {
		return this.hp > 0
	}
}

class Player {
	hero: FighterType = $state(null)
	constructor() {
		this.init()
	}

	init() {
		this.hero = new Fighter(getFighter())
	}
}

export const player = new Player(getFighter())

export const viewMap = {
	select: {
		slug: 'select',
		badge: 'Hero',
		title: 'Select your Hero'
	},
	find: {
		slug: 'find',
		badge: 'Monster',
		title: 'Find an Opponent'
	},
	battle: {
		slug: 'battle',
		badge: 'Battle',
		title: 'Battle Ground'
	},
	result: {
		slug: 'result',
		badge: 'Result',
		title: 'Fight Ended'
	}
}
class View {
	slugs = $state.raw(Object.keys(viewMap))
	views = $state.raw(Object.values(viewMap))
	#current = $state(Object.keys(viewMap)[0])
	view = $derived(viewMap[this.#current])
	get current() {
		return this.#current
	}
	set current(value: string) {
		if (this.slugs.includes(value)) {
			this.#current = value
		}
	}
}

export const view = new View()
