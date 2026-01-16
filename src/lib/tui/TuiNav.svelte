<script lang="ts">
	import type { Snippet } from 'svelte'

	let { children, end, center, wrap, className = '' }: { children: Snippet } = $props()
</script>

<nav class="nav {className}" class:end class:center class:wrap>
	{@render children?.()}
</nav>
