<script lang="ts">
	let { children, fooBar, topBar, title, className = '' } = $props()
</script>

<div class="card {className}">
	{#if title}
		<div class="card-header">
			<h4 class="card-header-title">{title}</h4>
			<span>{@render topBar?.()}</span>
		</div>
	{:else if topBar}
		<div class="card-header">
			{@render topBar?.()}
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
