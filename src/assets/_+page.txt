<script lang="ts">
	import { parseKey } from '$lib/atlas'
	import getDungeonMap from '$lib/getDungeonMap'
	import {
		TuiCard,
		TuiCollapse,
		TuiGrid,
		TuiGridSection,
		TuiToster,
		TuiHeader,
		TuiNav,
		TuiBtn
	} from '$lib'
	import { typeList } from '$lib/typeList'
	import { nav } from '$lib/nav'

	// const noreplace = ['.', '/', '+', 'S', '?', 'M']
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

<section class="nwp page">
	<article>
		<TuiHeader
			title="terminal.css Component Library"
			subtitle="Terminal-style components with Bulma naming conventions">
			<TuiNav center wrap>
				{#each typeList as { title, type } (type)}
					<TuiBtn {type}>{title}</TuiBtn>
				{/each}
			</TuiNav>
		</TuiHeader>
		<TuiGrid>
			<TuiGridSection title="Tui Card">
				<div class="card">
					<div class="card-header">
						<p class="card-header-title">System Status</p>
					</div>
					<div class="card-content">
						<p class="has-text-success mb-2">● CPU: 45%</p>
						<p class="has-text-warning mb-2">● Memory: 78%</p>
						<p class="has-text-info">● Disk: 62%</p>
					</div>
				</div>
			</TuiGridSection>

			<TuiGridSection title="Tui Card">
				<div class="card">
					<div class="card-header">
						<p class="card-header-title">System Status</p>
					</div>
					<div class="card-content">
						<p class="has-text-success mb-2">● CPU: 45%</p>
						<p class="has-text-warning mb-2">● Memory: 78%</p>
						<p class="has-text-info">● Disk: 62%</p>
					</div>
				</div>
			</TuiGridSection>
			<TuiGridSection title="Tui Card">
				<div class="card">
					<div class="card-header">
						<p class="card-header-title">System Status</p>
					</div>
					<div class="card-content">
						<div class="status-list">
							<div><span>Key 1</span> <span>Value 1</span></div>
							<div><span>Key 2</span> <span>Value 2</span></div>
							<div><span>Key 3</span> <span>Value 3</span></div>
							<div><span>Key 4</span> <span>Value 4</span></div>
							<div><span>Key 5</span> <span>Value 5</span></div>
							<div><span>Key 6</span> <span>Value 6</span></div>
						</div>
					</div>
				</div>
			</TuiGridSection>
		</TuiGrid>
		<TuiGrid>
			<TuiCard>
				<h4 class="card-header-title">Card + Foo Bar</h4>
				<p class="has-text-muted text-sm">Card with content only.</p>
				{#snippet fooBar()}
					<nav class="nav end">
						<button class="button is-primary">Primary</button>
						<button class="button is-danger">Danger</button>
					</nav>
				{/snippet}
			</TuiCard>
			<TuiCard title="Status Report">
				<h4 class="card-header-title">Card + Header</h4>
				<p class="has-text-muted text-sm">Card with content only.</p>
			</TuiCard>
			<TuiCard title="Status Report">
				<h4 class="card-header-title">Card + Header</h4>
				<p class="has-text-muted text-sm">Card with content only.</p>
			</TuiCard>
		</TuiGrid>
	</article>
</section>
<aside class="aside">
	<section class="panel padded bg-base-300 w-68">
		<header
			class="padded rounded-box animate-in fade-in zoom-in duration-500"
			style="background-color: {player.bg}; color: {player.fg}">
			<h2>{player?.char} {player?.name}</h2>
			<h5>HP: {player?.hp}</h5>
			<h5>XY: {player?.x}x{player?.y}</h5>
		</header>
	</section>
</aside>
