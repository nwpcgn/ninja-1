<script lang="ts">
	import { parseKey } from '$lib/atlas'
	import getDungeonMap from '$lib/getDungeonMap'
	import Slider from '$lib/Slider.svelte'
	import {
		TuiCard,
		TuiCollapse,
		TuiGrid,
		TuiGridSection,
		typeList,
		TuiHeader,
		TuiNav,
		TuiBtn
	} from '$lib'

	class Entity {
		x: number = $state(0)
		y: number = $state(0)
		char: string = $state('')
		fg: string = $state('')
		bg: string = $state('')

		constructor(
			x: number,
			y: number,
			char: string,
			fg: string = '#fff',
			bg: string = '#000'
		) {
			this.x = x
			this.y = y
			this.char = char
			this.fg = fg
			this.bg = bg
		}

		move(x: number, y: number) {
			this.x = x
			this.y = y
		}
	}
	class Player extends Entity {
		name: string = $state('')
		hp: number = $state(30)
		constructor(
			name: string,
			hp: number,
			x: number,
			y: number,
			char: string,
			fg: string = '#fff',
			bg: string = '#000'
		) {
			super(x, y, char, fg, bg)
			this.name = name
			this.hp = hp
		}

		attack(target) {
			console.log(`${this.name} greift mit ${this.weapon.name} an!`)
			this.weapon.hit(target)
		}
	}
	const player = new Player('Hero', 30, 0, 0, '@', '#0f0', '#000')
	let dungeon = $state({ map: [[]], rooms: [[]], freeCells: [], zeroCells: [] })

	const init = async () => {
		const { map, rooms, freeCells, zeroCells } = getDungeonMap(
			40,
			20,
			'Uniform'
		)
		dungeon = { map, rooms, freeCells, zeroCells }
		// Place player in a random free cell
		const [px, py] = parseKey(dungeon.freeCells[0])
		player.move(px, py)
	}

	init()
</script>

<svelte:head>
	<title>Lobby</title>
</svelte:head>
<section class="nwp page">
	<article>
		<TuiHeader title="Dungeon Roguelike"></TuiHeader>
		<Slider></Slider>
	</article>
</section>
<aside class="aside">
	<!-- <section class="panel padded bg-base-300 w-68">
		<header
			class="padded rounded-box animate-in fade-in zoom-in duration-500"
			style="background-color: {player.bg}; color: {player.fg}">
			<h2>{player?.char} {player?.name}</h2>
			<h5>HP: {player?.hp}</h5>
			<h5>XY: {player?.x}x{player?.y}</h5>
		</header>
	</section> -->
</aside>
