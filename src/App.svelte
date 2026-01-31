<script lang="ts">
	import Dungeon1 from './Dungeon1.svelte'
	import AsciiDemo from './AsciiDemo.svelte'
	import { Router, Route, location } from '@svelte-router/core'
	import Header from './lib/components/Header.svelte'
	import SideBar from './lib/components/SideBar.svelte'
	import Sprites from './lib/components/sprites/sprites.svelte'
	import SideNav from './lib/components/SideNav.svelte'
	import Page from './lib/components/Page.svelte'
	import Dungeon2 from './Dungeon2.svelte'
	let current = $derived(location.url.hash.replace('#', ''))
</script>

<Router>
	<Header {current}></Header>
	<section class="layout">
		<main class="main">
			<Route key="init" path="/">
				<Page>
					<header>
						<h2>Lobby</h2>
					</header>
					<AsciiDemo></AsciiDemo>
				</Page>
			</Route>
			<Route key="dungeon" path="/dungeon">
				<Dungeon2></Dungeon2>
			</Route>
			<Route key="arena" path="/arena">
				<Dungeon1></Dungeon1>
			</Route>
			<Route key="settings" path="/settings">
				<section class="page page-grow nwp">
					<article>
						<h1>settings</h1>
					</article>
				</section>
			</Route>
			<SideBar><SideNav {current}></SideNav></SideBar>
		</main>
	</section>
</Router>
<Sprites />
