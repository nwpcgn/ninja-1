<script lang="ts">
	import { TuiHeader, TuiCollapse } from '$lib'
	let { data } = $props()
</script>

<section class="nwp page">
	<article><TuiHeader title={data?.title}></TuiHeader></article>
	<article>
		{#each data?.faqData as item, i (i)}
			<TuiCollapse {...item} active={!i}></TuiCollapse>
		{/each}
	</article>
</section>
