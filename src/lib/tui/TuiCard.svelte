<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}

<!-- CARD -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Card</h3>
	<div class="card">
		<div class="card-header">
			<p class="card-header-title">System Status</p>
		</div>
		<div class="card-content">
			<p class="has-text-success mb-2">● CPU: 45%</p>
			<p class="has-text-warning mb-2">● Memory: 78%</p>
			<p class="has-text-info">● Disk: 62%</p>
		</div>
	</div>
</div>
