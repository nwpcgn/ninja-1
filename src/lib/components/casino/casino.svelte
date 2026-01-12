<script lang="ts">
	import Wheel from './wheel.svelte'
	import { sleep } from '../../'

	const sectors = [
		{
			name: 'KAZEN',
			color: 'oklch(70.4% 0.191 22.216)',
			label: '50',
			title: 'Klinge des Schicksals',
			text: 'Ein einziger Schnitt entscheidet über Ruhm oder Untergang.'
		},
		/* {
			name: 'REIKA',
			color: 'oklch(78.9% 0.154 211.53)',
			label: '100',
			title: 'Ruf der Ahnen',
			text: 'Ihre Stimmen leiten dich – oder führen dich in die Dunkelheit.'
		}, */
		{
			name: 'HONJU',
			color: 'oklch(76.9% 0.188 70.08)',
			label: '600',
			title: 'Pfad der Ehre',
			text: 'Wer Ehre wählt, verliert vielleicht den Sieg – aber nie sich selbst.'
		},
		{
			name: 'KUROI',
			color: 'oklch(76.8% 0.233 130.85)',
			label: '200',
			title: 'Schatten des Kriegers',
			text: 'Wo Licht ist, fällt auch Schatten. Jeder Sieg hat seinen Preis.'
		},
		{
			name: 'RYUHA',
			color: 'oklch(66.7% 0.295 322.15)',
			label: '500',
			title: 'Atem des Drachen',
			text: 'Mut, der in Flammen brennt – entfessle die Macht deines Geistes.'
		},
		// {
		// 	name: 'SEIKA',
		// 	color: 'oklch(60.6% 0.25 292.717)',
		// 	label: '300',
		// 	title: 'Stille des Stahls',
		// 	text: 'Vor dem Schlag – ein Atemzug. Vor dem Sieg – ein Herzschlag.'
		// },
		{
			name: 'TSUKI',
			color: 'oklch(69.6% 0.17 162.48)',
			label: '400',
			title: 'Segen des Mondes',
			text: 'Der Mond wacht über jene, die in der Nacht kämpfen – und über jene, die fallen.'
		}
	]

	let place = $state({
		title: 'Pfad des Schicksals',
		text: 'Wähle dein Schicksal'
	})

	let showModal = $state(false)
	let showResult = $state(false)

	let turnCount = $state(0)
	let total = $state(100)

	let result = $state(sectors[0])
	let placeBet = $state('')
	let isSuccess = $state(false)
	let isSpinning = $state(false)

	const getResult = () => {
		const texte = [
			{
				title: 'Der Ruf des Ruhms',
				text: 'Deine Klinge tanzt im Licht der Ehre – der Himmel selbst neigt sich vor deinem Mut.',
				result: 'success'
			},
			{
				title: 'Der Ruf des Ruhms',
				text: 'Ein wahrer Krieger truet nicht durch Stärke, sondern durch den Glauben an seinen Weg.',
				result: 'success'
			},
			{
				title: 'Der Ruf des Ruhms',
				text: 'Der Kampf endete – doch dein Feuer brennt weiter, unstillbar und rein.',
				result: 'success'
			},
			{
				title: 'Der Ruf des Ruhms',
				text: 'Mit ruhiger Hand und unbeugsamem Geist hast du das Schicksal selbst betruet.',
				result: 'success'
			},
			{
				title: 'Der Ruf des Ruhms',
				text: 'Die Ahnen lächeln. Heute wurde ein neuer Name in Stein gemeißelt.',
				result: 'success'
			},
			{
				title: 'Das Flüstern der Schatten',
				text: 'Deine Reise endet hier – doch der Wind trägt deinen Geist weiter.',
				result: 'error'
			},
			{
				title: 'Das Flüstern der Schatten',
				text: 'Jede Narbe ist ein Zeichen des Lernens. Auch diese wird dich lehren.',
				result: 'error'
			},
			{
				title: 'Das Flüstern der Schatten',
				text: 'Der Staub legt sich, die Klinge ruht – doch deine Seele kämpft weiter.',
				result: 'error'
			},
			{
				title: 'Das Flüstern der Schatten',
				text: 'Manchmal ist die Niederlage der wahre Lehrmeister des Kriegers.',
				result: 'error'
			},
			{
				title: 'Das Flüstern der Schatten',
				text: 'Du bist gefallen, doch der Pfad ruft dich erneut. Kein Ende, nur ein Neubeginn.',
				result: 'error'
			}
		]
		const data = texte.filter((d) =>
			d.result === isSuccess ? 'success' : 'error'
		)
		const i = Math.floor(Math.random() * data.length)
		return data[i]
	}
	const replay = () => {
		placeBet = null
		isSuccess = false
		place = {
			title: 'Pfad des Schicksals',
			text: 'Wähle dein Schicksal'
		}
	}
	const clear = () => {
		turnCount = 0
		placeBet = null
		isSuccess = false
	}

	async function handleTurnEnd(res) {
		await sleep(600)
		result = { ...res }
		turnCount = turnCount + 1
		showResult = true
		if (parseInt(result.label)) {
			total = total + parseInt(result.label)
		}
		console.log('TURN END', res)
	}
	function handleTurnStart() {
		console.log('TURN Starts')
		showResult = false
		showModal = false
	}

	sleep().then(() => (showModal = true))
</script>

<div class="page center z-20">
	<div>
		<Wheel
			onTurnStart={handleTurnStart}
			onTurnEnd={handleTurnEnd}
			{sectors}
			bind:isSpinning></Wheel>
	</div>
</div>

<div
	class="page center z-30 transform transition-all duration-500 ease-in-out"
	class:translate-y-full={!showModal}>
	<div
		class="card bg-base-100/70 flex size-96 max-w-md items-center justify-center gap-4 p-4 text-center">
		<h4>{place.title}</h4>
		<p>
			{place.text}
		</p>

		<div class="flex flex-wrap justify-center gap-1">
			{#each sectors as { name, color, title, text } (name)}
				<button
					onclick={() => {
						placeBet = name
						place = { title, text }
					}}
					class="btn btn-sm"
					style="background-color: {color};"
					class:opacity-50={placeBet && name !== placeBet}>{name}</button>
			{/each}
		</div>
		<div>
			<button
				disabled={!placeBet}
				class="btn btn-sm btn-neutral"
				onclick={() => {
					showModal = false
				}}>Start</button>
		</div>
	</div>
</div>

<div
	class="page center z-40 transform transition-all duration-500 ease-in-out"
	class:translate-y-full={!showResult}>
	<div
		class="card bg-base-100/70 flex max-w-md items-center justify-center gap-4 p-8 text-center">
		<h4>Urteil der Ahnen</h4>
		<p>
			Das Rad steht still. In seinem Schweigen liegt die Wahrheit – Segen oder
			Fluch, du hast gewählt.
		</p>
		<h5>Result: {result.label}</h5>
		<h5>Total: {total}</h5>
		<h5>Turns: {turnCount}</h5>
		<div>
			<button
				class="btn btn-wide btn-sm btn-neutral"
				onclick={() => {
					showResult = false
					replay()
					sleep(400).then(() => (showModal = true))
				}}>Close</button>
		</div>
	</div>
</div>

<style>
</style>
