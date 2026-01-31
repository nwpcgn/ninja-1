<script lang="ts">
	import { isActiveLink } from 'sv-router'
	import { navigate, p } from '../router'
	let { nav = [] } = $props()
</script>

<header class="header">
	<nav class="navbar">
		<button onclick={() => navigate('/')} class="navbar-brand cursor-pointer"
			>AppName</button>
		<ul class="navbar-menu">
			{#each nav as { name, href, icon, hidden }, id (id)}
				{#if !hidden}
					<li style="--fs: 1.1rem;">
						<a {href} {@attach isActiveLink()}>
							{@render iconT(icon)}
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	</nav>
</header>
{#snippet iconT(name)}
	<svg class="nwp-icon"><use xlink:href="#{name}"></use></svg>
{/snippet}
