<script lang="ts">
	import { dungeon } from './dungeon.svelte.js'
</script>

<ul class="rounded-box bg-base-200 flex min-w-48 flex-col px-4 py-2">
	{@render row('rpg-db', dungeon.config.type)}
	{@render row('rpg-size', dungeon.info().map)}
	{@render row('rpg-archive', dungeon.info().items)}
	{@render row('rpg-enemy', dungeon.info().monster)}
	{@render row('rpg-home', dungeon.info().rooms)}
</ul>
{#snippet row(icon = '', text = '')}
	<li class="split items-center">
		<span class="py-1">
			{@render iconT(icon)}
		</span>
		<span>{text}</span>
	</li>
{/snippet}
{#snippet iconT(name)}
	<svg class="nwp-icon icon-sm"><use xlink:href="#{name}"></use></svg>
{/snippet}
