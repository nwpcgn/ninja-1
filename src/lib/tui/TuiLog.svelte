<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}

<!-- TERMINAL LOG -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Terminal Log</h3>
	<div class="terminal-log">
		<div class="log-line has-text-success">✓ Build successful</div>
		<div class="log-line has-text-info">→ Starting server...</div>
		<div class="log-line has-text-warning">⚠ Warning: deprecated API</div>
		<div class="log-line has-text-danger">✗ Connection failed</div>
	</div>
</div>
