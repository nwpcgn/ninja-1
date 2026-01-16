<script lang="ts">
	import { Tween } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	import sleep from '$lib/utils/sleep'
	let { value = 0, max = 1, label = '', blank = false } = $props()
	let progress = new Tween(0, {
		duration: 800,
		delay: 200,
		easing: cubicOut
	})
	let pw = $derived(Math.floor((progress.current / max) * 100))
	$effect(() => {
		if (value) {
			sleep(100).then(() => {
				progress.target = value
			})
		}
	})
</script>

<div class="grid gap-1" class:opacity-0={blank}>
	<div class="split">
		<span class="has-text-primary text-sm">{label}</span>
		<span class="has-text-primary text-sm font-bold">{pw}%</span>
	</div>
	<progress
		class="progress transition-all duration-150 ease-in {pw < 15
			? 'is-danger'
			: 'is-primary'}"
		value={progress.current}
		{max}></progress>
</div>
