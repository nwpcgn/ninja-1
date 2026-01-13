<script lang="ts">
	import Message from '../../lib/Message.svelte'

	import { parseKey } from '$lib/atlas'
	import getDungeonMap from '$lib/getDungeonMap'
	// import Slider from '$lib/Slider.svelte'
	import {
		TuiCard,
		TuiCollapse,
		TuiGrid,
		TuiGridSection,
		typeList,
		TuiHeader,
		TuiNav,
		TuiBtn,
		getMsg
	} from '$lib'

	const createMsg = () => {
		const msg = getMsg()
		console.log({ msg })
	}
</script>

<section class="nwp page">
	<article>
		<TuiHeader title="Dungeon Roguelike"></TuiHeader>
	</article>

	<article>
		<Message></Message>
	</article>
</section>
<aside class="aside">
	<section class="panel padded bg-base-300 w-68"></section>
</aside>

{#snippet cardRow()}
	<article>
		<TuiGrid>
			<TuiCard>
				<h4 class="card-header-title">Card + Foo Bar</h4>
				<p class="has-text-muted text-sm">Card with content only.</p>
				{#snippet fooBar()}
					<nav class="nav end">
						<button class="button is-primary">Primary</button>
						<button class="button is-danger">Danger</button>
					</nav>
				{/snippet}
			</TuiCard>
			<TuiCard title="Status Report">
				<h4 class="card-header-title">Card + Header</h4>
				<p class="has-text-muted text-sm">Card with content only.</p>
			</TuiCard>
			<TuiCard title="Status Report">
				<h4 class="card-header-title">Card + Header</h4>
				<p class="has-text-muted text-sm">Card with content only.</p>
			</TuiCard>
		</TuiGrid>
	</article>
{/snippet}
