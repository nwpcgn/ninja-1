<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}
<!-- NAVIGATION -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Tabs</h3>
	<div class="tabs">
		<ul>
			<li class="is-active"><a>Dashboard</a></li>
			<li><a>Settings</a></li>
			<li><a>Logs</a></li>
		</ul>
	</div>
</div>
