import * as PIXI from 'pixi.js'
import { SvelteSet } from 'svelte/reactivity'
export class GameState {
	width = 60
	height = 40

	// States
	player = $state({ x: 0, y: 0 })
	map = $state<number[][]>([])
	explored = $state<boolean[][]>([])
	items = $state<any[]>([])
	visibleTiles = $state(new SvelteSet<string>())
	monsters = $state<Entity[]>([])

	constructor() {
		// Initialisiere leere Grids
		for (let y = 0; y < this.height; y++) {
			this.map[y] = new Array(this.width).fill(1)
			this.explored[y] = new Array(this.width).fill(false)
		}
	}

	isWalkable(x: number, y: number) {
		if (y < 0 || y >= this.height || x < 0 || x >= this.width) return false
		return this.map[y][x] === 0
	}

	// Hilfsfunktion: Ist ein Feld durch ein Monster blockiert?
	isOccupied(x: number, y: number) {
		return this.monsters.some((m) => m.x === x && m.y === y)
	}

	movePlayer(x: number, y: number) {
		this.player.x = x
		this.player.y = y
	}
}

export const game = new GameState()

export class Entity {
	x = $state(0)
	y = $state(0)
	hp = $state(10)
	name: string
	sprite: PIXI.Graphics

	constructor(
		x: number,
		y: number,
		name: string,
		color: number,
		world: PIXI.Container,
		tileSize: number
	) {
		this.x = x
		this.y = y
		this.name = name

		// Visuelle Darstellung in Pixi
		this.sprite = new PIXI.Graphics()
		this.sprite.circle(tileSize / 2, tileSize / 2, tileSize / 3)
		this.sprite.fill(color)
		this.sprite.x = x * tileSize
		this.sprite.y = y * tileSize
		this.sprite.visible = false // Startet im Nebel
		world.addChild(this.sprite)
	}

	// Einfache KI: Bewege dich auf den Spieler zu
	updateAI() {
		const dx = Math.sign(game.player.x - this.x)
		const dy = Math.sign(game.player.y - this.y)

		const nextX = this.x + dx
		const nextY = this.y + dy

		// Nur bewegen, wenn das Feld frei ist und kein Spieler dort steht
		if (
			game.isWalkable(nextX, nextY) &&
			!(nextX === game.player.x && nextY === game.player.y)
		) {
			this.x = nextX
			this.y = nextY
			this.syncSprite()
		}
	}

	syncSprite() {
		// Hier könnten wir später eine Animation einbauen
		this.sprite.x = this.x * 32
		this.sprite.y = this.y * 32
	}
}
