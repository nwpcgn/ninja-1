<script lang="ts">
	import { AsciiArt } from 'svelte-asciiart'

	const text = `+----------+
|  Hello   |
|  World!  |
+----------+`
</script>

<div>
	<AsciiArt
		{text}
		grid
		frame
		margin={[1, 2]}
		gridClass="ascii-grid"
		frameClass="ascii-frame" />
</div>

<style>
	.ascii-grid {
		stroke: #90ee90;
		stroke-width: 0.03;
		opacity: 0.5;
	}
	.ascii-frame {
		stroke: #ffb366;
		stroke-width: 0.05;
	}
</style>
