<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}

<!-- DROPDOWN -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Dropdown</h3>
	<div class="dropdown">
		<div class="dropdown-trigger">
			<button class="button">
				<span>Options</span>
				<span>▼</span>
			</button>
		</div>
		<div class="dropdown-menu">
			<div class="dropdown-content">
				<a class="dropdown-item">Settings</a>
				<a class="dropdown-item">Profile</a>
				<hr class="dropdown-divider" />
				<a class="dropdown-item">Logout</a>
			</div>
		</div>
	</div>
</div>
