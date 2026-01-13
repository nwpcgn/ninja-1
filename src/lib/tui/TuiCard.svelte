<script lang="ts">
	let { children, fooBar, topBar, title, className = '' } = $props()
</script>

<div class="card flex flex-col {className}">
	{#if title}
		<div class="card-header split">
			<h4 class="card-header-title">{title}</h4>
			<span>{@render topBar?.()}</span>
		</div>
	{/if}

	<div class="card-content relative flex-1 overflow-hidden">
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
