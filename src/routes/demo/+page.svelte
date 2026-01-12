<script lang="ts">
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
	let { data } = $props()
</script>

<section class="page nwp">
	<article>
		<div class="showcase-header">
			<h1 class="title is-1 has-terminal-glow mb-4">
				terminal.css Component Library
			</h1>
			<p class="subtitle is-4 mb-6">
				Terminal-style components with Bulma naming conventions
			</p>
			<div class="flex items-center justify-center gap-3">
				<a href="./index.html" class="button is-primary">Get Started</a>
			</div>
		</div>

		<!-- SHOWCASE GRID -->
		<div class="showcase-grid">
			<TuiBtn></TuiBtn>
			<TuiTags></TuiTags>
			<TuiForm></TuiForm>
			<TuiTypo></TuiTypo>
			<TuiProgress></TuiProgress>
			<TuiNavBar></TuiNavBar>
			<TuiLog></TuiLog>
			<TuiCard></TuiCard>
			<TuiTable></TuiTable>
			<TuiBreadcump></TuiBreadcump>
			<TuiMenu></TuiMenu>
			<TuiList></TuiList>
			<TuiAlert></TuiAlert>
			<TuiAccordion></TuiAccordion>
			<TuiDropdown></TuiDropdown>
			<TuiKbd></TuiKbd>
			<TuiColor></TuiColor>
			<TuiUtils></TuiUtils>
		</div>
	</article>
</section>
