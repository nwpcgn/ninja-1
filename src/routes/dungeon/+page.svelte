<script lang="ts">
	import {
		TuiAccordion,
		TuiAlert,
		TuiBreadcump,
		TuiBtn,
		TuiCard,
		TuiCollapse,
		TuiColor,
		TuiDropdown,
		TuiForm,
		TuiKbd,
		TuiList,
		TuiLog,
		TuiMenu,
		TuiNavBar,
		TuiProgress,
		TuiTable,
		TuiTags,
		TuiTypo,
		TuiUtils
	} from '$lib'

	// import * as ROT from 'rot-js'
	// import { symbols } from '$lib/atlas'
	import getDungeonMap from '$lib/getDungeonMap'
	import { parseKey } from '$lib/atlas'
	// const noreplace = ['.', '/', '+', 'S', '?', 'M']
	let outElem: HTMLDivElement = $state(null)
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
	const faqData = [
		{
			id: '1',
			frage: 'Worum geht es in The Rocky Horror Picture Show?',
			antwort:
				'Der Film erzählt von Brad und Janet, die in einem Schloss voller exzentrischer Figuren landen und dort mit sexueller Freiheit, Identität und Chaos konfrontiert werden.'
		},
		{
			id: '2',
			frage: 'Wer ist Dr. Frank-N-Furter?',
			antwort:
				'Ein charismatischer Außerirdischer und Wissenschaftler, der Rocky erschafft und gesellschaftliche Normen bewusst provoziert.'
		},
		{
			id: '3',
			frage: 'Was ist Rocky?',
			antwort:
				'Rocky ist ein künstlich erschaffener, muskulöser Mann und eine Parodie auf Frankensteins Monster.'
		},
		{
			id: '4',
			frage: 'Warum gilt der Film als Kultklassiker?',
			antwort:
				'Durch Mitternachtsvorführungen, Zuschauerinteraktion, provokante Themen und ikonische Songs.'
		},
		{
			id: '5',
			frage: 'Welche Themen behandelt der Film?',
			antwort:
				'Sexuelle Selbstbestimmung, Identität, Rollenbilder, Nonkonformität und Lust versus Moral.'
		},
		{
			id: '6',
			frage: 'Ist der Film eine Komödie oder ein Musical?',
			antwort:
				'Beides – er kombiniert Musicalnummern mit Horror-, Sci-Fi- und Comedy-Elementen.'
		}
	]
	init()
</script>

<section class="nwp page">
	<article>
		<!-- SECTION 11: TOAST / NOTIFICATION -->
		<section class="section">
			<div class="mb-6 flex items-center gap-2">
				<span class="has-text-primary text-xl font-bold">11.</span>
				<h2 class="text-xl font-bold">Toast / Notification</h2>
			</div>

			<div class="space-y-6">
				<div>
					<h4 class="has-text-muted mb-3 text-sm">Toast Variants</h4>
					<div class="flex flex-wrap gap-3">
						<button
							class="button is-primary"
							data-toast="This is a primary notificationon"
							data-type="primary">
							Primary Toast
						</button>
						<button
							class="button is-success"
							data-toast="This is a success notificationon"
							data-type="success">
							Success Toast
						</button>
						<button
							class="button is-danger"
							data-toast="This is a danger notificationon"
							data-type="danger">
							Danger Toast
						</button>
						<button
							class="button is-warning"
							data-toast="This is a warnig notificationon"
							data-type="warning">
							Warning Toast
						</button>
						<button
							class="button is-info"
							data-toast="This is a info notificationon"
							data-type="info">
							Info Toast
						</button>
					</div>
				</div>

				<!-- Toast Examples (static for demo) -->
				<div>
					<h4 class="has-text-muted mb-3 text-sm">Static Examples</h4>
					<div class="space-y-4">
						<!-- Success Toast -->
						<div
							class="toast is-success"
							style="position: relative; top: auto; right: auto">
							<div class="toast-icon">✓</div>
							<div class="toast-content">
								<div class="toast-title">Success</div>
								<div class="toast-message">
									Your changes have been saved successfully.
								</div>
							</div>
							<button class="toast-close">×</button>
						</div>

						<!-- Danger Toast -->
						<div
							class="toast is-danger"
							style="position: relative; top: auto; right: auto">
							<div class="toast-icon">✕</div>
							<div class="toast-content">
								<div class="toast-title">Error</div>
								<div class="toast-message">
									Failed to connect to server. Please try again.
								</div>
							</div>
							<button class="toast-close">×</button>
						</div>

						<!-- Warning Toast -->
						<div
							class="toast is-warning"
							style="position: relative; top: auto; right: auto">
							<div class="toast-icon">⚠</div>
							<div class="toast-content">
								<div class="toast-title">Warning</div>
								<div class="toast-message">This action cannot be undone.</div>
							</div>
							<button class="toast-close">×</button>
						</div>

						<!-- Info Toast -->
						<div
							class="toast is-info"
							style="position: relative; top: auto; right: auto">
							<div class="toast-icon">ℹ</div>
							<div class="toast-content">
								<div class="toast-title">Info</div>
								<div class="toast-message">New updates are available.</div>
							</div>
							<button class="toast-close">×</button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- SECTION 12: FAQ / ACCORDION -->
		<section class="section">
			<div class="mb-6 flex items-center gap-2">
				<span class="has-text-primary text-xl font-bold">12.</span>
				<h2 class="text-xl font-bold">FAQ / Accordion</h2>
			</div>

			<div>
				{#each faqData as item (item.id)}
					<TuiCollapse {...item}></TuiCollapse>
				{/each}
			</div>
		</section>
	</article>
	<div bind:this={outElem}></div>
</section>
<aside class="aside">
	<section class="panel padded bg-base-300 w-68">
		<header
			class="padded rounded-box animate-in duration-500 fade-in zoom-in"
			style="background-color: {player.bg}; color: {player.fg}">
			<h2>{player?.char} {player?.name}</h2>
			<h5>HP: {player?.hp}</h5>
			<h5>XY: {player?.x}x{player?.y}</h5>
		</header>
	</section>
</aside>
