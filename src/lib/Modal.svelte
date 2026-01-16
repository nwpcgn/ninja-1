<script lang="ts">
	let { showModal = $bindable(), header, children } = $props()

	let dialog = $state() // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal()
	})
</script>

<dialog bind:this={dialog} onclose={(e) => {
	console.log(e);
	showModal = false
}}>
	{@render children?.()}
</dialog>

<style>
	dialog {
		width: 100%;
		max-width: 420px;
		border-radius: 0.2em;
		border: none;
		background-color: transparent;
		padding: 1rem;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
