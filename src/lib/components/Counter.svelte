<script lang="ts">
	import TermCard from './TermCard.svelte'
	import { Spring } from 'svelte/motion'
	let { count = $bindable() }: { count: number } = $props()
	const displayedCount = new Spring(0, {
		stiffness: 0.1,
		damping: 0.25
	})

	$effect(() => {
		displayedCount.target = count
	})
	let offset = $derived(modulo(displayedCount.current, 1))

	function modulo(n: number, m: number) {
		return ((n % m) + m) % m
	}
</script>

<TermCard title="Counter Component" end={count} contentClass="nav center">
	<div class="counter">
		<button
			onclick={() => (count -= 1)}
			class="btn btn-primary"
			aria-label="Decrease the counter by one">
			<svg aria-hidden="true" viewBox="0 0 1 1">
				<path d="M0,0.5 L1,0.5" />
			</svg>
		</button>

		<div class="counter-viewport">
			<div
				class="counter-digits"
				style="transform: translate(0, {100 * offset}%)">
				<strong class="hidden" aria-hidden="true"
					>{Math.floor(displayedCount.current + 1)}</strong>
				<strong>{Math.floor(displayedCount.current)}</strong>
			</div>
		</div>

		<button
			onclick={() => (count += 1)}
			class="btn btn-primary"
			aria-label="Increase the counter by one">
			<svg aria-hidden="true" viewBox="0 0 1 1">
				<path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" />
			</svg>
		</button>
	</div>
</TermCard>

<style>
	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	.counter button {
		width: 2em;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background-color: transparent;
		touch-action: manipulation;
		font-size: 2rem;
	}

	.counter button:hover {
		background-color: var(--color-bg-1);
	}

	svg {
		width: 25%;
		height: 25%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #444;
	}

	.counter-viewport {
		width: 8em;
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>
