<script lang="ts">
	import { viewMap } from '$lib/game.svelte.ts'
	import { TuiHeader } from '$lib'
	import Arena from '$lib/Arena.svelte'
	import Battle from '$lib/Battle.svelte'
	import TuiBtn from '$lib/tui/TuiBtn.svelte'
	let current = $state(Object.keys(viewMap)[0])
</script>


<Arena></Arena>

<!-- <section class="nwp page">
	<article>
		<TuiHeader title={viewMap[current]?.title}></TuiHeader>
	</article>

	<article>
		<Arena></Arena>
	</article>
</section>

<aside class="aside">
	<section class="panel padded bg-base-300 w-68">
		<nav class="stack">
			{#each Object.values(viewMap) as { title, badge, slug } (slug)}
				<div
					aria-label={title}
					class="tag is-primary split"
					class:is-active={current === slug}>
					<span>{badge}</span>
					<span></span>
				</div>
			{/each}
		</nav>
	</section>
</aside>
 -->