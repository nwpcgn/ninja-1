<script lang="ts">
	import { NAV } from '../'
	const cornerClass =
		'grid size-12 place-content-center text-terminal-primary rounded-full border'
	let { current } = $props()
</script>

<div class="border-b-2 border-terminal-primary/60 bg-terminal-dark">
	<header class="content is-flat split">
		<div class={cornerClass}>
			<svg class="nwp-icon"><use xlink:href="#rpg-level"></use></svg>
		</div>

		<nav class="inline-flex flex-col gap-3 py-2">
			<div class="grid grid-cols-4 gap-2">
				{#each NAV as { href } (href)}
					<span
						class="h-1 rounded-xl transition-colors duration-200 ease-in"
						class:bg-terminal-info={href === current}></span>
				{/each}
			</div>
			<div class="grid grid-cols-4 gap-2">
				{#each NAV as link, i (i)}
					{@render navLink(link)}
				{/each}
			</div>
		</nav>

		<div class={cornerClass}>
			<svg class="nwp-icon"><use xlink:href="#rpg-pokeball"></use></svg>
		</div>
	</header>
</div>

{#snippet navLink({ name, href, icon, slug })}
	<a
		href="#{href}"
		class="flex transform flex-col items-center gap-1 transition-all duration-150 ease-in active:scale-95"
		class:text-terminal-text={href !== current}>
		{@render iconT(icon)}
		<span>{name}</span>
	</a>

	{#snippet iconT(name)}
		<svg class="nwp-icon icon-sm"><use xlink:href="#{name}"></use></svg>
	{/snippet}
{/snippet}
