<script module>
	import { uuid } from '$lib'

	const atlas = {
		primary: {
			title: 'Primary',
			type: 'primary',
			icon: '▸',
			duration: 9999,
			message: 'Dein Fortschritt wurde gespeichert.',
			style: 'is-primary'
		},
		success: {
			title: 'Succeed',
			type: 'success',
			icon: '✓',
			duration: 9999,
			message: 'Du fühlst dich stärker – du bist aufgestiegen!',
			style: 'is-success'
		},
		danger: {
			title: 'Error',
			type: 'danger',
			icon: '✕',
			duration: 9999,
			message: 'Dein Weg wird durch unheimliche Kreaturen blockiert.",',
			style: 'is-danger'
		},
		warning: {
			title: 'Warning',
			type: 'warning',
			icon: '⚠',
			duration: 9999,
			message: 'Man sagtdie Sterne flüstern mit jenen',
			style: 'is-warning'
		},
		info: {
			title: 'Info',
			type: 'info',
			icon: 'ℹ',
			duration: 9999,
			message: 'Schwache Gegner erkennst du an ihrer Haltung.',
			style: 'is-info'
		}
	}
	class Toaster {
		list = $state([])
		add(toast = {}) {
			const id = uuid()
			const type = toast?.type || 'info'
			const obj = { ...atlas[type], ...toast, id }
			this.list = [...this.list, obj]
			if (obj.duration) {
				setTimeout(() => this.remove(obj.id), obj.duration)
			}
		}
		remove(id = '') {
			this.list = this.list.filter((t) => t.id !== id)
		}
	}
	export const toaster = new Toaster()
</script>

<script lang="ts">
</script>

<div class="toast-container" id="toastContainer">
	{#if toaster.list.length}
		{#each toaster.list as {id, title,type,message,style} (id)}
			<div
				class="toast {style}"
				style="position: relative; top: auto; right: auto">
				<div class="toast-icon">{atlas[type]?.icon}</div>
				<div class="toast-content">
					<div class="toast-title">{title}</div>
					<div class="toast-message">
						{message}
					</div>
				</div>
				<button onclick={() => {
					toaster.remove(id)
				}} class="toast-close">×</button>
			</div>
		{/each}
	{/if}
</div>
