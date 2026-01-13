<script lang="ts">
	const vers = 1
	const tailClass =
		vers == 1
			? 'padded grid gap-4 grid-cols-1 md:grid-cols-2 lg:gap-8'
			: 'showcase-grid'

	let { children } = $props()
</script>

<div class={tailClass}>
	{@render children?.()}
</div>
