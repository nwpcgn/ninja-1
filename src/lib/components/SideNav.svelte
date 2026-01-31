<script lang="ts">
	import { NAV } from '../'
	let { current } = $props()
</script>

<article>
	<h4 class="sr-only">Aside / Panel</h4>
	<nav class="stack-list gap-2">
		{#each NAV as { name, href, icon }, i (i)}
			<a
				href="#{href}"
				class="nav ease transition-all duration-150"
				class:text-terminal-text={current === href}>
				{@render iconT(icon)}
				<span class="flex-1">{name}</span>
				<span class="bg-terminal-info px-2 py-1 text-xs text-terminal-dark"
					>{i + 1}</span>
			</a>
		{/each}
	</nav>
	{#snippet iconT(name)}
		<svg class="nwp-icon icon-sm"><use xlink:href="#{name}"></use></svg>
	{/snippet}
</article>
