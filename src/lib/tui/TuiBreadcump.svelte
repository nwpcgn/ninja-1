<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}
<!-- BREADCRUMB -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">Breadcrumb</h3>
	<ul class="breadcrumb">
		<li><a>Home</a></li>
		<li><a>Projects</a></li>
		<li class="is-active"><a>terminal.css</a></li>
	</ul>
</div>
