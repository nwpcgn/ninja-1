<script lang="ts">
	import { ICONS, TermCard } from './'
	let gridSize = $state(60)
</script>

<TermCard title="Icon List" end={ICONS.length}>
	<label class="nav mb-4">
		<span>Size</span>
		<input
			class="flex-1"
			type="range"
			onchange={(e) => {
				gridSize = e.currentTarget.value
			}}
			value={gridSize}
			min={20}
			max={99} />
		<span>{gridSize}</span>
	</label>
	<nav class="img-grid" style="--min: {gridSize}px;">
		{#each ICONS as { name, icon } (icon)}
			<figure class="border">
				<svg><use xlink:href="#{icon}"></use></svg>
				<figcaption class="truncate text-xs">{name}</figcaption>
			</figure>
		{/each}
	</nav>
</TermCard>
