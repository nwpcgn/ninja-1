<script lang="ts">
	import { log } from '$lib/log.svelte.ts'
	import { TuiHeader, TuiNav, TuiBtn, typeList } from '$lib'
	import Message from '$lib/Message.svelte'
	let { data } = $props()
</script>

<section class="nwp page">
	<article>
		<TuiHeader title={data?.title}></TuiHeader>
	</article>
	<article>
		<Message></Message>
	</article>
</section>
