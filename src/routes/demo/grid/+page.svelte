<script lang="ts">
	import { TuiCard, TuiGrid, TuiHeader, TuiNav, TuiBtn } from '$lib'

	let { data } = $props()
</script>

<section class="nwp page">
	<article>
		<TuiHeader title={data?.title}></TuiHeader>
	</article>

	<article>
		<TuiGrid>
			<TuiCard>
				<h4 class="card-header-title">Card + Foo Bar</h4>
				<p class="has-text-muted text-sm">Card with content only.</p>
				{#snippet fooBar()}
					<TuiNav end>
						<TuiBtn type="primary">Primary</TuiBtn>
						<TuiBtn type="danger">Danger</TuiBtn>
					</TuiNav>
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
</section>
