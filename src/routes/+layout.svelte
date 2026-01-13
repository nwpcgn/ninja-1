<script lang="ts">
	import './layout.css'
	import { nav, TuiToster } from '$lib'
	import { page } from '$app/state'
	import Sprites from '$lib/components/sprites/sprites.svelte'
	let { children } = $props()
	let current = $derived(page.url.hash.replace('#', ''))
</script>

<div class="terminal-header">
	<div class="flex gap-2">
		{@render iconT('rpg-game')}
	</div>
	<div class="has-text-muted text-sm font-bold">nwp-app</div>
	<div class="flex items-center gap-2">
		<nav class="navbar-menu">
			{#each nav as { name, href }, i (i)}
				<a
					href="#{href}"
					class="navbar-item"
					class:active={current === href}
					aria-label={name}>
					<span>{name}</span>
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
