<script lang="ts">
	import { log, type MessageType } from './log.svelte.ts'
	import { TuiCard, TuiBtn, getMsg, TuiNav, getFighter } from './'
	import { quartInOut } from 'svelte/easing'
	import { fly } from 'svelte/transition'

	const types = {
		primary: 'is-primary',
		success: 'is-success',
		danger: 'is-danger',
		warning: 'is-warning',
		info: 'is-info'
	}
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
	let fighter = $state({
		id: '8bsakg',
		name: 'Reyna',
		info: 'Duelist',
		hp: 29,
		atc: 40,
		def: 48,
		level: 1,
		img: 'https://i.imgur.com/pEL9sby.png',
		avatar: 'https://i.imgur.com/95fHamJ.png',
		moves: [
			{
				name: 'Ice Spear',
				dice: 6,
				damage: 7,
				info: 'You hurl a spear of ice that slows the enemy.'
			},
			{
				name: 'Shield Bash',
				dice: 3,
				damage: 4,
				info: 'You are trying to bash the opponent away with your shield.'
			}
		]
	})
	const createMsg = () => {
		const msg: MessageType = getMsg()
		log.add(msg)
	}
	const getHero = () => {
		const hero = getFighter()
		fighter = { ...hero }
	}
	const clearMsg = () => {
		log.clear()
	}
</script>

{#snippet heroCard({ name, info, hp, atc, def, level, img, avatar, moves })}
	{@const obj1 = { name, info, level }}
	{@const obj2 = { hp, atc, def }}
	<TuiCard title="Heros">
		<div
			class="stack bg-contain bg-center bg-no-repeat capitalize"
			style="background-image: url({img});">
			{#each Object.entries(obj1) as [k, v] (k)}
				<div class="split">
					<span>{k}</span>
					<span>{v}</span>
				</div>
			{/each}
			<hr />
			{#each Object.entries(obj2) as [k, v] (k)}
				{@render bar(k, v, k === 'hp' ? 50 : 10)}
			{/each}
		</div>
		{#snippet fooBar()}
			<TuiNav end>
				<TuiBtn type="info" onclick={getHero}>Create</TuiBtn>
			</TuiNav>
		{/snippet}
	</TuiCard>
	{#snippet bar(label = '', value = 0, max = 100)}
		<div>
			<div class="mb-1 flex justify-between">
				<span class="has-text-primary text-sm">{label}</span>
				<span class="has-text-primary text-sm font-bold"
					>{Math.floor((value / max) * 100)}%</span>
			</div>
			<progress class="progress is-danger" {value} {max}></progress>
		</div>
	{/snippet}
{/snippet}

<div class="grid grid-cols-2 gap-4">
	<div>
		<TuiCard title="Notifications">
			<div class="status-list">
				<!-- 				<div class="has-text-danger">
					<span>Tick</span>
					<span>{round(log.auto / 1000)}</span>
				</div>
				<div class="has-text-success">
					<span>Max</span>
					<span> {log.max}</span>
				</div> -->

				<div class="has-text-warning">
					<span>Amount</span><span>{log.list.length}</span>
				</div>
				<div class="has-text-info">
					<span>Cache</span><span>{log.cache}</span>
				</div>
			</div>

			{#snippet fooBar()}
				<TuiNav end>
					<TuiBtn type="info" onclick={createMsg}>Create</TuiBtn>
					<TuiBtn type="danger" onclick={clearMsg}>Clear</TuiBtn>
				</TuiNav>
			{/snippet}
		</TuiCard>
	</div>

	<div>
		{@render heroCard(fighter)}
	</div>
</div>
