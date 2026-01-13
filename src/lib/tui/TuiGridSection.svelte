<script lang="ts">
	let { children, title } = $props()
</script>

<div class="showcase-section">
	{#if title}
		<h3 class="title is-5 has-text-primary mb-4">{title}</h3>
	{/if}

	{@render children?.()}
</div>
