<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}

<!-- LIST -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Lists</h3>
	<ul class="list">
		<li class="list-item">
			<span class="list-item-icon">▸</span>
			<span class="list-item-content">Initialize system</span>
		</li>
		<li class="is-active list-item">
			<span class="list-item-icon">▸</span>
			<span class="list-item-content">Load configuration</span>
		</li>
		<li class="list-item">
			<span class="list-item-icon">▸</span>
			<span class="list-item-content">Start services</span>
		</li>
	</ul>
</div>
