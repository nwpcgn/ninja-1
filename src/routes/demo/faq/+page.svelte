<script lang="ts">
	import { TuiCollapse } from '$lib'
	let { data } = $props()
</script>

<section class="nwp page">
	<article>
		<!-- SECTION 12: FAQ / ACCORDION -->
		<section class="section">
			<div class="mb-6">
				<h2 class="text-xl font-bold">{data?.title}</h2>
			</div>

			<div>
				{#each data?.faqData as item, i (i)}
					<TuiCollapse {...item} active={!i}></TuiCollapse>
				{/each}
			</div>
		</section>
	</article>
</section>
