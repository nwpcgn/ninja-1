const a = [
	{
		type: 'blank',
		char: ' ',
		bg: 'transparent',
		fg: 'transparent',
		hidden: true,
		wakable: false
	},
	{
		type: 'wall',
		char: '#',
		bg: '#0426BA',
		fg: '#ecf0f1',
		hidden: false,
		wakable: false
	},
	{
		type: 'floor',
		char: '.',
		bg: '#0480BA',
		fg: '#ecf0f1',
		hidden: false,
		wakable: true
	},
	{
		type: 'door',
		char: '/',
		bg: '#c0392b',
		fg: '#ecf0f1',
		hidden: false,
		wakable: true
	},
	{
		type: 'step',
		char: 'S',
		bg: '#0480BA',
		fg: '#f7d51d',
		hidden: false,
		wakable: true
	},
	{
		type: 'item',
		char: '?',
		bg: '#0480BA',
		fg: '#f7d51d',
		hidden: false,
		wakable: true
	},
	{
		type: 'monster',
		char: 'M',
		bg: '#0480BA',
		fg: '#f7d51d',
		hidden: false,
		wakable: true
	}
]

const atlas = Object.fromEntries(
	a.map(({ type, char, bg, fg, hidden, wakable }) => [
		char,
		{ type, char, bg, fg, hidden, wakable }
	])
)
export const atlasKeys = Object.keys(a[0]).join(', ')
export const symbols = Object.fromEntries(
	a.map(({ type, char, bg, fg, hidden, wakable }) => [type, char])
)

export const tileAtlas = atlas
const FALLBACK_TILE = {
	fg: '#fff',
	bg: '#000',
	hidden: true,
	wakable: false
}
export const getTile = (char) => tileAtlas[char] ?? FALLBACK_TILE
export const parseKey = (str) => str.split(',').map(Number)
export const randNum = (min = 0, max = 1) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}
export const getKey = (x, y) => `${x},${y}`
export default atlas
