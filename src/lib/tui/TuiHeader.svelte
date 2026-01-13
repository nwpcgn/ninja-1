<script lang="ts">
	let { title, subtitle, children, actions } = $props()
</script>

<header class="showcase-header">
	{#if title}
		<h1 class="title is-1 has-terminal-glow">{title}</h1>
	{/if}
	{#if subtitle}
		<p class="subtitle is-4">{subtitle}</p>
	{/if}

	{@render children?.()}

	{#if actions}
		<div class="flex items-center justify-center gap-3">
			{@render actions?.()}
		</div>
	{/if}
</header>

<style>
	header {
		background: var(--terminal-bg);
		border-bottom: 2px solid var(--terminal-primary);
		padding: var(--spacing-xl) var(--spacing-base);
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);

		.title {
			font-family: 'Notable', sans-serif;
		}
	}
</style>
