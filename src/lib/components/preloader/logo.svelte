<script lang="ts">
	import { draw, fly } from 'svelte/transition';
	import { sineIn } from 'svelte/easing';
	import { onMount } from 'svelte';

	onMount(() => {
		// Set Shape Fill colors after drwaing animation
		setTimeout(() => {
			const yellowShapes = document.querySelectorAll('.yellow-shape'),
				blueShapes = document.querySelectorAll('.blue-shape'),
				blackShapes = document.querySelectorAll('.black-shape');

			yellowShapes.forEach((shape) => {
				(shape as HTMLElement).style.fill = '#FFC208';
				(shape as HTMLElement).style.stroke = 'transparent';
			});
			blueShapes.forEach((shape) => {
				(shape as HTMLElement).style.fill = '#1886E4';
				(shape as HTMLElement).style.stroke = 'transparent';
			});
			blackShapes.forEach((shape) => {
				(shape as HTMLElement).style.fill = '#3D3F45';
				(shape as HTMLElement).style.stroke = 'transparent';
			});
		}, 1000);
	});
</script>

<figure class="w-1/2 min-h-[230px] max-w-[250px]">
		<svg
			viewBox="0 0 110 132"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-zinc-700/70 dark:stroke-white/30"
			in:fly={{ duration: 800, y: 200, opacity: 0.5 }}
		>
			<path
				in:draw={{ duration: 800, easing: sineIn }}
				d="M38.7778 14.643L2.02655 36.2617V53.032L38.7778 31.4106L75.5291 53.032V36.2617L38.7778 14.643Z"
				class="yellow-shape"
				style="stroke-width: 1; fill: transparent; transition: all 0.3s ease-in-out;"
			/>
			<path
				in:draw={{ duration: 800, easing: sineIn }}
				d="M72.638 120.57L35.8867 98.951V82.1834L72.638 103.802L109.389 82.1834V98.951L72.638 120.57Z"
				class="yellow-shape"
				style="stroke-width: 1; fill: transparent; transition: all 0.3s ease-in-out;"
			/>
			<path
				in:draw={{ duration: 600, delay: 200, easing: sineIn }}
				d="M2 55.6845L38.7539 34.0658L53.0055 42.4482L16.2516 64.0696V107.31L2 98.9247V55.6845Z"
				class="black-shape"
				style="stroke-width: 1; fill: transparent; transition: all 0.3s ease-in-out;"
			/>
			<path
				in:draw={{ duration: 400, delay: 400, easing: sineIn }}
				d="M92.6501 25.8598L55.8962 4.24103L41.6445 12.6262L78.3958 34.2449V77.4851L92.6501 69.0999V25.8598Z"
				class="blue-shape"
				style="stroke-width: 1; fill: transparent; transition: all 0.3s ease-in-out;"
			/>
			<path
				in:draw={{ duration: 400, delay: 400, easing: sineIn }}
				d="M18.5078 108.62L18.5104 65.3794L32.762 56.9943V100.237L69.5133 121.856L55.2617 130.241L18.5078 108.62Z"
				class="blue-shape"
				style="stroke-width: 1; fill: transparent; transition: all 0.3s ease-in-out;"
			/>
			<path
				in:draw={{ duration: 600, delay: 200, easing: sineIn }}
				d="M109 78.7975V35.5574L94.7484 27.1722V70.4124L57.9945 92.0338L72.2488 100.419L109 78.7975Z"
				class="black-shape"
				style="stroke-width: 1; fill: transparent; transition: all 0.3s ease-in-out;"
			/>
		</svg>
</figure>
