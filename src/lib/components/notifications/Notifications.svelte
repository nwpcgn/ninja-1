<script lang="ts">
	import { fade, slide } from 'svelte/transition'
	import { getNote, log } from './log.svelte.ts'
	function typewriter(node, { speed = 4 }) {
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
				const i = ~~(text.length * t)
				node.textContent = text.slice(0, i)
			}
		}
	}
	let frame: HTMLDivElement | null = $state(null)
	let fh = $state(0)
	let fw = $state(0)
	let fch: number = $state(0)
	let { label, colorClass = 'bg-base-100 text-base-content' } = $props()
	const addNote = async () => {
		const obj = getNote()
		log.addMessage(obj)
	}
	const clearList = () => {
		log.empty()
	}
	$effect(async () => {
		if (frame) {
			log.init(frame)
		}

		if (fch) {
			frame.scrollTo({ top: fch, behavior: 'smooth' })
		}
	})
	const headerClass = `${colorClass}`
	const boxClass = `overflow-x-hidden overflow-y-auto size-[360px]`
</script>

{#snippet msgLine({ id, type, message, dismissible })}
	<div
		transition:slide|global
		role="alert"
		class="alert"
		class:alert-warning={type === 'warning'}
		class:alert-info={type === 'info'}
		class:alert-error={type === 'error'}
		class:alert-success={type === 'success'}>
		{#if dismissible}
			<button
				style="--fs: 16px;"
				aria-label="close"
				onclick={() => {
					log.remove(id)
				}}
				class="rounded-box size-4 cursor-pointer text-sm">
				&#10006;
			</button>
		{/if}
		<span out:fade={{ duration: 200 }} in:typewriter>{message}</span>
	</div>
{/snippet}

{#if label}
	<header class={headerClass}>
		<div class="padded-small flex items-center gap-2">
			<div class="h4">
				<span
					class="transition-opacity duration-300 ease-in"
					class:opacity-40={log.busy}>{label}</span>
				{#if log.messages.length}
					<span class="text-accent text-lg" in:fade
						>+{log.messages.length}</span>
				{:else if log.list.length}
					<span class="text-lg" in:fade>{log.list.length}</span>
				{/if}
			</div>

			<span class="flex-1"></span>
			<nav class="grid grid-cols-2 gap-2">
				<button onclick={addNote} aria-label="addNote" class="cursor-pointer">
					&#10010;
				</button>
				<button
					disabled={log.busy}
					onclick={clearList}
					aria-label="clearNotes"
					class="cursor-pointer">
					&#10006;
				</button>
			</nav>
		</div>
	</header>
{/if}

<div
	class={boxClass}
	bind:this={frame}
	bind:clientHeight={fh}
	bind:clientWidth={fw}>
	<div class="grid gap-2" bind:clientHeight={fch}>
		{#each log.list as note (note.id)}
			{@render msgLine(note)}
		{:else}
			<div class="padded-small grid place-content-center">
				<span>no Messages</span>
			</div>
		{/each}
	</div>
</div>
