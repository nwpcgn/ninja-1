<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}

<!-- TEXT COLORS -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Text Colors</h3>
	<div class="space-y-2">
		<p class="has-text-primary">Primary text</p>
		<p class="has-text-success">Success message</p>
		<p class="has-text-danger">Error message</p>
		<p class="has-text-warning">Warning text</p>
		<p class="has-text-info">Info text</p>
		<p class="has-text-muted">Muted text</p>
	</div>
</div>
