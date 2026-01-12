<script lang="ts">
	import dialog from './dialog.svelte.ts'
	let elem: HTMLDialogElement = $state(null)

	$effect(() => {
		if (elem) dialog.init(elem)

		if (dialog.isOpen) {
			elem.showModal()
		}
	})
</script>

<dialog
	bind:this={elem}
	onclose={(e) => {
		dialog.close()
		console.log(elem.returnValue)
	}}
	class="modal">
	<div class="modal-box">
		<header class="text-lg font-bold">{dialog?.message || 'Confirm'}</header>

		<div class="modal-action">
			<button class="btn btn-soft btn-info" onclick={() => elem.close(true)}
				>{dialog.settings?.accept || 'Ok'}</button>
			<button class="btn btn-soft btn-error" onclick={() => elem.close(false)}
				>{dialog.settings?.cancel || 'Cancel'}</button>
		</div>
	</div>
</dialog>
