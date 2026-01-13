<script lang="ts">
	import { TuiBtn, TuiNav } from '$lib'
	let {
		list = [
			{
				slide: 1,
				set: 'Set1',
				title: 'Die Nacht des Verrats',
				body: 'Als der Mond über dem Shōganat stand, fiel das Schwert der Intrige. Ein einziger Angriff löschte einen ganzen Clan aus – bis auf eine Überlebende.'
			},
			{
				slide: 2,
				set: 'Set1',
				title: 'Der Pfad der Einsamkeit',
				body: 'Verbannt und verfolgt wandert sie durch vom Krieg gezeichnete Provinzen. Jeder Schritt führt tiefer in eine Welt aus Lügen und Schwüren.'
			},
			{
				slide: 3,
				set: 'Set1',
				title: 'Die Schatten von Edo',
				body: 'In den Gassen der Hauptstadt hört man ihren Namen nur im Flüstern. Feinde lauern überall.'
			},
			{
				slide: 4,
				set: 'Set1',
				title: 'Klinge des Eides',
				body: 'Die alte Waffe ihres Clans erwacht erneut zum Leben und erinnert sie an ihre Pflicht.'
			},
			{
				slide: 5,
				set: 'Set1',
				title: 'Das letzte Tor',
				body: 'Am Tor der Festung entscheidet sich ihr Schicksal zwischen Vergangenheit und Neubeginn.'
			}
		]
	} = $props()
	let current = $state(0)
	let container: HTMLDivElement = $state()
	let slides: HTMLElement[] = $state([])

	function next(index: number) {
		const target = slides[index]
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				inline: 'start'
			})
		}
	}
</script>

<div class="space-y-4 py-4" bind:this={container}>
	<nav class="nav center">
		{#each list as item, id (id)}
			<button
				class="tag is-primary"
				onclick={() => {
					next(id)
					current = id
				}}
				class:is-active={id == current}>{item.slide}</button>
		{/each}
	</nav>
	<div class="carousel" id="carousel">
		{#each list as { title, body }, i (i)}
			<article class="slide" class:active={i == current} bind:this={slides[i]}>
				<h3>{title}</h3>
				<div class="body">
					<p>{body}</p>
				</div>
				<TuiNav end>
					{#if !slides[i + 1]}
						<TuiBtn
							type="danger"
							onclick={() => {
								next(0)
								current = 0
							}}>Reset</TuiBtn>
					{:else}
						<TuiBtn
							type="primary"
							onclick={() => {
								const newId = i + 1
								if (slides[newId]) {
									current = newId
									next(newId)
								}
							}}>Next</TuiBtn>
					{/if}
				</TuiNav>
			</article>
		{/each}
	</div>
</div>

<style>
	.carousel {
		display: flex;
		gap: 2rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		border-radius: 0.75rem;
		border: 2px solid var(--primary);
		.slide {
			flex: 0 0 100%;
			max-width: 100%;
			height: 320px; /* 🔑 feste Höhe */
			padding: 2rem;
			display: flex;
			flex-direction: column;
			scroll-snap-align: start;
			background-color: var(--surface);
			color: var(--terminal-fg);
			border-radius: 0.75rem;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
			opacity: 0;
		}
		.slide.active {
			opacity: 1;
			transition: opacity 0.4s ease-in;
		}

		.slide h3 {
			font-size: 2.5rem;
			line-height: 1.1;
			margin-bottom: 1.5rem;
		}

		.slide .body {
			font-size: 1.2rem;
			color: var(--muted);
			flex: 1; /* 🔑 füllt den Platz */
			overflow: auto; /* langer Text scrollt intern */
		}
	}
	.carousel {
		scrollbar-width: none;
	}
	.carousel::-webkit-scrollbar {
		display: none;
	}
</style>
