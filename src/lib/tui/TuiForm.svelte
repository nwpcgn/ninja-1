<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}
<!-- FORMS -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Forms</h3>
	<div class="space-y-3">
		<div class="control">
			<span class="has-text-primary" style="padding: 0 8px">$</span>
			<input type="text" class="input" placeholder="Enter username..." />
		</div>
		<div class="control">
			<span class="has-text-success" style="padding: 0 8px">✓</span>
			<input
				type="email"
				class="input"
				placeholder="email@example.com"
				value="valid@email.com" />
		</div>
		<div class="control">
			<select class="select">
				<option>Select option...</option>
				<option>Option 1</option>
				<option>Option 2</option>
			</select>
		</div>
	</div>
</div>
