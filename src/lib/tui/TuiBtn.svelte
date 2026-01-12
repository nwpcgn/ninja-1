<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}

<!-- BUTTONS -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Buttons</h3>
	<div class="flex flex-wrap gap-2">
		<button class="button is-primary">Primary</button>
		<button class="button is-danger">Danger</button>
		<button class="button is-success">Success</button>
		<button class="button is-warning">Warning</button>
		<button class="button is-info">Info</button>
		<button class="button is-info is-loading">Loading</button>
	</div>
</div>
