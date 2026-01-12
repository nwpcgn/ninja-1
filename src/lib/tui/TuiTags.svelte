<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}

<!-- TAGS -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Tags & Badges</h3>
	<div class="flex flex-wrap gap-2">
		<span class="tag is-primary">v0.0.4</span>
		<span class="tag is-success">Active</span>
		<span class="tag is-danger is-active">Error</span>
		<span class="tag is-warning is-active">Beta</span>
		<span class="tag is-info">New</span>
		<span class="tag is-danger">Error</span>
		<span class="tag is-warning">Beta</span>
	</div>
</div>
