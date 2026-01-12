<script lang="ts">
	import { onMount } from 'svelte'
	import TuiButton from './TuiButton.svelte'
	import uuidv4 from '$lib/utils/uuid'
	let { data } = $props()

	let container = $state()
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
	const toastTypes = [
		{
			title: 'Primary',
			style: 'is-primary',
			type: 'primary',
			icon: '▸',
			message: 'Dein Fortschritt wurde gespeichert.'
		},
		{
			title: 'Succeed',
			style: 'is-success',
			type: 'success',
			icon: '✓',
			message: 'Du fühlst dich stärker – du bist aufgestiegen!'
		},
		{
			title: 'Error',
			style: 'is-danger',
			type: 'danger',
			icon: '✕',
			message: 'Dein Weg wird durch unheimliche Kreaturen blockiert.",'
		},
		{
			title: 'Warning',
			style: 'is-warning',
			type: 'warning',
			icon: '⚠',
			message: 'Man sagtdie Sterne flüstern mit jenen'
		},
		{
			title: 'Info',
			style: 'is-info',
			type: 'info',
			icon: 'ℹ',
			message: 'Schwache Gegner erkennst du an ihrer Haltung.'
		}
	]
	function showToast(
		type = 'info',
		title = 'Info',
		message = '',
		duration = 8000
	) {
		if (!container) return

		

		// Create toast element
		const toast = document.createElement('div')
		toast.className = `toast is-${type}`

		// Icon mapping
		const icons = {
			primary: '▸',
			success: '✓',
			danger: '✕',
			warning: '⚠',
			info: 'ℹ'
		}

		toast.innerHTML = `
    <div class="toast-icon">${icons[type] || '▸'}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div><button class="toast-close" onclick="dismissToast(this)">×</button>
  `

		container.appendChild(toast)

		// Auto dismiss after duration
		setTimeout(() => {
			dismissToast(toast.querySelector('.toast-close'))
		}, duration)
	}

	function dismissToast(closeButton) {
		const toast = closeButton.closest('.toast')
		if (toast) {
			toast.classList.add('is-dismissing')

			// Remove from DOM after animation
			setTimeout(() => {
				toast.remove()
			}, 300)
		}
	}
	onMount(() => {
		container = document.getElementById('toastContainer')
	})
</script>

<div class="space-y-6">
	<div>
		<h4 class="has-text-muted mb-3 text-sm">Toast Variants</h4>
		<div class="flex flex-wrap gap-3">
			{#each toastTypes as { title, type, message, style } (type)}
				<TuiButton
					onclick={() => {
						showToast(type, title, message)
					}}
					{style}>{title}</TuiButton>
			{/each}
		</div>
	</div>
</div>
