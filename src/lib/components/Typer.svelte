<script lang="ts">
	import sleep from '$lib/utils/sleep'
	let { text = '' } = $props()
	function typewriter(node, { speed = 1 }) {
		const valid =
			node.childNodes.length === 1 &&
			node.childNodes[0].nodeType === Node.TEXT_NODE

		if (!valid) {
			throw new Error(
				`This transition only works on elements with a single text node child`
			)
		}

		const text = node.textContent
		const duration = text.length / (speed * 0.01)

		return {
			duration,
			tick: (t) => {
				const i = Math.trunc(text.length * t)
				node.textContent = text.slice(0, i)
			}
		}
	}
	let message = $state('')

	$effect(() => {
		if (text) {
			sleep(100).then(() => {
				message = text
			})
		}
	})
</script>

{#key message}
	<div in:typewriter>{message}</div>
{/key}
