<script lang="ts">
	let { children } = $props()
</script>

<aside
	class="aside border-l-2 border-terminal-primary/40 bg-terminal-dark shadow">
	<section class="panel w-68">{@render children?.()}</section>
</aside>
