<script lang="ts">
	import TuiToster from './TuiToster.svelte'

	import './layout.css'
	import { page } from '$app/state'
	import Sprites from '$lib/components/sprites/sprites.svelte'
	import { nav } from '$lib'

	let { children } = $props()
	let current = $derived(page.url.hash.replace('#', ''))
</script>

<svelte:head>
	<title>Dungeon 8 Layout</title>
</svelte:head>

<div class="terminal-header">
	<div class="flex gap-2">
		<div class="h-3 w-3 rounded-full bg-red-500"></div>
		<div class="h-3 w-3 rounded-full bg-yellow-500"></div>
		<div class="h-3 w-3 rounded-full bg-green-500"></div>
	</div>
	<div class="has-text-muted text-sm font-bold">nwp-app</div>
	<div class="flex items-center gap-2">
		<nav class="navbar-menu">
			{#each nav as { name, href, icon }, i (i)}
				<a
					href="#{href}"
					class="navbar-item"
					class:active={current === href}
					aria-label={name}>
					{@render iconT(icon)} <span>{name}</span>
				</a>
			{/each}
		</nav>
	</div>

	{#snippet iconT(name)}
		<svg class="nwp-icon"><use xlink:href="#{name}"></use></svg>
	{/snippet}
</div>

<main class="main">
	{@render children?.()}
</main>

<TuiToster></TuiToster>
<Sprites></Sprites>
