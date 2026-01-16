<script lang="ts">
	let {
		children,
		href,
		type = 'default',
		disabled = false,
		onclick
	} = $props()
	const types = {
		primary: 'is-primary',
		success: 'is-success',
		danger: 'is-danger',
		warning: 'is-warning',
		info: 'is-info'
	}
	const style = types[type]
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	role="button"
	tabindex="0"
	class="button {style}"
	{disabled}
	{onclick}>
	{@render children?.()}
</svelte:element>
