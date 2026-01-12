<script lang="ts">
	import { getTile } from './atlas'
	import { dungeon } from './dungeon.svelte.ts'
	let { ts = 50, fs = 16 } = $props()
	let canvas = $state()
	let ctx = $state()
	let camera = $state({
		x: 0,
		y: 0,
		frameWidth: fs,
		frameHeight: fs
	})
	let player = $derived({
		x: dungeon.position.x, // tile x
		y: dungeon.position.y, // tile y
		char: '@'
	})

	/* ---------------------------------- DRAW ---------------------------------- */

	const drawMap = () => {
		ctx.font = `${ts * 0.8}px monospace`
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'

		for (let y = camera.y; y < camera.y + camera.frameHeight; y++) {
			const row = dungeon.map[y]
			if (!row) continue

			for (let x = camera.x; x < camera.x + camera.frameWidth; x++) {
				let char = row[x]
				const tile = getTile(char)
				if (!tile) continue
				if (tile.char) char = tile.char

				const px = (x - camera.x) * ts
				const py = (y - camera.y) * ts
				if (!dungeon.inRange(x, y)) continue
				ctx.fillStyle = tile.bg
				ctx.fillRect(px, py, ts, ts)

				ctx.fillStyle = tile.fg
				ctx.fillText(char, px + ts / 2, py + ts / 2)
			}
		}
	}

	const drawPlayer = () => {
		// Liegt der Player außerhalb des Camera-Frames? → nicht rendern
		if (
			player.x < camera.x ||
			player.y < camera.y ||
			player.x >= camera.x + camera.frameWidth ||
			player.y >= camera.y + camera.frameHeight
		) {
			return
		}

		const tile = getTile(player.char)

		const px = (player.x - camera.x) * ts
		const py = (player.y - camera.y) * ts

		// Optional: Hintergrund (meist transparent)
		if (tile.bg) {
			ctx.fillStyle = tile.bg
			ctx.fillRect(px, py, ts, ts)
		}

		// Player Glyph
		ctx.fillStyle = tile.fg
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillText(player.char, px + ts / 2, py + ts / 2)
	}

	const draw = async () => {
		if (!ctx) return
		ctx.clearRect(0, 0, canvas?.width, canvas?.height)
		drawMap()
		drawPlayer()
	}

	/* --------------------------------- UPDATE --------------------------------- */
	const updateCamera = () => {
		const mapHeight = dungeon.map.length
		const mapWidth = dungeon.map[0].length
		// Ziel: Player zentrieren
		let cx = player.x - Math.floor(camera.frameWidth / 2)
		let cy = player.y - Math.floor(camera.frameHeight / 2)

		// Clamp X
		cx = Math.max(0, Math.min(cx, mapWidth - camera.frameWidth))
		// Clamp Y
		cy = Math.max(0, Math.min(cy, mapHeight - camera.frameHeight))

		camera.x = cx
		camera.y = cy
	}
	/* ---------------------------------- INIT ---------------------------------- */
	const initCanvas = () => {
		if (!canvas) return
		canvas.width = camera.frameWidth * ts
		canvas.height = camera.frameHeight * ts
		ctx = canvas.getContext('2d')
		if (!ctx) return
		draw()
	}

	$effect(() => {
		if (canvas) {
			initCanvas(ts, fs, dungeon.config)
			updateCamera(dungeon.position)
			// computeFOV(player.x, player.y)
		}
	})

	const onKeyDown = (e) => {
		let dx = 0
		let dy = 0

		switch (e.key) {
			case 'ArrowUp':
				dy = -1
				break
			case 'ArrowDown':
				dy = 1
				break
			case 'ArrowLeft':
				dx = -1
				break
			case 'ArrowRight':
				dx = 1
				break
			default:
				return // andere Tasten ignorieren
		}

		e.preventDefault() // kein Scrollen
		dungeon.moveHero(dx, dy)
	}
</script>

<svelte:window onkeydown={onKeyDown} />
<div class="rounded-box bg-neutral/70">
	<canvas bind:this={canvas}></canvas>
</div>
