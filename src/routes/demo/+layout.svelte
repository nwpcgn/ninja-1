<script lang="ts">
	import { page } from '$app/state'
	let { children } = $props()
	const menu = [
		{
			href: '/demo',
			name: 'Tui',
			icon: 'rpg-server'
		},
		{
			href: '/demo/toast',
			name: 'Toast',
			icon: 'rpg-server'
		},
		{
			href: '/demo/faq',
			name: 'Faq',
			icon: 'rpg-tools'
		},
		{
			href: '/demo/grid',
			name: 'Grid',
			icon: 'rpg-server'
		}
	]
	let current = $derived(page.url.hash.replace('#', ''))
</script>

{@render children?.()}

<aside class="aside">
	<div class="menu">
		<nav class="list">
			{#each menu as { name, href }, i (i)}
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
