<script lang="ts">
	import {
		Toster
		// 	TuiAccordion,
		// 	TuiAlert,
		// 	TuiBreadcump,
		// 	TuiBtn,
		// 	TuiCard,
		// 	TuiCollapse,
		// 	TuiColor,
		// 	TuiDropdown,
		// 	TuiForm,
		// 	TuiKbd,
		// 	TuiList,
		// 	TuiLog,
		// 	TuiMenu,
		// 	TuiNavBar,
		// 	TuiProgress,
		// 	TuiTable,
		// 	TuiTags,
		// 	TuiTypo,
		// 	TuiUtils
	} from '$lib'
	import {toaster} from '../../TuiToster.svelte'
	let { data } = $props()

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
const showToast = (type = 'info', message = '') => {
	toaster.add({type,message})
};
	function showToast2(
		type = 'info',
		title = 'Info',
		message = '',
		duration = 5000
	) {
		const container = document.getElementById('toastContainer')

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
    </div>
    <button class="toast-close" onclick="dismissToast(this)">×</button>
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
</script>

<section class="nwp page">
	<article>
		<!-- SECTION 11: TOAST / NOTIFICATION -->
		<section class="section">
			<div class="mb-6">
				<h2 class="text-xl font-bold">{data?.title}</h2>
			</div>
				<button class="button is-primary" onclick={() => showToast('info', 'Test')}>Primary</button>
				<button class="button is-primary" onclick={() => showToast('danger', 'Test')}>Primary</button>
				<button class="button is-primary" onclick={() => showToast('success', 'Test')}>Primary</button>
		</section>
	</article>
</section>
