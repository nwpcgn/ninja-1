<script lang="ts">
	import * as ROT from 'rot-js'
	let { children } = $props()
	let element: HTMLDivElement = $state(null)
	let settings = $state({
		width: 50,
		height: 40,
		type: 'Uniform',
		options: {
			roomWidth: [4, 8] /* room minimum and maximum width */,
			roomHeight: [4, 6] /* room minimum and maximum height */,
			corridorLength: [3, 10] /* corridor minimum and maximum length */,
			dugPercentage: 0.2 /* we stop after this percentage of level area has been dug out */,
			timeLimit: 1000 /* we stop after this much time has passed (msec) */
		}
	})
	const displayOptions = {
		bg: 'white',
		fg: 'dimGrey',
		fontFamily: 'Fira Mono',
		width: 35,
		height: 25,
		fontSize: 18,
		forceSquareRatio: true
	}

	const colors = {
		'.': 'lightgrey'
	}

	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

	class Game {
		win = $state(false)
		display = $state(null)
		player = $state(null)
		world = $state(null)
		enemies = $state([])
		constructor() {
			this.win = false
			this.display = null
			this.player = new Player(this)
			this.world = new GameWorld(this)
			this.enemies = [] // Gegnerliste, falls du welche hinzufügen willst
		}

		async init(elem: HTMLElement) {
			if (!elem) return
			await sleep(500)
			this.display = new ROT.Display(displayOptions)
			elem.appendChild(this.display.getContainer())

			this.display.clear()
			this.createLevel()
			this.player.init()
			this.engine()
			this.draw()
		}

		async engine() {
			while (true) {
				await this.player.act()
				this.enemies.forEach((enemy) => enemy.act())
				this.draw()
			}
		}

		createLevel() {
			this.world.generate()

			// Gegnerliste zurücksetzen
			this.enemies = []

			// Beispiel: 3 Gegner hinzufügen
			for (let i = 0; i < 3; i++) {
				const cell = this.world.freeCells.pop()
				const enemy = new Enemy(this, cell.x, cell.y)
				this.enemies.push(enemy)
			}
		}

		draw() {
			this.display.clear()
			this.world.draw()
			this.player.draw()
			this.enemies.forEach((enemy) => enemy.draw())
		}

		endGame() {
			this.win = true
			this.display.clear()
			this.display.draw(8, 8, 'You logged the rocket!', 'violet')
		}
	}

	class GameWorld {
		constructor(game) {
			this.game = game
			this.map = []
			this.freeCells = []
		}

		generate() {
			const map = Array.from({ length: displayOptions.width }, () =>
				Array(displayOptions.height).fill('+')
			)

			const freeCells = []
			const digger = new ROT.Map.Cellular(
				displayOptions.width - 2,
				displayOptions.height - 2
			)

			digger.randomize(0.3)
			digger.create((x, y, value) => {
				if (value) {
					map[x + 1][y + 1] = '🌖'
				} else {
					freeCells.push({ x: x + 1, y: y + 1 })
					map[x + 1][y + 1] = '.'
				}
			})

			const lastFreeCell = freeCells.pop()
			map[lastFreeCell.x][lastFreeCell.y] = '🌍'

			this.map = map
			this.freeCells = freeCells
			this.game.player.justMoved = false
		}

		isPassable(x, y) {
			return !['+', '🌖'].includes(this.map[x][y])
		}

		draw() {
			this.map.forEach((row, x) =>
				row.forEach((cell, y) => {
					this.game.display.draw(x, y, cell, colors[cell] || 'red')
				})
			)
		}
	}

	class Player {
		constructor(game) {
			this.game = game
			this.x = null
			this.y = null
			this.justMoved = false
		}

		init() {
			const { x, y } = this.game.world.freeCells[0]
			this.x = x
			this.y = y
		}

		draw() {
			this.game.display.draw(this.x, this.y, '🚀', 'black')
		}

		async act() {
			let action = false
			while (!action) {
				await sleep(100)
				const e = await new Promise((resolve) =>
					window.addEventListener('keydown', resolve, { once: true })
				)
				action = this.handleKey(e)
			}

			if (this.game.world.map[this.x][this.y] === '🌍') {
				this.game.endGame()
				this.game.createLevel()
				this.init()
			}
		}

		handleKey(e) {
			const keyMap = {
				ArrowUp: 0,
				ArrowRight: 2,
				ArrowDown: 4,
				ArrowLeft: 6,
				w: 0,
				d: 2,
				s: 4,
				a: 6
			}

			const dirIndex = keyMap[e.key]
			if (dirIndex === undefined) return false

			const [dx, dy] = ROT.DIRS[8][dirIndex]
			if (this.game.world.isPassable(this.x + dx, this.y + dy)) {
				this.x += dx
				this.y += dy
				this.justMoved = true
				return true
			}
			return false
		}
	}

	class Enemy {
		constructor(game, x, y) {
			this.game = game
			this.x = x
			this.y = y
		}

		draw() {
			this.game.display.draw(this.x, this.y, '👾', 'darkred')
		}

		act() {
			// einfache KI: zufällige Bewegung
			const dirIndex = Math.floor(Math.random() * 8)
			const [dx, dy] = ROT.DIRS[8][dirIndex]
			const newX = this.x + dx
			const newY = this.y + dy

			if (this.game.world.isPassable(newX, newY)) {
				this.x = newX
				this.y = newY
			}

			// Kollisionsprüfung mit Spieler
			if (this.x === this.game.player.x && this.y === this.game.player.y) {
				alert('Game Over! Der Gegner hat dich erwischt!')
				window.location.reload()
			}
		}
	}

	const game = new Game()

	$effect(() => {
		if (element) {
			game.init(element)
		}
	})

	const onkeydown = (e) => {
		const keys = [
			' ',
			'Space',
			'ArrowUp',
			'ArrowDown',
			'ArrowLeft',
			'ArrowRight'
		]
		if (keys.includes(e.key)) {
			e.preventDefault()
		}
	}
</script>

<svelte:window {onkeydown} />

<section class="nwp page items-center justify-center">
	<div id="canvas" bind:this={element}></div>
</section>
<section class="nwp page">
	{@render children?.()}
</section>

<style>
	#canvas {
		display: flex;
		width: 100%;
		height: 400px;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
</style>
