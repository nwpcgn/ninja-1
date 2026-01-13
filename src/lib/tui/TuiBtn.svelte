<script lang="ts">
	import type { Snippet } from 'svelte'
	let {
		children,
		href,
		type = 'default',
		disabled = false,
		onclick
	}: { children: Snippet } = $props()
	const types = {
		primary: 'is-primary',
		success: 'is-success',
		danger: 'is-danger',
		warning: 'is-warning',
		info: 'is-info'
	}
	const style = types[type] || ' '
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
