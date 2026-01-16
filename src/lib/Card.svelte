<script lang="ts">
	import { blankFighter, Fighter, view, player } from './game.svelte.ts'

	let {
		children,
		title = 'Fighter',
		aside = '',
		lock = false,
		onPick,
		onGet
	} = $props()
</script>

<div class="card">
	<div class="card-header">
		<h4 class="card-header-title">{title}</h4>
		<span>{aside}</span>
	</div>
	<div class="card-content">
		{@render children?.()}
	</div>
	<div class="card-footer">
		<nav class="nav end">
			<button onclick={onGet} role="button" tabindex="0" class="button is-info" disabled={lock}>
				Find
			</button>
			<button  onclick={onPick}
				role="button"
				tabindex="0"
				class="button is-success"
				disabled={lock}>
				Pick
			</button>
		</nav>
	</div>
</div>
