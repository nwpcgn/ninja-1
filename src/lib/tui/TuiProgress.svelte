<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}
<!-- PROGRESS -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Progress</h3>
	<div class="space-y-3">
		<div class="mb-2 flex justify-between">
			<span class="has-text-muted text-sm">Disk Usage</span>
			<span class="has-text-danger text-sm font-bold">30%</span>
		</div>
		<progress class="progress is-success" value="100" max="100">
			100%
		</progress>
		<progress class="progress is-danger" value="30" max="100"> 30% </progress>
		<progress class="progress is-primary" value="75" max="100"> 75% </progress>
	</div>
</div>
