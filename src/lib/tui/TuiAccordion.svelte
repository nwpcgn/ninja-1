<script lang="ts">
	let { children } = $props()
</script>

{@render children?.()}

<!-- FAQ / ACCORDION -->
<div class="showcase-section">
	<h3 class="title is-5 has-text-primary mb-4">FAQ</h3>
	<div class="faq-item">
		<div class="faq-question" data-toggle="Faq">What is terminal.css?</div>
		<div class="faq-answer">A terminal-style CSS component library</div>
	</div>
	<div class="faq-item">
		<div class="faq-question" data-toggle="Faq">How to install?</div>
		<div class="faq-answer">Use CDN or download the CSS/JS files</div>
	</div>
</div>
