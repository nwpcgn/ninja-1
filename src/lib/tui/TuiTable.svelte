<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}

<!-- TABLE -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Table</h3>
	<table class="is-bordered is-striped table">
		<thead>
			<tr>
				<th>Process</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>nginx</td>
				<td><span class="tag is-success">Running</span></td>
			</tr>
			<tr>
				<td>mysql</td>
				<td><span class="tag is-warning">Starting</span></td>
			</tr>
			<tr>
				<td>redis</td>
				<td><span class="tag is-danger">Stopped</span></td>
			</tr>
		</tbody>
	</table>
</div>
