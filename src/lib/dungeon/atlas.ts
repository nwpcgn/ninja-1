export const atlasA = [
	{
		slug: 'outside',
		col: ' ',
		fg: 'transparent',
		bg: 'transparent',
		wakable: false,
		char: ' '
	},
	{
		slug: 'wall',
		col: '#',
		fg: 'oklch(70.4% 0.04 256.788)',
		bg: 'oklch(12.9% 0.042 264.695)',
		wakable: false,
		char: '#'
	},
	{
		slug: 'floor',
		col: 'x',
		fg: 'oklch(92.4% 0.12 95.746)',
		bg: 'oklch(21% 0.034 264.665)',
		wakable: true,
		char: '.'
	},
	{
		slug: 'room',
		col: '.',
		fg: 'oklch(27.9% 0.041 260.031)',
		bg: 'oklch(20.8% 0.042 265.755)',
		wakable: true,
		char: '.'
	},
	{
		slug: 'door',
		col: '+',
		fg: 'oklch(63.7% 0.237 25.331)',
		bg: 'oklch(20.8% 0.042 265.755)',
		wakable: true,
		char: '+'
	},
	{
		slug: 'step',
		col: 's',
		fg: 'oklch(65.6% 0.241 354.308)',
		bg: 'oklch(20.8% 0.042 265.755)',
		wakable: true,
		char: 's'
	},
	{
		slug: 'item',
		col: '?',
		bg: 'oklch(20.8% 0.042 265.755)',
		fg: 'oklch(82.8% 0.189 84.429)',
		wakable: true,
		char: '?'
	},
	{
		slug: 'monster',
		col: 'M',
		bg: 'oklch(20.8% 0.042 265.755)',
		fg: 'oklch(69.6% 0.17 162.48)',
		wakable: true,
		char: 'M'
	},
	{
		slug: 'hero',
		col: '@',
		bg: 'oklch(20.8% 0.042 265.755)',
		fg: 'oklch(68.5% 0.169 237.323)',
		wakable: true,
		char: '@'
	}
]
export const atlas = Object.fromEntries(atlasA.map((user) => [user.col, user]))

export const sym = Object.fromEntries(
	atlasA.map((user) => [user.slug, user.col])
)

export const tiles = {
	'4': '#', // horizontal
	'5': '#', // vertical
	'6': '#' // corner
}

const FALLBACK_TILE = {
	fg: '#fff',
	bg: '#000',
	walkable: false
}
export const getTile = (char) => atlas[char] ?? FALLBACK_TILE
