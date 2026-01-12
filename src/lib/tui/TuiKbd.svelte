<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}

<!-- KBD ELEMENT -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Keyboard</h3>
	<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy</p>
	<p class="mt-2">Use <kbd>Esc</kbd> to exit</p>
</div>
