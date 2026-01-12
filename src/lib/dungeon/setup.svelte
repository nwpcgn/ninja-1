<script lang="ts">
	import { dungeon } from './dungeon.svelte.js'
	import { sleep } from '../index.js'
	let settings = $state({
		width: 42,
		height: 36,
		type: 'Uniform',
		options: {
			roomWidth: [3, 6] /* room minimum and maximum width */,
			roomHeight: [3, 5] /* room minimum and maximum height */,
			corridorLength: [2, 10] /* corridor minimum and maximum length */,
			dugPercentage: 0.2 /* we stop after this percentage of level area has been dug out */,
			timeLimit: 1000 /* we stop after this much time has passed (msec) */
		}
	})
	let { isOpen = $bindable(false), onUpdateConfig } = $props()
	const handleUpdate = async (e) => {
		e.preventDefault()
		dungeon.updateSettings(settings)
		await sleep(200)
		onUpdateConfig()
	}
</script>

<div class="space-y-4">
	<div class="grid grid-cols-3 gap-4">
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Width</legend>
			<input
				type="number"
				class="input"
				min="20"
				max="99"
				bind:value={settings.width} />
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Height</legend>
			<input
				type="number"
				class="input"
				bind:value={settings.height}
				min="20"
				max="99" />
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Type</legend>
			<select class="select" bind:value={settings.type}>
				<option value="Digger">Digger</option>
				<option value="Uniform">Uniform</option>
			</select>
		</fieldset>
	</div>
	<nav class="nav-bar">
		<span class="flex-1"></span>
		<button class="btn btn-secondary" onclick={handleUpdate}>Create</button>
	</nav>
</div>
