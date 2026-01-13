<script lang="ts">
	let { children, title, fooBar } = $props()
</script>

<div class="card">
	{#if title}
		<div class="card-header">
			<h4 class="card-header-title">{title}</h4>
		</div>
	{/if}

	<div class="card-content">
		{@render children?.()}
	</div>

	{#if fooBar}
		<div class="card-footer">
			{@render fooBar?.()}
		</div>
	{/if}
</div>

<style>
</style>
