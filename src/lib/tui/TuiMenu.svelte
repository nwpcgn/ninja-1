<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}

<!-- MENU -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Menu</h3>
	<aside class="menu">
		<p class="menu-label">Navigation</p>
		<ul class="menu-list">
			<li><a class="is-active">Dashboard</a></li>
			<li><a>Components</a></li>
			<li><a>Settings</a></li>
		</ul>
	</aside>
</div>
