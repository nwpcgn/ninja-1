<script lang="ts">
	import { onMount } from 'svelte'
	import * as ROT from 'rot-js'
	import * as PIXI from 'pixi.js'

	const TILE_SIZE = 40
	const MAP_WIDTH = 60
	const MAP_HEIGHT = 40
	const VIEWPORT_WIDTH = TILE_SIZE * 20
	const VIEWPORT_HEIGHT = TILE_SIZE * 14

	// --- States ---
	let player = $state({ x: 0, y: 0 })
	let map = $state<number[][]>([]) // Zugriff via map[y][x]
	let explored = $state<boolean[][]>([]) // Zweites Grid für den Nebel
	let visibleTiles = $state(new Set<string>()) // Set für schnellen FOV-Check bleibt effizient

	let pixiApp: PIXI.Application
	let worldContainer: PIXI.Container
	let tileGraphics: PIXI.Graphics[][] = [] // Referenzen für direkte Updates
	let playerGraphic: PIXI.Graphics

	onMount(async () => {
		pixiApp = new PIXI.Application()
		await pixiApp.init({
			width: VIEWPORT_WIDTH,
			height: VIEWPORT_HEIGHT,
			backgroundColor: 0x0a0a0a
		})
		document.getElementById('game-container')?.appendChild(pixiApp.canvas)

		worldContainer = new PIXI.Container()
		pixiApp.stage.addChild(worldContainer)

		setupGrids()
		generateMap()
		initVisuals()
		updateGameState()

		window.addEventListener('keydown', handleInput)

		pixiApp.ticker.add(() => {
			lerpCamera()
		})
		return () => pixiApp.destroy(true)
	})

	function setupGrids() {
		// Grids mit Standardwerten füllen
		for (let y = 0; y < MAP_HEIGHT; y++) {
			map[y] = new Array(MAP_WIDTH).fill(1) // 1 = Wall
			explored[y] = new Array(MAP_WIDTH).fill(false)
			tileGraphics[y] = []
		}
	}

	function generateMap() {
		const digger = new ROT.Map.Digger(MAP_WIDTH, MAP_HEIGHT)
		digger.create((x, y, value) => {
			map[y][x] = value // value 0 = Floor, 1 = Wall
			if (value === 0 && player.x === 0) {
				player.x = x
				player.y = y
			}
		})
	}

	function initVisuals() {
		for (let y = 0; y < MAP_HEIGHT; y++) {
			for (let x = 0; x < MAP_WIDTH; x++) {
				const g = new PIXI.Graphics()
				const isWall = map[y][x] === 1

				g.rect(0, 0, TILE_SIZE, TILE_SIZE)
				g.fill(isWall ? 0x444444 : 0x222222)
				g.x = x * TILE_SIZE
				g.y = y * TILE_SIZE
				g.visible = false

				worldContainer.addChild(g)
				tileGraphics[y][x] = g
			}
		}
		playerGraphic = new PIXI.Graphics()
		playerGraphic.circle(TILE_SIZE / 2, TILE_SIZE / 2, TILE_SIZE / 2.5)
		playerGraphic.fill(0x00ffcc) // Moderner Cyan-Ton
		worldContainer.addChild(playerGraphic)
	}

	function updateGameState() {
		// FOV Berechnung
		const fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
			// Sicherstellen, dass wir innerhalb des Arrays prüfen
			if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) return false
			return map[y][x] === 0
		})

		visibleTiles.clear()
		fov.compute(player.x, player.y, 10, (x, y) => {
			visibleTiles.add(`${x},${y}`)
			explored[y][x] = true
		})

		// Visuelle Synchronisation
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
		// Kamera Update aufrufen
		// centerCamera()
	}

	function lerpCamera() {
		// Ziel: Spieler in die Mitte des Viewports setzen
		const targetX = VIEWPORT_WIDTH / 2 - player.x * TILE_SIZE - TILE_SIZE / 2
		const targetY = VIEWPORT_HEIGHT / 2 - player.y * TILE_SIZE - TILE_SIZE / 2

		// Sanftes herangleiten (0.1 = 10% des Weges pro Frame)
		worldContainer.x += (targetX - worldContainer.x) * 0.1
		worldContainer.y += (targetY - worldContainer.y) * 0.1

		// Begrenzung (Clamping), damit die Kamera nicht aus der Map fährt
		worldContainer.x = Math.max(
			Math.min(worldContainer.x, 0),
			-(MAP_WIDTH * TILE_SIZE - VIEWPORT_WIDTH)
		)

		worldContainer.y = Math.max(
			Math.min(worldContainer.y, 0),
			-(MAP_HEIGHT * TILE_SIZE - VIEWPORT_HEIGHT)
		)
	}

	function handleInput(e: KeyboardEvent) {
		let dx = 0,
			dy = 0
		if (e.key === 'ArrowUp') dy = -1
		if (e.key === 'ArrowDown') dy = 1
		if (e.key === 'ArrowLeft') dx = -1
		if (e.key === 'ArrowRight') dx = 1

		const newX = player.x + dx
		const newY = player.y + dy

		// Array-Check: Ist das Zielfeld begehbar?
		if (map[newY] && map[newY][newX] === 0) {
			player.x = newX
			player.y = newY
			updateGameState()
		}
	}
</script>

<section class="page center nwp">
	<div id="game-container"></div>
</section>
