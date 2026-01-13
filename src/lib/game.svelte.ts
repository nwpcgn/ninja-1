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
}
