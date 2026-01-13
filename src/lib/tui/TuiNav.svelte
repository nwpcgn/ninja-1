<script lang="ts">
	import type { Snippet } from 'svelte'

	let { children, end, center, wrap }: { children: Snippet } = $props()
</script>

<nav class="nav" class:end class:center class:wrap>
	{@render children?.()}
</nav>
