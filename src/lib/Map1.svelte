<script lang="ts">
	import * as ROT from 'rot-js'
	import { onMount } from 'svelte'
	import { game, Entity } from './game.svelte.ts'
	import { PixiManager } from './pixiManager'
	import { MapGenerator } from './mapGenerator'

	let canvasTarget: HTMLDivElement
	const pixi = new PixiManager(game.width, game.height)
	const TILE_SIZE = 40

	function updateFOV() {
		const fov = new ROT.FOV.PreciseShadowcasting((x, y) =>
			game.isWalkable(x, y)
		)

		// Wir erstellen ein temporäres Set
		const nextVisible = new Set<string>()
		// ... fov.compute füllt nextVisible ...
		game.visibleTiles = nextVisible

		fov.compute(game.player.x, game.player.y, 10, (x, y) => {
			nextVisible.add(`${x},${y}`)
			if (y >= 0 && y < game.height && x >= 0 && x < game.width) {
				game.explored[y][x] = true
			}
		})

		// WICHTIG: Wir weisen das Set neu zu, damit Svelte die Änderung erkennt
		game.visibleTiles = nextVisible
	}

	onMount(async () => {
		await pixi.init(canvasTarget, 800, 600)

		// Map generieren
		const { map, rooms, startPos } = MapGenerator.generate()

		// Game State aktualisieren
		game.map = map
		rooms.slice(1).forEach((room) => {
			const [x, y] = room.getCenter()
			const monster = new Entity(
				x,
				y,
				'Orc',
				0xff0000,
				pixi.worldContainer,
				TILE_SIZE
			)
			game.monsters.push(monster)
		})
		game.player = startPos

		// Pixi Visuals initialisieren
		for (let y = 0; y < game.height; y++) {
			for (let x = 0; x < game.width; x++) {
				pixi.createTile(x, y, game.map[y][x] === 1, TILE_SIZE)
			}
		}

		// Initiales FOV und Player Graphic
		pixi.createPlayer(startPos.x, startPos.y, TILE_SIZE)
		updateFOV()

		// // In onMount:
		pixi.app.ticker.add(() => {
			// Kamera smooth folgen lassen
			pixi.updateCamera(game.player.x, game.player.y, TILE_SIZE, 800, 600)

			// Spieler-Grafik hart auf die Grid-Position setzen
			if (pixi.playerGraphic) {
				pixi.playerGraphic.x = game.player.x * TILE_SIZE
				pixi.playerGraphic.y = game.player.y * TILE_SIZE
			}
		})
	})

	async function handleKeyDown(e: KeyboardEvent) {
		let moved = false
		let dx = 0,
			dy = 0

		if (e.key === 'ArrowUp') {
			dy = -1
			moved = true
		}
		if (e.key === 'ArrowDown') {
			dy = 1
			moved = true
		}
		if (e.key === 'ArrowLeft') {
			dx = -1
			moved = true
		}
		if (e.key === 'ArrowRight') {
			dx = 1
			moved = true
		}

		if (moved) {
			const nextX = game.player.x + dx
			const nextY = game.player.y + dy

			if (game.isWalkable(nextX, nextY)) {
				game.movePlayer(nextX, nextY)

				// NACH der Spielerbewegung sind die Monster dran
				processEnemyTurns()
				updateFOV()
			}

			e.preventDefault()
		}
	}

	function processEnemyTurns() {
		game.monsters.forEach((monster) => {
			monster.updateAI()
		})
	}

	$effect(() => {
		// Wir greifen auf eine reaktive Eigenschaft zu, um den Effekt zu triggern
		// In Svelte 5 lösen wir den Effekt aus, indem wir game.visibleTiles "beobachten"
		const _trigger = game.visibleTiles

		// 1. Map-Tiles synchronisieren
		for (let y = 0; y < game.height; y++) {
			for (let x = 0; x < game.width; x++) {
				const g = pixi.tileGraphics[y][x]
				if (!g) continue

				const isVisible = game.visibleTiles.has(`${x},${y}`)
				const isExplored = game.explored[y][x]

				if (isVisible) {
					g.visible = true
					g.alpha = 1
				} else if (isExplored) {
					g.visible = true
					g.alpha = 0.2 // Gedimmte Ansicht für erkundete Bereiche
				} else {
					g.visible = false
				}
			}
		}

		// 2. Items synchronisieren
		game.items.forEach((item) => {
			if (item.sprite) {
				const isVisible = game.visibleTiles.has(`${item.x},${item.y}`)
				const isExplored = game.explored[item.y][item.x]

				if (isVisible) {
					item.sprite.visible = true
					item.sprite.alpha = 1
				} else if (isExplored) {
					item.sprite.visible = true
					item.sprite.alpha = 0.4
				} else {
					item.sprite.visible = false
				}
			}
		})

		// 3. Monster synchronisieren (falls vorhanden)
		game.monsters.forEach((monster) => {
			if (monster.sprite) {
				const isVisible = game.visibleTiles.has(`${monster.x},${monster.y}`)
				// Monster sind im Gegensatz zu Items meist nicht sichtbar,
				// wenn sie nur "erkundet" sind (Fog of War)
				monster.sprite.visible = isVisible
			}
		})
	})

	$effect(() => {
		if (pixi.playerGraphic) {
			pixi.playerGraphic.x = game.player.x * TILE_SIZE
			pixi.playerGraphic.y = game.player.y * TILE_SIZE
		}
	})
</script>

<svelte:window onkeydown={handleKeyDown} />

<main class="main">
	<section class="page page-grow nwp">
		<div bind:this={canvasTarget}></div>
	</section>
</main>
<aside class="aside">
	<section class="panel w-[220px]">
		<article><span>Aside / Panel</span></article>
	</section>
</aside>
