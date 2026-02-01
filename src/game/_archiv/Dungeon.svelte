<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity'
	import { onMount } from 'svelte'
	import * as ROT from 'rot-js'
	import * as PIXI from 'pixi.js'

	// --- 1. Tile-Status & Farben erweitern ---
	const TileType = {
		FLOOR: 0,
		WALL: 1,
		DOOR_CLOSED: 2,
		DOOR_OPEN: 3
	}

	const TILE_COLORS = {
		[TileType.WALL]: 0x444444,
		[TileType.FLOOR]: 0x222222,
		[TileType.DOOR_CLOSED]: 0xaa7744,
		[TileType.DOOR_OPEN]: 0x775533 // Etwas dunkler/geöffneter Look
	}

	const TILE_SIZE = 40
	const MAP_WIDTH = 60
	const MAP_HEIGHT = 40
	const VIEWPORT_WIDTH = TILE_SIZE * 20
	const VIEWPORT_HEIGHT = TILE_SIZE * 14

	// --- States ---
	let gameContainer: HTMLDivElement = $state()
	let player = $state({ x: 0, y: 0 })
	let map = $state<TileType[][]>([])
	let explored = $state<boolean[][]>([])
	let visibleTiles = new SvelteSet<string>()

	let pixiApp: PIXI.Application
	let worldContainer: PIXI.Container
	let tileGraphics: PIXI.Graphics[][] = []
	let playerGraphic: PIXI.Graphics

	function setupGrids() {
		for (let y = 0; y < MAP_HEIGHT; y++) {
			map[y] = new Array(MAP_WIDTH).fill(TileType.WALL)
			explored[y] = new Array(MAP_WIDTH).fill(false)
			tileGraphics[y] = []
		}
	}

	function generateMap() {
		const digger = new ROT.Map.Digger(MAP_WIDTH, MAP_HEIGHT, {
			roomWidth: [3, 8],
			roomHeight: [3, 8],
			corridorLength: [2, 10],
			dugPercentage: 0.2
		})

		// 1. Basis-Layout (Wände und Böden)
		digger.create((x, y, value) => {
			map[y][x] = value === 0 ? TileType.FLOOR : TileType.WALL
			if (value === 0 && player.x === 0) {
				player.x = x
				player.y = y
			}
		})

		// 2. Türen hinzufügen über die Room-Schnittstelle von ROT.js
		const rooms = digger.getRooms()
		rooms.forEach((room) => {
			room.getDoors((x, y) => {
				map[y][x] = TileType.DOOR_CLOSED
			})
		})
	}

	function initVisuals() {
		for (let y = 0; y < MAP_HEIGHT; y++) {
			for (let x = 0; x < MAP_WIDTH; x++) {
				const g = new PIXI.Graphics()
				const type = map[y][x]

				g.rect(0, 0, TILE_SIZE, TILE_SIZE)
				g.fill(TILE_COLORS[type])
				g.x = x * TILE_SIZE
				g.y = y * TILE_SIZE
				g.visible = false

				worldContainer.addChild(g)
				tileGraphics[y][x] = g
			}
		}

		playerGraphic = new PIXI.Graphics()
		playerGraphic.circle(TILE_SIZE / 2, TILE_SIZE / 2, TILE_SIZE / 2.5)
		playerGraphic.fill(0x00ffcc)
		worldContainer.addChild(playerGraphic)
	}

	function updateGameState() {
		const fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
			if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) return false

			const tile = map[y][x]
			// NUR Boden und OFFENE Türen lassen Licht durch
			return tile === TileType.FLOOR || tile === TileType.DOOR_OPEN
		})

		visibleTiles.clear()
		fov.compute(player.x, player.y, 10, (x, y) => {
			visibleTiles.add(`${x},${y}`)
			explored[y][x] = true
		})

		for (let y = 0; y < MAP_HEIGHT; y++) {
			for (let x = 0; x < MAP_WIDTH; x++) {
				const g = tileGraphics[y][x]
				const isVisible = visibleTiles.has(`${x},${y}`)
				const isExplored = explored[y][x]

				if (isVisible) {
					g.visible = true
					g.alpha = 1
				} else if (isExplored) {
					g.visible = true
					g.alpha = 0.2
				} else {
					g.visible = false
				}
			}
		}

		playerGraphic.x = player.x * TILE_SIZE
		playerGraphic.y = player.y * TILE_SIZE
	}

	// Kamera-Lerp und Input bleiben logisch gleich,
	// aber handleInput prüft jetzt gegen TileType
	// function handleInput(e: KeyboardEvent) {
	// 	let dx = 0,
	// 		dy = 0
	// 	if (e.key === 'w' || e.key === 'ArrowUp') dy = -1
	// 	if (e.key === 's' || e.key === 'ArrowDown') dy = 1
	// 	if (e.key === 'a' || e.key === 'ArrowLeft') dx = -1
	// 	if (e.key === 'd' || e.key === 'ArrowRight') dx = 1

	// 	const newX = player.x + dx
	// 	const newY = player.y + dy
	// 	const targetTile = map[newY]?.[newX]

	// 	// Bewegung blockiert bei Wänden
	// 	if (targetTile === TileType.WALL) return

	// 	// Interaktion mit Türen: Wenn geschlossen, erst öffnen
	// 	if (targetTile === TileType.DOOR_CLOSED) {
	// 		map[newY][newX] = TileType.DOOR_OPEN
	// 		// Grafik-Update für das spezifische Tile
	// 		const g = tileGraphics[newY][newX]
	// 		g.clear()
	// 		g.rect(0, 0, TILE_SIZE, TILE_SIZE)
	// 		g.fill(TILE_COLORS[TileType.DOOR_OPEN])

	// 		updateGameState()
	// 		return // Kostet den Spielzug (optional)
	// 	}

	// 	// Normale Bewegung
	// 	if (targetTile === TileType.FLOOR || targetTile === TileType.DOOR_OPEN) {
	// 		player.x = newX
	// 		player.y = newY
	// 		updateGameState()
	// 	}
	// }
	function handleInput(e: KeyboardEvent) {
		let dx = 0,
			dy = 0
		if (e.key === 'w' || e.key === 'ArrowUp') dy = -1
		if (e.key === 's' || e.key === 'ArrowDown') dy = 1
		if (e.key === 'a' || e.key === 'ArrowLeft') dx = -1
		if (e.key === 'd' || e.key === 'ArrowRight') dx = 1

		const newX = player.x + dx
		const newY = player.y + dy

		// Boundary Check
		if (!map[newY] || map[newY][newX] === undefined) return

		const targetTile = map[newY][newX]

		// Logik: Wenn es eine geschlossene Tür ist
		if (targetTile === TileType.DOOR_CLOSED) {
			// 1. Status im Daten-Grid ändern
			map[newY][newX] = TileType.DOOR_OPEN

			// 2. Grafik-Objekt aktualisieren
			const g = tileGraphics[newY][newX]
			g.clear() // Löscht die alte "Wand/Tür"-Grafik
			g.rect(0, 0, TILE_SIZE, TILE_SIZE)
			g.fill(TILE_COLORS[TileType.DOOR_OPEN]) // Neue Farbe füllen

			// 3. Sichtfeld neu berechnen, da man nun durchsehen kann
			updateGameState()
			return // Stoppt hier, damit man nicht im selben Frame durchläuft (optional)
		}

		// Normale Bewegung (Boden oder bereits offene Tür)
		if (targetTile === TileType.FLOOR || targetTile === TileType.DOOR_OPEN) {
			player.x = newX
			player.y = newY
			updateGameState()
		}
	}

	function lerpCamera() {
		const targetX = VIEWPORT_WIDTH / 2 - player.x * TILE_SIZE - TILE_SIZE / 2
		const targetY = VIEWPORT_HEIGHT / 2 - player.y * TILE_SIZE - TILE_SIZE / 2

		worldContainer.x += (targetX - worldContainer.x) * 0.1
		worldContainer.y += (targetY - worldContainer.y) * 0.1

		worldContainer.x = Math.max(
			Math.min(worldContainer.x, 0),
			-(MAP_WIDTH * TILE_SIZE - VIEWPORT_WIDTH)
		)
		worldContainer.y = Math.max(
			Math.min(worldContainer.y, 0),
			-(MAP_HEIGHT * TILE_SIZE - VIEWPORT_HEIGHT)
		)
	}

	onMount(async () => {
		if (!gameContainer) return
		pixiApp = new PIXI.Application()
		await pixiApp.init({
			width: VIEWPORT_WIDTH,
			height: VIEWPORT_HEIGHT,
			backgroundColor: 0x0a0a0a
		})
		gameContainer.appendChild(pixiApp.canvas)

		worldContainer = new PIXI.Container()
		pixiApp.stage.addChild(worldContainer)

		setupGrids()
		generateMap()
		initVisuals()
		updateGameState()

		window.addEventListener('keydown', handleInput)
		pixiApp.ticker.add(lerpCamera)

		return () => {
			window.removeEventListener('keydown', handleInput)
			pixiApp.destroy(true)
		}
	})
</script>

<section class="page center">
	<div bind:this={gameContainer} id="game-container"></div>
</section>

<style>
	#game-container {
		border: 2px solid #333;
		line-height: 0;
	}
</style>
