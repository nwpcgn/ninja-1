<script lang="ts">
	let { children, blank = false, center = false, fixed = false } = $props()
</script>

<section class="page nwp" class:center class:page-fixed={fixed}>
	{#if !blank}
		<svelte:element
			this={center ? 'div' : 'article'}
			class="flex flex-col gap-4 py-4">
			{@render children?.()}
		</svelte:element>
	{:else}
		{@render children?.()}
	{/if}
</section>
