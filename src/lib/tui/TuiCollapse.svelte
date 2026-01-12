<script module>
	const elements = new Set()

	export function closeAll() {
		elements.forEach((element) => {
			element.classList.remove('is-active')
		})
	}
</script>

<script>
	import sleep from '$lib/utils/sleep'
	import { slide } from 'svelte/transition'
	import { onMount } from 'svelte'

	let { id, frage, antwort, active = $bindable(false) } = $props()

	let elem = $state()

	onMount(() => {
		elements.add(elem)
		if (active) trigger()
		return () => elements.delete(elem)
	})

	function closeOthers() {
		active = false
		elements.forEach((element) => {
			if (element !== elem) element.classList.remove('is-active')
		})
	}

	async function trigger() {
		await sleep(200)
		const wasActive = elem.classList.contains('is-active')
		closeOthers()

		if (!wasActive) {
			elem.classList.add('is-active')
			active = true
		}
	}
</script>

<div class="faq-item" bind:this={elem}>
	<div class="faq-question" onpointerdown={trigger}><span>{frage}</span></div>
	{#key active}
		<div transition:slide class="faq-answer"><p>{antwort}</p></div>
	{/key}
</div>
