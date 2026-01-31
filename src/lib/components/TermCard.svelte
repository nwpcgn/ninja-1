<script lang="ts">
	import type { Snippet } from 'svelte'
	let {
		children,
		title,
		header,
		footer,
		content,
		end,
		contentClass = ''
	}: {
		children: Snippet
		title: string
		header: Snippet
		footer: Snippet
		content: Snippet
		end: string
	} = $props()
</script>

<div
	class="relative flex flex-col overflow-hidden rounded-lg border border-terminal-primary/20 bg-terminal-bg text-terminal-primary shadow-glow transition-all duration-200 ease-in hover:border-terminal-primary/80">
	{#if title}
		<header class="padded-sm split border-b border-terminal-primary/40">
			<span>{title}</span>
			{#if end}
				<span class="text-xl font-thin tabular-nums opacity-30">{end}</span>
			{:else}
				<span></span>
			{/if}
		</header>
	{:else if header}
		<header class="padded-sm split border-b border-terminal-primary/40">
			{@render header?.()}
		</header>
	{/if}

	{#if !content}
		{@render children?.()}
	{:else}
		<section class="padded-sm {contentClass}">{@render content?.()}</section>
	{/if}

	{#if footer}
		<footer class="padded-sm nav border-t border-terminal-primary/40">
			{@render footer?.()}
		</footer>
	{/if}
</div>
