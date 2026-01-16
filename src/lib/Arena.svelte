<script lang="ts">
	import { blankFighter, Fighter, viewMap, player } from './game.svelte.ts'
	// import { quadIn } from 'svelte/easing'
	// import { slide } from 'svelte/transition'
	import {
		TuiGrid,
		sleep,
		TuiCard,
		TuiBtn,
		TuiNav,
		getFighter,
		TuiHeader
	} from './'
	import FighterCard from './components/FighterCard.svelte'
	import FighterInfo from './components/FighterInfo.svelte'
	import type { FighterType, Move } from './types'
	import Loading from './components/Loading.svelte'
	const v = ['select', 'find', 'battle', 'result']
	let current = $state(v[0])
	let title = $derived(viewMap[current]?.title)
	let neo: FighterType = $state(new Fighter(blankFighter))
	let enemy: FighterType = $state(new Fighter(blankFighter))
	let isPlayer = $state(false)
	let isOpponent = $state(false)
	let lock = $state(false)
	const getNewFighter = async (target: boolean) => {
		lock = true

		await sleep(200)
		if (target) {
			enemy = new Fighter(blankFighter)
			isOpponent = false
			enemy = new Fighter(getFighter())
		} else {
			neo = new Fighter(blankFighter)
			isPlayer = false
			neo = new Fighter(getFighter())
		}
		await sleep(400)
		lock = false
		return
	}
	const setNewFighter = async (target: boolean) => {
		if (target) {
			if (enemy) {
				isOpponent = true
				await sleep()
				current = v[2]
			}
		} else {
			if (neo) {
				isPlayer = true
				current = v[1]
			}
		}
	}
	const clear = async (target: boolean) => {
		await sleep(600)

		enemy = new Fighter(blankFighter)
		isOpponent = false

		neo = new Fighter(blankFighter)
		isPlayer = false
		current = v[0]

		await sleep()
	}
	let promise1 = $state(sleep())
	let promise2 = $state(sleep())
</script>

<section class="nwp page">
	<article>
		<TuiHeader {title}></TuiHeader>
	</article>
	<article class="relative flex-1 overflow-hidden">
		<TuiGrid>
			{@render playerT()}
			{@render enemyT()}
		</TuiGrid>
	</article>
</section>
{#if current === 'battle'}
	<section class="nwp page center bg-black">
		<div class="w-full max-w-md">
			<TuiCard><h1>Page</h1></TuiCard>
		</div>
	</section>
{/if}

<aside class="aside">
	<section class="panel padded bg-base-300 w-68">
		<nav class="stack">
			{#each Object.values(viewMap) as { title, badge, slug } (slug)}
				<button
					onclick={() => {
						current = slug
					}}
					aria-label={title}
					class="button"
					class:is-primary={current === slug}>
					<span>{badge}</span>
				</button>
			{/each}
		</nav>
	</section>
</aside>
<!-- Player -->
{#snippet playerT()}
	<TuiCard title="Hero">
		{#await promise1}
			{@render loader()}
		{:then _}
			<FighterCard fighter={neo} blank={neo.id === ''}></FighterCard>
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
					disabled={lock || neo.id === ''}>Pick</TuiBtn>
			</TuiNav>
		{/snippet}
	</TuiCard>
{/snippet}
<!-- Enemie -->
{#snippet enemyT()}
	<TuiCard
		title="Enemie"
		className={isPlayer ? '' : 'opacity-20 pointer-events-none'}>
		{#await promise2}
			{@render loader()}
		{:then _}
			<FighterCard
				battle={current === 'battle'}
				fighter={enemy}
				blank={enemy.id === ''}></FighterCard>
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
{/snippet}
{#snippet loader()}
	<FighterInfo blank></FighterInfo>
	<Loading></Loading>
{/snippet}
