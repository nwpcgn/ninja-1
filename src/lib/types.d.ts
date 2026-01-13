export interface FighterType {
	name: string
	info: string
	hp: number
	maxHp: number
	atc: number
	def: number
	level: number
	xp: number
	moves: Move[]
}
export interface Move {
	name: string
	dice: number
	damage: number
	info: string
}
