<script lang="ts">
	import { dungeon } from './dungeon.svelte.js'
	let { ts = 5 } = $props()
	let canvas = $state()
	let ctx = $state()

	let player = $derived({
		x: dungeon.position.x, // tile x
		y: dungeon.position.y, // tile y
		char: '@'
	})

	/* ---------------------------------- DRAW ---------------------------------- */

	const drawMap = () => {
		dungeon.map.forEach((row, y) => {
			row.forEach((col, x) => {
				if (col !== ' ' && col !== '#') {
					ctx.fillStyle = '#ffffff'
					ctx.fillRect(x * ts, y * ts, ts, ts)
				}
			})
		})
	}
	const drawPlayer = () => {
		const px = player.x * ts
		const py = player.y * ts

		ctx.fillStyle = 'red'
		ctx.fillRect(px, py, ts, ts)
	}

	const draw = async () => {
		if (!ctx) return
		ctx.clearRect(0, 0, canvas?.width, canvas?.height)
		drawMap()
		drawPlayer()
	}

	/* ---------------------------------- INIT ---------------------------------- */
	const initCanvas = () => {
		if (!canvas) return
		canvas.width = dungeon.map[0].length * ts
		canvas.height = dungeon.map.length * ts
		ctx = canvas.getContext('2d')
		if (!ctx) return
		draw()
	}

	$effect(() => {
		if (canvas) {
			initCanvas(ts)
		}
	})
</script>

<div class="bg-base-200 rounded-box">
	<canvas bind:this={canvas}></canvas>
</div>
