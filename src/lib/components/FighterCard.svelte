<script lang="ts">
	import Progress from './Progress.svelte'
	import Typer from './Typer.svelte'

	// import { log, type MessageType } from '../log.svelte.ts'
	// import { TuiCard, TuiBtn, getMsg, TuiNav, getFighter } from '../'
	// import { quartInOut } from 'svelte/easing'
	// import { fly } from 'svelte/transition'
	let {
		blank = false,
		className = '',
		fighter = {
			name: 'Neon',
			info: 'Duelist',
			hp: 45,
			atc: 8,
			def: 4,
			level: 2,
			img: 'https://i.imgur.com/rylze1Q.png',
			avatar: 'https://i.imgur.com/msl9MJN.png',
			moves: [
				{
					name: 'Dark Pulse',
					dice: 7,
					damage: 8,
					info: 'You unleash a pulse of dark energy.'
				},
				{
					name: 'Quick Jab',
					dice: 4,
					damage: 5,
					info: 'You attack swiftly before the enemy can react.'
				}
			]
		}
	} = $props()
</script>

{@render heroCard(fighter)}

{#snippet heroCard({ name, info, hp, atc, def, level, img, avatar, moves })}
	{@const obj1 = { name, info, level }}
	{@const obj2 = { hp, atc, def }}

	<div
		class="stack bg-contain bg-center bg-no-repeat capitalize transition-all duration-300 ease-in-out"
		class:opacity-10={blank}
		style="background-image: url({img});">
		{#each Object.entries(obj1) as [k, v] (k)}
			<div class="split" class:opacity-0={blank}>
				<div>{k}</div>
				<Typer text={v}></Typer>
			</div>
		{/each}
		<hr class:opacity-0={blank} />
		{#each Object.entries(obj2) as [k, v] (k)}
			<Progress {blank} label={k} value={v} max={k === 'hp' ? 50 : 10}
			></Progress>
		{/each}
	</div>
{/snippet}
