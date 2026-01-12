<script lang="ts">
	import type { Snippet } from 'svelte'
	let {
		children,
		href,
		style = '',
		disabled = false,
		onclick
	}: { children: Snippet } = $props()
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	type="button"
	class="button {style}"
	{disabled}
	{onclick}>
	{@render children?.()}
</svelte:element>
