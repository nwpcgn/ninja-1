<script lang="ts">
	import Progress from './Progress.svelte'
	import Typer from './Typer.svelte'

	// import { log, type MessageType } from '../log.svelte.ts'
	// import { TuiCard, TuiBtn, getMsg, TuiNav, getFighter } from '../'
	// import { quartInOut } from 'svelte/easing'
	// import { fly } from 'svelte/transition'
	let {
		blank = false,
		hide = false,
		battle = false,
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

{#if !blank}
	{@render heroCard(fighter)}
{:else}
	<!-- prettier-ignore -->
	<div class="bg-contain bg-center bg-no-repeat capitalize transition-all duration-300 ease-in-out opacity-10" style='background-image: url("https://i.imgur.com/y2HlfrZ.png");'><div class="stack opacity-0"><div class="split"><div>name</div><div></div></div><div class="split"><div>info</div><div></div></div><div class="split"><div>level</div><div></div></div><hr class="opacity-0"><div class="grid gap-1"><div class="split"><span class="has-text-primary text-sm">hp</span> <span class="has-text-primary text-sm font-bold">0%</span></div><progress class="progress transition-all duration-150 ease-in is-danger" value="0" max="50"></progress></div><div class="grid gap-1"><div class="split"><span class="has-text-primary text-sm">atc</span> <span class="has-text-primary text-sm font-bold">0%</span></div><progress class="progress transition-all duration-150 ease-in is-danger" value="0" max="10"></progress></div><div class="grid gap-1"><div class="split"><span class="has-text-primary text-sm">def</span> <span class="has-text-primary text-sm font-bold">0%</span></div><progress class="progress transition-all duration-150 ease-in is-danger" value="0" max="10"></progress></div></div></div>
{/if}

{#snippet heroCard({ name, info, hp, atc, def, level, img, avatar, moves })}
	{@const obj1 = { name, info, level }}
	{@const obj2 = { hp, atc, def }}

	<div
		class="bg-contain bg-center bg-no-repeat capitalize {className}"
		style="background-image: url({img});">
		<div
			class="stack transition-all duration-300 ease-in-out"
			class:opacity-0={hide}>
			{#each Object.entries(obj1) as [k, v] (k)}
				<div class="split">
					<div>{k}</div>
					<Typer text={v}></Typer>
				</div>
			{/each}
			<hr />
			{#each Object.entries(obj2) as [k, v] (k)}
				<Progress {blank} label={k} value={v} max={k === 'hp' ? 50 : 10}
				></Progress>
			{/each}
		</div>
	</div>
{/snippet}
