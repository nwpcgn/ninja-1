<script lang="ts">
	import { log } from '../log.svelte.ts'
	import { quartInOut } from 'svelte/easing'
	import { fly } from 'svelte/transition'

	const types = {
		primary: 'is-primary',
		success: 'is-success',
		danger: 'is-danger',
		warning: 'is-warning',
		info: 'is-info'
	}

	const removeMsg = (id: string) => {
		log.remove(id)
	}
</script>

<div class="toast-container" id="toastContainer">
	{#each log.list as msg (msg.id)}
		<!-- { id, type, message }-->
		<div class="toast has-text-{msg.type} {types[msg.type]}">
			<div
				class="nav flex-1"
				transition:fly|global={{ duration: 400, easing: quartInOut }}>
				<small class="flex-1"> {msg.message}</small>
				<button onclick={() => removeMsg(msg.id)}
					>{@render iconT('rpg-close')}
				</button>
			</div>
		</div>
	{/each}
</div>

{#snippet iconT(name)}
	<svg class="nwp-icon" style="--fs: 14px;"
		><use xlink:href="#{name}"></use></svg>
{/snippet}

<style>
	.toast {
		button {
			background-color: var(--terminal-bg);
			aspect-ratio: 1 / 1;
			display: inline-flex;
			align-items: center;
			padding: var(--spacing-sm);
			border-radius: 100%;
			cursor: pointer;
			transition: transform 0.1s ease-in-out;
		}
		button:hover {
			transform: scale(1.1);
		}
		button:active {
			transform: translate(1px, 1px);
		}
	}
</style>
