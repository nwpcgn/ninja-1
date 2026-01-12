<script lang="ts">
	import { page } from '$app/state'
	import {
		TuiAccordion,
		TuiAlert,
		TuiBreadcump,
		TuiBtn,
		TuiCard,
		TuiCollapse,
		TuiColor,
		TuiDropdown,
		TuiForm,
		TuiKbd,
		TuiList,
		TuiLog,
		TuiMenu,
		TuiNavBar,
		TuiProgress,
		TuiTable,
		TuiTags,
		TuiTypo,
		TuiUtils
	} from '$lib'

	let { data, children } = $props()
	let current = $derived(page.url.hash.replace('#', ''))
</script>

{@render children?.()}

<aside class="aside">
	<div class="menu">
		<nav class="list">
			{#each data?.menu as { name, href }, i (i)}
				<li>
					<a
						href="#{href}"
						class="list-item"
						class:is-active={current === href}>
						{name}
					</a>
				</li>
			{/each}
		</nav>
	</div>
</aside>
