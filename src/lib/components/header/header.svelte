<script lang="ts">
	// Components
	import DaySelector from './day-selector.svelte';
	import Brand from './brand.svelte';
	import ThemeSelector from './theme-menu.svelte';
	import LocationSelector from './location-menu.svelte';
	import ConfigSelector from './config-menu.svelte';
import { onMount } from 'svelte';

	onMount(() => {
		const observador = new IntersectionObserver(
			([e]) =>
				e.intersectionRatio < 1
					? e.target.classList.add('stuck')
					: e.target.classList.remove('stuck'),
			{ threshold: [1] }
		);

		observador.observe(document.querySelector('header'));
	})
	
</script>

<header
	class="min-h-[64px] sticky top-[-1px] z-50 flex justify-between items-center py-3 px-4 "
>
	<Brand />
	<ul class="flex gap-5">
		<ThemeSelector/>
		<LocationSelector/>
		<ConfigSelector/>
	</ul>
</header>

<DaySelector />
<style>
	:global(header.stuck) {
		background-color: #fff;
		box-shadow: 0 5px 10px #00000020;
	}
	:global(.dark header.stuck) {
		background-color: #000;
		box-shadow: 0 5px 20px #ffffff40;
	}
</style>