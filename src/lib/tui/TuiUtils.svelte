<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}

<!-- UTILITIES -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Effects</h3>
	<div class="space-y-3">
		<p class="has-terminal-glow">Terminal glow effect</p>
		<p class="has-terminal-cursor">Blinking cursor</p>
		<hr />
		<p class="has-text-muted text-sm">Divider separator</p>
	</div>
</div>
