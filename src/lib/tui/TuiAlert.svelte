<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}

<!-- NOTIFICATIONS / TOAST -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Notifications</h3>
	<div class="space-y-2">
		<div class="toast is-success">
			<strong>Success!</strong> Your changes were saved.
		</div>
		<div class="toast is-danger">
			<strong>Error!</strong> Something went wrong.
		</div>
		<div class="toast is-info">
			<strong>Info:</strong> New update available.
		</div>
	</div>
</div>
