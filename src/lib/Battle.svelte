<script lang="ts">
	import { blankFighter, Fighter, view } from './game.svelte.ts'
	// import { quadIn } from 'svelte/easing'
	// import { slide } from 'svelte/transition'
	import { TuiGrid, sleep, TuiCard, TuiBtn, TuiNav, getFighter } from './'
	import FighterCard from './components/FighterCard.svelte'
	import type { FighterType, Move } from './types'
	import Loading from './components/Loading.svelte'
	const v = ['select', 'find', 'battle', 'result']
	let player: FighterType = $state(new Fighter(blankFighter))
	let enemy: FighterType = $state(new Fighter(blankFighter))
	let isPlayer = $state(false)
	let isOpponent = $state(false)
	let lock = $state(false)
	const getNewFighter = async (target: boolean) => {
		lock = true

		await sleep(600)
		if (target) {
			enemy = new Fighter(blankFighter)
			isOpponent = false
			enemy = new Fighter(getFighter())
		} else {
			player = new Fighter(blankFighter)
			isPlayer = false
			player = new Fighter(getFighter())
		}
		await sleep()
		lock = false
	}
	const setNewFighter = (target: boolean) => {
		if (target) {
			if (enemy) {
				isOpponent = true
				view.current = view.slugs[2]
			}
		} else {
			if (player) {
				isPlayer = true
				view.current = view.slugs[1]
			}
		}
	}
	const clear = async (target: boolean) => {
		await sleep(600)
		if (target) {
			enemy = new Fighter(blankFighter)
			isOpponent = false
		} else {
			player = new Fighter(blankFighter)
			isPlayer = false
		}
		await sleep()
	}
	let promise1 = $state(sleep())
	let promise2 = $state(sleep())

	$inspect(view.slugs)
</script>

<TuiGrid>
	<TuiCard title="Hero">
		{#await promise1}
			{@render loader()}
		{:then value}
			<FighterCard {value} fighter={player} blank={player.id === ''}
			></FighterCard>
		{/await}
		{#snippet fooBar()}
			<TuiNav end>
				{#if isPlayer}
					<TuiBtn type="danger" disabled={lock} onclick={() => clear(false)}
						>Clear</TuiBtn>
					<span class="flex-1"></span>
				{/if}
				<TuiBtn
					type="info"
					onclick={() => {
						promise1 = getNewFighter(false)
					}}
					disabled={lock}>Find</TuiBtn>
				<TuiBtn
					type="success"
					onclick={() => setNewFighter(false)}
					disabled={lock || player.id === ''}>Pick</TuiBtn>
			</TuiNav>
		{/snippet}
	</TuiCard>
	<TuiCard title="Enemie">
		{#await promise2}
			{@render loader()}
		{:then value}
			<FighterCard {value} fighter={enemy} blank={enemy.id === ''}
			></FighterCard>
		{/await}
		{#snippet fooBar()}
			<TuiNav end>
				{#if isOpponent}
					<TuiBtn type="danger" disabled={lock} onclick={() => clear(true)}
						>Clear</TuiBtn>
					<span class="flex-1"></span>
				{/if}
				<TuiBtn
					type="info"
					onclick={() => {
						promise2 = getNewFighter(true)
					}}
					disabled={lock || !isPlayer}>Find</TuiBtn>
				<TuiBtn
					type="success"
					onclick={() => setNewFighter(true)}
					disabled={lock || enemy.id === ''}>Pick</TuiBtn>
			</TuiNav>
		{/snippet}
	</TuiCard>
</TuiGrid>

{#snippet loader()}
	<FighterCard fighter={blankFighter} blank></FighterCard>
	<Loading></Loading>
{/snippet}
